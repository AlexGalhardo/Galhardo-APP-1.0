## Installs and Usefull Tools
- NodeJS
   - https://snapcraft.io/node
- LINUX MINT XFCE 20.2 (Ubuntu 20.04)
   - https://www.linuxmint.com/edition.php?id=290
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
- HTTP REQUESTS
   - https://www.postman.com/
   - https://insomnia.rest/download
   - https://hoppscotch.io/


## How To Use Locally with JSON DataBase
- $ git clone https://github.com/alexgalhardo/galhardo-app
- $ cd galhardo-app/
- Edit .env-example to .env and edit it with you credentials
- $ npm install
- $ npm start
   - http://localhost:3000

## How To Use Locally with MySQL and Docker
- In Development

- username: root
- server: galhardoapp_mysql

## How To Use Locally with PostgreSQL and Docker
- In Development

- $ sudo docker-compose up -d
- Go to: http://localhost:8080
   - Select PostgreSQL
   - username: postgres 
   - server: galhardoapp_postgres

## How To Use Locally with MongoDB and Docker
- In Development
```
$ sudo docker run \
    --name galhardoapp_mongodb \
    -p 27017:27017 \
    -e MONGO_INITDB_ROOT_USERNAME=admin \
    -e MONGO_INITDB_ROOT_PASSWORD=root \
    -d \
    mongo:4

$ sudo docker run \
    --name galhardoapp_mongoclient \
    -p 4000:3000 \
    --link galhardoapp_mongodb:galhardoapp_mongodb \
    -d \
    mongoclient/mongoclient

$ sudo docker exec -it galhardoapp_mongodb \
    mongo --host localhost -u admin -p root --authenticationDatabase admin \
    --eval "db.getSiblingDB('galhardoapp').createUser({user: 'alex', pwd: 'root', roles: [{role: 'readWrite', db: 'galhardoapp'}]})"
```

## API HTTP Requests
- You can use my INSOMNIA Configuration JSON with all HTTP Requests Ready to TRY
   - INSOMNIA_GALHARDOAPP_API_REQUESTS.json