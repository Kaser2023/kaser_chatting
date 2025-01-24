// Importing:
import express from 'express';
// import { MongoClient } from 'mongodb';
import mongoose from 'mongoose';
import Messages from './dbMessages.js';
import Pusher from 'pusher';
import cors from 'cors';

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

app.use(cors());

// This is won't be needed, the [[ "cors" ]] middleware is Okay!

// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Oirgin', '*');
//   res.setHeader('Access-Control-Allow-Headers', '*');
//   next();
// })


// DB Section:
const url_connection = 'mongodb+srv://kaqmoh:QI0cCDMu8oS2ZVnM@whatsapp.b5o3r.mongodb.net/kaser?retryWrites=true&w=majority&appName=whatsapp'

// Connect to MongoDB
mongoose.connect(url_connection)
  .then(() => console.log('Connected to MongoDB Atlas with Mongoose'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Example of adding a new message
// const newMessage = new Messages({
//   name: 'Alice',
//   message: 'Hello from Alice!',
//   timestamp: new Date().toISOString(),
//   received: true,
// });

// newMessage.save()
//   .then((doc) => console.log('Message saved:', doc))
//   .catch((err) => console.error('Error saving message:', err));


const db = mongoose.connection;

db.once('open', () => {
  console.log('Connected to MongoDB Atlas with Mongoose 2');

  const msgCollection = db.collection('kasers');
  const changeStream = msgCollection.watch();

  changeStream.on('change', (change) => {
    console.log(change);

    if (change.operationType === 'insert') {
      const messageDetails = change.fullDocument;

      // [[ message ]] --> is a Channel on ( Pusher )
      // [[ inserted ]] --> is an Event on ( Pusher )
      pusher.trigger('messages', 'inserted', {
        key: messageDetails.key,
        name: messageDetails.name,
        message: messageDetails.message,
        timestamp: messageDetails.timestamp,
        received: messageDetails.received

      });

    } else {
      console.log('Error Triggering Pusher!')
    }


  });

})


// ????

// Api Routes:
app.get('/', (req, res) => {
  res.status(200).send('Works Good!');
})

// Here there is a problem with [ find() ] that is:
// MongooseError: Model.find() no longer accepts a callback

// app.get('/messages/sync', (req,res) =>{
//   Messages.find((err,data) =>{
//     if(err){
//       res.status(500).send(err)
//     }else{
//       res.status(200).send(data)
//     }
//   });
// });

// Here is Using [[ .then()/.catch(). ]]
// app.get('/messages/sync', (req, res) => {
//   Messages.find()
//     .then((data) => {
//       res.status(200).send(data);
//     })
//     .catch((err) => {
//       res.status(500).send(err);
//     });
// });

// Hers is Using [ [ async/await ] ]
// Sync all messages
app.get('/messages/sync', async (req, res) => {
  try {
    const data = await Messages.find();
    res.status(200).send(data);
  } catch (err) {
    console.error(err); // Log the error for debugging
    res.status(500).send({
      error: 'An error occurred while fetching messages.'
    });
  }
});




// app.post('/messages/new', (req,res) => {
//   const dbMessage = req.body;

//   Messages.create(dbMessage, (err, data) => {
//       if(err){
//           res.status(500).send(err)
//       }else{
//           res.status(201).send(data)
//       }
//   })
// })

app.post('/messages/new', async (req, res) => {
  try {
    const dbMessage = req.body;
    const data = await Messages.create(dbMessage);

    res.status(201).send(data);
  } catch (err) {
    res.status(500).send(err);
  }
});



// Listener:
app.listen(port, () => {
  console.log(`listening on port ${port} `);
})