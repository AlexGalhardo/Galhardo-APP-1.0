module.exports = {
    components:{
        schemas:{
            User:{
                type:'object',
                properties:{
                    email:{
                        type: 'string',
                        description: "Profile Email",
                        example: "test@gmail.com"
                    },
                    password:{
                        type: 'string',
                        description: "Profile Password",
                        example: "test123"
                    }
                }
            },
            ProfileLogin:{
                type:'object',
                properties:{
                    email:{
                        type: 'string',
                        description: "Profile Email",
                        example: "test@gmail.com"
                    },
                    password:{
                        type: 'string',
                        description: "Profile Password",
                        example: "test123"
                    }
                }
            },
            Game:{
                type:'object',
                properties:{
                    id:{
                        type: 'integer',
                        description: "Game ID",
                        example: 1
                    },
                    title:{
                        type: 'string',
                        description: "Game Title",
                        example: "God Of War"
                    }
                }
            },
            Book:{
                type:'object',
                properties:{
                    id:{
                        type:'string',
                        description:"Todo identification number",
                        example:"ytyVgh"
                    },
                    title:{
                        type:'string',
                        description:"Todo's title",
                        example:"Coding in JavaScript"
                    },
                    completed:{
                        type:"boolean",
                        description:"The status of the todo",
                        example:false
                    }
                }
            },
            BlogPost:{
                type:'object',
                properties:{
                    id:{
                        type:'string',
                        description:"Todo identification number",
                        example:"ytyVgh"
                    },
                    title:{
                        type:'string',
                        description:"Todo's title",
                        example:"Coding in JavaScript"
                    },
                    completed:{
                        type:"boolean",
                        description:"The status of the todo",
                        example:false
                    }
                }
            }
        }
    }
}
