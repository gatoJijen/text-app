const express = require('express');
const cors = require('cors'); // Importa el paquete cors
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 5000;

// Habilita CORS para todas las rutas
app.use(cors());

app.use(express.json());

app.post('/speak', (req, res) => {
  const { text, speed, separacion } = req.body; // Obtén el texto, velocidad y separación
  if (!text || !speed) {
    return res.status(400).send('Texto o velocidad no proporcionados');
  }

  const outputFile = path.join(__dirname, 'output.wav');
  const escapedText = text.replace(/"/g, '\\"');

  // Usa la velocidad y separación proporcionadas por el frontend
  const command = `espeak-ng -v es -s ${speed} -a 100 -p ${separacion || 30} "${escapedText}" --stdout > ${outputFile}`;

  exec(command, (err, stdout, stderr) => {
    if (err) {
      console.error('Error al generar audio:', err);
      console.error('Stderr:', stderr);
      return res.status(500).send('Error al generar audio');
    }

    // Envía el archivo de audio al frontend
    res.sendFile(outputFile, (err) => {
      if (err) {
        console.error('Error al enviar el archivo:', err);
        return res.status(500).send('Error al enviar el archivo');
      }

      // Elimina el archivo después de enviarlo
      fs.unlinkSync(outputFile);
    });
  });
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});