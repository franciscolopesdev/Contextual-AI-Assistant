const express = require('express');
const router = express.Router();
const fs = require('fs').promises;
const path = require('path');
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Função para carregar conhecimento personalizado
async function loadCustomKnowledge() {
  try {
    const knowledgePath = path.join(__dirname, '../../context/custom-knowledge.md');
    return await fs.readFile(knowledgePath, 'utf-8');
  } catch (error) {
    console.error('Erro ao carregar conhecimento personalizado:', error);
    return '';
  }
}

router.post('/', async (req, res) => {
  const { question, history } = req.body;

  if (!question) {
    return res.status(400).json({ error: 'A pergunta é obrigatória.' });
  }

  if (!process.env.GEMINI_API_KEY) {
    return res.status(500).json({ error: 'A chave da API Gemini não está configurada.' });
  }

  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash-latest' });
    
    const customKnowledge = await loadCustomKnowledge();
    const systemInstruction = `Você é um assistente prestativo. Baseie suas respostas EXCLUSIVAMENTE nas seguintes informações: ---INÍCIO DO CONHECIMENTO--- ${customKnowledge} ---FIM DO CONHECIMENTO---. Se a pergunta não puder ser respondida com base nesse conhecimento, diga que não tem essa informação.`;

    const chatHistoryForAPI = [
      { role: 'user', parts: [{ text: systemInstruction }] },
      { role: 'model', parts: [{ text: 'Ok, entendi. Estou pronto para ajudar com base no conhecimento fornecido.' }] },
      ...(history || []).map(msg => ({
        role: msg.from === 'user' ? 'user' : 'model',
        parts: [{ text: msg.text }],
      })),
    ];

    const chat = model.startChat({ history: chatHistoryForAPI });
    const result = await chat.sendMessageStream(question);

    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    
    for await (const chunk of result.stream) {
      res.write(chunk.text());
    }
    res.end();

  } catch (error) {
    console.error('Erro na API Gemini:', error);
    res.status(500).json({
      error: 'Falha ao se comunicar com a API do Gemini. Verifique os logs do servidor.',
    });
  }
});

module.exports = router;
