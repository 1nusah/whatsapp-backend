//importing stuff
import express from 'express';
import mongoose from 'mongoose';
import Messages from './dbMessages.js';
import Pusher from 'pusher';
import cors from 'cors';
//app configs
const app = express();
const port = process.env.PORT || 9000;
//middleware
app.use(express.json());
app.use(cors());
//database config
const connectionURL =
	'mongodb+srv://admin:MVLc3PFMhzEefMcP@theghetto.umr7e.mongodb.net/whatsappDB?retryWrites=true&w=majority';
mongoose
	.connect(connectionURL, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log('hi my nikkkkaaaasss'))
	.catch((err) => console.error('error is ', err));

//Pusher config
const pusher = new Pusher({
	appId: '1112722',
	key: '1b590fcb4646c963f34d',
	secret: 'f8b0c9d309152372d563',
	cluster: 'mt1',
	useTLS: true,
});

pusher.trigger('my-channel', 'my-event', {
	message: 'hello world',
});
const db = mongoose.connection;
db.once('open', () => {
	console.log('DB Connected');
	const msgCollection = db.collection('messagecontents');
	const changeStream = msgCollection.watch();

	changeStream.on('change', (change) => {
		console.log(change);
		const messageDetails = change.fullDocument;
		change.operationType === 'insert'
			? pusher.trigger('messages', 'inserted', {
					name: messageDetails.name,
					message: messageDetails.message,
					timeStamp: messageDetails.timeStamp,
					received: messageDetails.received,
			  })
			: console.log('error triggering pusher');
	});
});
//api routes//
app.get('/api/', (req, res) => res.status(200).send('hello world'));

// creating the message in the db
app.post('/api/messages/new', (req, res) => {
	const dbMessage = req.body;
	Messages.create(dbMessage, (err, data) => {
		err ? res.status(500).send(err) : res.status(201).send(data);
	});
});
// route to return all the messages or items in the db
app.get('/api/messages/sync', (req, res) => {
	// i used status code 200 since we aren't creating a new item but only finding
	Messages.find((err, data) =>
		err ? res.status(500).send(err) : res.status(200).send(data)
	);
});
//listenting
app.listen(port, () => console.log(`listening on port ${port}`));
