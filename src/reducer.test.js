import reducer from './reducer';
import {generateAuralUpdate, restartGame, makeGuess} from './actions';

describe('reducer', ()=>{
	const testGuesses = [];
	for(let i=0;i<10;i++){
		testGuesses.push(i);
	}
	it('Should set the initial state when nothing is passed in', ()=>{
		const state = reducer(undefined, {type: '__UNKNOWN'});
		expect(state).toEqual({
			guesses: [],
			feedback: 'Make your guess!',
			auralStatus: '',
			correctAnswer: state.correctAnswer
		});
	});

	it('Should return the current state on an unknown action', ()=>{		
		const state = {
			guesses: [],
			feedback: 'Make your guess!',
			auralStatus: '',
			correctAnswer: 99
		};
		const testState = reducer(state, {type:'__UNKNOWN'});
		expect(testState).toEqual(state);
	});

	describe('restartGame()', ()=>{
		it('Should restart the game', ()=>{
			const before = reducer(undefined, {type:'__UNKNOWN'});
			const state = reducer(before, restartGame());
			expect(state).toEqual({
				guesses: [],
				feedback: 'Make your guess!',
				auralStatus: '',
				correctAnswer: state.correctAnswer
			});
			expect(state.correctAnswer).not.toEqual(before.correctAnswer);
		});
	});

	describe('makeGuess()', ()=>{
		it('Should pass the check if the input is a valid number', ()=>{
			const state = {
				guesses: [],
				feedback: 'Make your guess!',
				auralStatus: '',
				correctAnswer: 99
			}
			const input = 10;
			const updatedState = reducer(state, makeGuess(input));
			expect(updatedState.guesses[0]).toEqual(input);			
		});

		it('Should not pass if it\'s not a valid number', ()=>{
			const state = {
				guesses: [],
				feedback: 'Make your guess!',
				auralStatus: '',
				correctAnswer: 99
			}
			const input = 'abc';
			const updatedState = reducer(state, makeGuess(input));
			expect(updatedState.feedback).toEqual("Please enter a valid number.");			
		});

		it('Should Update the feedback', ()=>{
			const state = {
				guesses: [],
				feedback: 'Make your guess!',
				auralStatus: '',
				correctAnswer: 99
			}
			const input = 10;			
			const updatedState = reducer(state, makeGuess(input));
			expect(updatedState.feedback).toEqual("You're Ice Cold...");

			const input2 = 98;
			const updatedState2 = reducer(updatedState, makeGuess(input2));
			expect(updatedState2.feedback).toEqual("You're Hot!");
		});
		
		it('Add the guess to the list', ()=>{
			const state = {
				guesses: [],
				feedback: 'Make your guess!',
				auralStatus: '',
				correctAnswer: 99
			}
			const input = 10;			
			const updatedState = reducer(state, makeGuess(input));
			expect(updatedState.guesses[0]).toEqual(input);
			expect(updatedState.guesses.length).toEqual(1);
		});
	});
	
	describe('generateAuralUpdate', ()=>{
		it('should generate aural for multiple guesses', ()=>{
			const state = {
				guesses: [51],
				feedback: "You're Hot!",
				auralStatus: '',
				correctAnswer: 50
			}
			const updatedState = reducer(state, generateAuralUpdate());			
			let expectedStatus = '';
			expectedStatus += 'Here\'s the status of the game right now: You\'re Hot! '
			expectedStatus += 'You\'ve made 1 guess. '
			expectedStatus += 'It was: 51';
			expect(updatedState.auralStatus).toEqual(expectedStatus);
		});

		it('should generate aural for multiple guesses', ()=>{
			const state = {
				guesses: [51,52,53],
				feedback: "You're Hot!",
				auralStatus: '',
				correctAnswer: 50
			}
			const updatedState = reducer(state, generateAuralUpdate());			
			let expectedStatus = '';
			expectedStatus += 'Here\'s the status of the game right now: You\'re Hot! '
			expectedStatus += 'You\'ve made 3 guesses. In order of most- to least-recent, '
			expectedStatus += 'they are: 53, 52, 51';
			expect(updatedState.auralStatus).toEqual(expectedStatus);
		});
	});
});