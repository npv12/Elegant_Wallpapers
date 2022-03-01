import React, { useContext } from "react";
import { View, Modal, ActivityIndicator } from "react-native";
import { AppContext } from "../../context/AppContext";
import { TypeAppContext } from "../../types";
import styles from "./styles";

const Loader = ({ loading }) => {
	const { theme, mode, setMode } = useContext<TypeAppContext>(AppContext);

	return (
		<Modal transparent={true} animationType={"none"} visible={loading}>
			<View style={styles.modalBackground}>
				<View
					style={{
						...styles.activityIndicatorWrapper,
						backgroundColor: mode == "dark" ? "black" : "white",
					}}
				>
					<ActivityIndicator
						animating={true}
						size="large"
						color={mode != "dark" ? "black" : "white"}
					/>
				</View>
			</View>
		</Modal>
	);
};

export default Loader;
