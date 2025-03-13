export function renderMessage(message) {
	return `<article class="${message.isCurrentAuthor ? 'me' : ''}">
				<p class="author">${message.author}</p>
				<p class="message">${message.text}</p>
			</article>`;
}

export default function renderMessageList(messages) {
	// Pour rappel, myArray.map(fn) permet de créer un clone du tableau myArray,
	// dans lequel les cellules sont "transformées" par la fonction fn passée en paramètre.
	// Le .join('') permet de concaténer toutes les cellules en une seule chaîne.
	return messages.map(renderMessage).join('');
	// cette notation est équivalente à :
	// return messages.map(message => renderMessage(message)).join('');
	// ou encore :
	// return messages.map(function(message){ return renderMessage(message) }).join('');
}
