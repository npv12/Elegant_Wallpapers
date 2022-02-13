import React, { useEffect, useState } from "react";
import { TouchableOpacity, Dimensions, Linking } from "react-native";
import { STANDARD_HEIGHT, CONTRIBUTORS } from "../../constants";
import { Text } from "../../components/StyledComponents";
import styles from "./styles";

const scaleHeight = Dimensions.get("window").height / STANDARD_HEIGHT;

const Authors = () => {
	const [contributors, setContributors] = useState(null);

	async function getContributors() {
		fetch(CONTRIBUTORS, {
			method: "GET",
		})
			.then((response) => response.json())
			.then((responseJson) => {
				setContributors(responseJson);
			})
			.catch((error) => {
				console.log(error);
			});
	}

	useEffect(() => {
		getContributors();
	}, []);

	return (
		contributors &&
		contributors.map(function (data: any, index: number) {
			return (
				<TouchableOpacity
					onPress={() => Linking.openURL(data.url)}
					activeOpacity={0.6}
					key={index + data}
				>
					<Text style={styles.item}>{data.name}</Text>
					<Text
						style={{
							...styles.item,
							fontSize: 16 * scaleHeight,
							paddingTop: 5 * scaleHeight,
							color: "#898989",
						}}
					>
						{data.title}
					</Text>
				</TouchableOpacity>
			);
		})
	);
};

export default Authors;
