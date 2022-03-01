import React, { useState, useEffect, useContext } from "react";
import {
	StyleSheet,
	SafeAreaView,
	StatusBar,
	Dimensions,
	TouchableOpacity,
	FlatList,
	View,
	Text,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { Icon } from "react-native-elements";
import LoadingImage from "../components/LoadingImage";
import { WALL_URL, STANDARD_HEIGHT, STANDARD_WIDTH } from "../constants";
import { TypeThemeContext } from "../types/themes";
import { ThemeContext } from "../Themes/ThemeContext";

const windowWidth = Dimensions.get("window").width;
const scaleWidth = Dimensions.get("window").width / STANDARD_WIDTH;
const scaleHeight = Dimensions.get("window").height / STANDARD_HEIGHT;

const SearchScreen = ({ navigation }) => {
	const [item, setItem] = useState("");
	const [data, setData] = useState([]);
	const [empty, setEmpty] = useState(true);
	const [walls, setWalls] = useState([]);
	const { theme, mode, setMode } = useContext<TypeThemeContext>(ThemeContext);

	async function getData() {
		fetch(WALL_URL, {
			method: "GET",
		})
			.then((response) => response.json())
			.then((data) => {
				setData(data);
			})
			.catch((error) => {
				console.log(error);
			});
	}

	useEffect(() => {
		getData();
		return function () { };
	}, []);

	function searchData(val) {
		if (val && data) setEmpty(false);
		else {
			setEmpty(true);
			return;
		}
		var c = [];
		for (var i = 0; i < data.length; i++) {
			if (data[i].name.toLowerCase().includes(val.toLowerCase()))
				c.push(data[i]);
			else if (data[i].collections.toLowerCase().includes(val.toLowerCase()))
				c.push(data[i]);
		}
		setWalls(c);
	}

	function renderWalls() {
		if (walls.length == 0 && !empty) {
			return (
				<View
					style={{ justifyContent: "center", flex: 1, alignItems: "center" }}
				>
					<Icon
						name="x"
						type="feather"
						size={45 * scaleHeight}
						color="grey"
						style={{ paddingBottom: 35 * scaleHeight }}
						tvParallaxProperties
					/>
					<Text
						style={{
							color: mode == "dark" ? "#A9A9A9" : "grey",
							fontSize: 20 * scaleHeight,
							fontFamily: "Linotte-Bold",
						}}
					>
						No result found
					</Text>
				</View>
			);
		} else if (walls && !empty) {
			return (
				<View style={{ paddingHorizontal: 10 * scaleWidth }}>
					<FlatList
						showsVerticalScrollIndicator={false}
						showsHorizontalScrollIndicator={false}
						data={walls}
						renderItem={renderItem}
						keyExtractor={(item) => item.url}
						numColumns={2}
					/>
				</View>
			);
		}
		return (
			<View style={{ justifyContent: "center", flex: 1, alignItems: "center" }}>
				<Icon
					name="search"
					type="feather"
					size={45 * scaleHeight}
					color="grey"
					style={{ paddingBottom: 35 * scaleHeight }}
					tvParallaxProperties
				/>
				<Text
					style={{
						color: mode == "dark" ? "#A9A9A9" : "grey",
						fontSize: 20 * scaleHeight,
						fontFamily: "Linotte-Bold",
					}}
				>
					Try searching for something
				</Text>
			</View>
		);
	}

	const Item = ({ item, onPress }) => (
		<View style={styles.wallBoundary}>
			<TouchableOpacity onPress={onPress} activeOpacity={0.9}>
				<LoadingImage source={item} style={styles.Wall} />
			</TouchableOpacity>
		</View>
	);

	const renderItem = ({ item }) => {
		return (
			<Item
				item={item}
				onPress={() =>
					navigation.navigate("Wall", {
						item: item,
					})
				}
			/>
		);
	};

	function renderTextInput() {
		return (
			<View
				style={{
					flexDirection: "row",
					alignItems: "center",
					height: 55 * scaleHeight,
					marginTop: 35 * scaleHeight,
					justifyContent: "space-between",
				}}
			>
				<TouchableOpacity onPress={() => navigation.pop()}>
					<Icon
						name="arrow-left"
						type="feather"
						size={25}
						style={styles.icon}
						color={mode == "dark" ? "white" : "black"}
						tvParallaxProperties
					/>
				</TouchableOpacity>
				<TextInput
					style={{
						...styles.input,
						backgroundColor: mode != "dark" ? "white" : "black",
						color: mode == "dark" ? "white" : "black",
					}}
					placeholder="Search...."
					defaultValue={item}
					placeholderTextColor={mode == "dark" ? "#A9A9A9" : "grey"}
					onChangeText={(val) => {
						searchData(val);
						setItem(val);
					}}
				/>
				<Icon
					name="search"
					type="feather"
					size={25}
					style={styles.icon}
					color={mode != "dark" ? "white" : "black"}
					tvParallaxProperties
				/>
			</View>
		);
	}

	return (
		<>
			<View
				style={{
					backgroundColor: mode != "dark" ? "white" : "black",
					height: 35 * scaleHeight,
				}}
			></View>
			<StatusBar
				translucent={true}
				backgroundColor={"transparent"}
				barStyle={mode == "dark" ? "light-content" : "dark-content"}
			/>
			<View
				style={{
					...styles.container,
					backgroundColor: mode != "dark" ? "white" : "black",
				}}
			>
				{renderTextInput()}
				{renderWalls()}
			</View>
		</>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	icon: {
		paddingLeft: 15 * scaleWidth,
		paddingBottom: 35 * scaleHeight,
	},
	input: {
		height: 55 * scaleHeight,
		width: "80%",
		justifyContent: "flex-end",
		alignSelf: "flex-end",
		padding: 15 * scaleHeight,
		fontSize: 18 * scaleHeight,
		margin: 18 * scaleHeight,
		fontFamily: "Linotte-Bold",
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

export default SearchScreen;
