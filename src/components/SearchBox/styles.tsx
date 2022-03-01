import {
	StyleSheet,
	Dimensions,
} from "react-native";
import { STANDARD_HEIGHT, STANDARD_WIDTH } from "../../constants";

const scaleWidth = Dimensions.get("window").width / STANDARD_WIDTH;
const scaleHeight = Dimensions.get("window").height / STANDARD_HEIGHT;

const styles = StyleSheet.create({
	icon: {
		paddingLeft: 15 * scaleWidth,
		paddingBottom: 35 * scaleHeight,
	},
	input: {
		height: 55 * scaleHeight,
		width: "80%",
		justifyContent: "flex-end",
		alignSelf: "flex-end",
		padding: 15 * scaleHeight,
		fontSize: 18 * scaleHeight,
		margin: 18 * scaleHeight,
		fontFamily: "Linotte-Bold",
	}
});

export default styles;
