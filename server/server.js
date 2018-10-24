require('dotenv').config();  //Making environmental variables accessible

const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const fetch = require('node-fetch');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const db = require('./database/elephantsql.js')

db.sequelize.sync().then(function() {
  //MAKING SURE DATABASE TABLES & MODELS GET ASSOCIATED BEFORE STARTING UP THE SERVER
  app.use(express.static('./dist'))
  app.use(express.static('./static'))

  app.get('/', (req,res) => {
    res.sendFile('index.html')
  })

  app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
  }))

  app.post('/auth', (req, res, next) => {
    next();
    },
    (req, res) => {
      fetch(`https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${req.headers.authorization}`)
      .then(res => {
        console.log('RES STATUS', res.status)
        let status = res.status 
  
        // if (status === 200) // check db for user 
          // if user exists in db, create authenticated session with timeout 
        
          // if not, create new user from id token payload and create new session 
        
          // You can prompt the user for any additional profile information you require when you detect a newly created user in your app.
      })
    },
  )

  app.listen(port, () => {
    console.log('listening on port: ' + port)
  })
})
