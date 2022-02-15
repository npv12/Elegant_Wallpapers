/**
 * This file mainly contains utility functions that are used throughout the app.
 * There may not be a lot but lets keep them separate.
 */

import { PermissionsAndroid } from "react-native";

/**
 * args: Takes no arguments
 * @returns {boolean} true if the required permissions are granted, false otherwise
 */
export const getStoragePermissionAndroid = async (): Promise<boolean> => {
	try {
		const granted = await PermissionsAndroid.request(
			PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
			{
				title: "Image Download Permission",
				message: "Your permission is required to save images to your device",
				buttonNegative: "Cancel",
				buttonPositive: "OK",
			}
		);
		if (granted === PermissionsAndroid.RESULTS.GRANTED) return true;
	} catch (err) {
		console.error(err);
	}
	return false;
};
