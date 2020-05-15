const {ApolloServer, gql}= require("apollo-server")

const typeDefs = gql`

    type Curso {
        titulo : String
        tecnologia : String
    }
    type Query {
        obtenerCuros : [Curso]
    }
`;

const cursos =[
    {
        titulo :" JavaScript Moderno Guia Definitiva Construye +10 proyectos",
        tecnologia : "JavaScript ES6"
    },
    {
        titulo :" React- La Guia Completa : Hooks Context Redux MERN + 15 Apps",
        tecnologia : "React"
    },
    {
        titulo :" Node.js - Bootcamp Desarrollo Web inc. MVC y REST API´s",
        tecnologia : "Node.js"
    },
    {
        titulo :"ReactJS Avanzado - FullStack React GraphQL y Apollo",
        tecnologia : "React"
    },
    
]


const resolvers ={
    Query : {
        obtenerCuros : ()=> cursos
    }
}

const server = new ApolloServer({typeDefs,resolvers})

server.listen().then(({url})=>{
    console.log(`Servidor listo en la URL ${url}`)
})