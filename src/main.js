import renderMessageList from './renderMessageList.js';

const userName = // récupère le nom de l'utilisateur
	// soit en sessionStorage
	sessionStorage.getItem('userName') ||
	// soit depuis la popup de prompt
	window.prompt('veuillez entrer votre nom', '');
// sauvegarde du userName en sessionStorage pour ne pas le redemander en cas de refresh
sessionStorage.setItem('userName', userName);

// affichage de la liste des messages
const messagesContainer = document.querySelector('.message-history');
function render() {
	// affichage des messages
	messagesContainer.innerHTML = renderMessageList([]);
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
	render();
	// vide le champ de saisie
	messageInput.value = '';
	// remet le focus dans le champ de saisie
	messageInput.focus();
}
newMessageForm.addEventListener('submit', handleFormSubmit);
