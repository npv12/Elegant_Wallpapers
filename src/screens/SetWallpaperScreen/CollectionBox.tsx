import React from "react";
import { TouchableOpacity, Dimensions } from "react-native";
import { Text } from "../../components/StyledComponents";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";

const windowWidth = Dimensions.get("window").width;

const BottomTab = ({ item }) => {
	const navigation = useNavigation();

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
			<Text style={{ fontSize: 20, color: "white" }}>{item.toUpperCase()}</Text>
		</TouchableOpacity>
	);
};

export default BottomTab;
