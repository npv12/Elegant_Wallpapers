import ReactNativeBlobUtil from "react-native-blob-util";
import ManageWallpaper, { TYPE } from "react-native-manage-wallpaper";
import { getStoragePermissionAndroid, showSnackbarText } from ".";
import { Platform } from "react-native";

//sets wall by first downloading using rnfetch so that app doesn't crash
export async function setImageAsWall(
	url: string,
	type: string,
	callback,
	setShowApplyModal
) {
	setShowApplyModal(false);
	// loadAd();
	// setIsLoading(true);
	ReactNativeBlobUtil.config({
		fileCache: true,
		appendExt: "png",
	})
		.fetch("GET", url)
		.then((res) => {
			console.log("Applying wall " + type);
			var PATH = "file://" + res.path();
			ManageWallpaper.setWallpaper(
				{
					uri: PATH,
				},
				callback,
				type === "home" ? TYPE.HOME : type === "lock" ? TYPE.LOCK : TYPE.BOTH
			);
		})
		.catch((e) => {
			console.log(e);
			//setIsLoading(false);
			showSnackbarText("Something went wrong");
		});
}

export //wallpaper downloader.
async function handleDownload(item) {
	// if (isDownloading) {
	//     showSnackbarText("File is downloading");
	//     return;
	// } else {
	//     setIsDownloading(true);
	// }
	//showAd();
	showSnackbarText("Download Started");
	if (Platform.OS === "android") {
		const granted = await getStoragePermissionAndroid();
		if (!granted) {
			return;
		}
	}
	let dirs = ReactNativeBlobUtil.fs.dirs.SDCardDir;
	let extension: any = item.url.split(".").pop();
	if (extension != "jpg" && extension != "jpeg" && extension != "png") {
		extension = "jpg";
	}
	const PATH =
		dirs +
		`/Pictures/Elegant-Walls/` +
		item.name +
		"_" +
		item.author +
		"." +
		extension;
	ReactNativeBlobUtil.fs
		.exists(PATH)
		.then((exist) => {
			if (!exist) {
				ReactNativeBlobUtil.config({
					addAndroidDownloads: {
						useDownloadManager: true,
						notification: true,
						mime: "image",
						path: PATH,
					},
				})
					.fetch("GET", item.url)
					.then((res) => {
						showSnackbarText("Download completed");
					})
					.catch((error) => showSnackbarText("Something went wrong"));
			} else {
				showSnackbarText("File exists");
				//setIsDownloading(false);
			}
		})
		.catch(() => {
			console.log("File error");
		});
}
