export function convertData(data) {
    var c = [];
    var fin = [];
    var key = 0;
    for (var i = 0; i < data.length; i++) {
        var temp = data[i].collections.toLowerCase().split(",");
        for (var j = 0; j < temp.length; j++) {
            if (!c.includes(temp[j])) {
                var t = {
                    collections: temp[j],
                    url: data[i].url,
                    thumbnail: data[i].thumbnail,
                    key: key.toString(),
                };
                c.push(temp[j]);
                fin.push(t);
                key = key + 1;
                break;
            }
        }
    }
    return (fin);
}