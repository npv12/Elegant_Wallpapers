import React from "react";
import LoadingImage from "../../components/LoadingImage";
import BottomTab from "./BottomTab";
import { StatusBar, View } from "../../components/StyledComponents";

const SetWallpaperScreen = ({ route }) => {
	const { item } = route.params;

	return (
		<View style={{ flex: 1 }}>
			<StatusBar />
			<View>
				<LoadingImage source={item} style={{ height: "100%", width: "100%" }} />
				<BottomTab item={item} />
			</View>
			<View></View>
		</View>
	);
}; //

export default SetWallpaperScreen;
