import { FC, useState, useEffect } from 'react';
import { ReactComponent as Echo } from '../assets/Echo.svg';
import { ReactComponent as Check } from '../assets/Check.svg';

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
	/** Prop para verificação externa do botão pressionado */
	submitted?: boolean;
	/** Função ao clicar no card */
	cardClick?: VoidFunction;
	
	vote_id?: number;
};

const ComplainCard: FC<ComplainCardProps> = ({
	onClick,
	cardClick,
	title,
	label,
	description,
	photo,
	submitted,
	vote_id,
}) => {
	const [isConfirmed, setConfirmed] = useState(false);

	useEffect(() => {
		if (vote_id == null) {
			setConfirmed(false);
		} else {
			setConfirmed(true);
		}
	}, []);

	const buttonClassName = `${
		isConfirmed ? 'complaint__upvote--submitted' : ''
	} complaint__upvote`;

	const formattedDescription =
		description.length > 95
			? description.slice(0, 95) + '...'
			: description;

	const complaintStatus = `${
		status == 'wait' ? 'complaint__upvote--confirmed' : buttonClassName
	}`;
	return (
		<div className='complaint'>
			<section onClick={cardClick} className='complaint__card'>
				{photo ? (
					<div className='complaint__content complaint__content--has-photo'>
						<div>
							<h1 className='complaint__title complaint__title--has-photo'>
								{title}
							</h1>
							<p className='complaint__description'>
								{formattedDescription}
							</p>
						</div>
						<div className='complaint__photo-section'>
							<img
								className='complaint__photo'
								src={photo}
								alt='EchoImage'
							/>
							<div className='complaint__label'>
								<p>{label}</p>
							</div>
						</div>
					</div>
				) : (
					<div className='complaint__content'>
						<h1 className='complaint__title'>{title}</h1>
						<div className='complaint__label'>
							<p>{label}</p>
						</div>
						<p className='complaint__description'>
							{formattedDescription}
						</p>
					</div>
				)}
			</section>
			<button
				type='button'
				onClick={() => {
					!isConfirmed
						? (onClick(), setConfirmed(true))
						: alert('Denuncia já votada');
				}}
				data-testid='button-id'
				className={buttonClassName}
			>
				<Echo
					data-testid='echo-icon'
					className={`${
						isConfirmed
							? 'complaint__icon--selected'
							: 'complaint__icon--unselected'
					} complaint__icon`}
				/>
			</button>
		</div>
	);
};

export default ComplainCard;
