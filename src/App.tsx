import React from 'react';
import Navbar from './components/Navbar';
import ThemeContextProvider from './context/theme';
import './styles/styles.scss';
import Routes from './routes';


function App() {
	return (
    <ThemeContextProvider>
		<Routes />
    </ThemeContextProvider>
	);
}

export default App;
