export default class ChatRepository {
	messageHistory = [];
	currentAuthor;
	addMessage(text, author) {
		this.messageHistory.push({
			text,
			author,
			isCurrentAuthor: author === this.currentAuthor,
		});
	}
}
