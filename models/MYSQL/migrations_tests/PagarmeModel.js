// yarn init -y && yarn add mysql2 uuid rand-token bcryptjs
// npm init -y && npm isntall mysql2 uuid rand-token bcryptjs


import mysql2 from 'mysql2';


// CONNECT TO MYSQL 
let connection = null
try {
    connection = mysql2.createPool({
        host: '172.18.0.3', // DOCKER IPv4 Address Here (use $ sudo docker inspect galhardoapp_mysql)
        user: 'root',
        password: 'root',
        database: 'galhardoapp',
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    });
}
catch(error){
    throw new Error(error)
}

let MYSQL = connection.promise()




// DATETIME
class DateTime  {
    
    static getDateTime(timestamp){
        let date = new Date(timestamp*1000).toLocaleDateString('pt-BR')
        let time = new Date(timestamp*1000).toLocaleTimeString('pt-BR')
        return `${date} ${time}`;
    }

    static getNow() {
        let date = new Date().toLocaleDateString('pt-BR')
        let time = new Date().toLocaleTimeString('pt-BR')
        return `${date} ${time}`;
    }
}



// MODEL PAGARMEMODEL
class PagarmeModel {

    static async createShopTransaction(shopTransactionObject) {
        try {
            let stmt = `INSERT INTO pagarme_shop_transactions
                                (transaction_id,
                                total_amount,
                                payment_card_id,   
                                payment_card_brand,
                                payment_card_first_digits,
                                payment_card_last_digits,
                                payment_card_expiration_date,   
                                currency,
                                status,
                                products_amount,  
                                products,
                                customer_id,    
                                customer_pagarme_id,    
                                customer_email,    
                                customer_phone,    
                                customer_name,    
                                shipping_zipcode,    
                                shipping_street,    
                                shipping_street_number,    
                                shipping_neighborhood,    
                                shipping_city,    
                                shipping_state,    
                                shipping_country,    
                                shipping_carrier,    
                                shipping_fee,    
                                shipping_deadline,  
                                created_at)
                    VALUES (?, 
                            ?, 
                            ?, 
                            ?, 
                            ?, 
                            ?, 
                            ?, 
                            ?, 
                            ?, 
                            ?, 
                            ?,
                            ?,
                            ?,
                            ?,
                            ?,
                            ?,
                            ?,
                            ?,
                            ?,
                            ?, 
                            ?, 
                            ?, 
                            ?, 
                            ?, 
                            ?, 
                            ?, 
                            ?)`;

            let data = [
                shopTransactionObject.transaction_id,
                shopTransactionObject.total_amount,
                shopTransactionObject.payment_card_id,  
                shopTransactionObject.payment_card_brand, 
                shopTransactionObject.payment_card_first_digits,
                shopTransactionObject.payment_card_last_digits,
                shopTransactionObject.payment_card_expiration_date,   
                shopTransactionObject.currency,
                shopTransactionObject.status,
                shopTransactionObject.products_amount,  
                shopTransactionObject.products,
                shopTransactionObject.customer_id,    
                shopTransactionObject.customer_pagarme_id,    
                shopTransactionObject.customer_email,    
                shopTransactionObject.customer_phone,    
                shopTransactionObject.customer_name,    
                shopTransactionObject.shipping_zipcode,    
                shopTransactionObject.shipping_street,    
                shopTransactionObject.shipping_street_number,    
                shopTransactionObject.shipping_neighborhood,    
                shopTransactionObject.shipping_city,    
                shopTransactionObject.shipping_state,    
                shopTransactionObject.shipping_country,    
                shopTransactionObject.shipping_carrier,    
                shopTransactionObject.shipping_fee,    
                shopTransactionObject.shipping_deadline,    
                DateTime.getNow()
            ];

            const [ rows ] = await MYSQL.execute(stmt, data);

            rows.affectedRows ?  console.log(`Shop Transaction Created!`) : console.log('Shop Transaction NOT Created')

            // return rows ? rows : false
        } catch (error) {
            throw new Error(error);
        }
    }


