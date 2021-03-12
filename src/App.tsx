import React, { useState } from 'react';
import ComplainCard from './components/complainCard';
import logo from './logo.svg';
import './App.css';

function App() {
	const [number, setNumber] = useState(0);

	function soma(value: number) {
		setNumber(number + value);
	}

	return (
		<div className='App'>
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
					title='Descrição da Denúncia'
					label='Categoria'
					// photo='aa'
					description='Era uma vez uma denuncia muito foda de mais pa carai foda de mais pa car'
				/>
				<button type='button' onClick={() => soma(1)}>
					click here
				</button>
			</header>
		</div>
	);
}

export default App;
