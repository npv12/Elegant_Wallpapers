import { StyleSheet, Dimensions } from "react-native";
import { STANDARD_HEIGHT } from "../../constants";

const scaleHeight = Dimensions.get("window").height / STANDARD_HEIGHT;

const styles = StyleSheet.create({
	activityIndicatorWrapper: {
		height: 250 * scaleHeight,
		position: "absolute",
		width: "100%",
		borderRadius: 10,
		display: "flex",
		alignItems: "center",
		justifyContent: "space-around",
	},
});

export default styles;
