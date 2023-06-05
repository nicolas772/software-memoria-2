const { SentimentManager } = require('node-nlp');
const db = require("../models");
const GeneralSentiment = db.generalsentiment;
const InterfazSentiment = db.interfazsentiment;

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
    if (prefieroNoOpinar1 && prefieroNoOpinar2){
      res.send('no se opina sobre interfaz ni general'); // Enviar el resultado del análisis como respuesta en formato JSON
    }else{
      let analisis1, analisis2
      if (prefieroNoOpinar1){
        analisis1 = 'no se opina sobre interfaz'
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
      }else if (prefieroNoOpinar2){
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
      }else {
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
      res.status(200).send('Analisis de sentimiento realizado exitosamente'); // Enviar el resultado del análisis como respuesta en formato JSON 
    }
  } catch (error) {
    res.status(500).send('Error en el análisis de sentimiento'); // Enviar un mensaje de error en caso de excepción
  }
};