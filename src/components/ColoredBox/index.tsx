import React from "react";
import { View, Text, TouchableOpacity, ToastAndroid } from "react-native";
import Clipboard from "@react-native-clipboard/clipboard";
import styles from "./styles";

interface IProps {
	color?: string;
}

export default function ColoredBox(props: IProps) {
	//copies the color to clipboard when the color is selected
	function copyToClip() {
		Clipboard.setString(props.color);
		ToastAndroid.showWithGravityAndOffset(
			"Color has been copied",
			ToastAndroid.SHORT,
			ToastAndroid.BOTTOM,
			25,
			50
		);
	}
	return (
		<TouchableOpacity
			style={styles.container}
			activeOpacity={0.5}
			onPress={copyToClip}
		>
			<View style={{ ...styles.circle, backgroundColor: props.color }} />
			<Text style={styles.header}>{props.color}</Text>
		</TouchableOpacity>
	);
}
