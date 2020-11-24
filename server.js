//importing stuff
import express from 'express';
import mongoose from 'mongoose';
//app configs
const app = express();
const port = process.env.PORT || 9000;
//middleware

//database config
const connectionURL =
	'mongodb+srv://admin:<MVLc3PFMhzEefMcP>@cluster0.umr7e.mongodb.net/<whatsapp-clone-db>?retryWrites=true&w=majority';
mongoose.connect(connectionURL, {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true,
});

//??

//api routes
app.get('/', (req, res) => res.status(200).send('hello world'));
//listenting
app.listen(port, () => console.log(`listening on port ${port}`));
