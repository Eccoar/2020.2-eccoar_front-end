import React from 'react';
import Navbar from './components/Navbar';
import ThemeContextProvider from './context/theme';
import Home from './pages/Home';
import './styles/styles.scss';

function App() {
	return (
    <ThemeContextProvider>
			<Navbar />
			<Home />
    </ThemeContextProvider>
	);
}

export default App;
