import { Dimensions, StyleSheet } from "react-native";
import { STANDARD_HEIGHT } from "../../constants";

const scaleWidth = Dimensions.get("window").width / STANDARD_HEIGHT;
const scaleHeight = Dimensions.get("window").height / STANDARD_HEIGHT;

const styles = StyleSheet.create({
	icon: {
		paddingHorizontal: "2%",
	},
	searchBox: {
		justifyContent: "center",
		height: "100%",
		width: "13%",
		borderRadius: 65 * scaleWidth,
		elevation: 10,
		shadowColor: "#fff",
		position: "absolute",
		opacity: 1,
		bottom: "50%",
		right: "7%",
	},
	headerContainer: {},
	bottomTab: {
		justifyContent: "flex-end",
		height: "20%",
		borderTopRightRadius: 30 * scaleHeight,
		borderTopLeftRadius: 30 * scaleHeight,
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
		justifyContent: "flex-start",
		marginLeft: "5%",
		marginBottom: "2%",
		marginVertical: 5 * scaleHeight,
		width: "100%",
	},
	pill: {
		backgroundColor: "#898989",
		height: "3%",
		width: "10%",
		borderRadius: 10 * scaleHeight,
		marginBottom: 15 * scaleHeight,
		alignSelf: "center",
	},
});

export default styles;
