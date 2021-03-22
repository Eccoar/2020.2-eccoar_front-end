import React, { useContext } from 'react';
import moon from '../assets/Moon.svg';
import sun from '../assets/Sun.svg';
import closeButton from '../assets/Close.svg';
import { ThemeContext } from '../context/theme';
import { Link } from 'react-router-dom';

export interface DrawerProps {
	show: boolean;
	close(): void;
}

const Drawer: React.FC<DrawerProps> = ({ show, close }: DrawerProps) => {
	const colorChanger = useContext(ThemeContext);

	let drawerClass = 'side-drawer';
	if (show) drawerClass = 'side-drawer open';

	return (
		<>
			<nav className={drawerClass}>
				<div className='side-drawer__content'>
					<div className='side-drawer__button' onClick={close}>
						<img className='side-drawer__close' src={closeButton} />
					</div>
					<div className='side-drawer__links'>
						<br></br>
						<Link
							className='side-drawer__text'
							to='/submit-complaint/infos'
						>
							CRIAR DENÚNCIA
						</Link>
						<br></br>
						<Link className='side-drawer__text' to='/'>
							VER DENÚNCIAS
						</Link>
						<br></br>
					</div>
					{colorChanger?.color === 'light' ? (
						<div
							onClick={() => colorChanger?.changeTheme('dark')}
							className='side-drawer__mode'
						>
							<img src={moon} className='side-drawer__toggle' />
							<p className='side-drawer__bottom_text'>
								MODO ESCURO
							</p>
						</div>
					) : (
						<div
							onClick={() => colorChanger?.changeTheme('light')}
							className='side-drawer__mode'
						>
							<img src={sun} className='side-drawer__toggle' />
							<p className='side-drawer__bottom_text'>
								MODO CLARO
							</p>
						</div>
					)}
				</div>
			</nav>
		</>
	);
};

export default Drawer;
