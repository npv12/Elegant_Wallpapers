import React, { useState, useEffect, useContext } from "react";
import {
	StyleSheet,
	TouchableOpacity,
	Dimensions,
	Platform,
	PermissionsAndroid,
	Alert,
	StatusBar,
	Animated,
	Image,
	ScrollView,
	View,
	FlatList,
	ToastAndroid,
} from "react-native";
import { Icon } from "react-native-elements";
import ManageWallpaper, { TYPE } from "react-native-manage-wallpaper";
import { BlurView } from "@react-native-community/blur";
import Modal from "react-native-modal";
import RNFetchBlob from "rn-fetch-blob";
import AsyncStorage from "@react-native-async-storage/async-storage";
import _ from "lodash";
import Loader from "../components/Loader";
import ImageColors from "react-native-image-colors";
import LoadingImage from "../components/LoadingImage";
import loadAd from "../components/Advert";
import ColoredBox from "../components/ColoredBox";
import { STANDARD_HEIGHT, STANDARD_WIDTH } from "../constants";
import { Text, View as SView } from "../components/StyledComponents";
import { TypeThemeContext } from "../types/themes";
import { ThemeContext } from "../Themes/ThemeContext";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const scaleWidth = Dimensions.get("window").width / STANDARD_WIDTH;
const scaleHeight = Dimensions.get("window").height / STANDARD_HEIGHT;

