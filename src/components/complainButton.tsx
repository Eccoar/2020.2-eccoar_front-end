import { FC } from 'react';
import { ReactComponent as MegaPhone } from '../assets/MegaPhone.svg';
import { ReactComponent as ArrowUp } from '../assets/ArrowUp.svg';
import '../styles/complainButton.scss';

type ComplainButtonProps = {
	/** Texto apresentado no botão */
	text: string;
	/** Utilizar padrão vermelho para o botão */
	redPattern?: boolean;
	/** Utilizar icone de 'Seta a frente' com (Requer 'redPattern == true') */
	nextIcon?: boolean;
	/** Função ao clicar no botão */
	onClick?: VoidFunction;
};

const ComplainButton: FC<ComplainButtonProps> = ({
	text,
	redPattern,
	nextIcon,
	onClick,
}) => {
	return (
		<div>
			{redPattern == true ? (
				<button
					type='button'
					onClick={onClick}
					className='complain-button__red'
				>
					{text}
					{nextIcon == true ? (
						<ArrowUp className='complain-button__red__svg' />
					) : null}
				</button>
			) : (
				<button
					type='button'
					onClick={onClick}
					className='complain-button'
				>
					{text}
					<MegaPhone className='complain-button__svg' />
				</button>
			)}
		</div>
	);
};

export default ComplainButton;
