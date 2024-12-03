import { motion } from 'motion/react';
import './Intro.scss';

type IntroProps = {
	onCta?: () => void;
};

export default function Intro({ onCta }: IntroProps) {
	return (
		<motion.section exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.3 } }} id="intro">
			<h2>Get 6 chances to guess a 5 letter word</h2>

			<button type="button" id="intro-cta" onClick={onCta}>
				Play
			</button>
		</motion.section>
	);
}
