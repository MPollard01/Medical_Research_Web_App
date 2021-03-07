<template>
  <div class="wrap">
    <div class="head">
      <h2 class="title">Account</h2>
    </div>
    <el-divider></el-divider>
    <div v-if="info" class="content">
      <el-card shadow="always" class="box-card">
        <h3>User Details:</h3>
        <el-form status-icon label-width="180px">
          <el-form-item label="Email:">
            {{ info.email }}
          </el-form-item>
          <el-form-item label="Name:">
            <el-input v-model="name"></el-input>
          </el-form-item>
          <el-form-item label="Address:">
            <el-input v-model="address"></el-input>
          </el-form-item>
          <el-form-item label="Phone Number:">
            <el-input v-model="phoneNumber"></el-input>
          </el-form-item>
          <el-form-item label="Institution:">
            <el-input v-model="institution"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="upload" @click="onSubmit"
              >Update</el-button
            >
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import firebase from "firebase";
import { firebaseFireStore } from "@/firebase/database";
import { ElMessage } from "element-plus";

export default {
  name: "Account",
  setup() {
    const user = ref(null);
    const info = ref(null);
    const name = ref(null);
    const address = ref(null);
    const phoneNumber = ref(null);
    const institution = ref(null);

    user.value = firebase.auth().currentUser;

    if (user.value != null) {
      firebaseFireStore
        .collection("users")
        .doc(user.value.uid)
        .get()
        .then((doc) => {
          if (doc.exists) {
            console.log("Document data:", doc.data());
            info.value = doc.data();
            name.value = info.value.name;
            address.value = info.value.address;
            phoneNumber.value = info.value.phoneNumber;
            institution.value = info.value.institution;
          } else {
            console.log("No such document!");
            showError();
          }
        })
        .catch((error) => {
          console.log("Error getting document:", error);
          showError();
        });
    } else {
      showError();
    }

    function showError() {
      ElMessage.error({
        type: "error",
        message: "User not found, please try again later.",
        duration: 5000,
      });
    }

    function onSubmit() {
      firebaseFireStore
        .collection("users")
        .doc(user.value.uid)
        .update({
          name: name.value,
          address: address.value,
          phoneNumber: phoneNumber.value,
          institution: institution.value,
        })
        .then(() => {
          console.log("Document successfully updated!");
          ElMessage.success({
            message: "Details updated!",
            duration: 5000,
          });
        })
        .catch((error) => {
          // The document probably doesn't exist.
          console.error("Error updating document: ", error);
          ElMessage.error({
            type: "error",
            message: "An error occured updating your record, please try again.",
            duration: 5000,
          });
        });
    }

    return {
      user,
      info,
      name,
      address,
      phoneNumber,
      institution,
      onSubmit,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.title {
  text-align: left;
  margin-right: 8em;
}

.content {
  margin-left: 20px;
  display: flex;
  text-align: left;
}

.heading {
  font-weight: bold;
}

.section {
  width: 40%;
}

.box-card {
  width: 60%;
}
</style>
