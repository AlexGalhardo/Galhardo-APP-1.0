<div align="center">
<h1 align="center">⭐ Galhardo APP 💵</h1>
<small align="center">A Simple Web App Project for Lifetime Learning</small>
</div>

## Live Demo
- **Currently Version: ALPHA - NOT STABLE**
- You can access: https://galhardoapp.com/
- You can use default TEST inputs already in forms to try 
- Test User
   - email: test@gmail.com
   - password: test123
- **IMPORTANT:**
   - **All transactions in this live demo use my SK_TEST DEVELOPMENT Stripe KEY in SANDBOX Environment**
   - **NO REAL Money Transactions will be made**
   - **All CRUDs in this Live Demo are made in JSON DataBase, for obvious reasons.**

## Subdomains
- https://correios.galhardoapp.com/cep/13560290 (zipcode here)
   - To GET ZipCode/CEP Information (Correios BRAZIL)
- https://correios.galhardoapp.com/shipping/13560290 (zipcode here)
   - To GET Shipping Deadline and Fee (Correios BRAZIL)

## APIs
- **IMPORTANT: You can see: https://api-docs.galhardoapp.com/ for API HTML Documentation**
### Public REST APIs Endpoints Examples
- BlogPosts
   - GET https://galhardoapp.com/api/public/blog
   - GET https://galhardoapp.com/api/public/blog/random
   - GET https://galhardoapp.com/api/public/blog/:blog_id
- Games
   - GET https://galhardoapp.com/api/public/games
   - GET https://galhardoapp.com/api/public/games/random
   - GET https://galhardoapp.com/api/public/games/:game_id
- Books
   - GET https://galhardoapp.com/api/public/books
   - GET https://galhardoapp.com/api/public/books/random
   - GET https://galhardoapp.com/api/public/books/:book_id

### Profile REST API Endpoints Examples
- Each user registred can use this endpoint to update or delete his account
- POST https://galhardoapp.com/api/profile/login
- PATCH https://galhardoapp.com/api/profile/patch
- DELETE https://galhardoapp.com/api/profile/delete

### ADMIN REST APIs Endpoints Examples
- Need JWT Token in header authorization bearer token to access all endpoints
- Examples:
   - POST https://galhardoapp.com/api/admin/login
   - POST https://galhardoapp.com/api/admin/test
   - GET https://galhardoapp.com/api/admin/users
- You can use ADMIN API to 
   - Manage your Stripe Account (Transactions, Subscriptions, Create Plans, Update, etc)
   - CRUD Blog Posts, Games and Books

## Introduction
### I created this project to LEARN and PRATICE in my spare time:
- JavaScript, JSON, NodeJS, Express, NPM, TypeScript, DOM, Git, Bootstrap5
- How to document a software
- Cookies Privacy
   - LGPD & GPDR
- NGINX
   - Reverse-Proxy, Load Balancing, Cache, Response Compression
- AWS
   - DevOps, DNS, How to configure SSL/HTTPs in a VPS, etc
- Docker
   - For MySQL and MongoDB
- Payment REST API
   - Stripe for USD & PagarME for BRL
   - Subscription, Ecommerce, Shop Checkouts
   - ZipCode for Shipping Address, Fee and Deadline
- Testing
   - Jest
- Code best practices
   - MVC, CRUDs, ESLint, Prettier, Design Patterns, etc
- Google Tools
   - SEO, CDN, Analytics, Search Console, Sitemap, Robots.txt, etc
- Logs
   - Console, files, telegram, etc
- API RESTs
   - JWT, Oauth2, AJAX, Bearer Token, HTML Documentation, etc
- Others usefull things
   - Mobile First, Regex, SMTP, Flash Messages, Pagination, Slug, UUID, Searchs, etc
- Deploys
   - CI, CD, Heroku, Git Workflows, etc
- <b>I will be refactoring it over the years during my professional career as I develop my programming skills.</b>


## [Install Locally](https://github.com/AlexGalhardo/Galhardo-APP/blob/master/INSTALL_LOCALLY.md)


## RoadMap
- Logs using Winston and Morgan
   - [ ] Telegram
   - [ ] Files txt
   - [ ] Console
- SMTP using HTML Templates
   - [ ] Contact
   - [ ] Shop Transactions
   - [ ] Subscriptions Transactions
   - [ ] Confirm Email
   - [ ] Reset Password 
- [ ] In Code Compression Responses (HTML, JS, CSS)
- [ ] In Code Cache Most used data (Redis and In-Memory)
- [ ] Google Tools (SEO, Search Console, Analytics, Sitemap, Robots.txt, etc)
- [x] CDN (Cloudflare)
- [x] API HTML Documentation Using Insomnia Documenter
- Using JSON DataBase 
   - [x] Authentication (Login, Register, Reset Password, Confirm Email, SocialLogin)
   - [x] ADMIN ACL for Blog Posts (Create, Update, Delete)
   - [x] (CREATE, READ, DELETE) Blog Comments
   - [x] ADMIN ACL for Stripe (Create, Update, Delete, Cancel)
   - [x] ADMIN ACL for Games and Books (Create, Update, Delete)
   - [x] CRUD Profile
   - [x] CRUD APIs
- Using MySQL DataBase with Docker and pure SQL
   - [ ] Authentication (Login, Register, Reset Password, Confirm Email, SocialLogin)
   - [ ] ADMIN ACL for Blog Posts (Create, Update, Delete)
   - [ ] (CREATE, READ, DELETE) Blog Comments
   - [ ] ADMIN ACL for Stripe (Create, Update, Delete, Cancel)
   - [ ] ADMIN ACL for Games and Books (Create, Update, Delete)
   - [ ] CRUD Profile
   - [ ] CRUD APIs
