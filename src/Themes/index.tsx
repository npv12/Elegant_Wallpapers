import React, { useEffect, useContext } from "react";
import { Appearance, NativeEventSubscription } from "react-native";
import { TypeAppContext } from "../types";
import darkColor from "./dark";
import lightColor from "./light";
import { AppContext } from "../context/AppContext";

var listener: NativeEventSubscription;

const Themes = ({ children }) => {
	const { setTheme, setMode, mode } = useContext<TypeAppContext>(AppContext);

	async function setThemeFromStorage() {
		//var themeFromStorage = await AsyncStorage.getItem("theme");
		//TODO: Implement a multi theme selector
		listener = Appearance.addChangeListener(() => {
			setMode(Appearance.getColorScheme());
			setTheme(
				Appearance.getColorScheme() === "light" ? lightColor : darkColor
			);
		});
	}
	useEffect(() => {
		setThemeFromStorage();
		setMode(Appearance.getColorScheme());
		setTheme(Appearance.getColorScheme() === "light" ? lightColor : darkColor);
	}, []);

	useEffect(
		() => () => {
			listener.remove();
		},
		[]
	);

	return <>{children}</>;
};

export default Themes;
