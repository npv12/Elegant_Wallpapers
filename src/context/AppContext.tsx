import React, { createContext, useState, ReactNode } from "react";
import { collectionData, colorScheme, TypeAppContext, TypeWallData } from "../types";
import lightColor from "../Themes/light";

const initialContext: TypeAppContext = {
	theme: lightColor,
	setTheme: (): void => {},
	mode: "light",
	setMode: (): void => {},
	wallpaperData: [],
	setWallpaperData: (): void => {},
	collectionData: [],
	setCollectionData: (): void => {}
};

export const AppContext = createContext<TypeAppContext>(initialContext);

export const AppContextProvider = ({
	children,
}: {
	children: ReactNode;
}): JSX.Element => {
	const [theme, setTheme] = useState<colorScheme>(initialContext.theme);
	const [mode, setMode] = useState<string>(initialContext.mode);
	const [wallpaperData, setWallpaperData] = useState<Array<TypeWallData>>(initialContext.wallpaperData)
	const [collectionData, setCollectionData] = useState<Array<collectionData>>(initialContext.collectionData)

	return (
		<AppContext.Provider
			value={{
				theme,
				setTheme,
				mode,
				setMode,
				wallpaperData,
				setWallpaperData,
				collectionData,
				setCollectionData
			}}
		>
			{children}
		</AppContext.Provider>
	);
};
