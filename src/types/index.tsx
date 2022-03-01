import { Dispatch, SetStateAction } from "react";

export type colorScheme = {
	background: string;
	border: string;
	backgroundAlt: string;
	borderAlt: string;
	text: string;
};

export type TypeAppContext = {
	theme: colorScheme; //Sets the required theme color scheme
	setTheme: Dispatch<SetStateAction<colorScheme>>;
	mode: string; // Sets the theme mode like dark or light. WIll soon be deprecated in favour theme
	setMode: Dispatch<SetStateAction<string>>;
	wallpaperData: Array<TypeWallData> // Contains all details regarding all the wallpaper present inside the repo
	setWallpaperData: Dispatch<SetStateAction<Array<TypeWallData>>>
	collectionData: Array<collectionData> // Contains details containing collecions specific data extarcted from wallpaper data
	setCollectionData: Dispatch<SetStateAction<Array<collectionData>>>,
	updateState: number, // Contains the update state of the app. If it is 0 then app is fine, If onw then ping user to update. If 2 then force user to do the same
	setUpdateState: Dispatch<SetStateAction<number>>
};

export type TypeWallData = {
	author: string,
	collections: string, 
	name: string, 
	thumbnail: string, 
	url: string, 
	resolution: string, 
	dominantColor: string
}

export type collectionData = {
    key: string,
    thumbnail: string,
    url: string,
    collections: string
}