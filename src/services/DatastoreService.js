import { firebaseFireStore } from "@/firebase/database";

const collectionMap = {
    "TNNT": {
        "Sarcome Length vs Time - control and RGECO-TnT": "SarcLengthVsTime2D",
        "Sarcome Length vs Time - WT and cTNT R92Q": "SarcLengthVsTime3D",
        "Tension vs calcium concentration": "forceTensionVsCalcConc"
    },
    "MYH": {
        "Force vs calcium concentration 7A": "forceVsCalc7a",
        "Force vs calcium concentration 7B": "forceVsCalc7b",
        "Force vs calcium concentration 7C": "forceVsCalc7c"
    }
}

const getCollections = (term) => {
    return {
        graphs: collectionMap[term]
    };
}

const getData = async (collection) => {
    const snapshot = await firebaseFireStore.collection(collection).get()
    const graphData = snapshot.docs.map(doc => doc.data());

    return graphData;

}

export default {
    getCollections,
    getData
}