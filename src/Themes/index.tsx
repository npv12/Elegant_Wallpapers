import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect, useContext } from "react";
import { StatusBar, Appearance, NativeEventSubscription } from "react-native";
import { TypeThemeContext } from "../types/themes";
import darkColor from "./dark";
import lightColor from "./light";
import { ThemeContext } from "./ThemeContext";

const Themes = ({ children }) => {
	const { setTheme, setMode, mode } = useContext<TypeThemeContext>(ThemeContext)

	async function setThemeFromStorage() {
		var themeFromStorage = await AsyncStorage.getItem("theme");
		Appearance.addChangeListener(() => {
			setMode(Appearance.getColorScheme())
			setTheme(Appearance.getColorScheme() === "light" ? lightColor : darkColor)
		})
	}
	useEffect(() => {
		setThemeFromStorage();
		setMode(Appearance.getColorScheme())
		setTheme(Appearance.getColorScheme() === "light" ? lightColor : darkColor)
	}, [])

	return (
		<>
			<StatusBar
				barStyle={mode === "dark" ? "dark-content" : "light-content"}
			/>
			{children}
		</>
	);
};

export default Themes;
