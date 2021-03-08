import { firebaseFireStore } from "@/firebase/database";
import moment from "moment";
import { ElMessage, ElMessageBox } from "element-plus";
import emailjs from "emailjs-com";

function sendEmail(user, subject, message) {
  const email = user.value.email;
  console.log("Sending email...");
  console.log("To: " + email);
  console.log("Subject: " + subject);
  console.log("Message: " + message);

  try {
    emailjs.send(
      "service_bbjlbrm",
      "template_g9i4395",
      {
        email: email,
        subject: subject,
        message: message,
      },
      "user_mGTXbyOSCffZphJrE5VkG"
    );
    console.log("Email sent");
  } catch (error) {
    console.log({ error });
  }
}

const getDataByGene = async (gene) => {
  const snapshot = await firebaseFireStore
    .collection("cardioData")
    .where("geneName", "==", gene)
    .get();

  const graphData = snapshot.docs.map((doc) => doc.data());

  return graphData;
};

const addData = (user, formData) => {
  firebaseFireStore.collection("cardioData").add(formData);

  const createdAt = moment().format("h:mma, Do MMMM YYYY");
  const formattedData =
    'Phenotype: "' +
    formData.cardioType +
    '", Gene Name: "' +
    formData.geneName +
    '", Study Title: "' +
    formData.title +
    '", Notes: "' +
    formData.notes +
    '"';
  const emailMessage =
    "You added the following data to our database at " +
    createdAt +
    "... " +
    formattedData;
  sendEmail(user, "Added data", emailMessage);
};

const getDataToDelete = async (user, whereColumn, query) => {
  const snapshot = await firebaseFireStore
    .collection("cardioData")
    .where("createdBy", "==", user.value.uid)
    .where(whereColumn, "==", query)
    .get();

  const totalResults = snapshot.docs.length;

  ElMessage.info({
    type: "info",
    message: totalResults + " results found!",
  });

  const data = snapshot.docs.map((doc) => {
    console.log(doc.id + ": ");
    console.log(doc.data());
    const docData = doc.data();
    docData.id = doc.id;
    docData.createdAt = docData.createdAt.toDate();
    return docData;
  });

  return data;
};

const deleteData = (documentId, user) => {
  firebaseFireStore
    .collection("cardioData")
    .where("createdBy", "==", user.value.uid)
    .get()
    .then((snapShot) => {
      snapShot.forEach((doc) => {
        if (doc.id === documentId) {
          ElMessageBox.confirm(
            "Are you sure you want to delete record with the id: " +
              doc.id +
              " ?",
            "Confirm",
            {
              confirmButtonText: "OK",
              cancelButtonText: "Cancel",
              type: "warning",
            }
          )
            .then(() => {
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
                  ElMessage.success({
                    message: message,
                    duration: 5000,
                  });

                  const emailMessage =
                    "You deleted record " +
                    doc.id +
                    " from our database at " +
                    timestamp +
                    "!";
                  sendEmail(user, "Deleted data", emailMessage);
                })
                .catch((error) => {
                  console.error("Error removing document: ", error);
                  ElMessage.error({
                    type: "error",
                    message:
                      "An error occured deleting this record, please try again.",
                    duration: 5000,
                  });
                });
            })
            .catch(() => {
              console.log("User cancelled deletion.");
              ElMessage.info({
                type: "info",
                message: "Delete cancelled",
              });
            });
        }
      });
    });
};

export default {
  getDataByGene,
  getDataToDelete,
  deleteData,
  addData,
};
