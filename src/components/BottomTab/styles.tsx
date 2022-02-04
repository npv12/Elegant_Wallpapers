import { Dimensions, StyleSheet } from "react-native";
import { STANDARD_HEIGHT } from "../../constants";

const scaleWidth = Dimensions.get("window").width / STANDARD_HEIGHT;
const scaleHeight = Dimensions.get("window").height / STANDARD_HEIGHT;

const styles = StyleSheet.create({
	icon: {
		paddingHorizontal: 10 * scaleWidth,
		paddingBottom: 5 * scaleHeight,
	},
	searchBox: {
		justifyContent: "center",
		height: 65 * scaleWidth,
		width: 65 * scaleWidth,
		borderRadius: 65 * scaleWidth,
		elevation: 10,
		shadowColor: "#fff",
		position: "absolute",
		opacity: 1,
		bottom: 25 * scaleHeight,
		right: 40 * scaleHeight,
	},
	headerContainer: {},
	bottomTab: {
		justifyContent: "center",
		alignItems: "flex-start",
		height: 70 * scaleHeight,
		borderTopEndRadius: 30 * scaleHeight,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		elevation: 5,
	},
	openButton: {
		backgroundColor: "#F194FF",
		borderRadius: 20 * scaleHeight,
		padding: 10 * scaleHeight,
		elevation: 2,
	},
	textStyle: {
		color: "white",
		fontWeight: "bold",
		textAlign: "center",
	},
	modalText: {
		marginBottom: 15 * scaleHeight,
		textAlign: "center",
		fontFamily: "Linotte-Bold",
		alignSelf: "center",
		marginTop: 5 * scaleHeight,
		fontSize: 16 * scaleHeight,
	},
	modalItem: {
		paddingLeft: 25 * scaleWidth,
		flexDirection: "row",
		justifyContent: "center",
		marginVertical: 5 * scaleHeight,
		width: "100%",
	},
	pill: {
		backgroundColor: "#898989",
		height: 5 * scaleHeight,
		width: 40 * scaleWidth,
		borderRadius: 10 * scaleHeight,
		marginBottom: 15 * scaleHeight,
		alignSelf: "center",
	},
	subView: {
		position: "absolute",
		bottom: 10,
		left: 0,
		right: 0,
		backgroundColor: "#FFFFFF",
		height: 165 * scaleHeight,
		borderTopEndRadius: 30 * scaleHeight,
	},
});

export default styles;
