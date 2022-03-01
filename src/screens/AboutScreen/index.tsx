import React, { useContext, useEffect, useState } from "react";
import { TouchableOpacity, Dimensions, Linking } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import {
	DISCLAIMER_TEXT,
	FREE_APP,
	MADNESS_TELE,
	PRO_APP,
	VERSION_URL,
	VERSION_NUMBER,
	STANDARD_HEIGHT,
} from "../../constants";
import ScrollableModal from "../../components/ScrollableModal";
import Loader from "../../components/Loader";
import { StatusBar, Text, View } from "../../components/StyledComponents";
import styles from "./styles";
import Authors from "./authors";
import { TypeAppContext } from "../../types";
import { AppContext } from "../../context/AppContext";

const scaleHeight = Dimensions.get("window").height / STANDARD_HEIGHT;

const AboutScreen = () => {
	const { mode } = useContext<TypeAppContext>(AppContext);
	const [changelogVisible, setChangelogVisible] = useState(false);
	const [changelog, setChangelog] = useState("");
	const [loading, setLoading] = useState(true);

	async function getVersion() {
		fetch(VERSION_URL, {
			method: "GET",
		})
			.then((response) => response.json())
			.then((responseJson) => {
				setChangelog(responseJson.Changelogs);
				setLoading(false);
			})
			.catch((error) => {
				console.log(error);
			});
	}

	useEffect(() => {
		getVersion();
	}, []);

	return (
		<View style={styles.container}>
			<Loader loading={loading} />
			<StatusBar />
			<ScrollView>
				<Text
					style={{
						...styles.header,
						color: mode == "dark" ? "#AAFF00" : "#7CCC00",
						paddingTop: 5 * scaleHeight,
					}}
				>
					Info
				</Text>
				<View>
					<Text style={styles.item}>Version</Text>
					<Text style={styles.itemText}>{VERSION_NUMBER}</Text>
				</View>
				<TouchableOpacity
					onPress={() => setChangelogVisible(!changelogVisible)}
					activeOpacity={0.6}
				>
					<Text style={styles.item}>Changelog</Text>
				</TouchableOpacity>
				<Text
					style={{
						...styles.header,
						color: mode == "dark" ? "#AAFF00" : "#7CCC00",
					}}
				>
					Contributors
				</Text>
				<Authors />
				<Text
					style={{
						...styles.header,
						color: mode == "dark" ? "#AAFF00" : "#7CCC00",
					}}
				>
					Support Development
				</Text>
				<TouchableOpacity
					onPress={() => Linking.openURL(FREE_APP)}
					activeOpacity={0.6}
				>
					<Text style={styles.item}>Rate</Text>
					<Text style={styles.itemText}>
						Love the app? Rate it at playstore
					</Text>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => Linking.openURL(PRO_APP)}
					activeOpacity={0.6}
				>
					<Text style={styles.item}>Pro</Text>
					<Text style={styles.itemText}>Buy the pro app and go adfree</Text>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => Linking.openURL(MADNESS_TELE)}
					activeOpacity={0.6}
				>
					<Text style={styles.item}>Join telegram channel</Text>
					<Text style={styles.itemText}>
						Report bugs, suggest features or just simply have fun
					</Text>
				</TouchableOpacity>
				<View>
					<Text
						style={{
							...styles.header,
							color: mode == "dark" ? "#AAFF00" : "#7CCC00",
						}}
					>
						Disclaimer
					</Text>
					<Text style={styles.itemText}>{DISCLAIMER_TEXT}</Text>
				</View>
			</ScrollView>
			<ScrollableModal
				visible={changelogVisible}
				changeVisible={setChangelogVisible}
				changelog={changelog}
			/>
		</View>
	);
};

export default AboutScreen;
