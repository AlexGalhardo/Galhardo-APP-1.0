module.exports = {
    get:{
        tags: ['PUBLIC API'],
        description: "GET Blog Posts",
        operationId: 'getBlogPosts',
        parameters:[],
        responses:{
            '200':{
                description:"Return array with all blog posts objects",
                content:{
                    'application/json':{
                        schema:{
                            $ref:'#/components/schemas/BlogPost'
                        }
                    }
                }
            }
        }
    }
}
