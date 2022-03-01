import { Dispatch, SetStateAction } from "react";

export type colorScheme = {
	background: string;
	border: string;
	backgroundAlt: string;
	borderAlt: string;
	text: string;
};

export type TypeThemeContext = {
	theme: colorScheme;
	setTheme: Dispatch<SetStateAction<colorScheme>>;
	mode: string;
	setMode: Dispatch<SetStateAction<string>>;
};
