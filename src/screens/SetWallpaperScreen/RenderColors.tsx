import React, { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import ImageColors from "react-native-image-colors";
import ColoredBox from "../../components/ColoredBox";

export default function RenderColors({ item }) {
	const [colors, setColors] = useState<any>(null);

	useEffect(() => {
		retrieveData();
	}, []);

	//retrieve data from storage
	async function retrieveData() {
		const col = await ImageColors.getColors(item.thumbnail, {
			fallback: "#000000",
			quality: "low",
			pixelSpacing: 15,
		});
		if (col) {
			setColors(col);
		}
	}
	return (
		<>
			{colors != null ? (
				<>
					<View
						style={{ flexDirection: "row", justifyContent: "space-between" }}
					>
						<ColoredBox color={colors.average} />
						<ColoredBox color={colors.darkMuted} />
						<ColoredBox color={colors.darkVibrant} />
					</View>
					<View
						style={{ flexDirection: "row", justifyContent: "space-between" }}
					>
						<ColoredBox color={colors.dominant} />
						<ColoredBox color={colors.lightMuted} />
						<ColoredBox color={colors.lightVibrant} />
					</View>
					<View
						style={{ flexDirection: "row", justifyContent: "space-between" }}
					>
						<ColoredBox color={colors.muted} />
						<ColoredBox color={colors.vibrant} />
						<ColoredBox />
					</View>
				</>
			) : (
				<ActivityIndicator size="large" />
			)}
		</>
	);
}
