import React, { useContext, useState } from "react";
import { TouchableOpacity, Dimensions } from "react-native";
import { Icon, useTheme } from "react-native-elements";
import { STANDARD_HEIGHT } from "../../constants";
import styles from "./styles";
import BottomModal from "./modal";
import { View } from "../StyledComponents";
import { TypeThemeContext } from "../../types/themes";
import { ThemeContext } from "../../Themes/ThemeContext";

const scaleHeight = Dimensions.get("window").height / STANDARD_HEIGHT;

const BottomTab = ({ navigation }) => {
	const { theme, mode, setMode } = useContext<TypeThemeContext>(ThemeContext);
	const iconColor = mode == "dark" ? "white" : "black";
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
							tvParallaxProperties
						/>
					</TouchableOpacity>
					<TouchableOpacity onPress={() => navigation.navigate("Fav")}>
						<Icon
							name="hearto"
							type="antdesign"
							size={25 * scaleHeight}
							style={styles.icon}
							color={iconColor}
							tvParallaxProperties
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
						tvParallaxProperties
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
