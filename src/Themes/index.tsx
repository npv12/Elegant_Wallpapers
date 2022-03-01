import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect, useContext } from "react";
import { StatusBar, Appearance } from "react-native";
import { TypeThemeContext } from "../types/themes";
import darkColor from "./dark";
import lightColor from "./light";
import { ThemeContext } from "./ThemeContext";
var listener

const Themes = ({ children }) => {
	const { setTheme, setMode, mode } = useContext<TypeThemeContext>(ThemeContext)

	async function setThemeFromStorage() {
		var themeFromStorage = await AsyncStorage.getItem("theme");
		listener = Appearance.addChangeListener(() => {
			setMode(Appearance.getColorScheme())
			setTheme(Appearance.getColorScheme() === "light" ? lightColor : darkColor)
			console.log("The color scheme is " + Appearance.getColorScheme())
		})
	}
	useEffect(() => {
		setThemeFromStorage();
	}, [])

	useEffect(() => () => {
		listener.remove()
	})

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
