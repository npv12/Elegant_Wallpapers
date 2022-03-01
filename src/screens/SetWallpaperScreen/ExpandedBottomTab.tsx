import React, { useState, useEffect, useContext } from "react";
import {
	TouchableOpacity,
	Dimensions,
	ScrollView,
	View,
	FlatList,
} from "react-native";
import ImageColors from "react-native-image-colors";
import ColoredBox from "../../components/ColoredBox";
import { STANDARD_HEIGHT } from "../../constants";
import { Text } from "../../components/StyledComponents";
import { TypeAppContext } from "../../types";
import { AppContext } from "../../context/AppContext";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";

const windowWidth = Dimensions.get("window").width;
const scaleHeight = Dimensions.get("window").height / STANDARD_HEIGHT;

const ExpandedBottomTab = ({ item }) => {
	const { theme, mode } = useContext<TypeAppContext>(AppContext);
	const navigation = useNavigation();
	const [iconColor, setIconColor] = useState(false);
	const [colors, setColors] = useState<any>({
		average: "#FFF",
		vibrant: "#FFF",
		dominant: "#FFF",
	});
	const [variousCollection, setVariousCollections] = useState([]);

	useEffect(() => {
		if (mode == "dark" && !iconColor) setIconColor(true);
		else if (mode == "light" && iconColor) setIconColor(false);
		retrieveData();
		return function () {};
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
			setColors(col);
		}

		//splitting the collections and setting it for further use
		setVariousCollections(item.collections.toLowerCase().split(","));
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
				<View style={{ flexDirection: "row", justifyContent: "space-between" }}>
					<ColoredBox color={colors.average} />
					<ColoredBox color={colors.darkMuted} />
					<ColoredBox color={colors.darkVibrant} />
				</View>
				<View style={{ flexDirection: "row", justifyContent: "space-between" }}>
					<ColoredBox color={colors.dominant} />
					<ColoredBox color={colors.lightMuted} />
					<ColoredBox color={colors.lightVibrant} />
				</View>
				<View style={{ flexDirection: "row", justifyContent: "space-between" }}>
					<ColoredBox color={colors.muted} />
					<ColoredBox color={colors.vibrant} />
					<ColoredBox />
				</View>
				<View style={{ justifyContent: "space-between", flexDirection: "row" }}>
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
};

export default ExpandedBottomTab;
