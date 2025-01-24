// Importing:
import express from 'express';
// import mongoose from 'mongoose';
// import Messages from './dbMessages.js';
import pg from "pg";
import Pusher from 'pusher';


// App config:
const app = express();
const port = process.env.PORT || 9000;

const pusher = new Pusher({
    appId: "1930799",
    key: "20a131f85c9ead9130d8",
    secret: "87d5279d0d971bd85508",
    cluster: "eu",
    useTLS: true
  });



// Middleware:
app.use(express.json());

// DB Section:
const db = new pg.Client({
    user: 'postgres', // Replace with your PostgreSQL username
    host: 'localhost', // Replace with your PostgreSQL host
    database: 'whatsapp-clone', // Replace with your database name
    password: 'kaser', // Replace with your PostgreSQL password
    port: 9845, // Default PostgreSQL port
  });

db.connect();
  
  // Test DB connection
  db.query('SELECT NOW()', (err, res) => {
    if (err) {
      console.error('PostgreSQL connection error:', err);
    } else {
      console.log('PostgreSQL connected at:', res.rows[0].now);
    }
  });



// Api Routes:
app.get('/', (req,res) =>{
    res.status(200).send('Works Good!');
})

// Sync all messages
app.get('/messages/sync', async (req, res) => {
    try {
      // Query to fetch all messages from the database
      const query = 'SELECT * FROM messages';
      const result = await db.query(query);
  
      // Send the fetched data as the response
      res.status(200).send(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).send(err);
    }
  });

// Create a new message
app.post('/messages/new', async (req, res) => {
    try {
      const { name, message, received } = req.body;
  
      // Insert into PostgreSQL
      const query = `
        INSERT INTO messages (name, message, received)
        VALUES ($1, $2, $3)
        RETURNING *
      `;
      const values = [name, message, received || false]; // Default to false if not provided
  
      const result = await db.query(query, values);
      res.status(201).send(result.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).send(err);
    }
  });



app.post('/messages/new', (req,res) => {
    const dbMessage = req.body;

    Messages.create(dbMessage, (err, data) => {
        if(err){
            res.status(500).send(err)
        }else{
            res.status(201).send(data)
        }
    })
})


// Listener:
app.listen(port, ()=>{
    console.log(`listening on port ${port} `);
})


