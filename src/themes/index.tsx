import React, { createContext, useState, useEffect, useCallback } from "react";
import { StatusBar, Appearance } from "react-native";
import { ThemeProvider } from "styled-components/native";

import lightTheme from "./light";
import darkTheme from "./dark";
const defaultMode = Appearance.getColorScheme() || "light";
const ThemeContext = createContext({
	mode: defaultMode,
	setMode: (mode) => console.log(mode),
});

export const useTheme = () => React.useContext(ThemeContext);
const ManageThemeProvider = ({ children }) => {
	const [themeState, setThemeState] = useState(defaultMode);
	const setMode = (mode: any) => {
		setThemeState(mode);
	};

	const changeOnListener = useCallback(() => {
		setThemeState(Appearance.getColorScheme());
	}, []);

	useEffect(() => {
		Appearance.addChangeListener(changeOnListener);
		return () => Appearance.removeChangeListener(changeOnListener);
	}, []);

	return (
		<ThemeContext.Provider value={{ mode: themeState, setMode }}>
			<ThemeProvider
				theme={themeState === "dark" ? darkTheme.theme : lightTheme.theme}
			>
				<StatusBar
					barStyle={themeState === "dark" ? "dark-content" : "light-content"}
				/>
				{children}
			</ThemeProvider>
		</ThemeContext.Provider>
	);
};

const Themes = ({ children }) => (
	<ManageThemeProvider>{children}</ManageThemeProvider>
);

export default Themes;
