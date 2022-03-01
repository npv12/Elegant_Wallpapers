import React, { useRef } from "react";
import { TouchableOpacity } from "react-native";
import LoadingImage from "../LoadingImage";
import { FlatList } from "react-native-gesture-handler";
import { Text, View } from "../StyledComponents";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";

/**  Takes out the scroll logic from inside of collection or a wallpaper scrollable to here to keep the correspoding component less cluttered
 * Pass in data as a data props
 * pass in a navigation props to make the component navigate to appropriate location
 * pass in a boolean isCollection to differentiate between a collection and a wallpaper page
 */

const ScrollableCollection = ({
	data,
	isCollection = false,
}: {
	data: Array<any>;
	isCollection?: boolean;
}) => {
	const scrollRef = useRef();
	const navigation = useNavigation();

	const renderItem = ({ item }) => {
		return (
			<View style={styles.wallBoundary}>
				<TouchableOpacity
					onPress={() =>
						isCollection
							? navigation.navigate("Collection", {
									value: item.collections,
							  })
							: navigation.navigate("Wall", {
									item: item,
							  })
					}
					activeOpacity={0.9}
				>
					<LoadingImage
						source={item}
						style={isCollection ? styles.Collection : styles.Wall}
					/>
					<View style={styles.header}>
						{isCollection && (
							<Text style={styles.headerText}>
								{item.collections.toUpperCase()}
							</Text>
						)}
					</View>
				</TouchableOpacity>
			</View>
		);
	};
	return !data ? (
		<View style={styles.loadingContainer}>
			<Text style={styles.loadingText}>Loading your favorite walls.....</Text>
		</View>
	) : data.length === 0 ? (
		<View style={styles.loadingContainer}>
			<Text style={styles.loadingText}>No walls were found :(.....</Text>
		</View>
	) : (
		<View style={styles.list}>
			<FlatList
				ref={scrollRef}
				showsVerticalScrollIndicator={false}
				showsHorizontalScrollIndicator={false}
				data={data}
				numColumns={isCollection ? 1 : 2}
				renderItem={renderItem}
				keyExtractor={(item, index) => item.url + index}
			/>
		</View>
	);
};

export default ScrollableCollection;
