import React, { useState } from 'react';

import isotipo from '../assets/isotipo.svg';
import moon from '../assets/Moon.svg';
import closeButton from '../assets/Close.svg';
import '../styles/components/_navbar.scss';

export interface Drawer {
	show: boolean;
  close: React.MouseEventHandler<HTMLDivElement>;
}

export interface BackDrop {
	close: React.MouseEventHandler<HTMLDivElement>;
}

export const BackDrop: React.FC<BackDrop> = ({ close }: BackDrop) => {
	return <div className='backdrop' onClick={close} />;
};

export const Drawer: React.FC<Drawer> = ({ show, close }: Drawer) => {
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
							href='http://www.facebook.com'
						>
							CRIAR DENÚNCIA
						</a>
						<br></br>
						<a
							className='side-drawer__text'
							href='http://google.com'
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

const Navbar: React.FC = () => {
	const [drawerOpen, setDrawerOpen] = useState(false);

	const handleCloseDrawer = () => {
		setDrawerOpen(false);
	};

	let backDrop;
	if (drawerOpen) backDrop = <BackDrop close={handleCloseDrawer} />;

	return (
		<nav className='navbar'>
			<Drawer close={handleCloseDrawer} show={drawerOpen} />
			{backDrop}
			<div />
			<img src={isotipo} className='navbar__isotipo' />
			<button
				type='button'
				onClick={() => setDrawerOpen(!drawerOpen)}
				className='navbar__button'
			>
				<div className='navbar__hamburguer'>
					<div />
					<div />
					<div />
				</div>
			</button>
		</nav>
	);
};

export default Navbar;
