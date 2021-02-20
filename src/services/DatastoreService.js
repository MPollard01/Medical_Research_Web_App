// import firebase from "firebase";

const collectionMap = {
    "TNNT": {
        "Sarcome Length vs Time - control and RGECO-TnT": "SarcLengthVsTime2D",
        "Sarcome Length vs Time - WT and cTNT R92Q": "SarcLengthVsTime3D",
        "Tension vs calcium concentration": "forceTensionVsCalcCon"
    },
    "MYH": {
        "Force vs calcium concentration 7A": "forceVsCalc7a",
        "Force vs calcium concentration 7B": "forceVsCalc7b",
        "Force vs calcium concentration 7C": "forceVsCalc7c"
    }
}

const getDatastoreData = async (term) => {
    console.log(collectionMap[term]);
}

export default {
    getDatastoreData
}