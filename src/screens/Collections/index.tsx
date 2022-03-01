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
import { TypeAppContext } from "../../types";
import { AppContext } from "../../context/AppContext";
import { getCollectionsFromData } from "../HomeScreen/utils";
import styles from "./styles";

/**
 * This is the screen which renders how a colleciton screen should be like. 
 * This is still a wip TODO
 * We need to improve how data is fetched in general and commonaise it and better write logaic for update state
 * @returns JSX component
 */

const Collections = () => {
	const { mode, wallpaperData, collectionData, updateState } = useContext<TypeAppContext>(AppContext);

	function renderCollections() {
		if (wallpaperData.length) {
			return (
				<View style={{ paddingHorizontal: 10, flex: 1 }}>
					<ScrollableCollection
						data={collectionData}
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
