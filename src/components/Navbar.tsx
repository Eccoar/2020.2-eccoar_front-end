import React from 'react';
import isotipo from '../assets/isotipo.svg';

const Navbar: React.FC = () => {
	return (
		<nav className='navbar'>
			<div />
			<img src={isotipo} className='navbar__isotipo' />
			<div className='navbar__hamburguer'>
				<div />
				<div />
				<div />
			</div>
		</nav>
	);
};

export default Navbar;
