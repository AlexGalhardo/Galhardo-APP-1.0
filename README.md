<br>
<h1 align="center">⭐ Galhardo APP 💵</h1>

## Live Demo
- You can access: https://galhardoapp.com/
- You can use default TEST inputs already in forms to try 
- Test User
   - email: test@gmail.com
   - password: test123
- **IMPORTANT:**
   - **All transactions in this live demo use my SK_TEST DEVELOPMENT Stripe KEY**
   - **NO REAL Money Transactions will be made**
   - **All CRUDs in Heroku Live Demo are made in JSON DataBase, for obvious reasons.**

## Subdomains
- https://correios.galhardoapp.com/cep/13560290 (zipcode here)
   - To get ZipCode/CEP Information
- https://correios.galhardoapp.com/shipping/13560290 (zipcode here)
   - To get Shipping Deadline and Fee
- https://json-database.galhardoapp.com/
   - To view JSON DataBase


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
   - Mobile First, SMTP, Flash Messages, Pagination, Slug, UUID, Searchs, etc
- Deploys
   - CI, CD, Heroku, Git Workflows, etc
- <b>I will be refactoring it over the years during my professional career as I develop my programming skills.</b>


## [Install Locally](https://github.com/AlexGalhardo/Galhardo-APP/blob/master/INSTALL_LOCALLY.md)


## RoadMap
- [ ] Telegram Logs
- [ ] Winston And Morgan File/Console Logs
- [ ] In Code Compression Responses
- [ ] In Code Cache Most used data
- [x] Contact SMTP 
- [ ] Confirm Email/Forget Password using SMTP
- [ ] Confirm Email / Forget Password using SMTP
- [ ] Subscriptions Transactions using SMTP (Email HTML Template)
- [ ] Shop Transactions using SMTP (Email HTML Template)
- [ ] Google Tools (SEO, Search Console, Analytics, Sitemap, Robots.txt, etc)
- [ ] CDN (Cloudflare)
- JSON DataBase 
   - [x] Register and Login Account using Session
   - [ ] Register and Login using SocialLogin (Github, Facebook, Google)
   - [ ] ADMIN ACL for Blog Posts (Create, Update, Delete)
   - [x] ADMIN ACL for Stripe (Create, Update, Delete, Cancel)
   - [ ] ADMIN ACL for Games and Books (Create, Update, Delete)
   - [x] CRUD Profile
   - [ ] (CREATE, READ, DELETE) Blog Comments
- MySQL DataBase using Docker
   - [ ] Register and Login Account using Session
   - [ ] Register and Login using SocialLogin (Github, Facebook, Google)
   - [ ] ADMIN ACL for Blog Posts (Create, Update, Delete)
   - [ ] ADMIN ACL for Stripe (Create, Update, Delete, Cancel)
   - [ ] ADMIN ACL for Games and Books (Create, Update, Delete)
   - [ ] CRUD Profile
   - [ ] (CREATE, READ, DELETE) Blog Comments
- MongoDB DataBase using Docker
   - [ ] Register and Login Account using Session
   - [ ] Register and Login using SocialLogin (Github, Facebook, Google)
   - [ ] ADMIN ACL for Blog Posts (Create, Update, Delete)
   - [ ] ADMIN ACL for Stripe (Create, Update, Delete, Cancel)
   - [ ] ADMIN ACL for Games and Books (Create, Update, Delete)
   - [ ] CRUD Profile
   - [ ] (CREATE, READ, DELETE) Blog Comments
- GALHARDO APP API
   - [ ] GET/READ only Public APIs for BlogPosts, Games, Books
   - [ ] ADMIN JWT For Blog Posts (Create, Update, Delete)
   - [ ] ADMIN JWT For Stripe (Read, Create, Update, Delete, Cancel)
   - [ ] ADMIN JWT For Games and Books (Create, Update, Delete)
   - [x] API HTML Documentation Using Insomnia Documenter
- Deploy on AWS LightSail
   - [ ] Using MySQL or MongoDB
   - [ ] Using NGINX as Reverse Proxy
   - [ ] Using NGINX as Load Balancing
   - [ ] Using NGINX Cache and Compression
   - [ ] Using my own domain
   - [ ] Configure SSL/HTTPS in VPS
- TypeScript Version
   - [ ] After previous goals are complete, create a branch "typescript" and refactor the code using Typescript

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
![ga_profile_1](https://user-images.githubusercontent.com/19540357/129276420-fb32a955-e8b1-4117-a085-17435879d6a4.png)
![ga_profile_2](https://user-images.githubusercontent.com/19540357/129276422-81f66dce-51e2-48e5-8c52-1413c3735a78.png)

### ADMIN VIEWs
![ga_stripe_customers](https://user-images.githubusercontent.com/19540357/129276423-53d02a50-b70b-47d1-b64c-a9c84d07a30c.png)
![ga_admin_update_game](https://user-images.githubusercontent.com/19540357/129276424-91aab56a-125d-43a8-985a-cd2bbf387e12.png)

### Simple APIs
![ga_api_admin](https://user-images.githubusercontent.com/19540357/129276426-fd4acfe5-725f-473f-ab90-729ed5a1675a.png)
![ga_api_public_games](https://user-images.githubusercontent.com/19540357/129276429-af7341c2-eabe-4c4a-85a2-d6546add0a54.png)


## Feedbacks
- If you have any feedback or improvements tips about this project, send a pull request or send me a email at: aleexgvieira@gmail.com
- I really apreciate good feedbacks

## License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2021-present, Alex Galhardo
