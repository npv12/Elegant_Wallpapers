import React, { Component } from "react";
import { View } from "react-native";

type State<P> = P & {
	visible: boolean;
};

abstract class Base<P> extends Component<any, State<P>> {
	abstract renderModal(): React.ReactElement<any>;

	constructor(props: any, state?: P) {
		super(props);
		this.state = {
			...state,
			visible: false,
		};
	}

	open = () => this.setState({ visible: true } as any);
	close = () => this.setState({ visible: false } as any);
	isVisible = () => this.state.visible;

	render() {
		return <View>{this.renderModal()}</View>;
	}
}

export default Base;
