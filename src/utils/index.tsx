/**
 * This file mainly contains utility functions that are used throughout the app.
 * There may not be a lot but lets keep them separate.
 */

import { PermissionsAndroid, ToastAndroid } from "react-native";
import { collectionData, TypeWallData } from "../types";

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

/**
 *
 * @param searchString is the string which is supposed to be searched in the wallpaper data
 * @param wallpaperData is the entire data of wallpaper available to us
 * @param setEmpty sets the a bool to empty to verify if the user has typed in anything or not
 * #TODO: This seems redunant and can be cleaned out
 * @param setWalls a call back to set the found data
 * @returns none
 * #TODO: Make it return the found data here and set it in main function
 */
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

/**
 *
 * @param data is the entire wallpaper related data we have
 * @returns list of unique collections it has found inside our data
 */
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

/**
 *  This functions find list of all images which have a particular collection tag
 * @param data the entire wallpaper data
 * @param value the collection data it has
 * @param setData sets the needed data of found images
 * #TODO: Make it return the final list and set it in main function
 */
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

/**
 *
 * @param text String which is to be shown in a toast/snackbar
 */
export function showSnackbarText(text: string) {
	ToastAndroid.showWithGravityAndOffset(
		text,
		ToastAndroid.SHORT,
		ToastAndroid.BOTTOM,
		25,
		50
	);
}
