import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import InputBasic from './components/inputBasic';

function App() {
	const [number, setNumber] = useState(0);
	const [Value, setValue] = useState('');
	function val(e: any) {
		setValue(e.target.value);
		console.log(Value);
	}

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
				<InputBasic
					label='Titulo'
					value={Value}
					inputType='input'
					onChange={val}
				/>

				<button type='button' onClick={() => soma(1)}>
					click here
				</button>
			</header>
		</div>
	);
}

export default App;
