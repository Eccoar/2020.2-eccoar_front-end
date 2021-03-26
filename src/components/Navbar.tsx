import React, { useState } from 'react';
import isotipo from '../assets/isotipo.svg';
import Drawer from './Drawer';
import BackDrop from './Backdrop';
import { Link } from 'react-router-dom';

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
			<Link to='/'>
				<img src={isotipo} className='navbar__isotipo' />
			</Link>
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
