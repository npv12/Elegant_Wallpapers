import React, { useContext, useEffect, useState } from "react";
import {
	StyleSheet,
	StatusBar,
	Dimensions,
} from "react-native";
import ScrollableCollection from "../components/ScrollableCollection";
import { Text, View } from "../components/StyledComponents";
import {
	WALL_URL,
	STANDARD_HEIGHT,
} from "../constants";
import { AppContext } from "../context/AppContext";
import { TypeAppContext } from "../types/themes";

const windowWidth = Dimensions.get("window").width;
const scaleHeight = Dimensions.get("window").height / STANDARD_HEIGHT;

const SpecificCollection = ({ route }) => {
	const { value } = route.params;
	const [data, setData] = useState([]);
	const { theme, mode } = useContext<TypeAppContext>(AppContext);

	async function getData() {
		fetch(WALL_URL, {
			method: "GET",
		})
			.then((response) => response.json())
			.then((data) => {
				filterData(data);
			})
			.catch((error) => {
				console.log(error);
			});
	}

	function filterData(data) {
		var c = [];
		for (var i = 0; i < data.length; i++) {
			if (
				data[i].collections
					.toLowerCase()
					.split(",")
					.includes(value.toLowerCase())
			)
				c.push(data[i]);
		}
		setData(c);
	}

	useEffect(() => {
		getData();
		return function () { };
	}, []);

	return (
		<>
			<View
				style={{
					backgroundColor: theme.background,
					height: 35 * scaleHeight,
				}}
			></View>
			<StatusBar
				translucent={true}
				backgroundColor={"transparent"}
				barStyle={mode == "dark" ? "light-content" : "dark-content"}
			/>
			<View style={styles.header}>
				<Text style={styles.headerText}>{value.toUpperCase()}</Text>
			</View>
			<View style={styles.container}>
				<ScrollableCollection data={data} />
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

export default SpecificCollection;
