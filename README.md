<br>
<h1 align="center">⭐ Galhardo APP 💵</h1>

## Live Demo
- You can access: https://galhardo-app.herokuapp.com/
- You can use default TEST inputs already in forms to try 
- Test User
   - email: test@gmail.com
   - password: test123
- In this live demo, you can't do ADMIN actions. Install locally to try ADMIN.
- **IMPORTANT:**
   - **All transactions in this live demo use my SK_TEST DEVELOPMENT Stripe KEY**
   - **NO REAL Money Transactions will be made**
   - **All CRUDs in Heroku Live Demo are made in JSON DataBase, for obvious reasons.**

## Subdomains
- https://galhardo-correios.herokuapp.com/cep/13560290 (zipcode here)
   - To get ZipCode/CEP Information
- https://galhardo-correios.herokuapp.com/shipping/13560290 (zipcode here)
   - To get Shipping Deadline and Fee
- https://galhardoapp-json-database.herokuapp.com/
   - To view JSON DataBase

## [Project Introduction / Install Locally](https://github.com/AlexGalhardo/Galhardo-APP/blob/master/INTRODUCTION.md)


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
- ADMIN API REST using JWT
   - [ ] For Blog Posts (Create, Update, Delete)
   - [ ] For Stripe (Create, Update, Delete, Cancel)
   - [ ] For Games and Books (Create, Update, Delete)
- Deploy on AWS LightSail
   - [ ] Using MySQL or MongoDB
   - [ ] Using NGINX as Reverse Proxy
   - [ ] Using NGINX as Load Balancing
   - [ ] Using NGINX Cache and Compression
   - [ ] Using my own domain
   - [ ] Configure SSL/HTTPS in VPS
- TypeScript Version
   - [ ] After previous goals are complete, create a branch "typescript" and refactor the code using Typescript

## Some Images
![ga_home](https://user-images.githubusercontent.com/19540357/128649484-4ea2b8c1-73ae-40e9-b4af-ef05dc7e11fb.png)
![ga_books](https://user-images.githubusercontent.com/19540357/128649548-3cc385c7-a776-4d42-ae6b-6a01223e41c8.png)

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
![ga_blog](https://user-images.githubusercontent.com/19540357/128649488-d9536d35-28e1-41bb-91d9-700b7f92f7db.png)
![ga_blog_post](https://user-images.githubusercontent.com/19540357/128649489-701d39db-0acf-4c58-8cba-24ec5b2b69a6.png)

### Profile
![ga_profile](https://user-images.githubusercontent.com/19540357/128649496-ff6721c2-f9f4-4884-9a30-dd564a713920.png)



## License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2021-present, Alex Galhardo
