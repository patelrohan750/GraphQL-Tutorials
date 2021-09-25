require('dotenv').config();
const express = require('express')
const { ApolloServer } = require('apollo-server-express')
const port = 8000;
const typeDefs = require('./graphql/typeDefs')
const resolvers = require('./graphql/resolvers/index')
require('./db')


async function startServer() {
    const app = express()

    //start apllo server
    const apolloserevr = new ApolloServer({
        typeDefs,
        resolvers,
        context:({req})=>({req})
    },
    )
    await apolloserevr.start()
    apolloserevr.applyMiddleware({ app })

    //start express server
    app.use((req, res) => {
        res.send("Hello from the Exprees apllo server");
    })

    app.listen(port, () => console.log("server running at 8000"))

}
startServer();


