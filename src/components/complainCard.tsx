import { FC } from 'react';
import { ReactComponent as Echo } from '../assets/Echo.svg';
import '../styles/complainCard.scss';

type ComplainCardProps = {
	// /** Define o titulo do card de denuncía */
	title: string;
	// /** Define a label do card de denuncía */
	label: string;
	// /** Define a descrição do card de denuncía */
	description: string;
	// /** Define url ou path da foto da denuncía */
	photo?: string;
	/** Função ao clicar no botão */
	onClick?: VoidFunction;
};

const ComplainCard: FC<ComplainCardProps> = ({
	onClick,
	title,
	label,
	description,
	photo,
}) => {
	return (
		<div className='container'>
			<section className='card-container'>
				{photo ? (
					<div></div>
				) : (
					<div className='card-content'>
						<h1 id='title'>{title}</h1>
						<div className='label'>
							<p>{label}</p>
						</div>
						<span id='description'>{description}</span>
					</div>
				)}
			</section>
			<button type='button' onClick={onClick} className='upvote'>
				<Echo className='icon' />
			</button>
		</div>
	);
};

export default ComplainCard;
