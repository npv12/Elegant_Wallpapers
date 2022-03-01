import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useContext, useEffect, useState } from "react";
import { Dimensions } from "react-native";
import { STANDARD_HEIGHT } from "../../constants";
import { View, StatusBar } from "../../components/StyledComponents";
import { TypeAppContext } from "../../types";
import { AppContext } from "../../context/AppContext";
import styles from "./styles";
import ScrollableCollection from "../../components/ScrollableCollection";

const scaleHeight = Dimensions.get("window").height / STANDARD_HEIGHT;

const FavoriteScreen = () => {
	const [data, setData] = useState([]);
	const { mode } = useContext<TypeAppContext>(AppContext);
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
					backgroundColor: mode != "dark" ? "white" : "black",
					height: 35 * scaleHeight,
				}}
			></View>
			<StatusBar />
			<View style={styles.container}>
				<ScrollableCollection data={data} />
			</View>
		</>
	);
};

export default FavoriteScreen;
