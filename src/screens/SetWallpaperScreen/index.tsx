import React, { useState } from "react";
import Loader from "../../components/Loader";
import LoadingImage from "../../components/LoadingImage";
import styles from "./styles";
import BottomTab from "./BottomTab";
import { StatusBar, View } from "../../components/StyledComponents";

const SetWallpaperScreen = ({ route }) => {
	const { item } = route.params;
	const [isLoading, setIsLoading] = useState(false);

	return (
		<View style={{ flex: 1 }}>
			<StatusBar />
			<View>
				<LoadingImage source={item} style={{ height: "100%", width: "100%" }} />
				<BottomTab item={item} />
				<Loader loading={isLoading} />
			</View>
			<View></View>
		</View>
	);
}; //

export default SetWallpaperScreen;