const SetWallpaper = ({ route, navigation }) => {
	const { theme, mode } = useContext<TypeThemeContext>(ThemeContext);
	const { item } = route.params;
	const [showApplyModal, setShowApplyModal] = useState(false);
	const [isFav, setIsFav] = useState(false);
	const [iconColor, setIconColor] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [translateBottom, setTranslateBottom] = useState(
		new Animated.Value(300 * scaleHeight)
	);
	const [translateSnack, setTranslateSnack] = useState(
		new Animated.Value(300 * scaleHeight)
	);
	const [bottomMenuVisible, setBottomMenuVisible] = useState(false);
	const [colors, setColors] = useState<any>({
		average: "#FFF",
		vibrant: "#FFF",
		dominant: "#FFF",
	});
	const [variousCollection, setVariousCollections] = useState([]);
	const [snackVisible, setSnackVisible] = useState(false);
	const [nameOfWall, setNameOfWal] = useState(item.name);
	const [isDownloading, setIsDownloading] = useState(false);

	useEffect(() => {
		if (item.name.length > 17) {
			var temp = item.name.slice(0, 17);
			temp += "...";
			setNameOfWal(temp);
		} else setNameOfWal(item.name);
		if (mode == "dark" && !iconColor) setIconColor(true);
		else if (mode == "light" && iconColor) setIconColor(false);
		retrieveData();
		return function () { };
	}, []);

	//retrieve data from storage
	async function retrieveData() {
		//extract colors
		var col: any = {
			average: "#787C83",
			darkMuted: "#101818",
			darkVibrant: "#000000",
			dominant: "#101818",
			lightMuted: "#E8E8F0",
			lightVibrant: "#000000",
			muted: "#788090",
			platform: "android",
			vibrant: "#000000",
		};
		setColors(col);
		col = await ImageColors.getColors(item.thumbnail, {
			fallback: "#000000",
			quality: "high",
			pixelSpacing: 5,
		});
		if (col) {
			console.log(col);
			setColors(col);
		}

		//splitting the collections and setting it for further use
		setVariousCollections(item.collections.toLowerCase().split(","));

		//image size for better viewing. currently not in use
		Image.getSize(item.thumbnail, (w, h) => { }).catch();

		//taking out favorites from storage
		await AsyncStorage.getItem("favs").then((r) => {
			var res = JSON.parse(r);
			if (!res) return;
			for (var i = 0; i < res.length; i++) {
				if (_.isEqual(res[i], item)) {
					setIsFav(true);
					break;
				}
			}
		});
	}

	//callback function for setwallpaper
	function callback(response) {
		if (response.status == "success") {
			showSnackbarText("Wallpaper set successfully");
			setIsLoading(false);
		} else {
			setIsLoading(false);
			showSnackbarText("Something went wrong");
		}
	}

	//this will show ad and cap it up
	function showAd() {
		loadAd();
	}

	//sets wall by first downloading using rnfetch so that app doesn't crash
	//TODO: replace rnfetch with expo file system as rnfetch isn't maintained anymore
	async function setHomeWall() {
		setShowApplyModal(false);
		loadAd();
		setIsLoading(true);
		RNFetchBlob.config({
			fileCache: true,
			appendExt: "png",
		})
			.fetch("GET", item.url, {
				//some headers ... if you have any
			})
			.then((res) => {
				var PATH = "file://" + res.path();
				//console.log('The file saved to ', PATH)
				ManageWallpaper.setWallpaper(
					{
						uri: PATH,
					},
					callback,
					TYPE.HOME
				);
			})
			.catch((e) => {
				console.log(e);
				setIsLoading(false);
				showSnackbarText("Something went wrong");
			});
	}

	//same as home but lock
	function setLockWall() {
		setShowApplyModal(false);
		showAd();
		setIsLoading(true);
		RNFetchBlob.config({
			fileCache: true,
			appendExt: "png",
		})
			.fetch("GET", item.url, {
				//some headers ..
			})
			.then((res) => {
				var PATH = "file://" + res.path();
				//console.log('The file saved to ', PATH)
				ManageWallpaper.setWallpaper(
					{
						uri: PATH,
					},
					callback,
					TYPE.LOCK
				);
			})
			.catch((e) => {
				console.log(e);
				setIsLoading(false);
				showSnackbarText("Something went wrong");
			});
	}

	//for both
	function setBothWall() {
		setShowApplyModal(false);
		showAd();
		setIsLoading(true);
		RNFetchBlob.config({
			fileCache: true,
			appendExt: "png",
		})
			.fetch("GET", item.url, {
				//some headers ..
			})
			.then((res) => {
				var PATH = "file://" + res.path();
				//console.log('The file saved to ', PATH)
				ManageWallpaper.setWallpaper(
					{
						uri: PATH,
					},
					callback,
					TYPE.BOTH
				);
			})
			.catch((e) => {
				console.log(e);
				setIsLoading(false);
				showSnackbarText("Something went wrong");
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
					if (_.isEqual(res[i], item)) {
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

	//have to check for perms before the app decides to crash itself up
	const getPermissionAndroid = async () => {
		try {
			const granted = await PermissionsAndroid.request(
				PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
				{
					title: "Image Download Permission",
					message: "Your permission is required to save images to your device",
					buttonNegative: "Cancel",
					buttonPositive: "OK",
				}
			);
			if (granted === PermissionsAndroid.RESULTS.GRANTED) {
				return true;
			}
			Alert.alert(
				"Save remote Image",
				"Grant Me Permission to save Image",
				[{ text: "OK", onPress: () => console.log("OK Pressed") }],
				{ cancelable: false }
			);
		} catch (err) {
			Alert.alert(
				"Save remote Image",
				"Failed to save Image: " + err.message,
				[{ text: "OK", onPress: () => console.log("OK Pressed") }],
				{ cancelable: false }
			);
		}
	};

	function showSnackbarText(text) {
		ToastAndroid.showWithGravityAndOffset(
			text,
			ToastAndroid.SHORT,
			ToastAndroid.BOTTOM,
			25,
			50
		);
	}

	//wallpaper downloader.
	async function handleDownload() {
		if (isDownloading) {
			showSnackbarText("File is downloading");
			return;
		} else {
			setIsDownloading(true);
		}
		showAd();
		showSnackbarText("Download Started");
		if (Platform.OS === "android") {
			const granted = await getPermissionAndroid();
			if (!granted) {
				return;
			}
		}
		let dirs = RNFetchBlob.fs.dirs.SDCardDir;
		let extension: any = item.url.split(".").pop();
		if (extension != "jpg" && extension != "jpeg" && extension != "png") {
			extension = "jpg";
		}
		const PATH =
			dirs +
			`/Pictures/Elegant-Walls/` +
			item.name +
			"_" +
			item.author +
			"." +
			extension;
		RNFetchBlob.fs
			.exists(PATH)
			.then((exist) => {
				if (!exist) {
					RNFetchBlob.config({
						addAndroidDownloads: {
							useDownloadManager: true,
							notification: true,
							mime: "image",
							path: PATH,
						},
					})
						.fetch("GET", item.url)
						.then((res) => {
							showSnackbarText("Download completed");
						})
						.catch((error) => showSnackbarText("Something went wrong"));
				} else {
					showSnackbarText("File exists");
					setIsDownloading(false);
				}
			})
			.catch(() => {
				console.log("File error");
			});
	}

	//lets make everything into separate components coz why not?
	function renderHeart() {
		if (isFav) {
			return (
				<View style={styles.iconView}>
					<Icon
						name="heart"
						type="antdesign"
						size={25 * scaleHeight}
						color="white"
						tvParallaxProperties
					/>
				</View>
			);
		}
		return (
			<View style={styles.iconView}>
				<Icon
					name="hearto"
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
		if (bottomMenuVisible)
			return (
				<View
					style={{ marginTop: 17 * scaleHeight, paddingRight: 10 * scaleWidth }}
				>
					<Icon
						name="down"
						type="antdesign"
						size={22 * scaleHeight}
						color="white"
						tvParallaxProperties
					/>
				</View>
			);
		return (
			<View
				style={{ marginTop: 17 * scaleHeight, paddingRight: 10 * scaleWidth }}
			>
				<Icon
					name="up"
					type="antdesign"
					size={22 * scaleHeight}
					color="white"
					tvParallaxProperties
				/>
			</View>
		);
	}

	//collextionBox for the flatlist
	function renderCollectionBox({ item }) {
		return (
			<TouchableOpacity
				style={{
					...styles.box,
					backgroundColor: "rgba(0,0,0,0.38)",
					width: windowWidth / 3,
					height: 55,
				}}
				onPress={() => {
					navigation.navigate("Collection", {
						value: item,
					});
				}}
			>
				<Text style={{ fontSize: 20, color: "white" }}>
					{item.toUpperCase()}
				</Text>
			</TouchableOpacity>
		);
	}

	//the explanded view that hosts most of the data
	function renderExpandedView() {
		return (
			<ScrollView>
				<View>
					<Text
						style={{
							...styles.bottomHeader,
							fontSize: 22 * scaleHeight,
							marginHorizontal: 20 * scaleHeight,
							color: "white",
						}}
					>
						Colors
					</Text>
					<View
						style={{ flexDirection: "row", justifyContent: "space-between" }}
					>
						<ColoredBox color={colors.average} />
						<ColoredBox color={colors.darkMuted} />
						<ColoredBox color={colors.darkVibrant} />
					</View>
					<View
						style={{ flexDirection: "row", justifyContent: "space-between" }}
					>
						<ColoredBox color={colors.dominant} />
						<ColoredBox color={colors.lightMuted} />
						<ColoredBox color={colors.lightVibrant} />
					</View>
					<View
						style={{ flexDirection: "row", justifyContent: "space-between" }}
					>
						<ColoredBox color={colors.muted} />
						<ColoredBox color={colors.vibrant} />
						<ColoredBox />
					</View>
					<View
						style={{ justifyContent: "space-between", flexDirection: "row" }}
					>
						<View
							style={{
								...styles.box,
								backgroundColor: "rgba(0,0,0,0.4)",
								width: windowWidth / 3,
								height: 105,
							}}
						>
							<View>
								<Text
									style={{
										...styles.bottomHeader,
										fontSize: 20,
										color: "white",
									}}
								>
									{item.resolution}
								</Text>
							</View>
							<Text
								style={{ ...styles.bottomHeader, color: "white", fontSize: 15 }}
							>
								RESOLUTION
							</Text>
						</View>
						<View
							style={{
								...styles.box,
								backgroundColor: "rgba(0,0,0,0.4)",
								width: (2 * windowWidth) / 3 - 40,
								height: 105,
							}}
						>
							<View>
								<Text
									style={{
										...styles.bottomHeader,
										color: "white",
										fontSize: 20,
									}}
								>
									{item.author}
								</Text>
							</View>
							<Text
								style={{ ...styles.bottomHeader, color: "white", fontSize: 15 }}
							>
								AUTHOR
							</Text>
						</View>
					</View>
					<View
						style={{
							justifyContent: "space-between",
							alignItems: "flex-start",
						}}
					>
						<Text
							style={{
								...styles.bottomHeader,
								fontSize: 24,
								marginHorizontal: 20,
								marginTop: 20,
								color: "white",
							}}
						>
							Tags
						</Text>
						<View
							style={{ justifyContent: "space-between", alignItems: "center" }}
						>
							<FlatList
								horizontal
								data={variousCollection}
								renderItem={renderCollectionBox}
								keyExtractor={(item) => item}
							/>
						</View>
					</View>
				</View>
				<View style={{ height: 100, width: windowWidth }} />
			</ScrollView>
		);
	}

	//the whole bottom tab is a separate component. this page is literally bottomTab xD
	function renderBottomTab() {
		{
			return (
				<>
					<Animated.View
						style={[
							{ ...styles.bottomTab, backgroundColor: "rgba(0,0,0,0.45)" },
							{ transform: [{ translateY: translateBottom }] },
						]}
					>
						<View
							style={{ flexDirection: "row", justifyContent: "space-between" }}
						>
							<View style={{ flexDirection: "row" }}>
								<TouchableOpacity
									style={{
										...styles.icon,
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
							<View
								style={{ flexDirection: "row", justifyContent: "flex-end" }}
							>
								<TouchableOpacity
									style={styles.icon}
									onPress={() => {
										handleDownload();
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
								<TouchableOpacity
									style={styles.icon}
									onPress={() => setShowApplyModal(true)}
								>
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
									style={{ ...styles.icon, marginRight: 30 * scaleWidth }}
									onPress={() => {
										addToFav();
									}}
								>
									{renderHeart()}
								</TouchableOpacity>
							</View>
						</View>
						<View style={{ height: 35, width: windowWidth }} />
						{renderExpandedView()}
					</Animated.View>
					<Modal
						animationIn="slideInDown"
						isVisible={showApplyModal}
						useNativeDriver={true}
						onBackdropPress={() => setShowApplyModal(false)}
					>
						<SView style={styles.modal}>
							<TouchableOpacity
								onPress={() => {
									setHomeWall();
								}}
							>
								<SView
									style={{ ...styles.modalItem, marginTop: 30 * scaleHeight }}
								>
									<Icon
										name="shopping-bag"
										type="feather"
										size={25 * scaleHeight}
										style={styles.icon}
										color={iconColor ? "white" : "black"}
										tvParallaxProperties
									/>
									<Text style={styles.modalText}>Set Homescreen wallpaper</Text>
								</SView>
							</TouchableOpacity>
							<TouchableOpacity onPress={setLockWall}>
								<SView style={styles.modalItem}>
									<Icon
										name="settings"
										type="feather"
										size={25 * scaleHeight}
										style={styles.icon}
										color={iconColor ? "white" : "black"}
										tvParallaxProperties
									/>
									<Text style={styles.modalText}>Set Lockscreen wallpaper</Text>
								</SView>
							</TouchableOpacity>
							<TouchableOpacity onPress={setBothWall}>
								<SView
									style={{
										...styles.modalItem,
										marginBottom: 30 * scaleHeight,
									}}
								>
									<Icon
										name="info"
										type="feather"
										size={25 * scaleHeight}
										style={styles.icon}
										color={iconColor ? "white" : "black"}
										tvParallaxProperties
									/>
									<Text style={styles.modalText}>Set Both</Text>
								</SView>
							</TouchableOpacity>
						</SView>
					</Modal>
				</>
			);
		}
	}

	return (
		<View style={{ flex: 1 }}>
			<StatusBar
				translucent={true}
				backgroundColor={"transparent"}
				barStyle={mode == "dark" ? "light-content" : "dark-content"}
			/>
			<View style={styles.container}>
				<LoadingImage source={item} style={{ height: "100%", width: "100%" }} />
				{renderBottomTab()}
				<Loader loading={isLoading} />
			</View>
			<View></View>
		</View>
	);
}; //

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	snackbar: {
		marginBottom: -100 * scaleHeight,
		width: "80%",
		alignSelf: "center",
		borderTopLeftRadius: 15,
		borderTopRightRadius: 15,
		fontFamily: "Linotte-Bold",
	},
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
	activityIndicatorWrapper: {
		height: 250 * scaleHeight,
		position: "absolute",
		width: "100%",
		borderRadius: 10,
		top: windowHeight / 2 - 150,
		display: "flex",
		alignItems: "center",
		justifyContent: "space-around",
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
		height: 50,
		width: 85,
		margin: 10,
		justifyContent: "center",
		alignItems: "center",
		borderTopLeftRadius: 15,
		borderTopRightRadius: 15,
		borderBottomLeftRadius: 15,
		borderBottomRightRadius: 15,
	},
	bottomHeader: {
		fontSize: 16,
		fontFamily: "Linotte-Bold",
	},
	icon: {},
});

export default SetWallpaper;
