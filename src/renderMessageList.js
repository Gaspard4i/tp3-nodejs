export function renderMessage(message) {
	return `<article class="${message.isCurrentAuthor ? 'me' : ''}">
				<p class="author">${message.author}</p>
				<p class="message">${message.text}</p>
			</article>`;
}

export default function renderMessageList(messages) {
	return messages.map(message => renderMessage(message)).join('');
}
