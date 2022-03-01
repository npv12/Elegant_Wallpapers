import React, { useContext } from "react";
import {
	View,
	StyleSheet,
	TouchableOpacity,
	Linking,
	Dimensions,
	StatusBar,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import {
	PRIVACY_POLICY_URL,
	TERMS_OF_USE_URL,
	VERSION_NUMBER,
	STANDARD_HEIGHT,
	STANDARD_WIDTH,
	CREDITS_URL,
} from "../constants";
import {
	Text as Title,
	View as Container,
} from "../components/StyledComponents";
import { TypeAppContext } from "../types/themes";
import { AppContext } from "../context/AppContext";

const scaleWidth = Dimensions.get("window").width / STANDARD_WIDTH;
const scaleHeight = Dimensions.get("window").height / STANDARD_HEIGHT;

const Settings = ({ navigation }) => {
	const { mode } = useContext<TypeAppContext>(AppContext);
	return (
		<Container style={styles.container}>
			<StatusBar
				translucent={true}
				backgroundColor={"transparent"}
				barStyle={mode == "dark" ? "light-content" : "dark-content"}
			/>
			<ScrollView>
				<Title
					style={{
						...styles.header,
						color: mode == "dark" ? "#AAFF00" : "#7CCC00",
					}}
				>
					Appearence
				</Title>
				<View
					style={{
						flexDirection: "row",
						justifyContent: "space-between",
						paddingEnd: 15 * scaleWidth,
					}}
				>
					<Title style={styles.item}>Dark Theme</Title>
				</View>
				<Title
					style={{
						...styles.header,
						color: mode == "dark" ? "#AAFF00" : "#7CCC00",
					}}
				>
					Storage
				</Title>
				<View>
					<Title style={styles.item}>Wallpaper is stored to</Title>
					<Title
						style={{
							...styles.item,
							fontSize: 16 * scaleHeight,
							paddingTop: 5 * scaleHeight,
							color: "#898989",
						}}
					>
						/storage/emulated/0/Pictures/Elegant-Walls
					</Title>
				</View>
				<Title
					style={{
						...styles.header,
						color: mode == "dark" ? "#AAFF00" : "#7CCC00",
					}}
				>
					Legal
				</Title>
				<View>
					<TouchableOpacity
						onPress={() => Linking.openURL(PRIVACY_POLICY_URL)}
						activeOpacity={0.6}
					>
						<Title style={styles.item}>Privacy policy</Title>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => Linking.openURL(TERMS_OF_USE_URL)}
						activeOpacity={0.6}
					>
						<Title style={{ ...styles.item, paddingTop: 25 * scaleHeight }}>
							Terms of use
						</Title>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => Linking.openURL(CREDITS_URL)}
						style={{ paddingTop: 8 * scaleHeight }}
						activeOpacity={0.6}
					>
						<Title style={{ ...styles.item, paddingTop: 25 * scaleHeight }}>
							Licences
						</Title>
					</TouchableOpacity>
				</View>
				<Title
					style={{
						...styles.header,
						color: mode == "dark" ? "#AAFF00" : "#7CCC00",
					}}
				>
					Version
				</Title>
				<TouchableOpacity
					onPress={() => navigation.navigate("About")}
					activeOpacity={0.6}
				>
					<Title style={styles.item}>Elegant version</Title>
					<Title
						style={{
							...styles.item,
							fontSize: 16 * scaleHeight,
							paddingTop: 5 * scaleHeight,
							color: "#898989",
						}}
					>
						{VERSION_NUMBER}
					</Title>
				</TouchableOpacity>
			</ScrollView>
		</Container>
	);
};

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
});

export default Settings;