    static async createSubscriptionTransaction(subscriptionTransactionObject) {
        try {
            let stmt = `INSERT INTO pagarme_subs_transactions
                                (transaction_id,
                                status,
                                payment_card_id,   
                                payment_card_brand,
                                payment_card_first_digits,
                                payment_card_last_digits,
                                payment_card_expiration_date,
                                payment_currency,              
                                plan_id,
                                plan_name,
                                plan_amount,
                                plan_current_period_start,
                                plan_current_period_end,
                                customer_id,    
                                customer_pagarme_id,     
                                customer_name, 
                                customer_email,       
                                customer_phone,
                                created_at)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

            let data = [
                subscriptionTransactionObject.transaction_id,
                subscriptionTransactionObject.status,
                subscriptionTransactionObject.payment_card_id,   
                subscriptionTransactionObject.payment_card_brand,
                subscriptionTransactionObject.payment_card_first_digits,
                subscriptionTransactionObject.payment_card_last_digits,
                subscriptionTransactionObject.payment_card_expiration_date,
                subscriptionTransactionObject.payment_currency,              
                subscriptionTransactionObject.plan_id,
                subscriptionTransactionObject.plan_name,
                subscriptionTransactionObject.plan_amount,
                subscriptionTransactionObject.plan_current_period_start,
                subscriptionTransactionObject.plan_current_period_end,
                subscriptionTransactionObject.customer_id,    
                subscriptionTransactionObject.customer_pagarme_id,     
                subscriptionTransactionObject.customer_name, 
                subscriptionTransactionObject.customer_email,       
                subscriptionTransactionObject.customer_phone,
                DateTime.getNow()
            ];

            const [ rows ] = await MYSQL.execute(stmt, data);

            rows.affectedRows ?  console.log(`Subscription Transaction Created!`) : console.log('Subscription Transaction NOT Created')

            // return rows ? rows : false
        } catch (error) {
            throw new Error(error);
        }
    }


    static async selectAllShopTransactionsFromUserID(user_id)  {
        try {
            let stmt = `SELECT *
                        FROM pagarme_shop_transactions
                        WHERE customer_id = '${user_id}'`;

            const [ rows ] = await MYSQL.execute(stmt);

            rows ? console.log('selectAllShopTransactionsFromUserID: ', rows) : null

            // return rows ? rows[0].totalGames : false

        } catch (error) {
            throw new Error(error);
        };
    }


    static async selectShopTransactionsByID(shop_transaction_id)  {
        try {
            let stmt = `SELECT *
                        FROM pagarme_shop_transactions
                        WHERE transaction_id = '${shop_transaction_id}'`;

            const [ rows ] = await MYSQL.execute(stmt);

            rows ? console.log('selectShopTransactionsByID: ', rows) : null

            // return rows ? rows[0].totalGames : false

        } catch (error) {
            throw new Error(error);
        };
    }


    static async selectAllSubscriptionsTransactionsFromUserID(user_id)  {
        try {
            let stmt = `SELECT *
                        FROM pagarme_subs_transactions
                        WHERE customer_id = '${user_id}'`;

            const [ rows ] = await MYSQL.execute(stmt);

            rows ? console.log('selectAllSubscriptionsTransactionsFromUserID: ', rows) : null

            // return rows ? rows[0].totalGames : false
        } catch (error) {
            throw new Error(error);
        };
    }


    static async selectSubscriptionTransactionsByID(subs_transaction_id)  {
        try {
            let stmt = `SELECT *
                        FROM pagarme_subs_transactions
                        WHERE transaction_id = '${subs_transaction_id}'`;

            const [ rows ] = await MYSQL.execute(stmt);

            rows ? console.log('selectSubscriptionTransactionsByID: ', rows) : null

            // return rows ? rows[0].totalGames : false

        } catch (error) {
            throw new Error(error);
        };
    }
    
}




// TEST MODEL BLOG
async function testModelPagarme(){

    /* await PagarmeModel.createShopTransaction({
        transaction_id: 123456,
        total_amount: 2990,
        payment_card_id: 'card_cktvxnmd606dv0i9t1n7wf2it',   
        payment_card_brand: 'visa',
        payment_card_first_digits: '1234',
        payment_card_last_digits: '5678',
        payment_card_expiration_date: '1122',   
        currency: 'BRL',
        status: 'paid',
        products_amount: 2590,  
        products: [
          {
            "id": "3",
            "title": "SpiderMan",
            "unit_price": "9.90",
            "quantity": 1,
            "tangible": true
          },
          {
            "id": "2",
            "title": "Ghost Of Tsushima",
            "unit_price": "19.90",
            "quantity": 1,
            "tangible": true
          },
          {
            "id": "10",
            "title": "The Last Of Us",
            "unit_price": "29.90",
            "quantity": 1,
            "tangible": true
          }
        ],
        customer_id: '0f37f643-ad74-437a-b440-89c031698eba',    
        customer_pagarme_id: 6951948,    
        customer_email: 'test@gmail.com',    
        customer_phone: '+5518997103281',    
        customer_name: 'Test JACK',    
        shipping_zipcode: '13560290',    
        shipping_street: 'Avenida Paulista',    
        shipping_street_number: 42,    
        shipping_neighborhood: 'Bairro 42',    
        shipping_city: 'São Paulo',    
        shipping_state: 'SP',    
        shipping_country: 'Brazil',    
        shipping_carrier: 'Correios',    
        shipping_fee: 400,    
        shipping_deadline: 4
    }) */

    
    /* await PagarmeModel.createSubscriptionTransaction({
        transaction_id: 762358,
        status: 'paid',
        payment_card_id: 'card_cktvxnmd606dv0i9t1n7wf2it',   
        payment_card_brand: 'visa',
        payment_card_first_digits: '1234',
        payment_card_last_digits: '5678',
        payment_card_expiration_date: '1122',
        payment_currency: 'BRL',              
        plan_id: '629720',
        plan_name: 'PREMIUM',
        plan_amount: 499,
        plan_current_period_start: '24/09/2021 20:00:13',
        plan_current_period_end: '24/10/2021 20:00:13',
        customer_id: '0f37f643-ad74-437a-b440-89c031698eba',    
        customer_pagarme_id: 6951948,     
        customer_name: 'Test JACK', 
        customer_email: 'test@gmail.com',       
        customer_phone: '+5518997103281'
    }) */

    // await PagarmeModel.selectAllShopTransactionsFromUserID('0f37f643-ad74-437a-b440-89c031698eba')

    // await PagarmeModel.selectShopTransactionsByID(123456)

    // await PagarmeModel.selectAllSubscriptionsTransactionsFromUserID('0f37f643-ad74-437a-b440-89c031698eba')

    await PagarmeModel.selectSubscriptionTransactionsByID(762358)
}

testModelPagarme()