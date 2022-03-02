import React, { useState, useEffect } from "react";
import {
	TouchableOpacity,
	Dimensions,
	ScrollView,
	View,
	FlatList,
} from "react-native";
import { STANDARD_HEIGHT } from "../../constants";
import { Text } from "../../components/StyledComponents";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";
import RenderColors from "./RenderColors";

const windowWidth = Dimensions.get("window").width;
const scaleHeight = Dimensions.get("window").height / STANDARD_HEIGHT;

const ExpandedBottomTab = ({ item }) => {
	const navigation = useNavigation();
	const [variousCollection, setVariousCollections] = useState([]);

	useEffect(() => {
		setVariousCollections(item.collections.toLowerCase().split(","));
	}, []);

	//collextionBox for the flatlist
	function renderCollectionBox({ item }) {
		return (
			<TouchableOpacity
				style={{
					...styles.box,
					width: windowWidth / 3,
					height: 55,
				}}
				onPress={() => {
					navigation.navigate(
						"Collection" as never,
						{
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
			<RenderColors item={item} />
			<View style={{ justifyContent: "space-between", flexDirection: "row" }}>
				<View style={styles.biggerBox}>
					<Text
						style={{
							...styles.bottomHeader,
							fontSize: 20,
							color: "white",
						}}
					>
						{item.resolution}
					</Text>
					<Text
						style={{ ...styles.bottomHeader, color: "white", fontSize: 15 }}
					>
						RESOLUTION
					</Text>
				</View>
				<View style={styles.biggerBox}>
					<Text
						style={{
							...styles.bottomHeader,
							color: "white",
							fontSize: 20,
						}}
					>
						{item.author}
					</Text>
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
				<View style={{ justifyContent: "space-between", alignItems: "center" }}>
					<FlatList
						horizontal
						data={variousCollection}
						renderItem={renderCollectionBox}
						keyExtractor={(item) => item}
					/>
				</View>
			</View>
			<View style={{ height: 100, width: windowWidth }} />
		</ScrollView>
	);
};

export default ExpandedBottomTab;
