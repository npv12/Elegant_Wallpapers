import React from "react";
import { Dimensions } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { View } from "react-native";

import Explore from "../Explore";
import Collections from "../Collections";
import BottomTab from "../../components/BottomTab";
import { useTheme } from "../../themes";
import { STANDARD_HEIGHT } from "../../constants";

const scaleHeight = Dimensions.get("window").height / STANDARD_HEIGHT;

const Tab = createMaterialTopTabNavigator();

export default function TopTabBar({ navigation }) {
	const theme = useTheme();
	return (
		<>
			<View
				style={{
					backgroundColor: !(theme.mode == "dark") ? "white" : "black",
					height: 35 * scaleHeight,
				}}
			></View>
			<Tab.Navigator
				tabBarOptions={{
					labelStyle: {
						fontSize: 14 * scaleHeight,
						color: theme.mode == "dark" ? "white" : "black",
						fontFamily: "koliko",
					},
					style: { backgroundColor: theme.mode == "dark" ? "black" : "white" },
					indicatorStyle: {
						backgroundColor: theme.mode == "dark" ? "white" : "black",
					},
				}}
			>
				<Tab.Screen name="Explore" component={Explore} />
				<Tab.Screen name="Collections" component={Collections} />
			</Tab.Navigator>
			<BottomTab navigation={navigation} />
		</>
	);
}
