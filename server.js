//importing stuff
import express from 'express';
import mongoose from 'mongoose';
import Messages from './dbMessages.js';
//app configs
const app = express();
const port = process.env.PORT || 9000;
//middleware
app.use(express.json());
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

//??

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
