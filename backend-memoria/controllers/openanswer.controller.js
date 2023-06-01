const { SentimentManager } = require('node-nlp');

async function analizarSentimiento(texto) {
  const sentiment = new SentimentManager();
  const result = await sentiment.process('es', texto);
  return result;
}

exports.create = async (req, res) => {
  try {
    const texto = req.body.respuesta;
    const analisis = await analizarSentimiento(texto);
    res.json(analisis); // Enviar el resultado del análisis como respuesta en formato JSON
  } catch (error) {
    res.status(500).send('Error en el análisis de sentimiento'); // Enviar un mensaje de error en caso de excepción
  }
};