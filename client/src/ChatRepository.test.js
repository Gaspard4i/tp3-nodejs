import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import ChatRepository from './ChatRepository.js';

describe('ChatRepository', () => {
	it('should save message', () => {
		const chatRepository = new ChatRepository();
		chatRepository.addMessage('Say my name !', 'Walter');
		assert.deepStrictEqual(chatRepository.messageHistory, [
			{ author: 'Walter', text: 'Say my name !', isCurrentAuthor: false },
		]);
	});

	describe('ChatRepository::currentAuthor', () => {
		//facultatif, on est pas obligé de repasser par un autre describe, on aurait pu tout mettre directement dans le describe du dessus, avec plein de it à la suite

		it('should set isCurrentAuthor to false when message is sent by someone else', () => {
			const chatRepository = new ChatRepository();
			chatRepository.currentAuthor = 'Thomas';
			chatRepository.addMessage('Say my name !', 'Walter');
			assert.deepStrictEqual(chatRepository.messageHistory, [
				{ author: 'Walter', text: 'Say my name !', isCurrentAuthor: false },
			]);
		});
		it('should set isCurrentAuthor to true for messages sent by current author', () => {
			const chatRepository = new ChatRepository();
			chatRepository.currentAuthor = 'Walter';
			chatRepository.addMessage('Say my name !', 'Walter');
			assert.deepStrictEqual(chatRepository.messageHistory, [
				{ author: 'Walter', text: 'Say my name !', isCurrentAuthor: true },
			]);
		});
		it('should set isCurrentAuthor to the right value when having multiple messages', () => {
			const chatRepository = new ChatRepository();
			chatRepository.currentAuthor = 'Thomas';
			chatRepository.addMessage('Say my name !', 'Walter');
			chatRepository.addMessage('Euh... Heisenberg ?', 'Thomas');
			assert.deepStrictEqual(chatRepository.messageHistory, [
				{ author: 'Walter', text: 'Say my name !', isCurrentAuthor: false },
				{
					author: 'Thomas',
					text: 'Euh... Heisenberg ?',
					isCurrentAuthor: true,
				},
			]);
		});
	});
});
