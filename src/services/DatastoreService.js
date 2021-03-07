import { firebaseFireStore } from "@/firebase/database";
import moment from "moment";

const getDataByGene = async (gene) => {
    const snapshot = await firebaseFireStore
                                .collection('cardioData')
                                .where('geneName', '==', gene)
                                .get();

    const graphData = snapshot.docs.map(doc => doc.data());

    return graphData
}

const addData = (formData) => {
    firebaseFireStore.collection("cardioData").add(formData);
}

const getDataToDelete = async (user, whereColumn, query) => {
    const snapshot = await firebaseFireStore
        .collection("cardioData")
        .where("createdBy", "==", user.value.uid)
        .where(whereColumn, "==", query)
        .get()

    const data = snapshot.docs.map((doc) => {
        console.log(doc.id + ": ");
        console.log(doc.data());
        const docData = doc.data();
        docData.id = doc.id;
        docData.createdAt = docData.createdAt.toDate();
        return docData
    });

    return data

}

const deleteData = (documentId, user) => {
    firebaseFireStore
        .collection("cardioData")
        .where("createdBy", "==", user.value.uid)
        .get()
        .then((snapShot) => {
          snapShot.forEach((doc) => {
            if (doc.id === documentId) {
              if (
                confirm(
                  "Are you sure you want to delete record with the id: " +
                    doc.id +
                    " ?"
                )
              ) {
                console.log("Deleting...");
                doc.ref
                  .delete()
                  .then(() => {
                    const timestamp = moment().format("h:mma, Do MMMM YYYY");
                    const message =
                      "Record: " +
                      doc.id +
                      " was successfully deleted at " +
                      timestamp +
                      "!";
                    console.log(message);
                    alert(message);
                  })
                  .catch((error) => {
                    console.error("Error removing document: ", error);
                    alert(
                      "An error occured deleting this record, please try again."
                    );
                  });
              } else {
                console.log("User cancelled deletion.");
              }
            }
          });
        });
}

export default {
    getDataByGene,
    getDataToDelete,
    deleteData,
    addData
}  