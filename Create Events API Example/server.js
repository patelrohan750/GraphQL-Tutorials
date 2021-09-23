require('dotenv').config();
const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const typeDefs=require('./graphql/typedef')
const resolvers=require('./graphql/resolvers/index')
require('./db')
async function startServer() {
    const app = express();
    //start apllo server
    const apolloServer = new ApolloServer({
        typeDefs ,
        resolvers ,
        context:({req})=>({req})
    });
    await apolloServer.start();
    apolloServer.applyMiddleware({ app });

    //start express server
    app.use((req, res) => {
        res.send("Hello from the Exprees apllo server");
    });

    app.listen(8000, () => console.log("server running at 8000"));
}

startServer(); 