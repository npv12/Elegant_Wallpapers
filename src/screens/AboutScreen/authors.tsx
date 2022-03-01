import React, { useEffect, useState } from "react";
import { TouchableOpacity, Linking } from "react-native";
import { CONTRIBUTORS } from "../../constants";
import { Text } from "../../components/StyledComponents";
import styles from "./styles";

export default function Authors() {
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
					<Text style={styles.itemText}>{data.title}</Text>
				</TouchableOpacity>
			);
		})
	);
}
