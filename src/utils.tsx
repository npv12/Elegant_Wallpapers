/**
 * This file mainly contains utility functions that are used throughout the app.
 * There may not be a lot but lets keep them separate.
 */

import { PermissionsAndroid } from "react-native";
import { collectionData, TypeWallData } from "./types";

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

export function searchForWall(
	searchString: string,
	wallpaperData: Array<TypeWallData>,
	setEmpty,
	setWalls
) {
	if (searchString && wallpaperData) setEmpty(false);
	else {
		setEmpty(true);
		return;
	}
	var c = [];
	for (var i = 0; i < wallpaperData.length; i++) {
		if (
			wallpaperData[i].name.toLowerCase().includes(searchString.toLowerCase())
		)
			c.push(wallpaperData[i]);
		else if (
			wallpaperData[i].collections
				.toLowerCase()
				.includes(searchString.toLowerCase())
		)
			c.push(wallpaperData[i]);
	}
	setWalls(c);
}

export function getCollectionsFromData(data: Array<any>) {
	var collectionNames = [];
	var finalCollections: Array<collectionData> = [];

	for (var i = 0; i < data.length; i++) {
		var separateCollections = data[i].collections.toLowerCase().split(","); // Separates the different collections that are separated by a comma.
		for (var j = 0; j < separateCollections.length; j++) {
			if (!collectionNames.includes(separateCollections[j])) {
				var t: collectionData = {
					collections: separateCollections[j],
					url: data[i].url,
					thumbnail: data[i].thumbnail,
					key: (i + j).toString(), // The key doesn't really matter so lets keep it this way?
				};
				collectionNames.push(separateCollections[j]);
				finalCollections.push(t);
			}
		}
	}
	return finalCollections;
}

export function findImagesForCollection(
	data: Array<TypeWallData>,
	value: string,
	setData: any
) {
	var collection = [];
	for (var i = 0; i < data.length; i++) {
		if (
			data[i].collections.toLowerCase().split(",").includes(value.toLowerCase())
		)
			collection.push(data[i]);
	}
	setData(collection);
}
