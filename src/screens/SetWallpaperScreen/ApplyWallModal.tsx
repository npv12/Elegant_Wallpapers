import React from "react";
import { TouchableOpacity, Dimensions } from "react-native";
import Modal from "react-native-modal";
import { STANDARD_HEIGHT } from "../../constants";
import { Icon, Text, View as SView } from "../../components/StyledComponents";
import { showSnackbarText } from "../../utils";
import styles from "./styles";
import { setImageAsWall } from "../../utils/wallpaper";
const scaleHeight = Dimensions.get("window").height / STANDARD_HEIGHT;

export default function ApplyWallModal({
	showApplyModal,
	setShowApplyModal,
	item,
}) {
	function callback(response) {
		if (response.status == "success") {
			showSnackbarText("Wallpaper set successfully");
			//setIsLoading(false);
		} else {
			//setIsLoading(false);
			showSnackbarText("Something went wrong");
		}
	}
	return (
		<Modal
			animationIn="slideInDown"
			isVisible={showApplyModal}
			useNativeDriver={true}
			onBackdropPress={() => setShowApplyModal(false)}
		>
			<SView style={styles.modal}>
				<TouchableOpacity
					onPress={() => {
						setImageAsWall(item.url, "home", callback, setShowApplyModal);
					}}
				>
					<SView style={{ ...styles.modalItem, marginTop: 30 * scaleHeight }}>
						<Icon name="shopping-bag" size={25} />
						<Text style={styles.modalText}>Set Homescreen wallpaper</Text>
					</SView>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => {
						setImageAsWall(item.url, "lock", callback, setShowApplyModal);
					}}
				>
					<SView style={styles.modalItem}>
						<Icon name="settings" size={25} />
						<Text style={styles.modalText}>Set Lockscreen wallpaper</Text>
					</SView>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => {
						setImageAsWall(item.url, "both", callback, setShowApplyModal);
					}}
				>
					<SView
						style={{
							...styles.modalItem,
							marginBottom: 30 * scaleHeight,
						}}
					>
						<Icon name="info" size={25} />
						<Text style={styles.modalText}>Set Both</Text>
					</SView>
				</TouchableOpacity>
			</SView>
		</Modal>
	);
}
