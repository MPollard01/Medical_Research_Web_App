<template>
  <div class="wrap">
      <div class="head">
          <h2 class="title">Advanced Search</h2>
      </div>
      <el-tabs type="border-card">
          <el-tab-pane label="terms">
          <el-card class="box-card" shadow="never">
            <template #header>
              <div class="card-header">
                <span class="card-title">Search by Term</span>
              </div>
            </template>
          <el-form label-width="180px">
              <el-form-item label="terms">
                  <el-select v-model="phenotype" @change="searchTermSelect">
                    <el-option
                        v-for="item in terms[0]"
                        :key="item"
                        :label="item.name"
                        :value="item.name">
                    </el-option>
                  </el-select>
              </el-form-item>
              <el-form-item label="diseases">
                  <el-select v-model="disease" @change="searchDiseaseSelect">
                    <el-option
                        v-for="item in diseases[0]"
                        :key="item"
                        :label="item.diseaseName"
                        :value="item.diseaseName">
                    </el-option>
                  </el-select>
              </el-form-item>
              <el-form-item>
                <el-button @click="displayTerms" type="primary" class="upload">Display</el-button>
              </el-form-item>
          </el-form>
          </el-card>
            </el-tab-pane>

            <el-tab-pane label="genes">
                <el-card class="box-card" shadow="never">
            <template #header>
              <div class="card-header">
                <span class="card-title">Search by Gene</span>
              </div>
            </template>
                <el-form label-width="180px">
              <el-form-item label="genes">
                  <el-select v-model="gene" @change="searchGeneSelect">
                    <el-option
                        v-for="item in genes[0]"
                        :key="item"
                        :label="item.entrezGeneSymbol"
                        :value="item.entrezGeneSymbol">
                    </el-option>
                  </el-select>
              </el-form-item>
            
              <el-form-item label="associated diseases">
                  <el-select v-model="diseaseA" @change="searchDiseaseAssoc">
                    <el-option
                        v-for="item in diseaseAsoc[0]"
                        :key="item"
                        :label="item.diseaseName"
                        :value="item.diseaseName">
                    </el-option>
                  </el-select>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" class="upload">Display</el-button>
              </el-form-item>
          </el-form>
                </el-card>
          </el-tab-pane>
      </el-tabs>
  </div>
</template>

<script>
import {ref, onMounted} from 'vue'
import getCardioData from '../composables/externalData'
import {useRouter} from 'vue-router'

export default {
    setup() {
        const searchTerm = ref('')
        let terms = ref([])
        let genes = ref([])
        let diseases = ref([])
        let diseaseAsoc = ref([])
        let catTerms = ref([])
        const gene = ref('')
        const phenotype = ref('')
        const disease = ref('')
        const diseaseA = ref('')
        const hpoBaseUrl = 'https://hpo.jax.org/api/hpo'
        const {cardioData, error, fetchCardioData} = getCardioData()
        const router = useRouter()

        onMounted(async () => {
            let url = hpoBaseUrl + '/search/?q=cardiomyopathy'
            await fetchCardioData(url)
            let data = cardioData.value[0]
            terms.value.push(data.terms)
            cardioData.value = []
            url = hpoBaseUrl + '/term/HP:0001638/genes?max=-1&offset=1'
            await fetchCardioData(url)
            data = cardioData.value[0]
            genes.value.push(data.genes)
        })

        async function searchTermSelect() {
            cardioData.value = []
            diseases.value = []
            const id = terms.value[0].find(i => i.name === phenotype.value).ontologyId
            let url = hpoBaseUrl + '/term/' + id + '/diseases?max=-1&offset=1'
            await fetchCardioData(url)
            let data = cardioData.value[0]
            console.log(data.diseases)
            if(data.diseases.length) {
                diseases.value.push(data.diseases)
            }
            else {
                cardioData.value = []
                url = hpoBaseUrl + '/term/' + id
                await fetchCardioData(url)
                data = cardioData.value[0]
                console.log(data.details)
                catTerms.value.push(data.details)
            }
        }

        async function searchGeneSelect() {
            cardioData.value = []
            diseaseAsoc.value = []
            const id = genes.value[0].find(i => i.entrezGeneSymbol === gene.value).entrezGeneId
            console.log(id)
            let url = hpoBaseUrl + '/gene/' + id
            await fetchCardioData(url)
            let data = cardioData.value[0]
            console.log(data.diseaseAssoc)
            diseaseAsoc.value.push(data.diseaseAssoc)
        }

        async function searchDiseaseSelect() {
            cardioData.value = []
            catTerms.value = []
            const id = diseases.value[0].find(i => i.diseaseName === disease.value).diseaseId
            console.log(id)
            let url = hpoBaseUrl + '/disease/' + id
            await fetchCardioData(url)
            let data = cardioData.value[0]
            console.log(data)
            catTerms.value.push(data)
        }

        async function searchDiseaseAssoc() {
            cardioData.value = []
            catTerms.value = []
            const id = diseaseAsoc.value[0].find(i => i.diseaseName === diseaseA.value).diseaseId
            console.log(id)
            let url = hpoBaseUrl + '/disease/' + id
            await fetchCardioData(url)
            let data = cardioData.value[0]
            console.log(data.catTermsMap)
            catTerms.value.push(data.catTermsMap)
        }

        function displayTerms() {
          router.replace({
            name: 'Dashboard',
            params: catTerms.value
          })
        }

        return {searchTerm, error, terms, phenotype, gene, genes, disease, diseases, diseaseAsoc, catTerms, searchTermSelect, searchDiseaseSelect, searchGeneSelect, searchDiseaseAssoc, diseaseA, displayTerms}
    }
}
</script>

<style scoped>
    .el-select {
        width: 100%;
    }

    .el-button {
        width: 100%;
    }
</style>