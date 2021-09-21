module.exports = {
    delete:{
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
                description:"Return Profile Deleted",
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
