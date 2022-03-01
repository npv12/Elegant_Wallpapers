import React, { useState, useContext } from "react";
import { Dimensions, View, Text } from "react-native";
import { Icon } from "react-native-elements";
import { STANDARD_HEIGHT } from "../../constants";
import { TypeAppContext } from "../../types";
import { AppContext } from "../../context/AppContext";
import ScrollableCollection from "../../components/ScrollableCollection";
import SearchBox from "../../components/SearchBox";
import { StatusBar } from "../../components/StyledComponents";

const scaleHeight = Dimensions.get("window").height / STANDARD_HEIGHT;

const SearchScreen = () => {
	const [empty, setEmpty] = useState(true);
	const [walls, setWalls] = useState([]);
	const { theme, mode, setMode } = useContext<TypeAppContext>(AppContext);

	return (
		<>
			<View
				style={{
					backgroundColor: mode != "dark" ? "white" : "black",
					height: 35 * scaleHeight,
				}}
			></View>
			<StatusBar />
			<View
				style={{
					backgroundColor: mode != "dark" ? "white" : "black",
				}}
			>
				<SearchBox setEmpty={setEmpty} setWalls={setWalls} />
				{!empty ? (
					<ScrollableCollection data={walls} />
				) : (
					<View
						style={{ justifyContent: "center", flex: 1, alignItems: "center" }}
					>
						<Icon
							name="search"
							type="feather"
							size={45 * scaleHeight}
							color="grey"
							style={{ paddingBottom: 35 * scaleHeight }}
							tvParallaxProperties
						/>
						<Text
							style={{
								color: mode == "dark" ? "#A9A9A9" : "grey",
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
