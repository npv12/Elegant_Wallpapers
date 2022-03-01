import React, { useState, useEffect, useContext } from "react";
import {
	StyleSheet,
	StatusBar,
	Dimensions,
	TouchableOpacity,
	Linking,
} from "react-native";
import {
	STANDARD_HEIGHT,
	STANDARD_WIDTH,
	VERSION_NUMBER,
	VERSION_URL,
	WALL_URL,
	FREE_APP,
} from "../../constants";
import SplashScreen from "react-native-splash-screen";
import { Text, View } from "../../components/StyledComponents";
import { TypeThemeContext } from "../../types/themes";
import { ThemeContext } from "../../Themes/ThemeContext";
import ScrollableCollection from "../../components/ScrollableCollection";

const scaleWidth = Dimensions.get("window").width / STANDARD_WIDTH;
const scaleHeight = Dimensions.get("window").height / STANDARD_HEIGHT;

const windowWidth = Dimensions.get("window").width;

const Explore = () => {
	const { theme, mode, setMode } = useContext<TypeThemeContext>(ThemeContext);
	const [data, setData] = useState([]);
	const [updateState, setUpdateState] = useState(0);

	async function getData() {
		fetch(WALL_URL, {
			method: "GET",
		})
			.then((response) => response.json())
			.then((responseJson) => {
				SplashScreen.hide();
				setData(responseJson);
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

	if (updateState != 0) {
		if (updateState == 2)
			return (
				<View
					style={{ justifyContent: "center", flex: 1, alignItems: "center" }}
				>
					<Text
						style={{
							color: mode == "dark" ? "#A9A9A9" : "grey",
							fontSize: 20 * scaleHeight,
							fontFamily: "Linotte-Bold",
						}}
					>
						Update the app to view the walls.
					</Text>
				</View>
			);
		else if (updateState == 1) {
			return (
				<>
					<StatusBar
						translucent={true}
						backgroundColor={"transparent"}
						barStyle={mode == "dark" ? "light-content" : "dark-content"}
					/>
					<TouchableOpacity
						activeOpacity={0.6}
						onPress={() => Linking.openURL(FREE_APP)}
					>
						<View
							style={{
								height: 100 * scaleHeight,
								width: "100%",
								backgroundColor: mode == "dark" ? "#AAFF00" : "#7CCC00",
								justifyContent: "center",
								padding: 25 * scaleHeight,
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
						</View>
					</TouchableOpacity>
					{mainElement()}
				</>
			);
		}
	}

	function mainElement() {
		return (
			<>
				<View style={styles.container}>
					<StatusBar
						translucent={true}
						backgroundColor={"transparent"}
						barStyle={mode == "dark" ? "light-content" : "dark-content"}
					/>
					<View style={{ ...styles.container }}>
						<ScrollableCollection data={data} />
					</View>
				</View>
			</>
		);
	}

	return <>{mainElement()}</>;
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});

export default Explore;
