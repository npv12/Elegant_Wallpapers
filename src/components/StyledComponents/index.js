import styled from "styled-components/native";

/*
These house a special set of components. These are just like special components but with a set of preapplied styles
These can be used to implement a true light and dark theme.
These can also be extended to include some custom theme that is a part of all other such components.
Though they can be a standalone component, I am commanising them here for easy manipulation.
*/

export const View = styled.View({
	background: (props) => props.theme.background,
});

export const Text = styled.Text({
	color: (props) => props.theme.text,
});
