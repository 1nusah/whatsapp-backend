import { Mongoose } from 'mongoose';

const message = new Mongoose.Schema(
	{
		chatID: {
			type: String,
			required: true,
		},
		content: {
			type: String,
			required: true,
		},
		senderID: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

const Messages = mongoose.model('message', message);
module.exports = Message;
