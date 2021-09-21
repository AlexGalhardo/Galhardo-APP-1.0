module.exports = {
    get:{
        tags: ['PUBLIC API'],
        description: "GET Books",
        operationId: 'getBooks',
        parameters:[],
        responses:{
            '200':{
                description:"Return array with all books objects",
                content:{
                    'application/json':{
                        schema:{
                            $ref:'#/components/schemas/Book'
                        }
                    }
                }
            }
        }
    }
}
