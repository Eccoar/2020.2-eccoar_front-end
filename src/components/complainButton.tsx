import { FC } from 'react';
import '../styles/complainButton.scss';

type ComplainButtonProps = {
	text: string;
	isLight: boolean;
	redPattern?: boolean;
	icon?: React.ComponentType | string;
	onClick?: VoidFunction;
};

const ComplainButton: FC<ComplainButtonProps> = ({
	text,
	isLight,
	redPattern,
	onClick,
}) => {
	return (
		<div>
			{isLight == true ? (
				redPattern == true ? (
					<button
						type='button'
						onClick={onClick}
						className='complain-button__light__red'
					>
						{text}
					</button>
				) : (
					<button
						type='button'
						onClick={onClick}
						className='complain-button__light'
					>
						{text}
					</button>
				)
			) : redPattern == true ? (
				<button
					type='button'
					onClick={onClick}
					className='complain-button__red'
				>
					{text}
				</button>
			) : (
				<button
					type='button'
					onClick={onClick}
					className='complain-button'
				>
					{text}
				</button>
			)}
		</div>
	);
};

export default ComplainButton;
