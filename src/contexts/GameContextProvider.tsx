import { createContext, useContext, useReducer } from 'react';
import { motion } from 'motion/react';
import { WORDS_LIST } from '../data/words';

type GameContextProviderProps = {
	children: React.ReactNode;
};

type LetterStatus = Record<string, any>;

interface Context {
	word: string;
	turnIndex: number;
	letterStatus: LetterStatus[];
	error: boolean;
	result: string;
	addLetter: (value: string) => void;
	deleteLetter: () => void;
	processTurn: () => void;
}

const GameContext = createContext<Context>({
	word: '',
	turnIndex: 0,
	letterStatus: [],
	error: false,
	result: '',
	addLetter: () => {},
	deleteLetter: () => {},
	processTurn: () => {}
});

export function useGameContext() {
	return useContext(GameContext);
}

export const MAX_TURNS = 6;

export const WORD_LENGTH = 5;

const WINNING_WORD = 'REACT';

const WINNING_STATEMENTS = ['Genius', 'Magnificent', 'Impressive', 'Splendid', 'Great', 'Phew'];

interface State {
	word: string;
	turnIndex: number;
	letterStatus: LetterStatus[];
	error: boolean;
	result: string;
}

interface Action {
	type: 'addLetter' | 'deleteLetter' | 'processTurn' | 'error';
	payload?: string;
}

const initialState: State = {
	word: '',
	turnIndex: 0,
	letterStatus: [],
	error: false,
	result: ''
};

function reducer(state: State, action: Action) {
	const { word, turnIndex, letterStatus } = state;
	const { type, payload } = action;

	switch (type) {
		case 'addLetter':
			return { ...state, word: word.concat(payload!) } as State;

		case 'deleteLetter':
			return { ...state, word: word.substring(0, word.length - 1), error: false } as State;

		case 'processTurn':
			// Eval word & generate letter statuses for the current turn.
			const statuses = Array.from(word).map((letter, index) => {
				const isNotUsed = !WINNING_WORD.includes(letter);
				const isUsed = WINNING_WORD.includes(letter) && WINNING_WORD.indexOf(letter) !== index;
				return [letter, isNotUsed ? 'not-used' : isUsed ? 'used' : 'match'];
			});

			// Check if game is won.
			const isWinner = statuses.filter((item) => item[1] === 'match').length === WORD_LENGTH;

			// Check if max turns have been used.
			const usedMaxTurns = turnIndex === MAX_TURNS - 1;

			if (!isWinner && !usedMaxTurns) {
				return {
					word: '',
					turnIndex: turnIndex + 1,
					letterStatus: [...letterStatus, { ...Object.fromEntries(statuses) }]
				} as State;
			} else if (!isWinner && usedMaxTurns) {
				return {
					...state,
					letterStatus: [...letterStatus, { ...Object.fromEntries(statuses) }],
					result: 'Sorry! Better luck next time.'
				} as State;
			} else {
				return {
					...state,
					letterStatus: [...letterStatus, { ...Object.fromEntries(statuses) }],
					result: WINNING_STATEMENTS[turnIndex]
				} as State;
			}

		case 'error':
			return { ...state, error: true } as State;

		default:
			return { ...state } as State;
	}
}

export default function GameContextProvider({ children }: GameContextProviderProps) {
	const [state, dispatch] = useReducer(reducer, initialState);

	function addLetter(value: string) {
		dispatch({ type: 'addLetter', payload: value });
	}

	function deleteLetter() {
		dispatch({ type: 'deleteLetter' });
	}

	function processTurn() {
		if (!WORDS_LIST.includes(state.word.toLocaleLowerCase())) {
			dispatch({ type: 'error' });
			return;
		}

		dispatch({ type: 'processTurn' });
	}

	const ctxValue: Context = {
		word: state.word,
		turnIndex: state.turnIndex,
		letterStatus: state.letterStatus,
		error: state.error,
		result: state.result,
		addLetter,
		deleteLetter,
		processTurn
	};

	return (
		<motion.section
			initial={{ opacity: 0, y: 16 }}
			animate={{ opacity: 1, y: 0, transition: { duration: 0.3 } }}
			id="game">
			<GameContext.Provider value={ctxValue}>{children}</GameContext.Provider>
		</motion.section>
	);
}
