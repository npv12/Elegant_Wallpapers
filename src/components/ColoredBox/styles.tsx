import { StyleSheet, Dimensions } from "react-native";
import { STANDARD_HEIGHT, STANDARD_WIDTH } from "../../constants";

const scaleWidth = Dimensions.get("window").width / STANDARD_WIDTH;
const scaleHeight = Dimensions.get("window").height / STANDARD_HEIGHT;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "row",
		width: "100%",
		marginVertical: 8 * scaleHeight,
	},
	circle: {
		height: 35 * scaleHeight,
		width: 35 * scaleWidth,
		borderTopLeftRadius: 20 * scaleHeight,
		borderTopRightRadius: 20 * scaleHeight,
		borderBottomLeftRadius: 20 * scaleHeight,
		borderBottomRightRadius: 20 * scaleHeight,
		marginHorizontal: 10 * scaleWidth,
	},
	header: {
		fontSize: 15 * scaleHeight,
		marginTop: 2 * scaleHeight,
		color: "white",
	},
});
export default styles;
