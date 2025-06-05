const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');
const cors = require('cors');
app.use(cors({
  origin: '*', 
  methods: ['GET', 'POST'],
}));

dotenv.config();
const app = express();
const API_KEY_FACTCHECK = process.env.API_KEY_FACTCHECK;
const API_KEY_NEWDATA = process.env.API_KEY_NEWDATA;
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Rota para Google Fact Check API
app.post('/api/factcheck', async (req, res) => {
  const query = req.body.query;
  const apiKey = process.env.GOOGLE_FACTCHECK_API_KEY;

  try {
    const response = await axios.get('https://factchecktools.googleapis.com/v1alpha1/claims:search', {
      params: {
        key: apiKey,
        query: query,
        languageCode: 'pt-BR',
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error('Erro na API Google Fact Check:', error.message);
    res.status(500).json({ error: 'Erro ao consultar o Google Fact Check API' });
  }
});

// Rota para NewsData API
app.post('/api/newsdata', async (req, res) => {
  const query = req.body.query;
  const apiKey = process.env.NEWSDATA_API_KEY;

  try {
    const response = await axios.get('https://newsdata.io/api/1/news', {
      params: {
        apikey: apiKey,
        q: query,
        language: 'pt',
        country: 'br',
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error('Erro na API NewsData:', error.message);
    res.status(500).json({ error: 'Erro ao consultar o NewsData API' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
