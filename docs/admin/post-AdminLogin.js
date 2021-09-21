module.exports = {
    post: {
        tags: ['ADMIN API'],
        description: "ADMIN Login",
        operationId: 'postAdminLogin',
        parameters:[],
        requestBody: {
            content:{
                'application/json': {
                    schema:{
                        $ref:'#/components/schemas/ProfileLogin'
                    }
                }
            }
        },
        responses:{
            '200':{
                description:"Return profile user object",
                content:{
                    'application/json':{
                        schema:{
                            $ref:'#/components/schemas/User'
                        }
                    }
                }
            }
        }
    }
}
