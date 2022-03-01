import React, { createContext, useState, ReactNode } from "react";
import { colorScheme, TypeAppContext } from "../types/themes";
import lightColor from "../Themes/light";

const initialContext: TypeAppContext = {
	theme: lightColor,
	setTheme: (): void => { },
	mode: "light",
	setMode: (): void => { },
};

export const AppContext = createContext<TypeAppContext>(initialContext);

export const AppContextProvider = ({
	children,
}: {
	children: ReactNode;
}): JSX.Element => {
	const [theme, setTheme] = useState<colorScheme>(initialContext.theme);
	const [mode, setMode] = useState<string>(initialContext.mode);

	return (
		<AppContext.Provider
			value={{
				theme,
				setTheme,
				mode,
				setMode,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};
