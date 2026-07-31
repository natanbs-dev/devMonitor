devMonitor
 
Ferramenta que criei pra acompanhar se um conjunto de serviços/APIs está no ar, com histórico de resposta e um painel simples pra visualizar tudo isso.
 
A ideia surgiu de uma necessidade bem prática: em vez de ficar checando manualmente se um site ou API caiu, ter algo que faz isso sozinho e guarda o histórico.
 
## O que ele faz
 
- verifica periodicamente se os serviços cadastrados estão respondendo
- mede o tempo de resposta de cada checagem
- guarda esse histórico num banco de dados sql
- mostra tudo num painel web, com status visual (verde = no ar, vermelho = fora do ar)
## Stack
 
- **Python** — script responsável pelas checagens e requisições HTTP
- **Node.js** — API que expõe os dados do banco
- **React** — painel
- **SQLite** — armazenamento do histórico
