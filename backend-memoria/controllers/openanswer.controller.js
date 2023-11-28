const { SentimentManager } = require('node-nlp');
const keyword_extractor = require("keyword-extractor");
const db = require("../models");
const GeneralSentiment = db.generalsentiment;
const InterfazSentiment = db.interfazsentiment;
const IterationState = db.iterationstate;
const Iteration = db.iteration
const Keyword = db.keyword

async function analizarSentimiento(texto) {
  const sentiment = new SentimentManager();
  const result = await sentiment.process('es', texto);
  return result;
}

exports.create = async (req, res) => {
  try {
    const opinion1 = req.body.opinion1;
    const opinion2 = req.body.opinion2;
    const prefieroNoOpinar1 = req.body.prefieroNoOpinar1;
    const prefieroNoOpinar2 = req.body.prefieroNoOpinar2;
    let responseText
    if (prefieroNoOpinar1 && prefieroNoOpinar2) {
      responseText = 'no se opina sobre interfaz ni general'; // Enviar el resultado del análisis como respuesta en formato JSON
    } else {
      let analisis1, analisis2
      responseText = 'Analisis de sentimiento realizado exitosamente'
      if (prefieroNoOpinar1) {
        analisis2 = await analizarSentimiento(opinion2);
        await GeneralSentiment.create({
          userId: req.body.idUser,
          iterationId: req.body.idIteration,
          answer: opinion2,
          comparative: analisis2.comparative,
          numhits: analisis2.numHits,
          numwords: analisis2.numWords,
          score: analisis2.score,
          vote: analisis2.vote
        });
      } else if (prefieroNoOpinar2) {
        analisis1 = await analizarSentimiento(opinion1);
        await InterfazSentiment.create({
          userId: req.body.idUser,
          iterationId: req.body.idIteration,
          answer: opinion1,
          comparative: analisis1.comparative,
          numhits: analisis1.numHits,
          numwords: analisis1.numWords,
          score: analisis1.score,
          vote: analisis1.vote
        });
      } else {
        analisis1 = await analizarSentimiento(opinion1);
        analisis2 = await analizarSentimiento(opinion2);
        await InterfazSentiment.create({
          userId: req.body.idUser,
          iterationId: req.body.idIteration,
          answer: opinion1,
          comparative: analisis1.comparative,
          numhits: analisis1.numHits,
          numwords: analisis1.numWords,
          score: analisis1.score,
          vote: analisis1.vote
        });
        await GeneralSentiment.create({
          userId: req.body.idUser,
          iterationId: req.body.idIteration,
          answer: opinion2,
          comparative: analisis2.comparative,
          numhits: analisis2.numHits,
          numwords: analisis2.numWords,
          score: analisis2.score,
          vote: analisis2.vote
        });
      }
    }
    const iterationState = await IterationState.findOne({
      where: { iterationId: req.body.idIteration, userId: req.body.idUser }
    });
    iterationState.inTask = false
    iterationState.inCSUQ = false
    iterationState.inQuestion = false
    await iterationState.save()
    //lo que sigue, es para disminuir en 1 la cantidad de usuarios activos completando la iteracion
    //y aumentar en 1 la cantidad de usuarios que completaron la iteracion
    const iteration = await Iteration.findByPk(req.body.idIteration)
    iteration.users_qty -= 1
    iteration.users_qty_complete += 1
    await iteration.save()

    res.status(200).send(responseText); // Enviar el resultado del análisis como respuesta en formato JSON 
  } catch (error) {
    res.status(500).send('Error en el análisis de sentimiento'); // Enviar un mensaje de error en caso de excepción
  }
};

exports.prueba = async (req, res) => {
  try {
    const opinion = req.body.opinion;
    const analisis = await analizarSentimiento(opinion);
    const keywords =
      keyword_extractor.extract(opinion, {
        language: "spanish",
        remove_digits: true,
        return_changed_case: true,
        remove_duplicates: false

      });
    const keywords_no_neutral = []
    for (const keyword of keywords) {
      const analisis_key = await analizarSentimiento(keyword);
      if (analisis_key.vote != "neutral") {
        keywords_no_neutral.push(keyword)
        await Keyword.create({
          userId: 1,
          iterationId: 1,
          keyword: keyword,
        });
      }
    }

    await GeneralSentiment.create({
      userId: 1,
      iterationId: 1,
      answer: opinion,
      comparative: analisis.comparative,
      numhits: analisis.numHits,
      numwords: analisis.numWords,
      score: analisis.score,
      vote: analisis.vote
    });






    const responseData = {
      analisis_sentimiento: analisis,
      keywords: keywords_no_neutral
    };

    res.status(200).json(responseData);
  } catch (error) {
    res.status(500).send('Error en el análisis de sentimiento'); // Enviar un mensaje de error en caso de excepción
  }
};