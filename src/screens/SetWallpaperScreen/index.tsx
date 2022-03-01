import React, { useState, useEffect, useContext } from "react";
import { StatusBar, Image, View } from "react-native";
import Loader from "../../components/Loader";
import ImageColors from "react-native-image-colors";
import LoadingImage from "../../components/LoadingImage";
import { TypeAppContext } from "../../types";
import { AppContext } from "../../context/AppContext";
import styles from "./styles";
import BottomTab from "./BottomTab";

const SetWallpaperScreen = ({ route }) => {
	const { theme, mode } = useContext<TypeAppContext>(AppContext);
	const { item } = route.params;
	const [iconColor, setIconColor] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		if (mode == "dark" && !iconColor) setIconColor(true);
		else if (mode == "light" && iconColor) setIconColor(false);
		retrieveData();
		return function () {};
	}, []);

	//retrieve data from storage
	async function retrieveData() {
		//extract colors
		var col: any = {
			average: "#787C83",
			darkMuted: "#101818",
			darkVibrant: "#000000",
			dominant: "#101818",
			lightMuted: "#E8E8F0",
			lightVibrant: "#000000",
			muted: "#788090",
			platform: "android",
			vibrant: "#000000",
		};
		col = await ImageColors.getColors(item.thumbnail, {
			fallback: "#000000",
			quality: "high",
			pixelSpacing: 5,
		});

		//image size for better viewing. currently not in use
		Image.getSize(item.thumbnail, (w, h) => {}).catch();
	}

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
