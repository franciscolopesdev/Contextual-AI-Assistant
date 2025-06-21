@echo off
echo 🚀 Configurando AI Bot React...

REM Verificar se Node.js está instalado
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js não encontrado. Por favor, instale o Node.js primeiro.
    pause
    exit /b 1
)

echo ✅ Node.js encontrado
node --version

REM Instalar dependências do frontend
echo 📦 Instalando dependências do frontend...
call npm install

REM Instalar dependências do backend
echo 📦 Instalando dependências do backend...
cd server
call npm install
cd ..

REM Verificar se o arquivo .env existe
if not exist .env (
    echo ⚠️  Arquivo .env não encontrado!
    echo 📝 Criando arquivo .env de exemplo...
    (
        echo # Configurações da API OpenAI
        echo OPENAI_API_KEY=sua_chave_api_aqui
        echo.
        echo # Configurações do servidor
        echo PORT=5000
    ) > .env
    echo ✅ Arquivo .env criado!
    echo 🔑 Por favor, adicione sua chave da API OpenAI no arquivo .env
) else (
    echo ✅ Arquivo .env encontrado
)

echo.
echo 🎉 Configuração concluída!
echo.
echo 📋 Próximos passos:
echo 1. Edite o arquivo .env e adicione sua chave da API OpenAI
echo 2. Execute o backend: cd server ^&^& npm start
echo 3. Execute o frontend: npm start
echo 4. Acesse http://localhost:3000
echo.
echo 🔧 Para desenvolvimento:
echo - Backend: cd server ^&^& npm run dev
echo - Frontend: npm start
pause 