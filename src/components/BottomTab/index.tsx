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
	const [iconColor, setIconColor] = useState(false);
	const [bottomMenuVisible, setBottomMenuVisible] = useState(false);
	const theme = useTheme();

	if (theme.mode == "dark" && !iconColor) setIconColor(true);
	else if (theme.mode == "light" && iconColor) setIconColor(false);

	return (
		<>
			<View style={{ height: 60 * scaleHeight, borderTopEndRadius: 55 }}>
				<View
					style={{
						flex: 1,
						flexDirection: "row",
						alignItems: "center",
						paddingLeft: "3%",
					}}
				>
					<TouchableOpacity
						onPress={() => {
							setBottomMenuVisible(true);
						}}
					>
						<Icon
							name="align-justify"
							type="feather"
							size={25 * scaleHeight}
							style={styles.icon}
							color={iconColor ? "white" : "black"}
						/>
					</TouchableOpacity>
					<TouchableOpacity onPress={() => navigation.navigate("Fav")}>
						<Icon
							name="hearto"
							type="antdesign"
							size={25 * scaleHeight}
							style={styles.icon}
							color={iconColor ? "white" : "black"}
						/>
					</TouchableOpacity>
				</View>

				<TouchableOpacity
					onPress={() => navigation.navigate("Search")}
					style={{
						...styles.searchBox,
						backgroundColor: iconColor ? "white" : "black",
					}}
				>
					<Icon
						name="search"
						type="feather"
						size={25 * scaleHeight}
						color={!iconColor ? "white" : "black"}
					/>
				</TouchableOpacity>
			</View>
			<BottomModal
				visible={bottomMenuVisible}
				setVisibility={setBottomMenuVisible}
				navigation={navigation}
			/>
		</>
	);
};

export default BottomTab;
