import {
    StyleSheet,
    Dimensions,

} from "react-native";
import {

    STANDARD_HEIGHT,
} from "../../constants";


const scaleHeight = Dimensions.get("window").height / STANDARD_HEIGHT;

const styles = StyleSheet.create({
    container: { justifyContent: "center", flex: 1, alignItems: "center" },
    header: {

        fontSize: 20 * scaleHeight,
        fontFamily: "Linotte-Bold",
    },
    forceUpdateContainer: {
        height: 100 * scaleHeight,
        width: "100%",
        justifyContent: "center",
        padding: 25,
        alignItems: "center",
    }
});

export default styles;
