import React from "react";
import { TouchableOpacity, Dimensions, Linking, Animated } from "react-native";
import { Icon } from "react-native-elements";
import { useTheme } from "../../themes";
import Modal from "react-native-modal";
import { PRO_APP, STANDARD_HEIGHT } from "../../constants";
import styles from "./styles";
import { View, Text } from "../StyledComponents";
const scaleHeight = Dimensions.get("window").height / STANDARD_HEIGHT;

interface IProps {
	visible: boolean;
	setVisibility: (visibility: boolean) => void;
	bounceValue?: Animated.Value;
	navigation: any;
	toggleSubview: any;
}

export default function BottomModal(props: IProps) {
	const iconColor = useTheme().mode == "dark";
	return (
		<Modal
			isVisible={props.visible}
			onDismiss={() => props.setVisibility(false)}
			onBackdropPress={() => props.toggleSubview()}
			onSwipeComplete={() => props.toggleSubview()}
			swipeDirection={["down"]}
			style={{
				justifyContent: "flex-end",
				margin: 0,
				backgroundColor: "rgba(0,0,0,0.6)",
			}}
		>
			<Animated.View
				style={[
					styles.subView,
					{ transform: [{ translateY: props.bounceValue }] },
				]}
			>
				<View style={{ ...styles.bottomTab, height: 185 * scaleHeight }}>
					<View style={styles.pill}></View>
					<TouchableOpacity onPress={() => Linking.openURL(PRO_APP)}>
						<View style={styles.modalItem}>
							<Icon
								name="shopping-bag"
								type="feather"
								size={25 * scaleHeight}
								style={styles.icon}
								color={iconColor ? "white" : "black"}
							/>
							<Text style={styles.modalText}>Upgrade to Pro</Text>
						</View>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => {
							props.navigation.navigate("Settings");
							props.setVisibility(false);
							props.toggleSubview();
						}}
					>
						<View style={styles.modalItem}>
							<Icon
								name="settings"
								type="feather"
								size={25 * scaleHeight}
								style={styles.icon}
								color={iconColor ? "white" : "black"}
							/>
							<Text style={styles.modalText}>Settings</Text>
						</View>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => {
							props.toggleSubview();
							props.setVisibility(false);
							props.navigation.navigate("About");
						}}
					>
						<View style={styles.modalItem}>
							<Icon
								name="info"
								type="feather"
								size={25 * scaleHeight}
								style={styles.icon}
								color={iconColor ? "white" : "black"}
							/>
							<Text style={styles.modalText}>About</Text>
						</View>
					</TouchableOpacity>
				</View>
			</Animated.View>
		</Modal>
	);
}
