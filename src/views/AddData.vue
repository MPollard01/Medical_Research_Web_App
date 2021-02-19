<template>
  <div class="wrapper">
    <el-row :gutter="20">
      <el-col :span="24">
        <div class="head">
          <h2 class="title">Add Data To Our Database</h2>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="18">
        <div>
          <el-card shadow="hover" class="box-card">
            <template #header>
              <div class="card-header">
                <span class="card-title">Cardiomyopathy Details</span>
              </div>
            </template>
            <div>
              <el-form ref="form" label-width="180px">
                <el-form-item label="Cardiomyopathy Type" required>
                  <el-select
                    v-model="ctypeVal"
                    filterable
                    clearable
                    allow-create
                    default-first-option
                    placeholder="select or type own"
                  >
                    <el-option
                      v-for="item in ctype"
                      :key="item"
                      :label="item"
                      :value="item"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="Gene Name" required>
                  <el-select
                    v-model="geneName"
                    filterable
                    clearable
                    allow-create
                    default-first-option
                    placeholder="select or type name"
                  >
                    <el-option
                      v-for="item in geneNames"
                      :key="item"
                      :label="item"
                      :value="item"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="Study Title" required>
                  <el-select
                    v-model="title"
                    filterable
                    clearable
                    allow-create
                    default-first-option
                    placeholder="select or type title"
                  >
                    <el-option
                      v-for="item in titles"
                      :key="item"
                      :label="item"
                      :value="item"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="Additional Notes (optional)">
                  <el-input type="textarea" rows="7" v-model="notes"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="addData">Upload</el-button>
                </el-form-item>
              </el-form>
            </div>
          </el-card>
        </div>
      </el-col>
      <el-col :span="6">
        <div>
          <el-card shadow="hover" class="box-card">
            <template #header>
              <div class="card-header">
                <span class="card-title">Upload File</span>
              </div>
            </template>
            <div>
              <el-upload
                class="upload-demo"
                action="https://jsonplaceholder.typicode.com/posts/"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :before-remove="beforeRemove"
                multiple
                :limit="3"
                :on-exceed="handleExceed"
                :file-list="fileList"
                accept=".csv"
              >
                <p>
                  The CSV data will be used to plot graphical charts that will
                  be displayed when this data is searched.
                </p>
                <el-button size="small" type="success"
                  >Click to upload</el-button
                >
                <template #tip>
                  <div class="el-upload__tip">
                    Upload CSV file
                  </div>
                </template>
              </el-upload>
            </div>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { ref } from "vue";
import { firebaseFireStore, timestamp } from "@/firebase/database";

export default {
  name: "AddData",
  setup() {
    const ctype = ref([
      "Hypertrophic",
      "Dilated",
      "Restrictive",
      "Left Ventricular Non-compaction",
      "Arrhythmogenic Right Ventricular Dysplasia",
    ]);
    const ctypeVal = ref("");
    const geneNames = ref(["MYBPC3", "MYH7", "TNNT", "TPM1"]);
    const geneName = ref("");

    const titles = ref([
      "Tension vs Calcium concertration",
      "Force vs Calcium concerntration",
      "Sarcome Length vs Time",
      "Sarcomere Shortening vs Time",
      "Velocity vs Time",
      "sliding velocity vs calcium",
    ]);
    const title = ref("");
    const notes = ref("");

    const fileList = ref([]);
    function handlePreview(file) {
      console.log(file);
    }
    function addData() {
      const data = {
        cardioType: ctypeVal.value,
        geneName: geneName.value,
        title: title.value,
        notes: notes.value,
        createdAt: timestamp(),
      };
      firebaseFireStore.collection("cardioData").add(data);
    }
    return {
      ctype,
      ctypeVal,
      geneNames,
      geneName,
      titles,
      title,
      notes,
      addData,
      fileList,
      handlePreview,
    };
  },
};
</script>

<style scoped>
.wrapper {
  margin: 20px 100px;
}
.title {
  text-align: left;
  margin-right: 20px;
}
.el-row {
  margin-bottom: 20px;
}
.el-col {
  border-radius: 4px;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.head {
  display: flex;
  align-items: center;
  padding: 10px 20px;
}
.card-header {
  text-align: left;
  font-weight: bold;
}
p {
  text-align: left;
}
.el-select {
  width: 100%;
}
</style>
