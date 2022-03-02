import React, { ReactNode, useContext } from "react";
import {
	View as RNView,
	Text as RNText,
	StatusBar as RNStatusbar,
	Dimensions,
	TextStyle,
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
}: {
	children?: ReactNode;
	style?: any;
}): JSX.Element => {
	const { theme } = useContext<TypeAppContext>(AppContext);
	return (
		<RNView
			style={{
				backgroundColor: theme.background,
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
}: {
	children?: ReactNode;
	style?: any;
}): JSX.Element => {
	const { theme } = useContext<TypeAppContext>(AppContext);
	return (
		<RNText
			style={{
				color: theme.text,
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
			color={color || isInverted ? theme.iconColor : theme.iconColor}
			style={style}
			tvParallaxProperties
		/>
	);
};
