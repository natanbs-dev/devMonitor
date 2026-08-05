## 1. como adicionar novas requisições
sqlite3 devmonitor.db "INSERT INTO services (name, url) VALUES ('site', 'https://url');"

## 2. da pasta worker, rodar
python3 monitor.py


## 3. Atualize a cópia do banco usada pela API
cd ../api
cp ../worker/devmonitor.db ./devmonitor.db

## 4. Reinicie a API para carregar os dados novos

_Ctrl+C no terminal onde node server.js está rodando, depois:
node server.js_

## 5. Dê refresh no navegador (http://localhost:5173)

---
# como rodar
node server.js

## na pasta frontend, rode
npm run dev



