# Contextual AI Assistant ✨

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> Assistente de IA full-stack construído com React, Node.js e Google Gemini, capaz de responder perguntas com base em um corpo de conhecimento personalizado.

Este projeto demonstra a criação de uma aplicação de chat completa, desde a interface moderna em React até um backend robusto que se comunica com uma API de IA, com foco em funcionalidades avançadas como memória conversacional e respostas em tempo real.

---

## 📸 Screenshots

*(Recomendação: Adicione aqui um GIF ou screenshots do assistente em ação!)*

![Screenshot da Aplicação](https://via.placeholder.com/800x450.png?text=Adicione+um+screenshot+aqui)

---

## ✨ Funcionalidades Principais

-   **🧠 Memória de Conversa:** O assistente lembra do contexto da conversa para responder perguntas de acompanhamento de forma coerente.
-   **⚡ Respostas em Streaming:** As respostas da IA são exibidas em tempo real (efeito "máquina de escrever"), melhorando drasticamente a experiência do usuário.
-   **✍️ Suporte a Markdown:** As respostas são formatadas com Markdown, permitindo listas, negrito, itálico, blocos de código e mais.
-   **💾 Histórico Persistente:** O histórico do chat é salvo no `localStorage` do navegador, para que você possa continuar a conversa ao recarregar a página.
-   **🔌 Backend Modular:** A arquitetura do servidor é projetada para ser flexível. Embora esteja configurada com a API do Google Gemini, pode ser facilmente adaptada para usar outras APIs como OpenAI (GPT), Anthropic (Claude), etc.
-   **🎨 Interface Moderna:** UI limpa e responsiva construída com Tailwind CSS, incluindo modo escuro.

---

## 🛠️ Tech Stack

-   **Frontend:** React, Tailwind CSS, Framer Motion
-   **Backend:** Node.js, Express
-   **API de IA:** Google Gemini
-   **Comunicação:** Axios, Fetch API (para streaming)
-   **Utilitários:** `react-markdown`, `dotenv`

---

## 🚀 Como Executar o Projeto

Siga os passos abaixo para configurar e executar o projeto localmente.

### Pré-requisitos

-   Node.js (versão 18 ou superior)
-   npm ou yarn
-   Uma chave de API do Google Gemini (veja como obter no arquivo `.env.example`)

### Passos

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/SEU_USUARIO/SEU_REPOSITORIO.git
    cd contextual-ai-assistant
    ```

2.  **Crie o arquivo de ambiente:**
    -   Renomeie o arquivo `.env.example` para `.env`.
    -   Adicione sua chave de API do Google Gemini no arquivo `.env`.

3.  **Instale as dependências do backend:**
    ```bash
    cd server
    npm install
    ```

4.  **Instale as dependências do frontend:**
    ```bash
    cd ..
    npm install
    ```

5.  **Execute a aplicação:**
    -   Em um terminal, inicie o backend:
        ```bash
        cd server
        npm start
        ```
    -   Em **outro** terminal, inicie o frontend:
        ```bash
        cd ..
        npm start
        ```

6.  **Abra no navegador:**
    -   Acesse `http://localhost:3000` (ou a porta que o React indicar).

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 🤝 Contribuições

Contribuições são bem-vindas! Se você tem sugestões para melhorar este projeto, sinta-se à vontade para abrir uma issue ou um pull request. Por favor, leia nosso [guia de contribuição](CONTRIBUTING.md) primeiro.
