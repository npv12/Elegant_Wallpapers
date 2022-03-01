import React, { useContext, useEffect } from "react";
import { Dimensions } from "react-native";
import {
	createStackNavigator,
	CardStyleInterpolators,
} from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import SetWallpaper from "../../screens/SetWallpaper";
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

const Stack = createStackNavigator();

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
			<Stack.Navigator
				initialRouteName="Home"
				screenOptions={{
					cardStyleInterpolator:
						CardStyleInterpolators.forRevealFromBottomAndroid,
				}}
			>
				<Stack.Screen
					name="Home"
					component={TopTabBar}
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name="Wall"
					component={SetWallpaper}
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name="Collection"
					component={SpecificCollectionScreen}
					options={{ headerShown: false }}
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
					}}
				/>
				<Stack.Screen
					name="Search"
					component={SearchScreen}
					options={{ headerShown: false }}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
}
