import React, { useContext, useEffect, useState } from "react";
import { StatusBar } from "react-native";
import ScrollableCollection from "../../components/ScrollableCollection";
import { Text, View } from "../../components/StyledComponents";
import { AppContext } from "../../context/AppContext";
import { TypeAppContext } from "../../types";
import { findImagesForCollection } from "../../utils";
import styles from "./styles";

const SpecificCollectionScreen = ({ route }) => {
	const { value } = route.params;
	const [data, setData] = useState([]);
	const { theme, mode, wallpaperData } = useContext<TypeAppContext>(AppContext);

	useEffect(() => {
		findImagesForCollection(wallpaperData, value, setData);
	}, []);

	return (
		<>
			<View style={styles.header}></View>
			<StatusBar
				translucent={true}
				backgroundColor={"transparent"}
				barStyle={mode == "dark" ? "light-content" : "dark-content"}
			/>
			<View style={styles.title}>
				<Text style={styles.titleText}>{value.toUpperCase()}</Text>
			</View>
			<View style={styles.container}>
				<ScrollableCollection data={data} />
			</View>
		</>
	);
};

export default SpecificCollectionScreen;
