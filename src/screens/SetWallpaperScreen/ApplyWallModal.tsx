import React, { useContext } from "react";
import { TouchableOpacity, Dimensions } from "react-native";
import Modal from "react-native-modal";
import { TYPE } from "react-native-manage-wallpaper";
import { STANDARD_HEIGHT } from "../../constants";
import { Icon, Text, View as SView } from "../../components/StyledComponents";
import { showSnackbarText } from "../../utils";
import styles from "./styles";
import { setImageAsWall } from "../../utils/wallpaper";
import { TypeAppContext } from "../../types";
import { AppContext } from "../../context/AppContext";
const scaleHeight = Dimensions.get("window").height / STANDARD_HEIGHT;

export default function ApplyWallModal({
	showApplyModal,
	setShowApplyModal,
	item,
}) {
	const { setIsLoading } = useContext<TypeAppContext>(AppContext);
	function callback(response) {
		if (response!! && response.status == "success") {
			showSnackbarText("Wallpaper set successfully");
		} else {
			showSnackbarText("Something went wrong");
		}
		setIsLoading(false);
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
						setIsLoading(true);
						setImageAsWall(item.url, TYPE.HOME, callback, setShowApplyModal);
					}}
				>
					<SView style={{ ...styles.modalItem, marginTop: 30 * scaleHeight }}>
						<Icon name="shopping-bag" size={25} />
						<Text style={styles.modalText}>Set Homescreen wallpaper</Text>
					</SView>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => {
						setIsLoading(true);
						setImageAsWall(item.url, TYPE.LOCK, callback, setShowApplyModal);
					}}
				>
					<SView style={styles.modalItem}>
						<Icon name="settings" size={25} />
						<Text style={styles.modalText}>Set Lockscreen wallpaper</Text>
					</SView>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => {
						setIsLoading(true);
						setImageAsWall(item.url, TYPE.BOTH, callback, setShowApplyModal);
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
