import React from "react";
import { TouchableOpacity } from "react-native";
import { Text } from "../../components/StyledComponents";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";

const BottomTab = ({ item }) => {
	const navigation = useNavigation();

	return (
		<TouchableOpacity
			style={styles.box}
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
