import { StyleSheet, Dimensions } from "react-native";
import { STANDARD_WIDTH, STANDARD_HEIGHT } from "../../constants";

const scaleWidth = Dimensions.get("window").width / STANDARD_WIDTH;
const scaleHeight = Dimensions.get("window").height / STANDARD_HEIGHT;
const styles = StyleSheet.create({
	modalBackground: {
		flex: 1,
		alignItems: "center",
		flexDirection: "column",
		justifyContent: "space-around",
		backgroundColor: "#00000040",
	},
	activityIndicatorWrapper: {
		height: 100 * scaleHeight,
		width: 100 * scaleWidth,
		borderRadius: 10,
		display: "flex",
		alignItems: "center",
		justifyContent: "space-around",
	},
});

export default styles;
