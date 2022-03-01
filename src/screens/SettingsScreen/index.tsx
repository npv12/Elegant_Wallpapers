import React, { useContext } from "react";
import { View, TouchableOpacity, Linking, Dimensions } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import {
	PRIVACY_POLICY_URL,
	TERMS_OF_USE_URL,
	VERSION_NUMBER,
	STANDARD_HEIGHT,
	CREDITS_URL,
} from "../../constants";
import {
	Text as Title,
	View as Container,
	StatusBar,
} from "../../components/StyledComponents";
import { TypeAppContext } from "../../types";
import { AppContext } from "../../context/AppContext";
import styles from "./styles";

const scaleHeight = Dimensions.get("window").height / STANDARD_HEIGHT;

const SettingsScreen = ({ navigation }) => {
	const { mode } = useContext<TypeAppContext>(AppContext);
	return (
		<Container style={styles.container}>
			<StatusBar />
			<ScrollView>
				<Title
					style={{
						...styles.header,
						color: mode == "dark" ? "#AAFF00" : "#7CCC00",
					}}
				>
					Appearence
				</Title>
				<View style={styles.appearanceContainer}>
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
					<Title style={styles.versionTitle}>
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
					<Title style={styles.versionTitle}>{VERSION_NUMBER}</Title>
				</TouchableOpacity>
			</ScrollView>
		</Container>
	);
};

export default SettingsScreen;
