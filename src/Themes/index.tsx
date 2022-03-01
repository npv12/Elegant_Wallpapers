import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect } from "react";
import { StatusBar, Appearance } from "react-native";

const Themes = ({ children }) => {
	const [themeState, setThemeState] = useState<string>(
		Appearance.getColorScheme() || "light"
	);

	async function setThemeFromStorage() {
		var themeFromStorage = await AsyncStorage.getItem("theme");
		console.log(themeFromStorage);
	}
	useEffect(() => {
		setThemeFromStorage();
	}, []);

	useEffect(() => {
		setThemeState(Appearance.getColorScheme());
		console.log(Appearance.getColorScheme());
	}, [Appearance.getColorScheme()]);

	return (
		<>
			<StatusBar
				barStyle={themeState === "dark" ? "dark-content" : "light-content"}
			/>
			{children}
		</>
	);
};

export default Themes;
