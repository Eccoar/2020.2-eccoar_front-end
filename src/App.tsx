import React, { useState } from 'react';
import ComplainCard from './components/complainCard';
import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';

function App() {
	const [number, setNumber] = useState(0);
	const [button, setButton] = useState(false);

	const fun = () => {
		setButton(!button);
	};

	function soma(value: number) {
		setNumber(number + value);
	}

	return (
		<div className='App'>
			<Navbar />
			<header className='App-header'>
				<img src={logo} className='App-logo' alt='logo' />
				<p>
					Edit <code>src/App.tsx</code> and save to reload.
				</p>
				<a
					className='App-link'
					href='https://reactjs.org'
					target='_blank'
					rel='noopener noreferrer'
				>
					Learn React
				</a>
				<p>{number}</p>
				<ComplainCard
					title='Descrição'
					label='Categoria'
					// photo={'https://static.toiimg.com/photo/72975551.cms'}
					onClick={fun}
					cardClick={fun}
					submitted={button}
					description='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam condimentum velit eu sapien porttitor, consequat semper felis faucibus. Pellentesque ac.'
				/>
				<button type='button' onClick={() => soma(1)}>
					click here
				</button>
			</header>
		</div>
	);
}

export default App;
