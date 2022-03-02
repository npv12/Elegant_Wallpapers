import React, { useState } from "react";
import styles from "./styles";
import BottomModal from "./modal";
import { Icon, TouchableOpacity, View } from "../StyledComponents";

const BottomTab = ({ navigation }) => {
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
					style={styles.searchBox}
				>
					<Icon name="search" type="feather" size={25} />
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
