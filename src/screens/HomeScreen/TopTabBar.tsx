import React, { useContext } from "react";
import { Dimensions } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { View } from "react-native";

import Explore from "../Explore";
import Collections from "../Collections";
import BottomTab from "../../components/BottomTab";
import { STANDARD_HEIGHT } from "../../constants";
import { TypeAppContext } from "../../types";
import { AppContext } from "../../context/AppContext";

const scaleHeight = Dimensions.get("window").height / STANDARD_HEIGHT;

const Tab = createMaterialTopTabNavigator();

export default function TopTabBar({ navigation }) {
	const { theme, mode, setMode } = useContext<TypeAppContext>(AppContext);
	return (
		<>
			<View
				style={{
					backgroundColor: !(mode == "dark") ? "white" : "black",
					height: 35 * scaleHeight,
				}}
			></View>
			<Tab.Navigator
				tabBarOptions={{
					labelStyle: {
						fontSize: 14 * scaleHeight,
						color: mode == "dark" ? "white" : "black",
						fontFamily: "koliko",
					},
					style: { backgroundColor: mode == "dark" ? "black" : "white" },
					indicatorStyle: {
						backgroundColor: mode == "dark" ? "white" : "black",
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
