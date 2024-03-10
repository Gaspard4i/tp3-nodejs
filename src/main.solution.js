import ChatRepository from './ChatRepository.js';
import renderMessageList from './renderMessageList.js';

const userName = // récupère le nom de l'utilisateur
	// soit en sessionStorage
	sessionStorage.getItem('userName') ||
	// soit depuis la popup de prompt
	window.prompt('veuillez entrer votre nom', '');
// sauvegarde du userName en sessionStorage pour ne pas le redemander en cas de refresh
sessionStorage.setItem('userName', userName);

const chatRepository = new ChatRepository();
chatRepository.currentAuthor = userName;

const bc = new BroadcastChannel('JSelegram');
bc.addEventListener('message', event => {
	chatRepository.addMessage(event.data.text, event.data.author);
	render();
});

// affichage de la liste des messages
const messagesContainer = document.querySelector('.message-history');
function render() {
	// affichage des messages
	const messages = chatRepository.messageHistory;
	messagesContainer.innerHTML = renderMessageList(messages);
	// scroll auto
	messagesContainer.scrollTo({
		top: messagesContainer.scrollHeight,
		behavior: 'smooth',
	});
}

// soumission d'un nouveau message
const newMessageForm = document.querySelector('.new-message-form'),
	messageInput = newMessageForm.querySelector('input[name=message]');

function handleFormSubmit(event) {
	event.preventDefault();
	// envoie le nouveau message
	console.log('nouveau message :', messageInput.value);
	chatRepository.addMessage(messageInput.value, userName);
	bc.postMessage({ text: messageInput.value, author: userName });
	render();
	// vide le champ de saisie
	messageInput.value = '';
	// remet le focus dans le champ de saisie
	messageInput.focus();
}
newMessageForm.addEventListener('submit', handleFormSubmit);
