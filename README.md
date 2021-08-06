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


## System Features (Things I want to put in practice/learn)
- CRUDs in JSON, MySQL and MongoDB
- Login & Register using Sessions and Social Login
- APIs RESTs using JWT, Oauth2, Bearer Token
- Forms Validations (masks, validation inputs, requests, etc)
- ACL (access-control-list)
- SMTP (for contact form, forget/reset password, subscriptions, etc)
- Get user IP Address, Geolocalization, Browser, Operation System
- Privacy Cookies (Learn LGPD & GDPR)
- DOM Manipulation with vanilla JavaScript
- Simple Ecommerce and Subscription Checkout
- System Logs using Telegram (contacts, errors, subscriptions, etc)
- Docker (for MongoDB and MySQL)
- UUID
- Flash Messages
- Blog 
   - Using Admin to create/update/delete blog posts
   - Pagination
   - Slug
   - Search Blog Title


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
├── app.js
├── mongodb.js
├── mysql.js
├── package.json
├── Procfile
├── README.md
├── database.json
├── database_structure.json
├── docker-compose.yml
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
│   │   └── Users.js
│   ├── MONGODB
│   │   └── Users.js
│   └── MySQL
│       └── Users.js
├── public
│   ├── css
│   │   └── privacy.css
│   ├── scripts
│   │   ├── jquery.card.js
│   │   ├── jquery.min.js
│   │   ├── navbar_apis.js
│   │   ├── privacy.js
│   │   └── stripe.js
│   └── uploads
│       └── avatars
│           ├── avatar.png
│           └── profile.jpeg
├── routes
│   └── index.js
└── views
    ├── pages
    │   ├── 404.mustache
    │   ├── privacy.mustache
    │   ├── blog.mustache
    │   ├── blogPost.mustache
    │   ├── contact.mustache
    │   ├── home.mustache    
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
    │       └── shopPayLog.mustache
    └── partials
        ├── footer.mustache
        └── header.mustache

26 directories, 85 files
```

## DataBase JSON Structure
- **IMPORT: Never Use JSON SERVER for Production DataBase (Of course, you already know that)**
- I'm using JSON-SERVER as DataBase for LEARNING JSON purposes only.
```json
{
    "users": [
        {
            "id": "user_uuid",
            "name": "user_name",
            "email": "user_email",
            "password": "user_bcrypt_hash_password",
            "admin": 0, 
            "reset_password_token": null, 
            "stripe_customer_id": null, 
            "created_at": "04/08/2021 17:17:18",
            "updated_at": "04/08/2021 17:17:18"
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


## Some Images

![ga_home](https://user-images.githubusercontent.com/19540357/128446085-80fd73af-2b6e-4716-8709-74a24162d96d.png)
![ga_login](https://user-images.githubusercontent.com/19540357/128446082-32d21dda-9794-428d-a8f2-f6f6475aced7.png)
![ga_register](https://user-images.githubusercontent.com/19540357/128446078-671db5e9-064c-4458-941f-a6cf15e39d49.png)
![ga_forgetPassword](https://user-images.githubusercontent.com/19540357/128446079-b6fc9f98-ea0f-4906-8d85-c581b554dee3.png)
![ga_resetPassword](https://user-images.githubusercontent.com/19540357/128446080-afa13a81-34be-4a74-9b8d-3cbc8688e0eb.png)
![ga_blog](https://user-images.githubusercontent.com/19540357/128446081-f6f8895c-e36b-4dbd-b42a-ad28f8dbf096.png)
![ga_profile](https://user-images.githubusercontent.com/19540357/128446083-984edcfa-cc82-46f0-9d85-985f651312f8.png)
![ga_apis](https://user-images.githubusercontent.com/19540357/128446084-8275f37f-9f69-4123-ad80-505e42941627.png)
![gsna_2](https://user-images.githubusercontent.com/19540357/127929019-d386473d-6061-4a5c-a832-1abb896e4146.png)
![gsna_3](https://user-images.githubusercontent.com/19540357/127928980-01f5f63f-77df-497b-9644-a69719599043.png)
![gsna_4](https://user-images.githubusercontent.com/19540357/127928983-5b929ca9-5f80-4d9a-ad83-a129aa26b5d7.png)
![gsna_5](https://user-images.githubusercontent.com/19540357/127928988-4b5d7d08-e10e-43de-a52f-348e06611114.png)
![gsna_6](https://user-images.githubusercontent.com/19540357/127928972-88902e21-8832-40cd-a8f5-35f5335db11b.png)
![gsna_7](https://user-images.githubusercontent.com/19540357/127928974-a5b650e7-fe12-4a38-9d2c-df7194fbcf87.png)
![gsna_8](https://user-images.githubusercontent.com/19540357/127928977-264530db-864e-4fb2-ac9f-50e698dd116f.png)


## License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2021-present, Alex Galhardo
