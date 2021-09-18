## Installs and Usefull Tools
- NodeJS
   - https://snapcraft.io/node
- Linux Distros I Use
   - https://linuxmint.com/edition.php?id=290
   - https://xubuntu.org/release/20-04/
- SETUP UBUNTU 20.04 SERVER
   - https://www.digitalocean.com/community/tutorials/initial-server-setup-with-ubuntu-20-04-pt
- REDIS
   - https://www.digitalocean.com/community/tutorials/how-to-install-and-secure-redis-on-ubuntu-20-04-quickstart-pt
- DOCKER
   - https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-20-04-pt
- NGINX
   - https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-ubuntu-20-04-pt
- SQL GUI
   - https://www.adminer.org/
   - https://www.beekeeperstudio.io/
- SQLITE
   - https://sqlitebrowser.org/
- POSTGRE 
   - https://www.elephantsql.com/
   - https://www.digitalocean.com/community/tutorials/how-to-install-postgresql-on-ubuntu-20-04-quickstart-pt
- MYSQL AS A SERVICE
   - https://remotemysql.com/
- MONGODB 
   - As A Service
      - https://www.mongodb.com/cloud/atlas
   - GUI
      - https://studio3t.com/
      - https://www.mongodb.com/pt-br/products/compass
      - https://github.com/mongo-express/mongo-express
- WEBHOOK
   - https://webhook.site/
- SMTP
   - https://ethereal.email/
   - https://mailtrap.io/
   - https://sendgrid.com/
- NGROK
   - https://ngrok.com/
- HTTP REQUESTS
   - https://www.postman.com/
   - https://insomnia.rest/download
   - https://hoppscotch.io/
   - API HTTP Requests
      - You can use my INSOMNIA Configuration JSON with all HTTP Requests Ready to TRY
      - INSOMNIA_GALHARDOAPP_API_REQUESTS.json


## How To Install Locally with SQLite and Docker
- In development

## How To Install Locally with MySQL and Docker
- In Development
- $ sudo docker-compose up -d
- Go to: http://localhost:8080
   - Select MySQL
   - server: galhardoapp_postgres
   - username: root
   - password: root


## How To Install Locally with PostgreSQL and Docker
- In Development
- $ sudo docker-compose up -d
- Go to: http://localhost:8080
   - Select PostgreSQL
   - server: galhardoapp_postgres
   - username: postgres
   - password: root


## How To Install Locally with MongoDB and Docker
- In Development
- $ sudo docker-compose up -d
- $ sudo docker inspect galhardoapp_mongodb
- Get Docker MongoDB IPv4 Address number (like: 172.19.0.2)
```
$ sudo docker exec -it galhardoapp_mongodb \
    mongo --host localhost -u admin -p root --authenticationDatabase admin \
    --eval "db.getSiblingDB('galhardoapp').createUser({user: 'alex', pwd: 'root', roles: [{role: 'readWrite', db: 'galhardoapp'}]})"
```
- Open your MongoDB GUI to connect
- mongodb+srv://admin:root@172.19.0.2

