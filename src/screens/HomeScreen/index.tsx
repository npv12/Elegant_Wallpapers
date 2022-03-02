import React, { useContext, useEffect } from "react";
import { Dimensions } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import SetWallpaperScreen from "../../screens/SetWallpaperScreen";
import SpecificCollectionScreen from "../SpecificCollectionScreen";
import AboutScreen from "../../screens/AboutScreen";
import SettingsScreen from "../SettingsScreen";
import FavoriteScreen from "../FavoriteScreen";
import SearchScreen from "../../screens/SearchScreen";
import {
	STANDARD_HEIGHT,
	VERSION_NUMBER,
	VERSION_URL,
	WALL_URL,
} from "../../constants";
import TopTabBar from "./TopTabBar";
import { TypeAppContext } from "../../types";
import { AppContext } from "../../context/AppContext";
import SplashScreen from "react-native-splash-screen";
import { getCollectionsFromData } from "../../utils";

const scaleHeight = Dimensions.get("window").height / STANDARD_HEIGHT;

const Stack = createNativeStackNavigator();

export default function HomeScreen() {
	const { theme, setWallpaperData, setCollectionData, setUpdateState } =
		useContext<TypeAppContext>(AppContext);

	// Fetch all data regarding the wallpapers
	async function getData() {
		fetch(WALL_URL, {
			method: "GET",
		})
			.then((response) => response.json())
			.then((data) => {
				setWallpaperData(data);
				SplashScreen.hide();
				setCollectionData(getCollectionsFromData(data));
			})
			.catch((error) => {
				console.log(error);
			});
		fetch(VERSION_URL, {
			method: "GET",
		})
			.then((response) => response.json())
			.then((responseJson) => {
				if (responseJson.Lastforceupdate > VERSION_NUMBER) setUpdateState(2);
				else if (responseJson.Appversion <= VERSION_NUMBER) setUpdateState(0);
				else setUpdateState(responseJson.Priority);
			})
			.catch((error) => {
				console.log(error);
			});
	}

	useEffect(() => {
		getData();
	}, []);

	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName="Home">
				<Stack.Screen
					name="Home"
					component={TopTabBar}
					options={{ headerShown: false, animation: "fade_from_bottom" }}
				/>
				<Stack.Screen
					name="Wall"
					component={SetWallpaperScreen}
					options={{ headerShown: false, animation: "fade_from_bottom" }}
				/>
				<Stack.Screen
					name="Collection"
					component={SpecificCollectionScreen}
					options={{ headerShown: false, animation: "fade_from_bottom" }}
				/>
				<Stack.Screen
					name="Settings"
					component={SettingsScreen}
					options={{
						title: "Settings",
						headerTitleAlign: "center",
						headerTintColor: theme.text,
						headerTitleStyle: {
							fontFamily: "Linotte-Bold",
							fontWeight: "normal",
							fontSize: 23 * scaleHeight,
						},
						headerStyle: {
							backgroundColor: theme.background,
						},
						animation: "fade_from_bottom",
					}}
				/>
				<Stack.Screen
					name="About"
					component={AboutScreen}
					options={{
						title: "About Elegant",
						headerTitleAlign: "center",
						headerTintColor: theme.text,
						headerTitleStyle: {
							fontFamily: "Linotte-Bold",
							fontWeight: "normal",
							fontSize: 23 * scaleHeight,
						},
						headerStyle: {
							backgroundColor: theme.background,
						},
						animation: "fade_from_bottom",
					}}
				/>
				<Stack.Screen
					name="Fav"
					component={FavoriteScreen}
					options={{
						title: "About Elegant",
						headerTitleAlign: "center",
						headerTintColor: theme.text,
						headerTitleStyle: {
							fontFamily: "Linotte-Bold",
							fontWeight: "normal",
							fontSize: 23 * scaleHeight,
						},
						headerStyle: {
							backgroundColor: theme.background,
						},
						animation: "fade_from_bottom",
					}}
				/>
				<Stack.Screen
					name="Search"
					component={SearchScreen}
					options={{ headerShown: false, animation: "fade_from_bottom" }}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
}
