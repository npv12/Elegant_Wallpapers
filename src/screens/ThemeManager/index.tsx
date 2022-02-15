import React, { useEffect } from "react";
import Themes from "../../themes";
import { useTheme } from "../../themes";
import AsyncStorage from "@react-native-async-storage/async-storage";
import HomeScreen from "../../screens/HomeScreen";

export default function ThemeManager() {
	const theme = useTheme();
	async function setThemeFromStorage() {
		var themeFromStorage = await AsyncStorage.getItem("theme");
		theme.setMode(themeFromStorage!!);
	}
	useEffect(() => {
		setThemeFromStorage();
	}, []);

	return (
		<Themes>
			<HomeScreen />
		</Themes>
	);
}
