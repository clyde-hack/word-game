import { useEffect } from 'react';
import { animate, stagger } from 'motion/react';
import './LetterTile.scss';

type LetterTileProps = {
	value: string;
	status: string;
	error: boolean;
};

export default function LetterTile({ value, status, error }: LetterTileProps) {
	const tileClass = status ? 'letter-tile scored' : error ? 'letter-tile error' : 'letter-tile';
	const tileBackClass = status ? `letter-tile-back ${status}` : 'letter-tile-back';

	useEffect(() => {
		if (status) {
			animate('.scored', { rotateX: -180 }, { delay: stagger(0.06), duration: 0.3, ease: 'easeIn' });
		}
	}, [status]);

	useEffect(() => {
		if (error) {
			animate('.error', { x: [0, -3, 0, 3, 0] }, { duration: 0.1, repeat: 3 });
		}
	}, [error]);

	return (
		<li>
			<div className={tileClass}>
				<span className="letter-tile-front">{value}</span>
				<span className={tileBackClass}>{value}</span>
			</div>
		</li>
	);
}
