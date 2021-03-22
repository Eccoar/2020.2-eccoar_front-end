import React from 'react';

export interface BackDropProps {
	close: React.MouseEventHandler<HTMLDivElement>;
}

const BackDrop: React.FC<BackDropProps> = ({ close }: BackDropProps) => {
	return <div className='backdrop' onClick={close} />;
};

export default BackDrop;
