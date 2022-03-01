import React, { useState, useEffect, useContext } from "react";
import {
	TouchableOpacity,
	View,
	StatusBar,
} from "react-native";
import {
	FREE_APP,
	VERSION_NUMBER,
	VERSION_URL,
	WALL_URL,
} from "../../constants";
import { Linking } from "react-native";
import ScrollableCollection from "../../components/ScrollableCollection";
import { Text, View as SView } from "../../components/StyledComponents";
import { TypeThemeContext } from "../../types/themes";
import { ThemeContext } from "../../Themes/ThemeContext";
import { convertData } from "./utils";
import styles from "./styles";

const Collections = () => {
	const [collection, setCollection] = useState([]);
	const [data, setData] = useState([]);
	const [updateState, setUpdateState] = useState(0);
	const { mode } = useContext<TypeThemeContext>(ThemeContext);

	async function getData() {
		fetch(WALL_URL, {
			method: "GET",
		})
			.then((response) => response.json())
			.then((data) => {
				setData(data);
				setCollection(convertData(data))
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

	useEffect(() => {
		getData();
	}, []);


	function renderCollections() {
		if (data.length) {
			return (
				<View style={{ paddingHorizontal: 10, flex: 1 }}>
					<ScrollableCollection
						data={collection}
						isCollection={true}
					/>
				</View>
			);
		}

	}

	if (updateState == 2)
		return (
			<TouchableOpacity
				activeOpacity={0.6}
				onPress={() => Linking.openURL(FREE_APP)}
			>
				<SView
					style={{ justifyContent: "center", flex: 1, alignItems: "center" }}
				>
					<Text
						style={{
							color: mode == "dark" ? "#A9A9A9" : "grey",
							...styles.header
						}}
					>
						Update the app to view the walls.
					</Text>
				</SView>
			</TouchableOpacity>
		);
	else if (updateState == 1)
		return (
			<>
				<TouchableOpacity
					activeOpacity={0.6}
					onPress={() => Linking.openURL(FREE_APP)}
				>
					<SView
						style={{ ...styles.forceUpdateContainer, backgroundColor: mode == "dark" ? "#AAFF00" : "#7CCC00" }}
					>
						<Text
							style={{
								color: "black",
								...styles.header
							}}
						>
							Update the app for best possible experience
						</Text>
					</SView>
				</TouchableOpacity>
				<SView style={styles.container}>
					<StatusBar
						translucent={true}
						backgroundColor={"transparent"}
						barStyle={mode == "dark" ? "light-content" : "dark-content"}
					/>
					<SView style={styles.container}>{renderCollections()}</SView>
				</SView>
			</>
		);

	return (
		<SView style={styles.container}>
			<Text
				style={{
					color: mode == "dark" ? "#A9A9A9" : "grey",
					...styles.header
				}}
			>
				Loading your favorite collections.....
			</Text>
		</SView>
	);
};

export default Collections;
