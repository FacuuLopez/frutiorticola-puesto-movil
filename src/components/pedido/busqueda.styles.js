import { StyleSheet } from "react-native";
import { s, vs } from "react-native-size-matters";

const inputBase = {
    marginHorizontal: '1%',
    borderWidth: 1,
    textAlign: 'center',
    fontSize: s(17),
    borderRadius: 3,
    backgroundColor: 'white',
    paddingVertical: Platform.OS === 'ios' ? vs(4) : vs(3),
}

const busquedaStyles = StyleSheet.create({
    contenedor: {
        flexDirection: "row",
        justifyContent: 'space-between',
    },
    input: {
        flex: 1,
        ...inputBase,
    },
});

export default busquedaStyles;