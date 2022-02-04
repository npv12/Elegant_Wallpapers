import React from "react";
import { Image, ActivityIndicator } from "react-native";
import { View } from "../StyledComponents";
import styles from "./styles";

interface IProps {
	style?: any;
	source: { dominantColor: string; thumbnail: string };
}

const LoadingImage = (props: IProps) => {
	return (
		<View>
			<View style={styles.activityIndicatorWrapper}>
				<ActivityIndicator animating={true} size="large" color="#00bd84" />
			</View>
			<View
				style={{
					...props.style,
					backgroundColor:
						props.source.dominantColor == "#000000"
							? "#292929"
							: props.source.dominantColor,
					position: "absolute",
				}}
			/>
			<Image source={{ uri: props.source.thumbnail }} style={props.style} />
		</View>
	);
};

export default LoadingImage;
