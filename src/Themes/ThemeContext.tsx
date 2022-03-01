import React, { createContext, useState, ReactNode } from "react";
import { colorScheme, TypeThemeContext } from "../types/themes";
import lightColor from "./light";

const initialContext: TypeThemeContext = {
	theme: lightColor,
	setTheme: (): void => {},
	mode: "light",
	setMode: (): void => {},
};

export const ThemeContext = createContext<TypeThemeContext>(initialContext);

export const ThemeContextProvider = ({
	children,
}: {
	children: ReactNode;
}): JSX.Element => {
	const [theme, setTheme] = useState<colorScheme>(initialContext.theme);
	const [mode, setMode] = useState<string>(initialContext.mode);

	return (
		<ThemeContext.Provider
			value={{
				theme,
				setTheme,
				mode,
				setMode,
			}}
		>
			{children}
		</ThemeContext.Provider>
	);
};
