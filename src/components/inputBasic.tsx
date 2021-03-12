import { FC } from 'react';
import '../styles/inputBasic.scss';

type props = { name: string };
const InputBasic: FC<props> = ({ name }) => {
	return (
		<div>
			{
				<form>
					<label className='InputBasic'>
						TEXTO:
						<input type='text' name='name' />
					</label>
					<input type='submit' value='Enviar' />
				</form>
			}
		</div>
	);
};

export default InputBasic;
