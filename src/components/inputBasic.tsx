import { FC } from 'react';
import '../styles/inputBasic.scss';

type props = { name: string };
const InputBasic: FC<props> = ({ name }) => {
	return <div>{name}</div>;
};

export default InputBasic;
