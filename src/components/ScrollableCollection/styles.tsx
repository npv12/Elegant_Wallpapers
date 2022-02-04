import { StyleSheet, Dimensions } from "react-native";
import { STANDARD_HEIGHT } from "../../constants";
const scaleWidth = Dimensions.get("window").width / STANDARD_HEIGHT;
const scaleHeight = Dimensions.get("window").height / STANDARD_HEIGHT;

const windowWidth = Dimensions.get("window").width;
const styles = StyleSheet.create({
	container: { flex: 1 },
	Wall: {
		width: windowWidth - 40,
		height: 200 * scaleHeight,
		borderTopRightRadius: 20,
		borderTopLeftRadius: 20,
		borderBottomLeftRadius: 20,
		borderBottomRightRadius: 20,
	},
	headerText: {
		fontSize: 25 * scaleHeight,
		color: "white",
		alignItems: "center",
		alignSelf: "center",
		textAlign: "center",
		fontFamily: "koliko",
		justifyContent: "center",
		position: "absolute",
		top: 95 * scaleHeight,
	},
	header: { position: "absolute", left: windowWidth / 2 },
	wallBoundary: {
		flex: 1,
		margin: 8 * scaleHeight,
		justifyContent: "center",
		alignItems: "center",
	},
	list: { paddingHorizontal: 10 * scaleWidth },
	loadingText: { fontSize: 20 * scaleHeight, fontFamily: "Linotte-Bold" },
	loadingContainer: { justifyContent: "center", flex: 1, alignItems: "center" },
});

export default styles;
