<br>
<h1 align="center">⭐ Galhardo APP 💵</h1>

## Live Demo
- You can access: https://galhardo-app.herokuapp.com/
- You can use default TEST inputs already in forms to try 
- **IMPORTANT:**
   - **All transactions in this live demo use my SK_TEST DEVELOPMENT Stripe KEY**
   - **NO REAL Money Transactions will be made**
   - **All CRUDs in Heroku Live Demo are made in JSON DataBase, for obvious reasons.**

## Introduction
- I created this program in my spare time to help in my commercial projects and also to learn and practice:
     - NodeJS basics
     - Express basics
     - Payment APIs RESTs
     - MVC
     - How to document a software
     - Tests
     - CRUDs
     - And so on.
- The program is under development. I will be refactoring it over the years during my professional career as I develop my programming skills.

## Tools Used
- NodeJS v14.17.3
- NPM v7.20.3
- Heroku for Fast Deploys
- [LinuxMint XFCE](https://www.linuxmint.com/edition.php?id=290)
- [SublimeText4](https://www.sublimetext.com/)
- [Bootstrap5](https://getbootstrap.com/)
- [Stripe Payment API](https://stripe.com/docs/)
- [Bootstap5 Icons](https://icons.getbootstrap.com/)
- [https://translate.google.com/](https://translate.google.com/)
- [https://www.freeprivacypolicy.com/](https://www.freeprivacypolicy.com/)
- [https://sendgrid.com/](https://sendgrid.com/)
- Bash
- API Brazil Correios
- https://picsum.photos/images


## System Features => Things I want to put in practice and learn
- Mobile First (100% responsive)
- CRUDs in JSON, MySQL and MongoDB
- Login & Register using Sessions and Social Login
- APIs RESTs using JWT, Oauth2, Bearer Token
- ACL (acess-control-list)
- Get user IP Address, Geolocalization, Browser, Operation System
- Privacy Cookies (Learn LGPD & GDPR)
- DOM Manipulation with vanilla JavaScript
- Simple Ecommerce and Subscription Checkout
- System Logs using Telegram (contacts, errors, subscriptions, etc)
- Docker (for MongoDB and MySQL)
- UUID
- Flash Messages
- File Uploads
- Forms Validations 
   - Masks, validation inputs, requests, etc
- SMTP 
   - for contact form, forget/reset password, subscriptions, etc
   - Using HTML Templates
- Blog 
   - Using Admin to create/update/delete blog posts
   - Pagination
   - Slug
   - Search Blog Title
- Deploy on AWS
   - Using my own domain 
   - Learn how to configure reverse-proxy with NGINX
   - Learn how to configure Load Balancing in NGINX
   - Using MySQL or MongoDB
   - Learn how to configure HTTPS/SSL in a VPS
      - https://dnsimple.com/
      - https://certbot.eff.org/
      - https://howdns.works/
      - https://howhttps.works
      - https://howdnssec.works/


## How To Use Locally with JSON DataBase
- $ git clone https://github.com/alexgalhardo/galhardo-app
- $ cd galhardo-app/
- Edit .env-example to .env and edit it with you credentials
- $ npm install
- $ npm run json-database 
   - http://localhost:4000
- $ npm start
   - http://localhost:3000

- You can see GalhardoAPP JSON DataBase live here
   - https://galhardoapp-json-database.herokuapp.com/

## How To Use Locally with MySQL and Docker
- In Development

## How To Use Locally with MongoDB and Docker
- In Development

## My Heroku APIs
- You can use: https://galhardo-correios.herokuapp.com/cep/:zipcode 
   - To get BRASIL CEP/ZipCode Information
   - Example: https://galhardo-correios.herokuapp.com/cep/13560290
- You can use: https://galhardo-correios.herokuapp.com/correios/:zipcode
   - To get BRASIL CORREIOS SHIPPING DEADLINE AND FEE
   - Example: https://galhardo-correios.herokuapp.com/correios/13560290

## Project Structure
```
.
├── .env
├── app.js
├── database.json
├── database_structure.json
├── docker-compose.yml
├── mongodb.js
├── mysql.js
├── package.json
├── Procfile
├── README.md
├── controllers
│   ├── AdminController.js
│   ├── APIController.js
│   ├── AppController.js
│   ├── AuthController.js
│   ├── CardsController.js
│   ├── ChargesController.js
│   ├── CustomersController.js
│   ├── PlansController.js
│   ├── PricesController.js
│   ├── ProductsController.js
│   ├── ProfileController.js
│   └── SubscriptionsController.js
├── helpers
│   ├── Bcrypt.js
│   ├── DateTime.js
│   ├── NodeMailer.js
│   └── URL.js
├── models
│   ├── JSON
│   │   ├── Blog.js
│   │   ├── Books.js
│   │   ├── Games.js
│   │   ├── Stripe.js
│   │   └── Users.js
│   ├── MONGODB
│   │   └── Users.js
│   └── MySQL
│       └── Users.js
├── public
│   ├── css
│   │   └── privacy.css
│   ├── images
│   │   └── amazon-button.png
│   ├── scripts
│   │   ├── books.js
│   │   ├── games.js
│   │   ├── jquery.card.js
│   │   ├── jquery.min.js
│   │   ├── navbar_apis.js
│   │   ├── privacy.js
│   │   ├── render_credit_card.js
│   │   ├── shop.js
│   │   └── stripe.js
│   └── uploads
│       └── avatars
│           ├── avatar.png
│           └── profile.jpeg
├── routes
│   └── index.js
└── views
    ├── emails
    │   ├── confirm_email.html
    │   ├── contact.html
    │   ├── forget_password.html
    │   ├── shop_transaction.html
    │   └── subscription_transaction.html
    ├── pages
    │   ├── 404.mustache
    │   ├── blog.mustache
    │   ├── blogPost.mustache
    │   ├── books.mustache
    │   ├── contact.mustache
    │   ├── home.mustache
    │   ├── privacy.mustache
    │   ├── admin
    │   │   ├── createBlogPost.mustache
    │   │   └── updateBlogPost.mustache
    │   ├── auth
    │   │   ├── forgetPassword.mustache
    │   │   ├── login.mustache
    │   │   ├── register.mustache
    │   │   └── resetPassword.mustache
    │   ├── cards
    │   │   ├── create.mustache
    │   │   ├── delete.mustache
    │   │   ├── listAll.mustache
    │   │   ├── retrieve.mustache
    │   │   └── update.mustache
    │   ├── charges
    │   │   ├── create.mustache
    │   │   ├── listAll.mustache
    │   │   └── retrieve.mustache
    │   ├── customers
    │   │   ├── create.mustache
    │   │   ├── delete.mustache
    │   │   ├── listAll.mustache
    │   │   ├── retrieve.mustache
    │   │   └── update.mustache
    │   ├── plans
    │   │   ├── create.mustache
    │   │   ├── delete.mustache
    │   │   ├── listAll.mustache
    │   │   └── retrieve.mustache
    │   ├── prices
    │   │   ├── create.mustache
    │   │   ├── listAll.mustache
    │   │   └── retrieve.mustache
    │   ├── products
    │   │   ├── create.mustache
    │   │   ├── delete.mustache
    │   │   ├── listAll.mustache
    │   │   ├── retrieve.mustache
    │   │   └── update.mustache
    │   ├── profile
    │   │   └── profile.mustache
    │   ├── subscriptions
    │   │   ├── cancel.mustache
    │   │   ├── create.mustache
    │   │   ├── listAll.mustache
    │   │   └── retrieve.mustache
    │   └── templates
    │       ├── plan_checkout.mustache
    │       ├── planPayLog.mustache
    │       ├── shop_checkout.mustache
    │       └── shopPayLog.mustache
    └── partials
        ├── footer.mustache
        └── header.mustache

28 directories, 100 files
```

## JSON DataBase Structure
- **IMPORT: Never Use JSON SERVER for Production DataBase (Of course, you already know that)**
- I'm using JSON-SERVER as DataBase for LEARNING JSON purposes only.
```json
{
    "users": [
        {
            "id": "b6e074ee-565b-4bb0-9a28-6b1231781216",
            "name": "admin",
            "email": "admin@gmail.com",
            "confirmed_email": true,
            "password": "$2b$12$QdBFZwXSSkoKSv77Iqjga.bxSeWZkRHzmH.LAqajyB7ha.itqIxyK",
            "admin": 1,
            "avatar": "b6e074ee-565b-4bb0-9a28-6b1231781216_avatar.jpeg",
            "document": "445.566.777-99",
            "phone": "18999998888",
            "birth_date": "1997-09-23",
            "address": {
              "zipcode": "13560290",
              "street": "Rua Dona Alexandrina",
              "street_number": "123",
              "neighborhood": "Vila Monteiro (Gleba I)",
              "city": "Sao Carlos",
              "state": "SP",
              "country": "BRAZIL"
            },
            "google_id": null,
            "github_id": null,
            "facebook_id": null,
            "reset_password_token": null,
            "stripe_customer_id": null,
            "created_at": "04/08/2021 17:17:18",
            "updated_at": "06/08/2021 16:17:31"
        }
    ],
    "blog": [
        {
          "id": 1,
          "title": "blog_title",
          "resume": "blog_resume",
          "slug": "blog_slug",
          "category": "blog_category",
          "body": "blog_body",
          "image": "blog_resume_image",
          "created_at": "04/08/2021 18:35:09",
          "updated_at": "04/08/2021 18:55:16"
        }
    ],
    "games": [
        {
          "id": 1,
          "title": "God Of War",
          "year_release": 2018,
          "resume": "game resume",
          "image": "https://images.igdb.com/igdb/image/upload/t_cover_big/co1tmu.jpg",
          "igdb_link": "https://www.igdb.com/games/god-of-war--1",
          "igdb_rating": 9.5,
          "platforms": "PS4, PS5",
          "developer": "Santa Monica Studios",
          "genres": "Action, Third Person, Adventure, Hack and slash/Beat 'em up",
          "amazon_link": "https://www.amazon.com.br/God-War-Padr%C3%A3o-PlayStation-4/dp/B079581SQQ",
          "created_at": "04/08/2021 18:35:09",
          "updated_at": "04/08/2021 18:55:16"
        },
    ],
    "books": [
        {
          "id": 1,
          "title": "Sapiens - Uma Breve História da Humanidade",
          "year_release": 2014,
          "author": "Yuval Noah Harari ",
          "resume": "book resume",
          "image": "https://images-na.ssl-images-amazon.com/images/I/51fuvXO6wvL._SX346_BO1,204,203,200_.jpg",
          "pages": "464",
          "genres": "Historic",
          "amazon_link": "https://www.amazon.com.br/Sapiens-Uma-Breve-Hist%C3%B3ria-Humanidade/dp/8525432180",
          "created_at": "04/08/2021 18:35:09",
          "updated_at": "04/08/2021 18:55:16"
        },
    ],
    "customers": [],
    "cards": [],
    "charges": [],
    "products": [],
    "prices": [],
    "plans": [],
    "subscriptions": []
}
```


## Some Images

![ga_home](https://user-images.githubusercontent.com/19540357/128587419-1f95ebb8-549e-4e5f-a559-97c9e55de9f1.png)
![ga_books](https://user-images.githubusercontent.com/19540357/128587418-a588b944-a80b-4d90-be09-3311565ba37e.png)
![ga_apis](https://user-images.githubusercontent.com/19540357/128446084-8275f37f-9f69-4123-ad80-505e42941627.png)

#### Blog
![ga_blog](https://user-images.githubusercontent.com/19540357/128587416-fd0285db-527f-4414-a1c4-412b9dd3b860.png)

#### Profile
![ga_profile](https://user-images.githubusercontent.com/19540357/128587414-3f6562c7-cc9a-4b8e-95e2-34b8676db1c1.png)

#### AuthController
![ga_login](https://user-images.githubusercontent.com/19540357/128446082-32d21dda-9794-428d-a8f2-f6f6475aced7.png)
![ga_register](https://user-images.githubusercontent.com/19540357/128446078-671db5e9-064c-4458-941f-a6cf15e39d49.png)
![ga_forgetPassword](https://user-images.githubusercontent.com/19540357/128446079-b6fc9f98-ea0f-4906-8d85-c581b554dee3.png)
![ga_resetPassword](https://user-images.githubusercontent.com/19540357/128446080-afa13a81-34be-4a74-9b8d-3cbc8688e0eb.png)

#### SHOP
![ga_shop](https://user-images.githubusercontent.com/19540357/128587398-a6e9fdec-c72e-423a-a1a0-5cdb6e07921e.png)
![ga_shop_log](https://user-images.githubusercontent.com/19540357/128587396-0b7c8e8a-ae47-48dd-b8bb-b88d6eec4de2.png)

#### Subscription
![ga_plan](https://user-images.githubusercontent.com/19540357/128587392-f09bd906-5653-4902-ae6e-db9f8dc6ba75.png)
![ga_plan_log](https://user-images.githubusercontent.com/19540357/128587394-7bccd58e-9781-4cbb-a7fb-ca4507568147.png)


## License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2021-present, Alex Galhardo
