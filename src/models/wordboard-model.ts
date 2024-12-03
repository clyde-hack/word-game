import { MAX_TURNS, WORD_LENGTH } from '../contexts/GameContextProvider';

type Letter = { id: number };
type Turn = { id: number; word: string; letters: Letter[] };

export const WORDBOARD = Array(MAX_TURNS)
	.fill({ id: 0, word: '', letters: [] })
	.map((turn, index) => {
		return {
			...turn,
			id: index,
			letters: Array(WORD_LENGTH)
				.fill({ id: 0 })
				.map((letter, index) => ({ ...letter, id: index })) as Letter[]
		};
	}) as Turn[];
