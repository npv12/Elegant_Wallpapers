import React, { createContext, useState, useEffect } from "react";
import { Appearance, StatusBar } from "react-native";
import { ThemeProvider } from "styled-components/native";

import lightTheme from "./light";
import darkTheme from "./dark";
const defaultMode = Appearance.getColorScheme();
const ThemeContext = createContext({
	mode: defaultMode,
	setMode: (mode) => console.log(mode),
});

export const useTheme = () => React.useContext(ThemeContext);

const ManageThemeProvider = ({ children }) => {
	const [themeState, setThemeState] = useState(defaultMode);
	const setMode = (mode) => {
		setThemeState(mode);
	};

	return (
		<ThemeContext.Provider value={{ mode: themeState, setMode }}>
			<ThemeProvider
				theme={themeState === "dark" ? darkTheme.theme : lightTheme.theme}
			>
				<>
					<StatusBar
						barStyle={themeState === "dark" ? "dark-content" : "light-content"}
					/>
					{children}
				</>
			</ThemeProvider>
		</ThemeContext.Provider>
	);
};

const ThemeManager = ({ children }) => (
	<ManageThemeProvider>{children}</ManageThemeProvider>
);

export default ThemeManager;
