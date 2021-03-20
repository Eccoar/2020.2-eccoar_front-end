import React from 'react';
import moon from '../assets/Moon.svg';
import closeButton from '../assets/Close.svg';

export interface DrawerProps {
	show: boolean;
  close: React.MouseEventHandler<HTMLDivElement>;
}

const Drawer: React.FC<DrawerProps> = ({ show, close }: DrawerProps) => {
	let drawerClass = 'side-drawer';
	if (show) drawerClass = 'side-drawer open';

	return (
		<>
			<nav className={drawerClass}>
				<div className='side-drawer__content'>
					<div className='side-drawer__button' onClick={close} >
						<img className='side-drawer__close' src={closeButton} />
					</div>
					<div className='side-drawer__links'>
						<br></br>
						<a
							className='side-drawer__text'
							href='https://www.facebook.com'
						>
							CRIAR DENÚNCIA
						</a>
						<br></br>
						<a
							className='side-drawer__text'
							href='https://google.com'
						>
							VER DENÚNCIAS
						</a>
						<br></br>
					</div>
					<div onClick={() => console.log('Mudou')} className='side-drawer__mode'>
						<img src={moon} className='side-drawer__moon' />
						<p className='side-drawer__bottom_text'>MODO ESCURO</p>
					</div>
				</div>
			</nav>
		</>
	);
};

export default Drawer;