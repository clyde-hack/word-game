import { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import Intro from './components/Intro';
import GameContextProvider from './contexts/GameContextProvider';
import Results from './components/Results';
import Wordboard from './components/Wordboard';
import Keyboard from './components/Keyboard';

export default function App() {
	const [showIntro, setShowIntro] = useState(true);

	function handleCtaClick() {
		setShowIntro(false);
	}

	return (
		<AnimatePresence mode="wait">
			{showIntro && <Intro key="intro" onCta={handleCtaClick} />}

			{!showIntro && (
				<GameContextProvider key="game">
					<Results />
					<Wordboard />
					<Keyboard />
				</GameContextProvider>
			)}
		</AnimatePresence>
	);
}
