module.exports = {
    post:{
        tags:['PUBLIC API'],
        description: "Create todo",
        operationId: "createTodo",
        parameters:[],
        requestBody: {
            content:{
                'application/json': {
                    schema:{
                        $ref:'#/components/schemas/TodoInput'
                    }
                }
            }
        },
        responses:{
            '201':{
                description: "Todo created successfully"
            },
            '500':{
                description: 'Server error'
            }
        }
    }
}
