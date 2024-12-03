import { useEffect, useState } from 'react';
import { useGameContext } from '../contexts/GameContextProvider';
import LetterTile from './LetterTile';
import { WORDBOARD } from '../models/wordboard-model';
import './Wordboard.scss';

export default function Wordboard() {
	const [wordboard, setWordboard] = useState(WORDBOARD);
	const { word, turnIndex, letterStatus, error } = useGameContext();

	useEffect(() => {
		setWordboard((prevWordboard) => {
			const updateWordboard = [...prevWordboard];
			const updatedWord = { ...updateWordboard[turnIndex], word };
			updateWordboard[turnIndex] = updatedWord;
			return updateWordboard;
		});
	}, [word, turnIndex]);

	return (
		<ol id="word-board">
			{wordboard.map((item) => (
				<li key={item.id}>
					<ol className="word">
						{item.letters.map((letter) => (
							<LetterTile
								key={letter.id}
								value={item.word.charAt(letter.id)}
								status={letterStatus[item.id] ? letterStatus[item.id][item.word.charAt(letter.id)] : ''}
								error={error && turnIndex === item.id}
							/>
						))}
					</ol>
				</li>
			))}
		</ol>
	);
}
