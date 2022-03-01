import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useContext, useEffect, useState } from "react";
import { Dimensions, StatusBar } from "react-native";
import Wall from "../../components/Wall";
import { STANDARD_HEIGHT } from "../../constants";
import { View } from "../../components/StyledComponents";
import { TypeThemeContext } from "../../types/themes";
import { ThemeContext } from "../../Themes/ThemeContext";
import styles from "./styles";

const scaleHeight = Dimensions.get("window").height / STANDARD_HEIGHT;

const Favorite = ({ navigation }) => {
	const [data, setData] = useState([]);
	const { mode } = useContext<TypeThemeContext>(ThemeContext);
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
			<StatusBar
				translucent={true}
				backgroundColor={"transparent"}
				barStyle={mode == "dark" ? "light-content" : "dark-content"}
			/>
			<View style={styles.container}>
				<Wall data={data} navigation={navigation} />
			</View>
		</>
	);
};

export default Favorite;
