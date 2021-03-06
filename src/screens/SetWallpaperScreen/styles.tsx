import { StyleSheet, Dimensions } from "react-native";
import { STANDARD_HEIGHT, STANDARD_WIDTH } from "../../constants";

const windowWidth = Dimensions.get("window").width;
const scaleWidth = Dimensions.get("window").width / STANDARD_WIDTH;
const scaleHeight = Dimensions.get("window").height / STANDARD_HEIGHT;

const styles = StyleSheet.create({
	bottomTab: {
		width: "100%",
		height: 500 * scaleHeight,
		bottom: -120 * scaleHeight,
		position: "absolute",
		borderTopEndRadius: 25 * scaleHeight,
		borderTopLeftRadius: 25 * scaleHeight,
		borderBottomEndRadius: 25 * scaleHeight,
		borderBottomLeftRadius: 25 * scaleHeight,
		paddingVertical: 14,
		marginBottom: 0,
	},
	modal: {
		height: 210 * scaleHeight,
		width: "80%",
		justifyContent: "space-between",
		alignSelf: "center",
		borderTopEndRadius: 15,
		borderTopLeftRadius: 15,
		borderBottomEndRadius: 15,
		borderBottomLeftRadius: 15,
	},
	modalText: {
		marginHorizontal: 15 * scaleWidth,
		textAlign: "center",
		fontFamily: "Linotte-Bold",
	},
	modalItem: {
		paddingLeft: 25 * scaleWidth,
		flexDirection: "row",
		marginVertical: 5,
		alignItems: "center",
	},
	NameHeader: {
		fontSize: 20 * scaleHeight,
		fontFamily: "Linotte-Bold",
		marginTop: 15 * scaleHeight,
	},
	iconView: {
		paddingLeft: 25 * scaleWidth,
		paddingTop: 15 * scaleHeight,
	},
	box: {
		margin: 10,
		justifyContent: "center",
		alignItems: "center",
		borderTopLeftRadius: 15,
		borderTopRightRadius: 15,
		borderBottomLeftRadius: 15,
		borderBottomRightRadius: 15,
		backgroundColor: "rgba(0,0,0,0.38)",
		width: windowWidth / 3,
		height: 55,
	},
	biggerBox: {
		margin: 10,
		justifyContent: "center",
		alignItems: "center",
		borderTopLeftRadius: 15,
		borderTopRightRadius: 15,
		borderBottomLeftRadius: 15,
		borderBottomRightRadius: 15,
		backgroundColor: "rgba(0,0,0,0.38)",
		width: windowWidth / 2 - 40,
		height: 55,
	},
	bottomHeader: {
		fontSize: 16,
		fontFamily: "Linotte-Bold",
	},
});

export default styles;
