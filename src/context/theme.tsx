import React, { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext<ContextProps | null>(null);

export interface ContextProps {
	color: string;
	changeTheme(value: string): void;
}

export interface ThemeProps {
	children: React.ReactNode;
}

const ThemeContextProvider: React.FC<ThemeProps> = ({
	children,
}: ThemeProps) => {
	const [color, setColor] = useState('light');

	useEffect(() => {
		const value = localStorage.getItem('theme');
		if (value === 'dark' || value === 'light') {
			setColor(value);
		}
	}, []);

	function changeTheme(value: string) {
		localStorage.setItem('theme', value);
		setColor(value);
	}

	return (
		<ThemeContext.Provider value={{ color, changeTheme }}>
			<div className={`App ${color === 'dark' ? 'dark' : ''}`}>
				{children}
			</div>
		</ThemeContext.Provider>
	);
};

export default ThemeContextProvider;
