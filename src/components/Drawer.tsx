import React, { useContext } from 'react';
import moon from '../assets/Moon.svg';
import sun from '../assets/Sun.svg';
import closeButton from '../assets/Close.svg';
import { ThemeContext } from '../context/theme';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { getFlag } from '../services/flagr';

export interface DrawerProps {
	show: boolean;
	close(): void;
}

const Drawer: React.FC<DrawerProps> = ({ show, close }: DrawerProps) => {
	const colorChanger = useContext(ThemeContext);

	let drawerClass = 'side-drawer';
	if (show) drawerClass = 'side-drawer open';

	useEffect(() => {
		getFlag('2').then((response) => {
			const browser = response.data.segments[0].constraints[0].value.replace(
				/['"]+/g,
				'',
			);
			if (navigator.userAgent.includes(browser)) {
				colorChanger?.changeTheme(response.data.variants[0].key);
			}
		});
	}, []);

	return (
		<>
			<nav className={drawerClass}>
				<div className='side-drawer__content'>
					<div>
						<img
							role='button'
							className='side-drawer__close'
							src={closeButton}
							onClick={close}
						/>
						<div className='side-drawer__links'>
							<Link
								className='side-drawer__text'
								to='/submit-complaint/infos'
								onClick={close}
							>
								CRIAR DENÚNCIA
							</Link>
							<Link
								className='side-drawer__text'
								to='/'
								onClick={close}
							>
								VER DENÚNCIAS
							</Link>
						</div>
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
