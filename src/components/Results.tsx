import { motion } from 'motion/react';
import { useGameContext } from '../contexts/GameContextProvider';
import './Results.scss';

export default function Results() {
	const { result } = useGameContext();

	return (
		<>
			{result && (
				<motion.dialog
					initial={{ opacity: 0, y: 16 }}
					animate={{ opacity: 1, y: 0, transition: { duration: 0.3, delay: 1.5 } }}
					className="result"
					open>
					{result}
				</motion.dialog>
			)}
		</>
	);
}
