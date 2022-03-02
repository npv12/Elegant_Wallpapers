import React, { useContext, useState } from "react";
import { TouchableOpacity } from "react-native";
import styles from "./styles";
import BottomModal from "./modal";
import { Icon, View } from "../StyledComponents";
import { TypeAppContext } from "../../types";
import { AppContext } from "../../context/AppContext";

const BottomTab = ({ navigation }) => {
	const { theme } = useContext<TypeAppContext>(AppContext);
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
							size={25}
							style={styles.icon}
						/>
					</TouchableOpacity>
					<TouchableOpacity onPress={() => navigation.navigate("Fav")}>
						<Icon
							name="hearto"
							type="antdesign"
							size={25}
							style={styles.icon}
						/>
					</TouchableOpacity>
				</View>

				<TouchableOpacity
					onPress={() => navigation.navigate("Search")}
					style={{
						...styles.searchBox,
						backgroundColor: theme.background,
					}}
				>
					<Icon name="search" type="feather" size={25} isInverted={true} />
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
