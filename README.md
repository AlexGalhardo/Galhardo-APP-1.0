<div align="center">
<h1 align="center">🥤 Galhardo APP 💵</h1>
<small align="center">A Simple Web App Project for Lifetime Learning</small>
</div>

## Why This Project ? 
   - <b>"Talk is cheap. Show me the code." - Linus Torvalds</b>
   - First Commit: August 02, 2021

## Live Demo
- **Currently Version: BETA - ALMOST STABLE**
- You can access: https://galhardoapp.com/
- This live demo use "MAIN" branch
- Last updates and development are made in "DEV" branch
- You can use default TEST inputs already in forms to try 
- Dev and Main Branch are using CommonJS Module
- Test User
   - email: test@gmail.com
   - password: test123
- **IMPORTANT:**
   - **This version is FOR LEARNING, PRACTICE and TESTS PURPOSES**
   - **All transactions in this live demo are made in a SANDBOX Environment**
   - **NO REAL Money Transactions will be made**
   - **All CRUDs in this Live Demo are made in JSON DataBase, for obvious reasons.**

## PagarME Version
- **Currently Version: In Development**
- You can access: In Development
- Transactions: BRL using BRAZIL PagarME Payment API (Credit Card, Bank Slip, PIX, Checkout Transparent and using PagarME Checkout)
- Template Language: PT-BR Portuguese
- DataBase: MySQL using PURE SQL
- JavaScript Module: ES6+

## TypeScript Version
- **Currently Version: In Development**
- You can access: In Development
- Transactions: USD using USA Stripe Payment API (Credit Card, Checkout Transparent and using Stripe Checkout)
- Template Language: English
- DataBase: Postgres using PRISMA ORM
- JavaScript Module: ES6+

