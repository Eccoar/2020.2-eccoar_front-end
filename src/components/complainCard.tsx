import { FC } from 'react';
import { ReactComponent as Echo } from '../assets/Echo.svg';

type ComplainCardProps = {
	/** Define o titulo do card de denuncía */
	title: string;
	/** Define a label do card de denuncía */
	label: string;
	/** Define a descrição do card de denuncía */
	description: string;
	/** Define url ou path da foto da denuncía */
	photo?: string;
	/** Função ao clicar no botão */
	onClick?: VoidFunction;
	/** Prop para verificação externa do botão precionado */
	submitted?: boolean;
	/** Função ao clicar no card */
	cardClick?: VoidFunction;
};

const ComplainCard: FC<ComplainCardProps> = ({
	onClick,
	cardClick,
	title,
	label,
	description,
	photo,
	submitted,
}) => {
	const buttonClassName = `${submitted ? 'upvote__submitted' : ''} upvote`;

	return (
		<div className='container'>
			<section onClick={cardClick} className='card-container'>
				{photo ? (
					<div className='card-photo-content'>
						<div>
							<h1 className='title title__photo'>{title}</h1>
							<span className='description description__four-lines'>
								{description}
							</span>
						</div>
						<div className='photo-section'>
							<img
								className='card-photo'
								src={photo}
								alt='EchoImage'
							/>
							<div className='label'>
								<p>{label}</p>
							</div>
						</div>
					</div>
				) : (
					<div className='card-content'>
						<h1 className='title'>{title}</h1>
						<div className='label'>
							<p>{label}</p>
						</div>
						<span className='description'>{description}</span>
					</div>
				)}
			</section>
			<button type='button' onClick={onClick} className={buttonClassName}>
				<Echo className={submitted ? 'icon-black' : 'icon-red'} />
			</button>
		</div>
	);
};

export default ComplainCard;
