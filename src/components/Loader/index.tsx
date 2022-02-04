import React from "react";
import { View, Modal, ActivityIndicator } from "react-native";
import { useTheme } from "../../themes";
import styles from "./styles";

const Loader = ({ loading }) => {
	const theme = useTheme();

	return (
		<Modal transparent={true} animationType={"none"} visible={loading}>
			<View style={styles.modalBackground}>
				<View
					style={{
						...styles.activityIndicatorWrapper,
						backgroundColor: theme.mode == "dark" ? "black" : "white",
					}}
				>
					<ActivityIndicator
						animating={true}
						size="large"
						color={theme.mode != "dark" ? "black" : "white"}
					/>
				</View>
			</View>
		</Modal>
	);
};

export default Loader;
