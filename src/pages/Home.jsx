import React, { useState, useEffect, useRef } from 'react';
import ChatWindow from '../components/ChatWindow';
import InputBar from '../components/InputBar';
import ToggleDarkMode from '../components/ToggleDarkMode';

export default function Home() {
  const [messages, setMessages] = useState(() => {
    try {
      const savedMessages = localStorage.getItem('chatHistory');
      if (savedMessages) {
        return JSON.parse(savedMessages);
      }
    } catch (error) {
      console.error("Failed to parse chat history from localStorage", error);
    }
    return [{ from: 'bot', text: 'Oi! Pergunte algo sobre meus projetos.' }];
  });

  const [loading, setLoading] = useState(false);
  const chatRef = useRef(null);

  useEffect(() => {
    localStorage.setItem('chatHistory', JSON.stringify(messages));
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async (text) => {
    const userMessage = { from: 'user', text };
    const currentMessages = [...messages, userMessage];
    setMessages(currentMessages);
    setLoading(true);

    // Adiciona uma mensagem de bot vazia para ser preenchida pelo stream
    setMessages(prev => [...prev, { from: 'bot', text: '' }]);

    try {
      const history = currentMessages.slice(0, -1);
      const response = await fetch('/api/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: text, history }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erro no servidor');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let firstChunk = true;

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        
        setMessages(prev => {
          const newMessages = [...prev];
          if (firstChunk) {
            newMessages[newMessages.length - 1] = { from: 'bot', text: chunk };
            firstChunk = false;
          } else {
            newMessages[newMessages.length - 1].text += chunk;
          }
          return newMessages;
        });
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
      const errorMessage = `Desculpe, ocorreu um erro: ${error.message}`;
      setMessages(prev => {
        const newMessages = [...prev];
        newMessages[newMessages.length - 1] = { from: 'bot', text: errorMessage };
        return newMessages;
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-4 font-sans'>
      <div className='w-full max-w-2xl bg-white dark:bg-gray-800 rounded-2xl shadow-lg flex flex-col h-[95vh]'>
        <div className='flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700'>
          <h1 className='text-2xl font-bold text-gray-900 dark:text-white'>Contextual AI Assistant</h1>
          <ToggleDarkMode />
        </div>
        <ChatWindow messages={messages} loading={false} ref={chatRef} />
        <div className='p-6'>
          <InputBar onSend={sendMessage} disabled={loading} />
        </div>
      </div>
    </div>
  );
}
