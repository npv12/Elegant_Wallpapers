import { collectionData } from "../../types";

export function getCollectionsFromData(data: Array<any>) {
    var collectionNames: Map<string, string> = new Map();
    var finalCollections: Array<collectionData> = [];

    for (var i = 0; i < data.length; i++) {
        var separateCollections = data[i].collections.toLowerCase().split(","); // Separates the different collections that are separated by a comma.
        for (var j = 0; j < separateCollections.length; j++) {
            if (!collectionNames.has(separateCollections[j])) {
                var t: collectionData = {
                    collections: separateCollections[j],
                    url: data[i].url,
                    thumbnail: data[i].thumbnail,
                    key: (i + j).toString(), // The key doesn't really matter so lets keep it this way?
                };
                collectionNames.set(String(i + j), separateCollections[j])
                finalCollections.push(t);
            } else break
        }
    }
    return finalCollections;
}