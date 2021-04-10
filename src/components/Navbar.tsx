import React, { useState } from 'react';
import isotipo from '../assets/isotipo.svg';
import arrow from '../assets/arrow.svg';
import Drawer from './Drawer';
import BackDrop from './Backdrop';
import { Link, useHistory, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
	const [drawerOpen, setDrawerOpen] = useState(false);
	const history = useHistory();

	const { pathname } = useLocation();
	const goBack = () => {
		history.goBack();
	};

	const handleCloseDrawer = () => {
		setDrawerOpen(false);
	};

	let backDrop;
	if (drawerOpen) backDrop = <BackDrop close={handleCloseDrawer} />;

	return (
		<nav className='navbar'>
			{pathname == '/' ? (
				<img src={arrow} className='navbar__noArrow' alt='arrowImg' />
			) : (
				<img
					onClick={() => goBack()}
					src={arrow}
					className='navbar__Arrow'
					alt='arrowImg'
				/>
			)}
			<Drawer close={handleCloseDrawer} show={drawerOpen} />
			{backDrop}
			<Link to='/' data-testid='navbar__isotipo'>
				<img src={isotipo} className='navbar__isotipo' alt='isotipo' />
			</Link>
			<button
				type='button'
				onClick={() => setDrawerOpen(!drawerOpen)}
				className='navbar__button'
				data-testid='navbar__button'
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
