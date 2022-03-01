import React, { useContext } from "react";
import { Dimensions } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { View } from "react-native";

import Collections from "../Collections";
import BottomTab from "../../components/BottomTab";
import { STANDARD_HEIGHT } from "../../constants";
import { TypeAppContext } from "../../types";
import { AppContext } from "../../context/AppContext";

const scaleHeight = Dimensions.get("window").height / STANDARD_HEIGHT;

const Tab = createMaterialTopTabNavigator();

export default function TopTabBar({ navigation }) {
	const { theme } = useContext<TypeAppContext>(AppContext);
	return (
		<>
			<View
				style={{
					backgroundColor: theme.background,
					height: 35 * scaleHeight,
				}}
			></View>
			<Tab.Navigator
				tabBarOptions={{
					labelStyle: {
						fontSize: 14 * scaleHeight,
						color: theme.text,
						fontFamily: "koliko",
					},
					style: { backgroundColor: theme.background },
					indicatorStyle: {
						backgroundColor: theme.background,
					},
				}}
			>
				<Tab.Screen
					name="Explore"
					component={Collections}
					initialParams={{ isCollection: false }}
				/>
				<Tab.Screen
					name="Collections"
					component={Collections}
					initialParams={{ isCollection: true }}
				/>
			</Tab.Navigator>
			<BottomTab navigation={navigation} />
		</>
	);
}
