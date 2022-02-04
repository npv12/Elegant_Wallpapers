import { StyleSheet, Dimensions } from "react-native";
import { STANDARD_HEIGHT } from "../../constants";

const scaleHeight = Dimensions.get("window").height / STANDARD_HEIGHT;

const styles = StyleSheet.create({
	modal: {
		justifyContent: "flex-end",
		margin: 0,
	},
	scrollableModal: {
		height: 300 * scaleHeight,
		borderTopLeftRadius: 25,
		borderTopRightRadius: 25,
	},
	scrollableModalContent1: {
		height: 400 * scaleHeight,
		backgroundColor: "#AAFF00",
		justifyContent: "flex-start",
		paddingHorizontal: 25 * scaleHeight,
	},
	scrollableModalText1: {
		fontSize: 20 * scaleHeight,
		color: "black",
		textAlign: "justify",
		paddingTop: 15,
		fontFamily: "Linotte-Bold",
	},
});

export default styles;
