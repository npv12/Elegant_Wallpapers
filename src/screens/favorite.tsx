import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { StyleSheet, Dimensions, StatusBar } from "react-native";
import styled from "styled-components/native";
import Wall from "../components/Wall";
import { useTheme } from "../themes";
import { STANDARD_HEIGHT, STANDARD_WIDTH } from "../constants";
import { View } from "../components/StyledComponents";

const scaleWidth = Dimensions.get("window").width / STANDARD_WIDTH;
const scaleHeight = Dimensions.get("window").height / STANDARD_HEIGHT;

const windowWidth = Dimensions.get("window").width;

const Fav = ({ navigation }) => {
	const [data, setData] = useState([]);
	const theme = useTheme();

	useEffect(() => {
		retrieveData();
	}, []);

	async function retrieveData() {
		setData(JSON.parse(await AsyncStorage.getItem("favs")));
	}

	return (
		<>
			<View
				style={{
					backgroundColor: theme.mode != "dark" ? "white" : "black",
					height: 35 * scaleHeight,
				}}
			></View>
			<StatusBar
				translucent={true}
				backgroundColor={"transparent"}
				barStyle={theme.mode == "dark" ? "light-content" : "dark-content"}
			/>
			<View style={styles.container}>
				<Wall data={data} navigation={navigation} />
			</View>
		</>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	Wall: {
		width: (windowWidth / 2) * 0.88,
		height: 250 * scaleHeight,
		borderRadius: 5,
		borderTopRightRadius: 5,
	},
	wallBoundary: {
		flex: 1,
		margin: 8 * scaleHeight,
		justifyContent: "center",
		alignItems: "center",
	},
	header: {
		padding: 20 * scaleHeight,
		alignItems: "center",
	},
	headerText: {
		fontSize: 20 * scaleHeight,
		fontFamily: "koliko",
	},
});

export default Fav;
