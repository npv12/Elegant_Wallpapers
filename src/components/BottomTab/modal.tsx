import React, { useContext, useEffect } from "react";
import { TouchableOpacity, Dimensions, Linking, Animated } from "react-native";
import { Icon, useTheme } from "react-native-elements";
import Modal from "react-native-modal";
import { PRO_APP, STANDARD_HEIGHT } from "../../constants";
import styles from "./styles";
import { View, Text } from "../StyledComponents";
import { TypeAppContext } from "../../types/themes";
import { AppContext } from "../../context/AppContext";
const scaleHeight = Dimensions.get("window").height / STANDARD_HEIGHT;

interface IProps {
	visible: boolean;
	setVisibility: (visibility: boolean) => void;
	navigation: any;
}

export default function BottomModal(props: IProps) {
	const { theme, mode, setMode } = useContext<TypeAppContext>(AppContext);
	const iconColor = mode == "dark" ? "white" : "black";
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
						<Icon
							name="shopping-bag"
							type="feather"
							size={25 * scaleHeight}
							style={styles.icon}
							color={iconColor}
							tvParallaxProperties
						/>
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
						<Icon
							name="settings"
							type="feather"
							size={25 * scaleHeight}
							style={styles.icon}
							color={iconColor}
							tvParallaxProperties
						/>
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
						<Icon
							name="info"
							type="feather"
							size={25 * scaleHeight}
							style={styles.icon}
							color={iconColor}
							tvParallaxProperties
						/>
						<Text style={styles.modalTextStyle}>About</Text>
					</View>
				</TouchableOpacity>
			</View>
		</Modal>
	);
}
