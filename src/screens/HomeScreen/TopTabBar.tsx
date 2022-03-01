import React, { useContext } from "react";
import { Dimensions } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { View } from "react-native";

import CollectionsScreen from "../CollectionsScreen";
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
				screenOptions={{
					tabBarLabelStyle: {
						fontSize: 14 * scaleHeight,
						color: theme.text,
						fontFamily: "koliko",
					},
					tabBarStyle: { backgroundColor: theme.background },
					tabBarIndicatorStyle: { backgroundColor: theme.background },
				}}
			>
				<Tab.Screen
					name="Explore"
					component={CollectionsScreen}
					initialParams={{ isCollection: false }}
				/>
				<Tab.Screen
					name="Collections"
					component={CollectionsScreen}
					initialParams={{ isCollection: true }}
				/>
			</Tab.Navigator>
			<BottomTab navigation={navigation} />
		</>
	);
}
