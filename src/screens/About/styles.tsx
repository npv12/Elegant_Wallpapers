import { StyleSheet, Dimensions } from "react-native";
import { STANDARD_HEIGHT, STANDARD_WIDTH } from "../../constants";

const scaleWidth = Dimensions.get("window").width / STANDARD_WIDTH;
const scaleHeight = Dimensions.get("window").height / STANDARD_HEIGHT;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	header: {
		fontSize: 25 * scaleHeight,
		paddingHorizontal: 25 * scaleWidth,
		paddingTop: 50 * scaleHeight,
		fontFamily: "Linotte-Bold",
	},
	item: {
		paddingHorizontal: 25 * scaleWidth,
		fontSize: 18 * scaleHeight,
		paddingTop: 15 * scaleHeight,
		fontFamily: "Manrope-medium",
	},
	changelogContainer: {
		width: 200 * scaleWidth,
		height: 300 * scaleHeight,
		borderTopEndRadius: 25,
		borderBottomEndRadius: 25,
		borderTopLeftRadius: 25,
		borderBottomLeftRadius: 25,
	},
	test: {
		width: 200 * scaleWidth,
		height: 300 * scaleHeight,
		borderTopEndRadius: 25,
		borderBottomEndRadius: 25,
		borderTopLeftRadius: 25,
		borderBottomLeftRadius: 25,
		alignContent: "center",
		alignItems: "center",
		paddingTop: 35,
		padding: 15,
	},
	itemText: {
		paddingHorizontal: 25 * scaleWidth,
		fontFamily: "Manrope-medium",
		fontSize: 16 * scaleHeight,
		paddingTop: 5 * scaleHeight,
		color: "#898989",
	},
	scroll: {},
});

export default styles;
