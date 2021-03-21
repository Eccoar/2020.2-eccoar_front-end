import React from 'react';
import Navbar from './components/Navbar';
import ThemeContextProvider from './context/theme';
import './styles/styles.scss';

function App() {
	return (
    <ThemeContextProvider>
			<Navbar />
    </ThemeContextProvider>
	);
}

export default App;
