import { Dispatch, SetStateAction } from "react";

export type colorScheme = {
	background: string;
	border: string;
	backgroundAlt: string;
	borderAlt: string;
	text: string;
};

export type TypeAppContext = {
	theme: colorScheme;
	setTheme: Dispatch<SetStateAction<colorScheme>>;
	mode: string;
	setMode: Dispatch<SetStateAction<string>>;
	wallpaperData: Array<TypeWallData>
	setWallpaperData: Dispatch<SetStateAction<Array<TypeWallData>>>
};

export type TypeWallData = {
	author: string,
	collection: string, 
	name: string, 
	thumbnail: string, 
	url: string, 
	resolution: string, 
	dominantColor: string
}