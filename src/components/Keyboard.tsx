import { useGameContext, WORD_LENGTH } from '../contexts/GameContextProvider';
import { KEYBOARD } from '../models/keyboard-model';
import './Keyboard.scss';

export default function Keyboard() {
	const { addLetter, deleteLetter, processTurn, word, letterStatus } = useGameContext();
	const keyStatus = letterStatus.reduce((target, value) => Object.assign({}, target, value), {});

	function handleKeyClick(value: string) {
		if (value !== 'Enter' && value !== 'Delete' && word.length < WORD_LENGTH) {
			addLetter(value);
		}

		if (value === 'Delete' && word.length > 0) {
			deleteLetter();
		}

		if (value === 'Enter' && word.length === WORD_LENGTH) {
			processTurn();
		}
	}

	return (
		<ol id="keyboard">
			{KEYBOARD.map((row) => (
				<li key={row.id}>
					<ol className="keyboard-keys">
						{row.keys.map((item) => (
							<li key={item.id}>
								<button
									type="button"
									className={item.value in keyStatus ? `keyboard-key ${keyStatus[item.value]}` : 'keyboard-key'}
									onClick={() => handleKeyClick(item.value)}>
									{item.value === 'Delete' ? '\u232B' : item.value}
								</button>
							</li>
						))}
					</ol>
				</li>
			))}
		</ol>
	);
}
