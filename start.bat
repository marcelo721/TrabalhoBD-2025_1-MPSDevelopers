@echo off

REM Define caminhos relativos baseados na pasta do .bat
set "BACKEND_PATH=%~dp0Back end"
set "FRONTEND_PATH=%~dp0Front end"

REM Instala dependências do frontend
echo Instalando dependências do frontend em "%FRONTEND_PATH%"...
cd /d "%FRONTEND_PATH%"
pnpm install

REM Inicia o frontend
echo Iniciando frontend em "%FRONTEND_PATH%"...
start "" cmd /k cd /d "%FRONTEND_PATH%" ^&^& pnpm dev

REM Inicia o backend
echo Iniciando backend em "%BACKEND_PATH%"...
start "" cmd /k cd /d "%BACKEND_PATH%" ^&^& .\mvnw clean package ^&^& java -jar target\AcademicManagementSystem-0.0.1-SNAPSHOT.jar

exit
