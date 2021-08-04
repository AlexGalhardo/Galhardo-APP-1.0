<br>
<h2 align="center">⭐ Galhardo APP 💵</h2>

- fazer blog
- usar compresion
- criar dominio galhardoapp.com (colocar no heroku)
- upload avatar
- api rest jwt


- req.body.data
- req.params.data
- req.query.data

## Live Demo
- You can access: https://galhardo-stripe-nodejs-app.herokuapp.com/
- **IMPORTANT: All transactions in this live demo use my SK_TEST DEVELOPMENT Stripe KEY**
- **NO REAL Money Transactions will be made**
- You can use default TEST inputs already in forms to try 

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

## In Development
- API REST Endpoints using JWT
- CRUDs using Models
   - with JSON-Server
   - with MySQL
   - with MongoDB
- Social Login using Oauth2
   - with GitHub
   - with Facebook
   - with Google
- Docker


## Project Structure
```
.
├── app.js
├── package.json
├── Procfile
├── README.md
├── .gitignore
├── .env
├── controllers
│   ├── APIController.js
│   ├── AppController.js
│   ├── CardsController.js
│   ├── ChargesController.js
│   ├── CustomersController.js
│   ├── PlansController.js
│   ├── PricesController.js
│   ├── ProductsController.js
│   └── SubscriptionsController.js
├── helpers
│   └── DateTime.js
├── public
│   └── scripts
│       ├── jquery.card.js
│       ├── jquery.min.js
│       └── stripe.js
├── routes
│   └── index.js
└── views
    ├── pages
    │   ├── 404.mustache
    │             ├── home.mustache
    │   ├── plan_checkout.mustache
    │   ├── planPayLog.mustache
    │   ├── shopPayLog.mustache
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
    │   └── subscriptions
    │       ├── cancel.mustache
    │       ├── create.mustache
    │       ├── listAll.mustache
    │       └── retrieve.mustache
    └── partials
        ├── footer.mustache
        └── header.mustache

15 directories, 54 files
```

## How To Use Locally
- $ git clone https://github.com/alexgalhardo/galhardo-stripe-nodejs-app
- $ cd galhardo-stripe-nodejs-app/
- Edit .env-example to .env and edit it with you credentials
- $ npm install
- $ json-server --watch database.json
- $ npm start
- Go to http://localhost:3000

## My Heroku APIs
- You can use: https://galhardo-correios.herokuapp.com/cep/:zipcode 
   - To get BRASIL CEP/ZipCode Information
   - Example: https://galhardo-correios.herokuapp.com/cep/13560290
- You can use: https://galhardo-correios.herokuapp.com/correios/:zipcode
   - To get BRASIL CORREIOS SHIPPING DEADLINE AND FEE
   - Example: https://galhardo-correios.herokuapp.com/correios/13560290


## Some Images
![gsna_1](https://user-images.githubusercontent.com/19540357/127928985-691880df-4369-4103-bfba-b562f9676750.png)
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
