module.exports = {
    get:{
        tags:['PUBLIC API'],
        description: "Get Blog Post By ID",
        operationId: "getBlogPostByID",
        parameters:[
            {
                name:"id",
                in:"path",
                schema:{
                    $ref:"#/components/schemas/Book"
                },
                required:true,
                description: "Book ID"
            }
        ],
        responses:{
            '200':{
                description:"Todo is obtained",
                content:{
                    'application/json':{
                        schema:{
                            $ref:"#/components/schemas/BlogPost"
                        }
                    }
                }
            }
        }
    }
}
