import React from "react";
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
import Fav from "../../screens/favorite";
import SearchScreen from "../../screens/SearchScreen";
import { useTheme } from "../../themes";
import { STANDARD_HEIGHT } from "../../constants";
import TopTabBar from "./TopTabBar";

const scaleHeight = Dimensions.get("window").height / STANDARD_HEIGHT;

const Stack = createStackNavigator();

export default function HomeScreen() {
	const theme = useTheme();

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
						headerTintColor: theme.mode == "dark" ? "white" : "black",
						headerTitleStyle: {
							fontFamily: "Linotte-Bold",
							fontWeight: "normal",
							fontSize: 23 * scaleHeight,
						},
						headerStyle: {
							backgroundColor: !(theme.mode == "dark") ? "white" : "black",
						},
					}}
				/>
				<Stack.Screen
					name="About"
					component={About}
					options={{
						title: "About Elegant",
						headerTitleAlign: "center",
						headerTintColor: theme.mode == "dark" ? "white" : "black",
						headerTitleStyle: {
							fontFamily: "Linotte-Bold",
							fontWeight: "normal",
							fontSize: 23 * scaleHeight,
						},
						headerStyle: {
							backgroundColor: !(theme.mode == "dark") ? "white" : "black",
						},
					}}
				/>
				<Stack.Screen
					name="Fav"
					component={Fav}
					options={{
						title: "About Elegant",
						headerTitleAlign: "center",
						headerTintColor: theme.mode == "dark" ? "white" : "black",
						headerTitleStyle: {
							fontFamily: "Linotte-Bold",
							fontWeight: "normal",
							fontSize: 23 * scaleHeight,
						},
						headerStyle: {
							backgroundColor: !(theme.mode == "dark") ? "white" : "black",
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
