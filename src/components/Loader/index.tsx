import React, { useContext } from "react";
import { Modal } from "react-native";
import { ActivityIndicator, View } from "../StyledComponents";
import styles from "./styles";

const Loader = ({ loading }) => {
	return (
		<Modal transparent={true} animationType={"none"} visible={loading}>
			<View style={styles.modalBackground}>
				<View style={styles.activityIndicatorWrapper}>
					<ActivityIndicator />
				</View>
			</View>
		</Modal>
	);
};

export default Loader;
