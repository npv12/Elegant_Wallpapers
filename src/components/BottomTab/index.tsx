import React, { useState } from "react";
import { TouchableOpacity, Dimensions } from "react-native";
import { Icon } from "react-native-elements";
import { useTheme } from "../../themes";
import { STANDARD_HEIGHT } from "../../constants";
import styles from "./styles";
import BottomModal from "./modal";
import { View } from "../StyledComponents";

const scaleHeight = Dimensions.get("window").height / STANDARD_HEIGHT;

const BottomTab = ({ navigation }) => {
	const iconColor = useTheme().mode == "dark" ? "white" : "black";
	const [modalVisible, setmodalVisible] = useState(false);

	return (
		<>
			<View style={styles.container}>
				<View style={styles.bottomContainer}>
					<TouchableOpacity
						onPress={() => {
							setmodalVisible(true);
						}}
					>
						<Icon
							name="align-justify"
							type="feather"
							size={25 * scaleHeight}
							style={styles.icon}
							color={iconColor}
						/>
					</TouchableOpacity>
					<TouchableOpacity onPress={() => navigation.navigate("Fav")}>
						<Icon
							name="hearto"
							type="antdesign"
							size={25 * scaleHeight}
							style={styles.icon}
							color={iconColor}
						/>
					</TouchableOpacity>
				</View>

				<TouchableOpacity
					onPress={() => navigation.navigate("Search")}
					style={{
						...styles.searchBox,
						backgroundColor: iconColor,
					}}
				>
					<Icon
						name="search"
						type="feather"
						size={25 * scaleHeight}
						color={iconColor == "black" ? "white" : "black"}
					/>
				</TouchableOpacity>
			</View>
			<BottomModal
				visible={modalVisible}
				setVisibility={setmodalVisible}
				navigation={navigation}
			/>
		</>
	);
};

export default BottomTab;
