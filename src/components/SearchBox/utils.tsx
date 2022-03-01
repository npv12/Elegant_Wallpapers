import { TypeWallData } from "../../types";

export function searchForWall(searchString: string, wallpaperData: Array<TypeWallData>, setEmpty, setWalls) {
    if (searchString && wallpaperData) setEmpty(false);
    else {
        setEmpty(true);
        return;
    }
    var c = [];
    for (var i = 0; i < wallpaperData.length; i++) {
        if (wallpaperData[i].name.toLowerCase().includes(searchString.toLowerCase()))
            c.push(wallpaperData[i]);
        else if (wallpaperData[i].collections.toLowerCase().includes(searchString.toLowerCase()))
            c.push(wallpaperData[i]);
    }
    setWalls(c);
}
