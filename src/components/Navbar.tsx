import React, { useState } from 'react';

import isotipo from '../assets/isotipo.svg';
import sun from '../assets/Sun.svg';
import close from '../assets/Close.svg';
import '../styles/navbar.scss';
import '../styles/backdrop.scss';

export interface Drawer {
	show: any;
}

export interface BackDrop {
	close: any;
}

export const BackDrop: React.FC<BackDrop> = ({ close }: BackDrop) => {
	return <div className='backdrop' onClick={close} />;
};

export const Drawer: React.FC<Drawer> = ({ show }: Drawer) => {
	let drawerClass = 'side-drawer';
	if (show) drawerClass = 'side-drawer open';

	return (
		<>
			<nav className={drawerClass}>
				<div className='side-drawer__content'>
					<button className='side-drawer__button'>
						<img className='side-drawer__close' src={close} />
					</button>
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
					<div className='side-drawer__light'>
						<img src={sun} className='side-drawer__sun' />
						<p className='side-drawer__bottom_text'>MODO CLARO</p>
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
			<Drawer show={drawerOpen} />
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
