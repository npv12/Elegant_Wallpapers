import React, { useState, useEffect } from "react";
import {
	StyleSheet,
	Dimensions,
	TouchableOpacity,
	View,
	StatusBar,
	Animated,
} from "react-native";
import _ from "lodash";
import styled from "styled-components/native";
import {
	FREE_APP,
	VERSION_NUMBER,
	VERSION_URL,
	WALL_URL,
	STANDARD_HEIGHT,
	STANDARD_WIDTH,
} from "../constants";
import { useTheme } from "../themes";
import { Linking } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import ScrollableCollection from "../components/ScrollableCollection";
import { Button } from "react-native";

const SView = styled.View`
	background: ${(props) => props.theme.background};
`;

const Text = styled.Text`
	color: ${(props) => props.theme.text};
`;
const scaleHeight = Dimensions.get("window").height / STANDARD_HEIGHT;

const Collections = ({ navigation }) => {
	const [collection, setCollection] = useState([]);
	const [data, setData] = useState([]);
	const [updateState, setUpdateState] = useState(0);
	const [fadeAnimation, setFadeAnimation] = useState(new Animated.Value(0));
	const [offset, setOffset] = useState(0);
	const theme = useTheme();
	const focused = useIsFocused();

	async function getData() {
		fetch(WALL_URL, {
			method: "GET",
		})
			.then((response) => response.json())
			.then((data) => {
				setData(data);
				convertData(data);
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

	function filterOut(value) {
		navigation.navigate("Collection", {
			value: value,
		});
	}

	function convertData(data) {
		var c = [];
		var fin = [];
		var key = 0;
		for (var i = 0; i < data.length; i++) {
			var temp = data[i].collections.toLowerCase().split(",");
			for (var j = 0; j < temp.length; j++) {
				if (!c.includes(temp[j])) {
					var t = {
						collections: temp[j],
						url: data[i].url,
						thumbnail: data[i].thumbnail,
						key: key.toString(),
					};
					c.push(temp[j]);
					fin.push(t);
					key = key + 1;
					break;
				}
			}
		}
		setCollection(fin);
	}

	useEffect(() => {
		getData();
		return function () {};
	}, []);

	useEffect(() => {
		if (focused) fadeIn();
		return function () {};
	}, [focused]);

	function fadeIn() {
		Animated.timing(fadeAnimation, {
			toValue: 1,
			duration: 800,
			useNativeDriver: true,
		}).start();
	}

	function renderCollections() {
		if (!data.length) {
			return (
				<View
					style={{ justifyContent: "center", flex: 1, alignItems: "center" }}
				>
					<Text
						style={{
							color: theme.mode == "dark" ? "#A9A9A9" : "grey",
							fontSize: 20 * scaleHeight,
							fontFamily: "Linotte-Bold",
						}}
					>
						Loading your favorite walls.....
					</Text>
				</View>
			);
		}
		return (
			<View style={{ paddingHorizontal: 10, flex: 1 }}>
				<ScrollableCollection
					data={collection}
					onPress={(item) => filterOut(item.collections)}
					setOffset={setOffset}
					offset={offset}
				/>
			</View>
		);
	}

	if (updateState != 0) {
		if (updateState == 2)
			return (
				<SView
					style={{ justifyContent: "center", flex: 1, alignItems: "center" }}
				>
					<Text
						style={{
							color: theme.mode == "dark" ? "#A9A9A9" : "grey",
							fontSize: 20 * scaleHeight,
							fontFamily: "Linotte-Bold",
						}}
					>
						Update the app to view the walls.
					</Text>
				</SView>
			);
		else if (updateState == 1) {
			return (
				<>
					<TouchableOpacity
						activeOpacity={0.6}
						onPress={() => Linking.openURL(FREE_APP)}
					>
						<SView
							style={{
								height: 100 * scaleHeight,
								width: "100%",
								backgroundColor: theme.mode == "dark" ? "#AAFF00" : "#7CCC00",
								justifyContent: "center",
								padding: 25,
								alignItems: "center",
							}}
						>
							<Text
								style={{
									color: "black",
									fontSize: 20 * scaleHeight,
									fontFamily: "Linotte-Bold",
								}}
							>
								Update the app for best possible experience
							</Text>
						</SView>
					</TouchableOpacity>
					{mainElement()}
				</>
			);
		}
	}

	if (focused) {
		return <>{mainElement()}</>;
	}

	function mainElement() {
		return (
			<>
				<SView style={styles.container}>
					<Animated.View
						style={[
							styles.container,
							{
								opacity: fadeAnimation,
							},
						]}
					>
						<StatusBar
							translucent={true}
							backgroundColor={"transparent"}
							barStyle={theme.mode == "dark" ? "light-content" : "dark-content"}
						/>
						<SView style={styles.container}>{renderCollections()}</SView>
					</Animated.View>
				</SView>
			</>
		);
	}

	return (
		<SView style={{ justifyContent: "center", flex: 1, alignItems: "center" }}>
			<Text
				style={{
					color: theme.mode == "dark" ? "#A9A9A9" : "grey",
					fontSize: 20 * scaleHeight,
					fontFamily: "Linotte-Bold",
				}}
			>
				Loading your favorite collections.....
			</Text>
		</SView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});

export default Collections;
