import React, { useState, useContext } from "react";
import { StatusBar, View } from "react-native";
import Loader from "../../components/Loader";
import LoadingImage from "../../components/LoadingImage";
import { TypeAppContext } from "../../types";
import { AppContext } from "../../context/AppContext";
import styles from "./styles";
import BottomTab from "./BottomTab";

const SetWallpaperScreen = ({ route }) => {
	const { mode } = useContext<TypeAppContext>(AppContext);
	const { item } = route.params;
	const [isLoading, setIsLoading] = useState(false);

	return (
		<View style={{ flex: 1 }}>
			<StatusBar
				translucent={true}
				backgroundColor={"transparent"}
				barStyle={mode == "dark" ? "light-content" : "dark-content"}
			/>
			<View style={styles.container}>
				<LoadingImage source={item} style={{ height: "100%", width: "100%" }} />
				<BottomTab item={item} />
				<Loader loading={isLoading} />
			</View>
			<View></View>
		</View>
	);
}; //

export default SetWallpaperScreen;
