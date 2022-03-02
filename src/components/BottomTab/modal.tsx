import React from "react";
import { TouchableOpacity, Linking } from "react-native";
import Modal from "react-native-modal";
import { PRO_APP } from "../../constants";
import styles from "./styles";
import { View, Text, Icon } from "../StyledComponents";

interface IProps {
	visible: boolean;
	setVisibility: (visibility: boolean) => void;
	navigation: any;
}

export default function BottomModal(props: IProps) {
	return (
		<Modal
			isVisible={props.visible}
			onDismiss={() => props.setVisibility(false)}
			onBackdropPress={() => props.setVisibility(false)}
			onSwipeComplete={() => props.setVisibility(false)}
			animationInTiming={400}
			animationOutTiming={600}
			backdropTransitionInTiming={0}
			backdropTransitionOutTiming={0}
			swipeDirection={["down", "right", "left"]}
			style={{
				justifyContent: "flex-end",
				margin: 0,
				backgroundColor: "rgba(0,0,0,0.6)",
			}}
		>
			<View style={styles.bottomTab}>
				<View style={styles.pill}></View>
				<TouchableOpacity onPress={() => Linking.openURL(PRO_APP)}>
					<View style={styles.modalItem}>
						<Icon name="shopping-bag" size={25} style={styles.icon} />
						<Text style={styles.modalTextStyle}>Upgrade to Pro</Text>
					</View>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => {
						props.setVisibility(false);
						props.navigation.navigate("Settings");
					}}
				>
					<View style={styles.modalItem}>
						<Icon name="settings" size={25} style={styles.icon} />
						<Text style={styles.modalTextStyle}>Settings</Text>
					</View>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => {
						props.setVisibility(false);
						props.navigation.navigate("About");
					}}
				>
					<View style={styles.modalItem}>
						<Icon name="info" size={25} style={styles.icon} />
						<Text style={styles.modalTextStyle}>About</Text>
					</View>
				</TouchableOpacity>
			</View>
		</Modal>
	);
}
