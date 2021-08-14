- pm2 start process_prod.json: inicia um ou mais processos via arquivo JSON.
- pm2 start NomeDoApp: inicia um aplicativo específico.
- pm2 stop NomeDoApp: para uma aplicação específica.
- pm2 ls: mostra uma lista de todas as aplicações sendo executadas.
- pm2 NomeDoApp scale N: escala o aplicativo que foi especificado para n números de instâncias.
- pm2 show NomeDoApp: mostra informações sobre a aplicação.
- pm2 kill all: mata todos os aplicativos em execução.
- pm2 restart all: reinicia todos os aplicativos em execução.
- pm2 reload all: recarrega a configuração do aplicativo, como as variáveis de ambiente.
- pm2 startup: configura o pm2 para inicializar com o sistema operacional.
- pm2 logs
- pm2 logs site1 --lines 100
- pm2 start app.js --watch


- https://neilpatel.com/br/blog/robots-txt/
- https://medium.com/@pimterry/host-your-node-app-on-dokku-digitalocean-1cb97e3ab041