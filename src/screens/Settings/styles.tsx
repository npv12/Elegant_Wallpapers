import { StyleSheet, Dimensions } from "react-native";
import { STANDARD_HEIGHT, STANDARD_WIDTH } from "../../constants";

const scaleWidth = Dimensions.get("window").width / STANDARD_WIDTH;
const scaleHeight = Dimensions.get("window").height / STANDARD_HEIGHT;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	header: {
		fontSize: 25 * scaleHeight > 20 ? 25 * scaleHeight : 20,
		padding: 25 * scaleHeight,
		paddingTop: 50 * scaleHeight,
		fontFamily: "Linotte-Bold",
	},
	item: {
		paddingHorizontal: 25 * scaleWidth,
		fontSize: 16 * scaleHeight > 12 ? 16 * scaleHeight : 12,
		paddingTop: 5 * scaleHeight,
		fontFamily: "Manrope-medium",
	},
	versionTitle: {
		fontSize: 16 * scaleHeight,
		paddingTop: 5 * scaleHeight,
		color: "#898989",
		paddingHorizontal: 25 * scaleWidth,
		fontFamily: "Manrope-medium",
	},
	appearanceContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		paddingEnd: 15 * scaleWidth,
	},
});

export default styles;
