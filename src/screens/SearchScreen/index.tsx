import React, { useState } from "react";
import { Dimensions } from "react-native";
import { STANDARD_HEIGHT } from "../../constants";
import ScrollableCollection from "../../components/ScrollableCollection";
import SearchBox from "../../components/SearchBox";
import { Icon, StatusBar, View, Text } from "../../components/StyledComponents";

const scaleHeight = Dimensions.get("window").height / STANDARD_HEIGHT;

const SearchScreen = () => {
	const [empty, setEmpty] = useState(true);
	const [walls, setWalls] = useState([]);

	return (
		<>
			<View
				isInverted
				style={{
					height: 35 * scaleHeight,
				}}
			></View>
			<StatusBar />
			<View isInverted>
				<SearchBox setEmpty={setEmpty} setWalls={setWalls} />
				{!empty ? (
					<ScrollableCollection data={walls} />
				) : (
					<View
						style={{ justifyContent: "center", flex: 1, alignItems: "center" }}
					>
						<Icon
							name="search"
							size={45}
							color="grey"
							style={{ paddingBottom: 35 * scaleHeight }}
						/>
						<Text
							useAlt
							style={{
								fontSize: 20 * scaleHeight,
								fontFamily: "Linotte-Bold",
							}}
						>
							Try searching for something
						</Text>
					</View>
				)}
			</View>
		</>
	);
};

export default SearchScreen;
