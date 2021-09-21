module.exports = {
    get:{
        tags: ['PUBLIC API'],
        description: "GET Games",
        operationId: 'getGames',
        parameters:[],
        responses:{
            '200':{
                description:"Return array with all games objects",
                content:{
                    'application/json':{
                        schema:{
                            $ref:'#/components/schemas/Game'
                        }
                    }
                }
            }
        }
    }
}
