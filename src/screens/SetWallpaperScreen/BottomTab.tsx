import React, { useState, useEffect, useContext } from "react";
import { TouchableOpacity, Dimensions, Animated, View } from "react-native";
import { Icon } from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { STANDARD_HEIGHT, STANDARD_WIDTH } from "../../constants";
import { Text } from "../../components/StyledComponents";
import styles from "./styles";
import { handleDownload } from "../../utils/wallpaper";
import ExpandedBottomTab from "./ExpandedBottomTab";
import ApplyWallModal from "./ApplyWallModal";

const windowWidth = Dimensions.get("window").width;
const scaleWidth = Dimensions.get("window").width / STANDARD_WIDTH;
const scaleHeight = Dimensions.get("window").height / STANDARD_HEIGHT;

const BottomTab = ({ item }) => {
	const [showApplyModal, setShowApplyModal] = useState(false);
	const [isFav, setIsFav] = useState(false);
	const [translateBottom, setTranslateBottom] = useState(
		new Animated.Value(300 * scaleHeight)
	);
	const [bottomMenuVisible, setBottomMenuVisible] = useState(false);
	const [nameOfWall, setNameOfWal] = useState(item.name);

	useEffect(() => {
		if (item.name.length > 17) {
			var temp = item.name.slice(0, 17);
			temp += "...";
			setNameOfWal(temp);
		} else setNameOfWal(item.name);
		retrieveData();
	}, []);

	//retrieve data from storage
	async function retrieveData() {
		//taking out favorites from storage
		await AsyncStorage.getItem("favs").then((r) => {
			var res = JSON.parse(r);
			if (!res) return;
			for (var i = 0; i < res.length; i++) {
				if (JSON.stringify(res[i]) === JSON.stringify(item)) {
					setIsFav(true);
					break;
				}
			}
		});
	}

	//adds the wall to fav and stores it
	async function addToFav() {
		if (isFav) {
			var temp = [];
			await AsyncStorage.getItem("favs").then(async (r) => {
				var res = JSON.parse(r);
				if (!res) return;
				for (var i = 0; i < res.length; i++) {
					if (JSON.stringify(res[i]) === JSON.stringify(item)) {
						continue;
					}
					temp.push(res[i]);
				}
				await AsyncStorage.setItem("favs", JSON.stringify(temp));
			});
			setIsFav(false);
		} else {
			await AsyncStorage.getItem("favs").then(async (res) => {
				var temp = JSON.parse(res);
				if (!temp) {
					var temp2 = [];
					temp2.push(item);
					await AsyncStorage.setItem("favs", JSON.stringify(temp2));
				} else {
					temp.push(item);
					await AsyncStorage.setItem("favs", JSON.stringify(temp));
				}
			});
			setIsFav(true);
		}
	}

	//lets make everything into separate components coz why not?
	function renderHeart() {
		return (
			<View style={styles.iconView}>
				<Icon
					name={isFav ? "heart" : "hearto"}
					type="antdesign"
					size={25 * scaleHeight}
					color="white"
					tvParallaxProperties
				/>
			</View>
		);
	}

	//animation controller
	function toggleBottom() {
		var toValue = 0;
		if (bottomMenuVisible) {
			toValue = 300 * scaleHeight;
		}
		Animated.spring(translateBottom, {
			toValue: toValue,
			velocity: 25,
			tension: 2,
			friction: 4,
			useNativeDriver: true,
		}).start();
		setBottomMenuVisible(!bottomMenuVisible);
	}

	//renders the arrow on the bottom tab
	function renderArrow() {
		return (
			<View
				style={{ marginTop: 17 * scaleHeight, paddingRight: 10 * scaleWidth }}
			>
				<Icon
					name={bottomMenuVisible ? "down" : "up"}
					type="antdesign"
					size={22 * scaleHeight}
					color="white"
					tvParallaxProperties
				/>
			</View>
		);
	}

	return (
		<>
			<Animated.View
				style={[
					{ ...styles.bottomTab, backgroundColor: "rgba(0,0,0,0.45)" },
					{ transform: [{ translateY: translateBottom }] },
				]}
			>
				<View style={{ flexDirection: "row", justifyContent: "space-between" }}>
					<View style={{ flexDirection: "row" }}>
						<TouchableOpacity
							style={{
								marginLeft: 30 * scaleHeight,
								flexDirection: "row",
							}}
							onPress={toggleBottom}
						>
							{renderArrow()}
							<Text style={{ ...styles.NameHeader, color: "white" }}>
								{nameOfWall}
							</Text>
						</TouchableOpacity>
					</View>
					<View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
						<TouchableOpacity
							onPress={() => {
								handleDownload(item);
							}}
						>
							<View style={styles.iconView}>
								<Icon
									name="download"
									type="feather"
									size={25 * scaleHeight}
									color="white"
									tvParallaxProperties
								/>
							</View>
						</TouchableOpacity>
						<TouchableOpacity onPress={() => setShowApplyModal(true)}>
							<View style={styles.iconView}>
								<Icon
									name="arrow-up-circle"
									type="feather"
									size={25 * scaleHeight}
									color="white"
									tvParallaxProperties
								/>
							</View>
						</TouchableOpacity>
						<TouchableOpacity
							style={{ marginRight: 30 * scaleWidth }}
							onPress={() => {
								addToFav();
							}}
						>
							{renderHeart()}
						</TouchableOpacity>
					</View>
				</View>
				<View style={{ height: 35, width: windowWidth }} />
				<ExpandedBottomTab item={item} />
			</Animated.View>
			<ApplyWallModal
				item={item}
				showApplyModal={showApplyModal}
				setShowApplyModal={setShowApplyModal}
			/>
		</>
	);
};

export default BottomTab;
