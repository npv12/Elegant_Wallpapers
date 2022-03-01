import React, { useContext } from "react";
import { Dimensions } from "react-native";
import {
	createStackNavigator,
	CardStyleInterpolators,
} from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import SetWallpaper from "../../screens/SetWallpaper";
import SpecificCollection from "../../screens/SpecificCollection";
import About from "../../screens/About";
import Settings from "../../screens/Settings";
import Favorite from "../Favorite";
import SearchScreen from "../../screens/SearchScreen";
import { STANDARD_HEIGHT } from "../../constants";
import TopTabBar from "./TopTabBar";
import { TypeThemeContext } from "../../types/themes";
import { ThemeContext } from "../../Themes/ThemeContext";

const scaleHeight = Dimensions.get("window").height / STANDARD_HEIGHT;

const Stack = createStackNavigator();

export default function HomeScreen() {
	const { theme } = useContext<TypeThemeContext>(ThemeContext);

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
					component={SpecificCollection}
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name="Settings"
					component={Settings}
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
					component={About}
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
					component={Favorite}
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
