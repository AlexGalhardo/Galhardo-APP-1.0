module.exports = {
    patch:{
        tags: ['PROFILE API'],
        description: "Profile Login",
        operationId: 'postProfileLogin',
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
