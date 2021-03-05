import { firebaseFireStore } from "@/firebase/database";

const getDataByGene = async (user, gene) => {
    const snapshot = await firebaseFireStore.collection('users').doc(user.uid).collection("cardioData").get()
    const graphData = snapshot.docs.map(doc => doc.data());

    const filterData = graphData.filter(data => {
        return data.geneName === gene ? data : null
    })

    return filterData
}

export default {
    getDataByGene
}  