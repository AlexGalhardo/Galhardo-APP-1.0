<div align="center">
<h1 align="center">⭐ Galhardo APP 💵</h1>
<small align="center">A Simple Web App Project for Lifetime Learning</small>
</div>

## Why This Project ? 
   - <b>"Talk is cheap. Show me the code." - Linus Torvalds</b>
   - First Commit: August 01, 2021

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
   - For MySQL, Postgres, Adminer and MongoDB
- Payment REST API
   - Stripe for USD & PagarME for BRL
   - Subscription, Ecommerce, Shop Checkouts
   - ZipCode for Shipping Address, Fee and Deadline
- Uploads
   - S3, PDf, Png, Jpg, Jpeg, Gifs, Videos, etc
- Testing
   - White Box, Black Box, Regression, Usability, Security, Integration, Performance, Functional, etc
- Code best practices
   - MVC, CRUDs, ESLint, Prettier, Design Patterns, etc
- Google Tools
   - SEO, CDN, Analytics, Search Console, Sitemap, Robots.txt, etc
- Logs
   - Console, files, telegram, etc
- Security
   - OWASP, CSRF, XSS, Injection, CORS, etc
- API RESTs
   - JWT, Oauth2, AJAX, Bearer Token, HTML Documentation, etc
- Others usefull things
   - Mobile First, Regex, Charts, SMTP, Flash Messages, Pagination, Slug, UUID, Searchs, etc
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
   - [x] ADMIN ACL CRUD for Blog Posts, Games, Books and Stripe
   - [x] CRUD Profile
   - [x] CRUD APIs
- Using MySQL DataBase with Docker and pure SQL
   - [ ] Authentication (Login, Register, Reset Password, Confirm Email, SocialLogin)
   - [ ] ADMIN ACL CRUD for Blog Posts, Games, Books and Stripe
   - [ ] CRUD Profile
   - [ ] CRUD APIs
- Using PostgreSQL DataBase with Docker and Sequelize ORM
   - [ ] Authentication (Login, Register, Reset Password, Confirm Email, SocialLogin)
   - [ ] ADMIN ACL CRUD for Blog Posts, Games, Books and Stripe
   - [ ] CRUD Profile
   - [ ] CRUD APIs
- Using MongoDB DataBase with Docker and Mongoose ORM
   - [ ] Authentication (Login, Register, Reset Password, Confirm Email, SocialLogin)
   - [ ] ADMIN ACL CRUD for Blog Posts, Games, Books and Stripe
   - [ ] CRUD Profile
   - [ ] CRUD APIs
- Deploy on AWS LightSail
   - [ ] Using SQL or MongoDB
   - [ ] Using NGINX as Reverse Proxy
   - [ ] Using NGINX as Load Balancing
   - [ ] Using NGINX Cache and Compression
   - [ ] Using My Own Domain
   - [ ] Configure SSL/HTTPS in VPS (https://certbot.eff.org/)
- [ ] Make the API a Microservice
   - Using: https://api.galhardoapp.com
   - Create a branch "api" for this microservice
- [ ] TypeScript Version
   - After previous goals are complete, create a branch "typescript" and refactor the code using Typescript

## Some APP Images

### Games
![ga_home](https://user-images.githubusercontent.com/19540357/129276444-830fa647-5414-44ef-bf34-2a3bb24b3ccd.png)

### Books
![ga_books](https://user-images.githubusercontent.com/19540357/129276417-8b22e199-fa74-4c8d-86a9-ba9870971b22.png)

### SHOP
![ga_shop_1](https://user-images.githubusercontent.com/19540357/130067628-644dcc1c-4b5e-4ab7-974c-54eb01c48f0b.png)
![ga_shop_2](https://user-images.githubusercontent.com/19540357/130067635-7c8c3b70-dd30-4db9-b3b9-965897bd90b3.png)
![ga_shop_3](https://user-images.githubusercontent.com/19540357/130067637-7fa2bab5-cd52-4b59-9314-0379689a65e5.png)

### Subscription
![ga_plans](https://user-images.githubusercontent.com/19540357/128649491-ab2a9c36-e3bf-45cf-9768-6bd781e502e7.png)
![ga_plan_checkout](https://user-images.githubusercontent.com/19540357/128649492-a9011598-f460-40f7-8289-513430228c9b.png)
![ga_plan_log](https://user-images.githubusercontent.com/19540357/128649493-fb32d152-8f84-4a5b-84eb-74047b54b138.png)

### AuthController
![ga_login](https://user-images.githubusercontent.com/19540357/130070737-aae84e0c-5525-4207-80a4-f057e26295aa.png)
![ga_google](https://user-images.githubusercontent.com/19540357/130067660-c50adabf-7b75-4f4f-a871-4532294ace4b.png)
![ga_register_github](https://user-images.githubusercontent.com/19540357/130067666-04018b3f-e900-4b69-be2c-bb6bc7768416.png)
![ga_forgetPassword](https://user-images.githubusercontent.com/19540357/128446079-b6fc9f98-ea0f-4906-8d85-c581b554dee3.png)
![ga_resetPassword](https://user-images.githubusercontent.com/19540357/128446080-afa13a81-34be-4a74-9b8d-3cbc8688e0eb.png)

### Blog
![ga_blog](https://user-images.githubusercontent.com/19540357/129276413-93b7a40c-f8f5-4bb9-b1cc-df5df78b73da.png)
![ga_blog_post](https://user-images.githubusercontent.com/19540357/129276447-239ae567-4c74-46c1-8c0d-fda16449456a.png)
![ga_blog_comment_1](https://user-images.githubusercontent.com/19540357/130067633-96702bac-a9b9-40a4-9af1-30d44da1c827.png)
![ga_blog_comment_2](https://user-images.githubusercontent.com/19540357/130067642-fb771181-f73e-47f8-93f4-7a64d51af7e4.png)
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



## JSON DATABASE STRUCTURE EXAMPLE
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
      "created_at": "04/08/2021 18:35:09",
      "updated_at": "04/08/2021 18:55:16"
    }
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
      "updated_at": "11/08/2021 20:36:33",
      "created_at": "11/08/2021 20:36:33"
    }
  ],
  "stripe": {
    "customers": [],
    "cards": [],
    "charges": [],
    "products": [],
    "prices": [],
    "plans": [],
    "subscriptions": []  
  }
}
```

## Feedbacks
- If you have any feedback or improvements tips about this project, send a pull request or send me a email at: aleexgvieira@gmail.com
- I really apreciate good feedbacks

## License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2021-present, Alex Galhardo
