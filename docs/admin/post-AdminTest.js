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
                description:"Return ADMIN email and JWT token expiration time",
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
