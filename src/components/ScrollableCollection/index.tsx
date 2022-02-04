import React, { useRef } from "react";
import { TouchableOpacity } from "react-native";
import LoadingImage from "../LoadingImage";
import { FlatList } from "react-native-gesture-handler";
import { Text, View } from "../StyledComponents";
import styles from "./styles";

/**  Takes out the scroll logic from inside of collection to here to keep the collection less cluttered
 */

const ScrollableCollection = ({ data, onPress }) => {
	const scrollRef = useRef();

	const renderItem = ({ item }) => {
		return (
			<View style={styles.wallBoundary}>
				<TouchableOpacity onPress={() => onPress(item)} activeOpacity={0.9}>
					<LoadingImage source={item} style={styles.Wall} />
					<View style={styles.header}>
						<Text style={styles.headerText}>
							{item.collections.toUpperCase()}
						</Text>
					</View>
				</TouchableOpacity>
			</View>
		);
	};
	return !data || data.length == 0 ? (
		<View style={styles.loadingContainer}>
			<Text style={styles.loadingText}>Loading your favorite walls.....</Text>
		</View>
	) : (
		<View style={styles.list}>
			<FlatList
				ref={scrollRef}
				showsVerticalScrollIndicator={false}
				showsHorizontalScrollIndicator={false}
				data={data}
				renderItem={renderItem}
				keyExtractor={(item) => item.url}
			/>
		</View>
	);
};

export default ScrollableCollection;
