import React from "react";
import { ScrollView, Text, View } from "react-native";
// @ts-ignore
import Modal from "react-native-modal";
import Base from "./base";
import styles from "./styles";

type State = {
	scrollOffset: null | number;
};

class ScrollableModal extends Base<State> {
	public scrollViewRef: React.RefObject<ScrollView>;
	constructor(props: any) {
		super(props, {
			scrollOffset: null,
		});

		this.scrollViewRef = React.createRef();
	}
	handleOnScroll = (event: { nativeEvent: { contentOffset: { y: any } } }) => {
		this.setState({
			scrollOffset: event.nativeEvent.contentOffset.y,
		});
	};
	handleScrollTo = (
		p: number | { x?: number; y?: number; animated?: boolean }
	) => {
		if (this.scrollViewRef.current) {
			this.scrollViewRef.current.scrollTo(p);
		}
	};

	renderModal(): React.ReactElement<any> {
		return (
			<Modal
				testID={"modal"}
				isVisible={this.props.visible}
				onSwipeComplete={this.close}
				swipeDirection={["down"]}
				onBackdropPress={() => this.props.changeVisible(false)}
				onDismiss={() => this.isVisible()}
				scrollTo={this.handleScrollTo}
				scrollOffset={this.state.scrollOffset}
				scrollOffsetMax={400 - 300} // content height - ScrollView height
				propagateSwipe={true}
				style={styles.modal}
			>
				<View style={styles.scrollableModal}>
					<View
						style={{
							height: 25,
							width: "100%",
							borderTopLeftRadius: 25,
							borderTopRightRadius: 25,
							backgroundColor: "#AAFF00",
						}}
					/>
					<ScrollView
						ref={this.scrollViewRef}
						onScroll={this.handleOnScroll}
						scrollEventThrottle={16}
					>
						<View style={styles.scrollableModalContent1}>
							<Text style={styles.scrollableModalText1}>
								{this.props.changelog}
							</Text>
						</View>
					</ScrollView>
				</View>
			</Modal>
		);
	}
}

export default ScrollableModal;
