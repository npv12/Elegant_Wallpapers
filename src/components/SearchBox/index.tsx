import React, { useState, useContext } from "react";
import {
	Dimensions,
	TouchableOpacity,
	View,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { Icon } from "react-native-elements";
import { STANDARD_HEIGHT } from "../../constants";
import { TypeAppContext } from "../../types";
import { AppContext } from "../../context/AppContext";
import styles from "./styles";
import { searchForWall } from "./utils";
import { useNavigation } from "@react-navigation/native";

const scaleHeight = Dimensions.get("window").height / STANDARD_HEIGHT;

const SearchBox = ({ setEmpty, setWalls }) => {
	const {wallpaperData} = useContext<TypeAppContext>(AppContext)
    const navigation = useNavigation()
	const [searchString, setSearchString] = useState("");
	const { theme, mode, setMode } = useContext<TypeAppContext>(AppContext);

	return (
        <View
            style={{
                flexDirection: "row",
                alignItems: "center",
                height: 55 * scaleHeight,
                marginTop: 35 * scaleHeight,
                justifyContent: "space-between",
            }}
        >
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Icon
                    name="arrow-left"
                    type="feather"
                    size={25}
                    style={styles.icon}
                    color={mode == "dark" ? "white" : "black"}
                    tvParallaxProperties
                />
            </TouchableOpacity>
            <TextInput
                style={{
                    ...styles.input,
                    backgroundColor: mode != "dark" ? "white" : "black",
                    color: mode == "dark" ? "white" : "black",
                }}
                placeholder="Search...."
                defaultValue={searchString}
                placeholderTextColor={mode == "dark" ? "#A9A9A9" : "grey"}
                onChangeText={(val) => {
                    searchForWall(val, wallpaperData, setEmpty, setWalls);
                    setSearchString(val);
                }}
            />
            <Icon
                name="search"
                type="feather"
                size={25}
                style={styles.icon}
                color={mode != "dark" ? "white" : "black"}
                tvParallaxProperties
            />
        </View>
    );
};

export default SearchBox;
