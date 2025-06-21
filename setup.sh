#!/bin/bash

echo "🚀 Configurando AI Bot React..."

# Verificar se Node.js está instalado
if ! command -v node &> /dev/null; then
    echo "❌ Node.js não encontrado. Por favor, instale o Node.js primeiro."
    exit 1
fi

echo "✅ Node.js encontrado: $(node --version)"

# Instalar dependências do frontend
echo "📦 Instalando dependências do frontend..."
npm install

# Instalar dependências do backend
echo "📦 Instalando dependências do backend..."
cd server
npm install
cd ..

# Verificar se o arquivo .env existe
if [ ! -f .env ]; then
    echo "⚠️  Arquivo .env não encontrado!"
    echo "📝 Criando arquivo .env de exemplo..."
    cat > .env << EOF
# Configurações da API OpenAI
OPENAI_API_KEY=sua_chave_api_aqui

# Configurações do servidor
PORT=5000
EOF
    echo "✅ Arquivo .env criado!"
    echo "🔑 Por favor, adicione sua chave da API OpenAI no arquivo .env"
else
    echo "✅ Arquivo .env encontrado"
fi

echo ""
echo "🎉 Configuração concluída!"
echo ""
echo "📋 Próximos passos:"
echo "1. Edite o arquivo .env e adicione sua chave da API OpenAI"
echo "2. Execute o backend: cd server && npm start"
echo "3. Execute o frontend: npm start"
echo "4. Acesse http://localhost:3000"
echo ""
echo "🔧 Para desenvolvimento:"
echo "- Backend: cd server && npm run dev"
echo "- Frontend: npm start" 