- Using PostgreSQL DataBase with Docker and Sequelize ORM
   - [ ] Authentication (Login, Register, Reset Password, Confirm Email, SocialLogin)
   - [ ] ADMIN ACL for Blog Posts (Create, Update, Delete)
   - [ ] (CREATE, READ, DELETE) Blog Comments
   - [ ] ADMIN ACL for Stripe (Create, Update, Delete, Cancel)
   - [ ] ADMIN ACL for Games and Books (Create, Update, Delete)
   - [ ] CRUD Profile
   - [ ] CRUD APIs
- Using MongoDB DataBase with Docker and Mongoose ORM
   - [ ] Authentication (Login, Register, Reset Password, Confirm Email, SocialLogin)
   - [ ] ADMIN ACL for Blog Posts (Create, Update, Delete)
   - [ ] (CREATE, READ, DELETE) Blog Comments
   - [ ] ADMIN ACL for Stripe (Create, Update, Delete, Cancel)
   - [ ] ADMIN ACL for Games and Books (Create, Update, Delete)
   - [ ] CRUD Profile
   - [ ] CRUD APIs
- Deploy on AWS LightSail
   - [ ] Using SQL or MongoDB
   - [ ] Using NGINX as Reverse Proxy
   - [ ] Using NGINX as Load Balancing
   - [ ] Using NGINX Cache and Compression
   - [ ] Using my own domain
   - [ ] Configure SSL/HTTPS in VPS
- [ ] TypeScript Version
   - After previous goals are complete, create a branch "typescript" and refactor the code using Typescript
- [ ] Make the API a Microservice
   - Using: https://api.galhardoapp.com
   - Create a branch "api" for this microservice

## Some APP Images

### Games
![ga_home](https://user-images.githubusercontent.com/19540357/129276444-830fa647-5414-44ef-bf34-2a3bb24b3ccd.png)

### Books
![ga_books](https://user-images.githubusercontent.com/19540357/129276417-8b22e199-fa74-4c8d-86a9-ba9870971b22.png)

### SHOP
![ga_shop](https://user-images.githubusercontent.com/19540357/128649497-41ec6054-27f6-446e-87a5-0b3279793382.png)
![ga_shop_log](https://user-images.githubusercontent.com/19540357/128649498-52b632e9-39f0-4389-87e4-3a9376657832.png)

### Subscription
![ga_plans](https://user-images.githubusercontent.com/19540357/128649491-ab2a9c36-e3bf-45cf-9768-6bd781e502e7.png)
![ga_plan_checkout](https://user-images.githubusercontent.com/19540357/128649492-a9011598-f460-40f7-8289-513430228c9b.png)
![ga_plan_log](https://user-images.githubusercontent.com/19540357/128649493-fb32d152-8f84-4a5b-84eb-74047b54b138.png)

### AuthController
![ga_login](https://user-images.githubusercontent.com/19540357/128446082-32d21dda-9794-428d-a8f2-f6f6475aced7.png)
![ga_register](https://user-images.githubusercontent.com/19540357/128446078-671db5e9-064c-4458-941f-a6cf15e39d49.png)
![ga_forgetPassword](https://user-images.githubusercontent.com/19540357/128446079-b6fc9f98-ea0f-4906-8d85-c581b554dee3.png)
![ga_resetPassword](https://user-images.githubusercontent.com/19540357/128446080-afa13a81-34be-4a74-9b8d-3cbc8688e0eb.png)

### Blog
![ga_blog](https://user-images.githubusercontent.com/19540357/129276413-93b7a40c-f8f5-4bb9-b1cc-df5df78b73da.png)
![ga_blog_post](https://user-images.githubusercontent.com/19540357/129276447-239ae567-4c74-46c1-8c0d-fda16449456a.png)
![ga_admin_update_blogpost](https://user-images.githubusercontent.com/19540357/129276418-4444a071-90fe-4f2b-9e74-6fc26d3aad0b.png)

### Profile
![ga_profile_1](https://user-images.githubusercontent.com/19540357/129701716-bd679910-e1ce-42e5-9cae-e39f3003da28.png)
![ga_profile_2](https://user-images.githubusercontent.com/19540357/129701714-92dc33ea-adcb-45e6-a9d0-a6f5054a999a.png)

### ADMIN VIEWs
![ga_stripe_customers](https://user-images.githubusercontent.com/19540357/129276423-53d02a50-b70b-47d1-b64c-a9c84d07a30c.png)
![ga_admin_update_game](https://user-images.githubusercontent.com/19540357/129276424-91aab56a-125d-43a8-985a-cd2bbf387e12.png)

### Simple REST APIs
![ga_insomnia_site](https://user-images.githubusercontent.com/19540357/129701712-422efd6b-2522-43af-b11f-7652126c834b.png)
![ga_api_public_games](https://user-images.githubusercontent.com/19540357/129276429-af7341c2-eabe-4c4a-85a2-d6546add0a54.png)
![ga_insomnia_jwt](https://user-images.githubusercontent.com/19540357/129701701-a7565b7f-e121-4cdf-9246-03055dd707d5.png)
![ga_insomnia_api](https://user-images.githubusercontent.com/19540357/129701706-1df154ce-6f2a-4255-8bc0-af0d2687954c.png)
![ga_insomnia_create_game](https://user-images.githubusercontent.com/19540357/129701707-b4a0fa16-5088-4246-8f48-a43a6e661eb8.png)


## Feedbacks
- If you have any feedback or improvements tips about this project, send a pull request or send me a email at: aleexgvieira@gmail.com
- I really apreciate good feedbacks

## License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2021-present, Alex Galhardo
