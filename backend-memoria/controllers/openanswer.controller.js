const { SentimentManager } = require('node-nlp');

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
        analisis2 = await analizarSentimiento(opinion2);
      }else if (prefieroNoOpinar2){
        analisis1 = await analizarSentimiento(opinion1);
        analisis2 = 'no se opina sobre general';
      }else {
        analisis1 = await analizarSentimiento(opinion1);
        analisis2 = await analizarSentimiento(opinion2);
      }
      res.json({analisis1: analisis1, analisis2: analisis2}); // Enviar el resultado del análisis como respuesta en formato JSON 
    }
  } catch (error) {
    res.status(500).send('Error en el análisis de sentimiento'); // Enviar un mensaje de error en caso de excepción
  }
};