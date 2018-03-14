import {GENERATE_AURAL_UPDATE, RESTART_GAME, MAKE_GUESS} from './actions';
import {generateAuralUpdate, restartGame, makeGuess} from './actions';

describe('generateAuralUpdate', ()=>{
	it('should update aural', ()=>{
		const action = generateAuralUpdate();
		expect(action.type).toEqual(GENERATE_AURAL_UPDATE);		
	});
});

describe('restartGame', ()=>{
	it('should reset the settings for the new game', ()=>{
		const action = restartGame();
		expect(action.type).toEqual(RESTART_GAME);		
	});
});

describe('makeGuess', ()=>{
	it('should add the guess', ()=>{
		const guessNum = 50;
		const action = makeGuess(guessNum);
		expect(action.type).toEqual(MAKE_GUESS);
		expect(action.guess).toEqual(guessNum);
	});
});