import { StyleSheet, Dimensions } from "react-native";
import { STANDARD_HEIGHT } from "../../constants";

const windowWidth = Dimensions.get("window").width;
const scaleHeight = Dimensions.get("window").height / STANDARD_HEIGHT;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	Wall: {
		width: (windowWidth / 2) * 0.88,
		height: 250 * scaleHeight,
		borderRadius: 5,
		borderTopRightRadius: 5,
	},
	wallBoundary: {
		flex: 1,
		margin: 8 * scaleHeight,
		justifyContent: "center",
		alignItems: "center",
	},
	header: { height: 35 * scaleHeight },
	title: {
		padding: 20 * scaleHeight,
		alignItems: "center",
	},
	titleText: {
		fontSize: 20 * scaleHeight,
		fontFamily: "koliko",
	},
});

export default styles;
