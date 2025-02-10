const express = require('express');
const cors = require ('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

//middlewares
app.use(cors());
app.use(express.json());

//banco de dados
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('conectado ao banco de dados MongoDB!'))
  .catch(err => console.error('erro ao conectar ao banco de dados MongoDB:', err));

//rota de teste
app.get('/', (req, res) => {
    res.send('o servidor está funcionando!!');
  });

//iniciando servidor
app.listen(PORT, () => {
    console.log('servidor rodando na porta ${PORT}');
})