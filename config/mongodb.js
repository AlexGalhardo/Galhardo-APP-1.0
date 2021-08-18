const mongoClient = require("mongodb").MongoClient;

mongoClient.connect("mongodb+srv://alex:gegege123@cluster0.tr1pt.mongodb.net/galhardoapp")
            .then(conn => global.conn = conn.db("galhardoapp"))
            .catch(err => console.log(err))
