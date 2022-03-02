import React, { ReactNode, useContext } from "react";
import {
	View as RNView,
	Text as RNText,
	StatusBar as RNStatusbar,
	TouchableOpacity as RNTouchableOpacity,
	Dimensions,
	TextStyle,
	ViewStyle,
	ActivityIndicator as RNActivityIndicator,
} from "react-native";
import { TypeAppContext } from "../../types";
import { AppContext } from "../../context/AppContext";
import { Icon as RNIcon } from "react-native-elements";
import { STANDARD_HEIGHT } from "../../constants";

const scaleHeight = Dimensions.get("window").height / STANDARD_HEIGHT;
/*
These house a special set of components. These are just like special components but with a set of preapplied styles
These can be used to implement a true light and dark theme.
These can also be extended to include some custom theme that is a part of all other such components.
Though they can be a standalone component, I am commanising them here for easy manipulation.
*/

export const View = ({
	style,
	children,
	isInverted,
}: {
	children?: ReactNode;
	style?: ViewStyle;
	isInverted?: boolean;
}): JSX.Element => {
	const { theme } = useContext<TypeAppContext>(AppContext);
	return (
		<RNView
			style={{
				backgroundColor: isInverted
					? theme.backgroundInverted
					: theme.background,
				...style,
			}}
		>
			{children}
		</RNView>
	);
};

export const Text = ({
	style,
	children,
	color,
	useAlt,
}: {
	children?: ReactNode;
	style?: TextStyle;
	color?: string;
	useAlt?: boolean;
}): JSX.Element => {
	const { theme } = useContext<TypeAppContext>(AppContext);
	return (
		<RNText
			style={{
				color: color || (useAlt ? theme.textAlt : theme.text),
				...style,
			}}
		>
			{children}
		</RNText>
	);
};

export const StatusBar = () => {
	const { theme } = useContext<TypeAppContext>(AppContext);
	return (
		<RNStatusbar
			translucent={true}
			backgroundColor={"transparent"}
			barStyle={theme.statusbarContent}
		/>
	);
};

export const Icon = ({
	name,
	type,
	size,
	color,
	style,
	isInverted,
}: {
	name?: string;
	type?: string;
	size?: number;
	color?: string;
	style?: TextStyle;
	isInverted?: boolean;
}) => {
	const { theme } = useContext<TypeAppContext>(AppContext);
	return (
		<RNIcon
			name={name || "search"}
			type={type || "feather"}
			size={size || 45 * scaleHeight}
			color={color || (isInverted ? theme.iconColorInverted : theme.iconColor)}
			style={style}
			tvParallaxProperties
		/>
	);
};

export const TouchableOpacity = ({
	onPress,
	children,
	style,
	isInverted,
}: {
	onPress: any;
	children?: ReactNode;
	style?: ViewStyle;
	isInverted?: boolean;
}) => {
	const { theme } = useContext<TypeAppContext>(AppContext);
	return (
		<RNTouchableOpacity
			onPress={onPress}
			style={{
				backgroundColor: isInverted
					? theme.backgroundInverted
					: theme.background,
				...style,
			}}
		>
			{children}
		</RNTouchableOpacity>
	);
};

export const ActivityIndicator = ({
	size,
	isInverted,
	color,
}: {
	size?: "large" | "small";
	isInverted?: boolean;
	color?: string;
}) => {
	const { theme } = useContext<TypeAppContext>(AppContext);
	return (
		<RNActivityIndicator
			animating={true}
			size={size || "large"}
			color={color || (isInverted ? theme.iconColorInverted : theme.iconColor)}
		/>
	);
};