## Introduction
### I created this project to LEARN and PRACTICE in my spare time:
- JavaScript, JSON, NodeJS, Express, NPM, TypeScript, DOM, Git, Bootstrap5
- How to document a software
- Cookies Privacy
   - LGPD (http://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/L13709.htm)
   - GPDR (https://gdpr-info.eu/)
- NGINX (https://www.nginx.com/)
   - Reverse-Proxy, Load Balancing, Cache, Response Compression
- DevOps
   - SSH, Ports, DNS, How to configure SSL/HTTPs in a VPS, etc
- Docker and DataBases
   - MySQL, Postgres, SQLite, Redis and MongoDB
- Payments REST APIs
   - Stripe (https://stripe.com/docs/api)
      - For USD Transactions
   - PagarME (https://docs.pagar.me/docs/overview-principal)
      - For BRL and Bank Slip (Boleto Bancário) Transactions
   - PIX
   - Subscription, Ecommerce, Shop Checkouts
   - ZipCode for Shipping Address, Fee and Deadline
- Uploads Files
   - S3, Images, Gifs, Videos, etc
- Testing
   - Unit, Integration, Perfomance, etc
- Code best practices
   - MVC, 12Factor APP, ESLint, Prettier, Design Patterns, etc
- SEO
   - Google Tools, SocialMedia MetaTags, CDN, Analytics, Search Console, Sitemap, Robots.txt, etc
- Logs
   - Console, files, telegram, etc
- Security
   - OWASP, CSRF, XSS, Injection, CORS, HTTP Headers, Google Recaptcha, etc
- API RESTs
   - JWT, Oauth2, AJAX, Bearer Token, HTML Documentation, etc
- Others usefull things
   - Mobile First, WebHooks, WebSockets, Regex, Charts, SMTP, Flash Messages, Pagination, Slug, UUID, Searchs, etc
- Deploys
   - CI, CD, Heroku, Git Workflows, etc
- <b>I will be refactoring it over the years during my professional career as I develop my programming skills.</b>


## [Install Locally](https://github.com/AlexGalhardo/Galhardo-APP/blob/master/INSTALL_LOCALLY.md)
- The fastest way to install locally is using JSON DataBase
   - $ git clone https://github.com/AlexGalhardo/Galhardo-APP.git
   - $ cd Galhardo-APP
   - $ npm install OR yarn install
   - $ cp .env-example .env
   - Edit the .env file with your SECRET crendentials
   - set APP_DATABASE in .env file with JSON (APP_DATABASE=JSON)
   - $ npm run dev
- To use with DataBases and to deploy in Production, read: https://github.com/AlexGalhardo/Galhardo-APP/blob/master/INSTALL_LOCALLY.md
- <b>Install and deploy with DataBases/NGINX is in development</b>


## MicroServices
- https://galhardo-correios.herokuapp.com/cep/13560290 (zipcode here)
   - To GET ZipCode/CEP Information (Correios BRAZIL)
- https://galhardo-correios.herokuapp.com/shipping/13560290 (zipcode here)
   - To GET Shipping Deadline and Fee (Correios BRAZIL)

## DateTime
- This project uses <b>"BRASIL Brasília LocaleDateTime (BRT – Brasília Time | UTC -03:00)</b>
- Example:
   - day/month/year hours:minutes:seconds
   - 23/08/2021 15:52:36

## Folders
- views
   - emails: SMTP Emails requests
   - partials: used in pages
   - pages: main html pages responses
- tests
   - unit and integration automatic tests using jest
   - this folder don't need to go to production, used in development
- routes
   - all routes/endpoints used in app
- public
   - css, scripts, images, uploads, robots.txt, sitemap.xml public access
- models
   - all models from databases
- logs
   - logs file.txt
- helpers
   - usefull code snippets, functions, classes used in app
- docs
   - swagger api html documentation config (/api-docs)
- controllers
   - all the controllers used in app
- config
   - important app configs

## GIT Branchs
- <b>main</b> = Version to deploy in production (Use Stripe USD transactions)
- <b>dev</b> = Used for development/add new features (Use Stripe USD transactions)
- <b>pagarme</b> = Version with PagarME Payment API (BRL transactions)
- <b>api</b> = Galhardo APP API Microservice (https://api.galhardoapp.com)
- <b>api-docs</b> = API HTML Documentation (https://api-docs.galhardoapp.com)
- <b>correios</b> = Microservice for ecommerce checkout shipping zipcode, deadline, fee (https://correios.galhardoapp.com)
- <b>typescript</b> = TypeScript version using ES6+ and Prisma ORM

## Errors and Bugs
- The software throw new Error() most of the time, to catch simple/easy errors and fix them
- Promise and Async errors are handled too, to prevent Unhandled Promise Rejects and Thread Pool Errors

## HTML Templates
- <b>I like a lot to study all things about design and UX, but Front End development IS NOT my speciality
- I'm horrible programming in CSS</b>
- I'm not using Jquery, VueJS, ReactJS, Angular etc in this project
- The goal is to use vanilla/pure JavaScript as much as possible to manipulate DOM

## Payments
- This project uses 2 APIs for Payments:
   - USA Stripe for USD ($) Credit Card Transactions
   - Brasil PagarME for BRL (R$) Credit Card, Bank Slip (Boleto Bancário) and PIX Transactions
- MAIN and DEV branchs uses Stripe Payment API
- PAGARME branch uses PagarME Payment API
- To make things simpler, each user/customer can have 1 registred credit card max. User/customer need to update data in profile settings to change payments information.
- If the user is not a registered customer in stripe/pagarme yet, checkouts will automatically register customer and payment data in their first transaction.

## DataBases
- This project uses 5 DataBases <b>FOR LEARNING PURPORSES</b>:
   - JSON
   - SQLITE using Knex Query Builder
   - MySQL using pure SQL
   - PostgresSQL using Sequelize ORM
   - MongoDB using Mongoose ORM
- <b>All Databases use the SAME Model and Methods NAMES</b>.
- You can choose what DataBase you want to use like this example:
```js
const Games = require('../models/JSON/Games');
// const Games = require('../models/MONGODB/Games');
// const Games = require('../models/MYSQL/Games');
// const Games = require('../models/POSTGRES/Games');
// const Games = require('../models/SQLITE/Games');

// OR
const Games = require(`../models/${process.env.APP_DATABASE}/Games`);
// .env
APP_DATABASE=JSON

// CRUD
Games.create(gameObject) // throw new Error if not created
Games.update(gameObject) // throw new Error if not updated
Games.delete(parseInt(game_id)) // throw new Error if not deleted

Games.getAll() // return array with all game objects
Games.getByID(parseInt(game_id)) // return game object
Games.getTotal() // return integer total games
Games.getRandom() // return a random game object
```
- <b>This project will use PRISMA ORM (https://www.prisma.io/) for TypeScript, ES6+ and Production Version.</b>

## CriptoBOT
- This is a super simple bot to buy and sell bitcoin at binance to learn websockets and home broker things.
- Using TradingView Chart: https://br.tradingview.com/
- The Bitcoin Ticker 24h use WebSocket from: wss://stream.binance.com:9443/stream?streams=btcusdt@ticker
- <b>All the transactions use SANDBOX Data from endpoint:</b> https://testnet.binance.vision/api/v3/order
- Binance WebSocket documentation: https://github.com/binance/binance-spot-api-docs/blob/master/web-socket-streams.md

## Server Monitor
- You can see: https://galhardoapp.com/status for Server Monitor

## APIs
- Using RESTFull Pattern
- All Responses return JSON (I Hate XML)
- <b>Documentation</b>
   - You can see: https://api-docs.galhardoapp.com/ for INSOMNIA API HTML Documentation
   - You can see: https://galhardoapp.com/api-docs for SWAGGER API HTML Documentation
- <b>Requests</b>
   - You can import: INSOMNIA_GALHARDOAPP_API_REQUESTS.json into your Insomnia to make requests
   - You can import: POSTMAN_GALHARDOAPP_API_REQUESTS.json into your Postman to make requests
- <b>Public Endpoints Example</b>
   - BlogPosts
      - GET https://galhardoapp.com/api/public/blog
      - GET https://galhardoapp.com/api/public/blog/:blog_id
   - Games
      - GET https://galhardoapp.com/api/public/games
      - GET https://galhardoapp.com/api/public/games/random
      - GET https://galhardoapp.com/api/public/games/:game_id
   - Books
      - GET https://galhardoapp.com/api/public/books
      - GET https://galhardoapp.com/api/public/books/random
      - GET https://galhardoapp.com/api/public/books/:book_id
- <b>Profile Endpoints Example</b>
   - Each user registred can use this endpoint to update or delete his account
   - POST https://galhardoapp.com/api/profile/login
   - PATCH https://galhardoapp.com/api/profile/patch
   - DELETE https://galhardoapp.com/api/profile/delete
- <b>ADMIN Endpoints</b>
   - Need JWT Token in header authorization bearer token to access all api admin endpoints
   - ADMIN JWT Tokens expiration time: 1 hour
   - Examples:
      - POST https://galhardoapp.com/api/admin/login
         - Login into admin account to get JWT Token
      - GET https://galhardoapp.com/api/admin/stripe/subscriptions
         - Return array with all stripe subscriptions objects transactions made
   - You can use ADMIN API to
      - Manage your Stripe or PagarME Account (Transactions, Subscriptions, Create Plans, Update, etc)
      - CRUD Blog Posts, Games and Books


## RoadMap
- LOGS
   - [x] Telegram
   - [x] Files txt
   - [x] Console
- SMTP using HTML Templates
   - [x] Contact
   - [x] Shop Transactions
   - [x] Subscriptions Transactions
   - [x] Confirm Email
   - [x] Reset Password
- SECURITY
   - [ ] OWASP Top Ten (https://owasp.org/www-project-top-ten/)
   - [ ] Headers HTTP (https://helmetjs.github.io/)
   - [x] CSRF (https://owasp.org/www-community/attacks/csrf)
   - [x] Google Recaptcha (https://www.google.com/recaptcha/about/)
   - [x] CORS (https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)
   - [ ] CSP(https://content-security-policy.com/)
   - [ ] Verify All Routes/Endpoints Access
   - [ ] Validation All Requests Data
   - Two Factor Authentication
      - [ ] Email
      - [ ] SMS
      - [ ] Authenticador Code
- SEO & DIGITAL MARKETING
   - [x] Newsletter
   - [ ] Google PageSpeed Insights
   - [ ] LightHouse
   - [x] Google Search Console
   - [x] Google Analytics
   - [x] Sitemap & Robots.txt
   - [x] SocialMedia MetaTags
   - [ ] SEO Links Working Correctly
- [x] CDN (Cloudflare)
- PAYMENTS
   - Shop (Ecommerce Checkout)
      - Stripe
         - [ ] Transparent Checkout
         - [ ] Stripe Checkout
      - PagarME
         - Transparent Checkout
            - [ ] Credit Card
            - [ ] Bank Slip (Boleto Bancário)
            - [ ] PIX
         - [ ] PagarME Checkout
   - Plans (Subscriptions)
      - Stripe
         - [ ] Transparent Checkout
         - [ ] Stripe Checkout
      - PagarME Credit Card
         - [ ] Transparent Checkout
         - [ ] PagarME Checkout
- CACHE
   - [x] Compress Request Responses
   - [x] Cache GET Requests In Memory
   - [ ] Cache GET Requests in Redis
- USING JSON DATABASE
   - [x] Authentication (Login, Register, Reset Password, Confirm Email, SocialLogin)
   - [x] ADMIN ACL CRUD for Blog Posts, Games, Books and Stripe
   - [x] CRUD Games & Books Recommends
   - [x] CRUD Profile
   - [x] CRUD APIs
- WebHooks
   - [ ] Stripe
   - [ ] PagarME
- API HTML Documentation
   - [ ] INSOMNIA
   - [ ] SWAGGER
- Using MySQL DataBase with Docker and pure SQL
   - [ ] Authentication (Login, Register, Reset Password, Confirm Email, SocialLogin)
   - [ ] ADMIN ACL CRUD for Blog Posts, Games, Books and Stripe
   - [ ] CRUD Games & Books Recommends
   - [ ] CRUD Profile
   - [ ] CRUD APIs
- Using PostgreSQL DataBase with Docker and Sequelize ORM
   - [ ] Authentication (Login, Register, Reset Password, Confirm Email, SocialLogin)
   - [ ] ADMIN ACL CRUD for Blog Posts, Games, Books and Stripe
   - [ ] CRUD Games & Books Recommends
   - [ ] CRUD Profile
   - [ ] CRUD APIs
- Using SQLite DataBase with Knex Query Builder
   - [ ] Authentication (Login, Register, Reset Password, Confirm Email, SocialLogin)
   - [ ] ADMIN ACL CRUD for Blog Posts, Games, Books and Stripe
   - [ ] CRUD Games & Books Recommends
   - [ ] CRUD Profile
   - [ ] CRUD APIs
- Using MongoDB DataBase with Docker and Mongoose ORM
   - [ ] Authentication (Login, Register, Reset Password, Confirm Email, SocialLogin)
   - [ ] ADMIN ACL CRUD for Blog Posts, Games, Books and Stripe
   - [ ] CRUD Games & Books Recommends
   - [ ] CRUD Profile
   - [ ] CRUD APIs
- TESTING
   - [ ] 100% unit tests coverage using Jest
   - [ ] 100% integration tests coverage using Jest
- DEPLOY ON A VPS
   - [ ] Using SQL or MongoDB
   - [ ] Using NGINX as Reverse Proxy
   - [ ] Using NGINX as Load Balancing
   - [ ] Using NGINX Cache and Compression
   - [ ] Using My Own Domain
   - [ ] Configure SSL/HTTPS in VPS (https://certbot.eff.org/)
- [ ] MAKE THE API A MICROSERVICE
   - Using: https://api.galhardoapp.com
   - Create a branch "api" for this microservice
- [ ] TYPESCRIPT VERSION
   - After previous goals are complete, create a branch "typescript" and refactor the code using Typescript and ES6+

## Some APP Images



### Games
![ga_home](https://user-images.githubusercontent.com/19540357/137158866-daaef218-64a4-4e46-8bee-edeea3524f26.png)


### Books
![ga_books](https://user-images.githubusercontent.com/19540357/137158882-3c8200ae-7e07-495e-a43a-accc39e5cb67.png)


### SHOP
![ga_shop_1](https://user-images.githubusercontent.com/19540357/131276355-3d687e16-fa43-457b-8c42-55ad04514196.png)
![ga_shop_1_cardRegistred](https://user-images.githubusercontent.com/19540357/133533018-66b543e9-2884-4fec-991a-50a79e7d3473.png)
![ga_shop_2](https://user-images.githubusercontent.com/19540357/131276356-c5d3733e-8d62-46d7-a6d7-9fc14e368350.png)
![ga_shop_3](https://user-images.githubusercontent.com/19540357/131276360-477d23c2-4f3f-4c9c-abab-a8e58ed0d9b8.png)
![ga_shop_4](https://user-images.githubusercontent.com/19540357/131276370-52cb4ef6-3f8c-402d-a6e8-ebe16850ad0a.png)
![ga_stripe_checkout](https://user-images.githubusercontent.com/19540357/137163262-034c54a6-ab89-416d-a525-86579ccefae2.png)


### Subscription
![ga_plans_1](https://user-images.githubusercontent.com/19540357/137158854-b3099715-90b8-4de6-b8a2-0103bc0c4ad1.png)
![ga_plans_2](https://user-images.githubusercontent.com/19540357/137158859-da0fb9e9-83d5-4023-831c-76778f073fb2.png)
![ga_plans_3](https://user-images.githubusercontent.com/19540357/137158848-9fa2f4ab-042a-495c-800b-ce2f2368a234.png)
![ga_plans_checkout](https://user-images.githubusercontent.com/19540357/137158870-e38bbae1-cb97-4759-8225-73c0c7fd9b47.png)
![ga_subs_checkout_card_registred](https://user-images.githubusercontent.com/19540357/131592478-55d78666-00c2-4763-b697-dd204f3d183a.png)
![ga_subscription_log](https://user-images.githubusercontent.com/19540357/133533167-12f42c63-8acd-4dee-a8c9-64448fc41729.png)
![ga_subs_email](https://user-images.githubusercontent.com/19540357/131592487-849e67cf-780b-4905-9275-e8fa3cf60e0b.png)

## Cripto BOT
![ga_criptobot_view](https://user-images.githubusercontent.com/19540357/132063993-50222a86-a312-4b84-9a75-cbe2de580bf7.png)
![ga_cripto_bot](https://user-images.githubusercontent.com/19540357/132064282-1d45336f-c20b-44cd-aef5-b20abde224bc.png)


## Contact
![ga_contact_1](https://user-images.githubusercontent.com/19540357/137158872-9679db65-6fa4-4a90-89c7-6875eb0150cf.png)
![ga_contact_2](https://user-images.githubusercontent.com/19540357/137158876-6b679e89-79c1-4362-a1da-0a78da7f78ce.png)
![ga_message_log](https://user-images.githubusercontent.com/19540357/131276348-baf084e6-23d7-48d5-9fa6-0ff2bdd30236.png)

### AuthController
![ga_login](https://user-images.githubusercontent.com/19540357/137158864-306f4b81-b723-48eb-8e53-4b35be966899.png)
![ga_google](https://user-images.githubusercontent.com/19540357/130067660-c50adabf-7b75-4f4f-a871-4532294ace4b.png)
![ga_register_github](https://user-images.githubusercontent.com/19540357/130067666-04018b3f-e900-4b69-be2c-bb6bc7768416.png)
![ga_register](https://user-images.githubusercontent.com/19540357/132408607-4e868c73-622f-4812-a62a-89fb7a78f4ea.png)
![ga_account_created](https://user-images.githubusercontent.com/19540357/131276342-7ecd924c-a877-4c6a-9e51-6c4a11f7335e.png)
![ga_recoverpassword_view](https://user-images.githubusercontent.com/19540357/131276368-780e8880-ad49-479c-85ec-ecf4dde06d94.png)
![ga_recover_password](https://user-images.githubusercontent.com/19540357/131276363-a56ab9fd-7ac1-491a-985f-9684c5fdc5bf.png)

## Projects
![ga_projects](https://user-images.githubusercontent.com/19540357/137158850-6dc2674a-a017-4b66-99de-6155f33662c6.png)

## Bank
![ga_bank](https://user-images.githubusercontent.com/19540357/137158843-ddeb295d-e3a3-4078-b535-032779e3d9cc.png)

## ToDo
![ga_todo](https://user-images.githubusercontent.com/19540357/137159748-c56bab79-a467-4007-bf0c-06499b0974f3.png)

### Blog
![ga_blog](https://user-images.githubusercontent.com/19540357/137159589-a93c3874-577e-4c97-98ed-ae681942d6a2.png)
![ga_blog_post_1](https://user-images.githubusercontent.com/19540357/137158860-25d19f0f-21eb-4d22-afcf-26757ca9927d.png)
![ga_blog_post_2](https://user-images.githubusercontent.com/19540357/137158865-848229c4-d188-429e-8320-e500baf53a0e.png)
![ga_blog_comment_1](https://user-images.githubusercontent.com/19540357/130067633-96702bac-a9b9-40a4-9af1-30d44da1c827.png)
![ga_blog_comment_2](https://user-images.githubusercontent.com/19540357/130067642-fb771181-f73e-47f8-93f4-7a64d51af7e4.png)
![ga_blog_disqus](https://user-images.githubusercontent.com/19540357/131751707-33180158-b8e5-4ed6-a728-48ed7cefbeb8.png)
![ga_admin_update_blogpost](https://user-images.githubusercontent.com/19540357/129276418-4444a071-90fe-4f2b-9e74-6fc26d3aad0b.png)

### TELEGRAM LOGS
![ga_log_shop_telegram](https://user-images.githubusercontent.com/19540357/131592495-055c04d0-734a-43cb-b199-190bca0965a6.png)
![ga_subs_log_telegram](https://user-images.githubusercontent.com/19540357/131592483-d0a03286-6444-448b-9def-27962978b56c.png)

### Profile
![ga_profile_1](https://user-images.githubusercontent.com/19540357/133532979-f33f57f4-77b5-49cf-9167-5fa4ae821d82.png)
![ga_profile_2](https://user-images.githubusercontent.com/19540357/129701714-92dc33ea-adcb-45e6-a9d0-a6f5054a999a.png)
![ga_my_shop_transactions](https://user-images.githubusercontent.com/19540357/131751715-3278087b-2a83-4d17-b0f1-3e98ec708832.png)
![ga_profile_shop_log](https://user-images.githubusercontent.com/19540357/131751719-4d3cf88f-1b87-4ba0-a72d-a307a2127fea.png)
![ga_my_subs_transactions](https://user-images.githubusercontent.com/19540357/131751711-23d60fee-bd23-406c-a356-369d36b90f7f.png)
![ga_my_sub_transaction](https://user-images.githubusercontent.com/19540357/131751738-9ff5a376-c267-4888-a951-717089a5511c.png)

### ADMIN VIEWs
![ga_stripe_customers](https://user-images.githubusercontent.com/19540357/129276423-53d02a50-b70b-47d1-b64c-a9c84d07a30c.png)
![ga_admin_update_game](https://user-images.githubusercontent.com/19540357/129276424-91aab56a-125d-43a8-985a-cd2bbf387e12.png)

## Server Monitor
![ga_monitor_status](https://user-images.githubusercontent.com/19540357/132106414-f70b0d30-bd2b-451e-9ac8-500192c29c19.png)
![ga_monitor_status_2](https://user-images.githubusercontent.com/19540357/132106418-9cd403c6-3aab-4790-9499-a956a1b133a8.png)

### Simple REST APIs
![ga_insomnia_site](https://user-images.githubusercontent.com/19540357/129701712-422efd6b-2522-43af-b11f-7652126c834b.png)
![ga_api_public_games](https://user-images.githubusercontent.com/19540357/129276429-af7341c2-eabe-4c4a-85a2-d6546add0a54.png)
![ga_insomnia_jwt](https://user-images.githubusercontent.com/19540357/129701701-a7565b7f-e121-4cdf-9246-03055dd707d5.png)
![ga_insomnia_api](https://user-images.githubusercontent.com/19540357/129701706-1df154ce-6f2a-4255-8bc0-af0d2687954c.png)
![ga_insomnia_create_game](https://user-images.githubusercontent.com/19540357/129701707-b4a0fa16-5088-4246-8f48-a43a6e661eb8.png)



## JSON (and SQL/MongoDB) DATABASE STRUCTURE EXAMPLE
```json
{
  "users": [
    {
      "id": "13667f62-03d6-4b46-bd22-0bbf2a3b89d2",
      "name": "Test Jack",
      "email": "test@gmail.com",
      "confirmed_email": true,
      "confirm_email_token": null,
      "password": "$2b$12$qmFqKwOkAfdQLy04VBtOLObd6FUU7H2P3XKa1f95JbKlLgjyOy4kG",
      "reset_password_token": null,
      "admin": false,
      "avatar": "13667f62-03d6-4b46-bd22-0bbf2a3b89d2_alex.jpeg",
      "document": "44557777777",
      "phone": "18999999999",
      "birth_date": "2021-08-05",
      "google_id": null,
      "github_id": null,
      "facebook_id": null,
      "address": {
        "zipcode": "13560290",
        "street": "Rua Avenida Paulista",
        "street_number": "42",
        "neighborhood": "Bairro Chique",
        "city": "Sao Paulo",
        "state": "SP",
        "country": "BRAZIL"
      },
      "stripe": {
        "customer_id": "cus_K15RnWHRhUA0HF",
        "card_token_id": "tok_1JN3UBBD6lhzYmkOV3LcL9cX",
        "card_id": "card_1JN3UBBD6lhzYmkO7W8rsCO3",
        "card_holder_name": "Alex Galhardo",
        "card_last_4_digits": "4242",
        "card_exp_month": "07",
        "card_exp_year": 2022,
        "currently_subscription_id": "sub_K162ez3Perblxs",
        "currently_subscription_name": "PREMIUM",
        "subscription_start": "10/08/2021 19:54:32",
        "subscription_end": "10/09/2021 19:54:32",
        "subscription_automatically_renew": true
      },
      "created_at": "09/08/2021 03:52:14",
      "updated_at": "11/08/2021 04:04:17"
    }
  ],
  "blog": [
    {
      "id": 1,
      "title": "Why Simpsons Is So Succesfull?",
      "resume": "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.",
      "image": "https://picsum.photos/id/1/230/230",
      "category": "software",
      "body": "<p>What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>\r\n\r\n<img src='https://observatoriodocinema.uol.com.br/wp-content/uploads/2020/05/Os-Simpsons.jpg' class='w-100 image-fluid'>\r\n\r\n<p>What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.<p>",
      "updated_at": "12/08/2021 18:49:33",
      "slug": "why-simpsons-is-so-succesfull",
      "created_at": "04/08/2021 18:35:09",
      "comments": [
        {
          "user_id": "13667f62-03d6-4b46-bd22-0bbf2a3b89d2",
          "user_logged_can_delete": true,
          "user_name": "Test Jack",
          "user_avatar": "13667f62-03d6-4b46-bd22-0bbf2a3b89d2_avatar.png",
          "comment": "new comment",
          "created_at": "12/08/2021 02:50:24",
          "comment_id": 1
        },
        {
          "user_id": "13667f62-03d6-4b46-bd22-01nasookas12",
          "user_logged_can_delete": true,
          "user_name": "ADMIN Akex",
          "user_avatar": "13667f62-03d6-4b46-bd22-01nasookas12_avatar.png",
          "comment": "New comment test 2",
          "created_at": "12/08/2021 18:49:51",
          "comment_id": 2
        }
      ]
    }
  ],
  "games": [
    {
      "id": 1,
      "title": "God Of War",
      "year_release": 2018,
      "resume": "It is a new beginning for Kratos. Living as a man, outside the shadow of the gods, he seeks solitude in the unfamiliar lands of Norse mythology. With new purpose and his son at his side, Kratos must fight for survival as powerful forces threaten to disrupt the new life he has created...",
      "image": "https://images.igdb.com/igdb/image/upload/t_cover_big/co1tmu.jpg",
      "igdb_link": "https://www.igdb.com/games/god-of-war--1",
      "igdb_rating": 9.5,
      "platforms": "PS4, PS5",
      "developer": "Santa M�nica Studios",
      "genres": "Action, Third Person, Adventure, Hack and slash/Beat 'em up",
      "amazon_link": "https://www.amazon.com.br/God-War-Padr%C3%A3o-PlayStation-4/dp/B079581SQQ",
      "recommend": 4567,
      "not_recommend": 231,
      "created_at": "04/08/2021 18:35:09",
      "updated_at": "04/08/2021 18:55:16"
    }
  ],
  "games_recommendations": [
    {
      "user_id": "7f9c1c22-98f6-4472-a031-d027b7196ba9",
      "game_id": 10,
      "user_recommend": false,
      "user_not_recommend": true
    },
  ],
  "books": [
    {
      "id": 1,
      "title": "Sapiens - Uma Breve História da Humanidade",
      "year_release": 2014,
      "image": "https://images-na.ssl-images-amazon.com/images/I/51fuvXO6wvL._SX346_BO1,204,203,200_.jpg",
      "amazon_link": "https://www.amazon.com.br/Sapiens-Uma-Breve-Hist%C3%B3ria-Humanidade/dp/8525432180",
      "resume": "O que possibilitou ao Homo sapiens subjugar as demais espécies? O que nos torna capazes das mais belas obras de arte, dos avanços científicos mais impensáveis e das mais horripilantes guerras? Nossa capacidade imaginativa. Somos a única espécie que acredita em coisas que não existem na natureza, como Estados, dinheiro e direitos humanos. Partindo dessa ideia, Yuval Noah Harari, doutor em história pela Universidade de Oxford, aborda em Sapiens a história da humanidade sob uma perspectiva inovadora. Explica que o capitalismo é a mais bem-sucedida religião, que o imperialismo é o sistema político mais lucrativo, que nós, humanos modernos, embora sejamos muito mais poderosos que nossos ancestrais, provavelmente não somos mais felizes. Um relato eletrizante sobre a aventura de nossa extraordinária espécie, de primatas insignificantes a senhores do mundo.",
      "pages": 464,
      "genres": "Historic",
      "author": "Yuval Noah Harari ",
      "recommend": 789,
      "not_recommend": 456,
      "updated_at": "11/08/2021 20:36:33",
      "created_at": "11/08/2021 20:36:33"
    }
  ],
  "books_recommendations": [
    {
      "user_id": "13667f62-03d6-4b46-bd22-0bbf2a3b89d2",
      "book_id": 3,
      "user_recommend": true,
      "user_not_recommend": false
    },
  ],
  "stripe": {
    "shop_transactions": [
        {
        "total_amount": "33.46",
        "payment_method": {
            "card_id": "card_1JTzSZHoneB4Zvrp4p9pMX7p",
            "brand": "Visa",
            "exp_month": 8,
            "exp_year": 2022,
            "last4": "4242"
        },
        "currency": "usd",
        "paid": true,
        "products_amount": "6.46",
        "products": [
            {
                "quantity": "1",
                "name": "Oranges",
                "total": "0.49"
            },
            {
                "quantity": "1",
                "name": "Grapes",
                "total": "0.99"
            },
            {
                "quantity": "1",
                "name": "Apples",
                "total": "1.99"
            },
            {
                "quantity": "1",
                "name": "Bananas",
                "total": "2.99"
            }
        ],
        "customer": {
            "id": "7f9c1c22-98f6-4472-a031-d027b7196ba9",
            "stripe_id": "cus_K3keRif5hEPSI2",
            "email": "admin@gmail.com",
            "phone": "18999999999",
            "name": "ADMIN Alex"
        },
        "shipping": {
            "address_zipcode": "13560290",
            "address_street": "Rua Dona Alexandrina",
            "address_street_number": 42,
            "address_city": "São Carlos",
            "address_state": "SP",
            "address_country": "Brazil",
            "carrier": "Correios",
            "fee": "27.00"
        },
        "created_at": "29/08/2021 22:38:53"
      }
    ],
    "subscriptions_transactions": [
        {
        "created_at": "31/08/2021 21:12:22",
        "transaction_id": "sub_K8z27OGjrhDujS",
        "status": "active",
        "payment_method": "card_1JUgN3HoneB4ZvrpIbVTJvEv",
        "current_period_start": "31/08/2021 21:12:19",
        "current_period_end": "30/09/2021 21:12:19",
        "cancel_at_period_end": false,
        "plan": {
          "id": "price_1JUfS6HoneB4ZvrpSFzvXhXN",
          "name": "STARTER",
          "amount": 199
        },
        "customer": {
          "id": "7f9c1c22-98f6-4472-a031-d027b7196ba9",
          "stripe_id": "cus_K8y63RgFsRst7l",
          "email": "admin@gmail.com",
          "name": "ADMIN Alex"
        }
      }
    ]
  }
}
```

## Feedbacks
- If you have any feedback or improvements tips about this project, send a pull request or send me a email at: aleexgvieira@gmail.com
- I really apreciate good feedbacks

## License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2021-present, Alex Galhardo
