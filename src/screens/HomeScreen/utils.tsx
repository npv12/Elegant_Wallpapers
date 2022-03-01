import { collectionData } from "../../types";

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
    return (finalCollections);
}