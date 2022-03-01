import React, { createContext, useState, ReactNode, useContext } from "react";
import { View as RNView, Text as RNText } from "react-native"
import styled from "styled-components/native";
import { TypeThemeContext } from "../../types/themes";
import { ThemeContext } from "../../Themes/ThemeContext";

/*
These house a special set of components. These are just like special components but with a set of preapplied styles
These can be used to implement a true light and dark theme.
These can also be extended to include some custom theme that is a part of all other such components.
Though they can be a standalone component, I am commanising them here for easy manipulation.
*/

// export const View = styled.View({
// 	background: () => {
// 		return "#FF11FF";
// 	},
// });

// export const Text = styled.Text({
// 	color: "white",
// });

export const View = ({ style,
	children,
}: {
	children?: ReactNode;
	style?: any
}): JSX.Element => {
	const { theme } = useContext<TypeThemeContext>(ThemeContext)
	return <RNView style={{
		backgroundColor: theme.background,
		...style,
	}}>{children}</RNView>
}

export const Text = ({ style,
	children
}: {
	children?: ReactNode;
	style?: any
}): JSX.Element => {
	const { theme } = useContext<TypeThemeContext>(ThemeContext)
	return <RNText style={{
		color: theme.text,
		...style
	}}>{children}</RNText>
}
