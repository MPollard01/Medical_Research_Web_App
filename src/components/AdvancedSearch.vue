<template>
  <div v-if="loading" id="loading">
    <img
      id="loading-image"
      src="../assets/ajax-loader.gif"
      alt="Loading..."
    />
  </div>
  <div>
      <el-tooltip class="item" effect="dark" content="Close" placement="top">
        <el-button class="close" @click="closeAdvancedSearch"><i class="el-icon-close"></i></el-button>
      </el-tooltip>
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
                        v-for="item in terms"
                        :key="item"
                        :label="item.name"
                        :value="item.name">
                    </el-option>
                  </el-select>
              </el-form-item>
              <el-form-item label="diseases">
                  <el-select v-model="disease" @change="searchDiseaseSelect">
                    <el-option
                        v-for="item in diseases"
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
                        v-for="item in genes"
                        :key="item"
                        :label="item.entrezGeneSymbol"
                        :value="item.entrezGeneSymbol">
                    </el-option>
                  </el-select>
              </el-form-item>
            
              <el-form-item label="associated diseases">
                  <el-select v-model="diseaseA" @change="searchDiseaseAssoc">
                    <el-option
                        v-for="item in diseaseAsoc"
                        :key="item"
                        :label="item.diseaseName"
                        :value="item.diseaseName">
                    </el-option>
                  </el-select>
              </el-form-item>
              <el-form-item>
                <el-button @click="displayTermsGene" type="primary" class="upload">Display</el-button>
              </el-form-item>
          </el-form>
                </el-card>
          </el-tab-pane>
      </el-tabs>
  </div>
</template>

<script>
import {onMounted, ref} from 'vue'
import apiService from '@/services/APIService';

export default {
    props: {
      closeAdvancedSearch: {
        type: Function
      }
    },
    data() {
      return {
        catTerms: null,
        disease: null,
        loading: false,
        diseaseA: null,
        hpoBaseUrl: 'https://hpo.jax.org/api/hpo'
      }
    },
    setup() {
        const hpoBaseUrl = 'https://hpo.jax.org/api/hpo';
        const terms = ref([]);
        const genes = ref([]);
        const diseases = ref([]);
        const phenotype = ref('');
        const gene = ref('');
        const diseaseAsoc = ref([]);

        onMounted(async () => {
            const termUrl = hpoBaseUrl + '/search/?q=cardiomyopathy'
            const data = await apiService.fetchCardioData(termUrl)
            terms.value = data && data.cardioData && data.cardioData.terms
            const geneUrl = hpoBaseUrl + '/term/HP:0001638/genes?max=-1&offset=1'
            const  geneData = await apiService.fetchCardioData(geneUrl)
            genes.value = geneData && geneData.cardioData && geneData.cardioData.genes
        })

        async function searchTermSelect(event) {
            phenotype.value = event;
            const id = terms.value.find(i => i.name === event).ontologyId
            const diseaseUrl = hpoBaseUrl + '/term/' + id + '/diseases?max=-1&offset=1';
            const diseaseData = await apiService.fetchCardioData(diseaseUrl)
            diseases.value = diseaseData && diseaseData.cardioData && diseaseData.cardioData.diseases
        }

        async function searchDiseaseSelect(event) {
          this.disease = event;
        }

        async function searchGeneSelect(event) {
          gene.value = event;
          const id = genes.value.find(i => i.entrezGeneSymbol === gene.value).entrezGeneId
          const url = hpoBaseUrl + '/gene/' + id
          const data = await apiService.fetchCardioData(url)
          diseaseAsoc.value = data && data.cardioData && data.cardioData.diseaseAssoc;
        }

        async function searchDiseaseAssoc(event) {
          this.diseaseA = event
        }

        return {
          terms, 
          genes, 
          gene,
          diseases,
          diseaseAsoc, 
          phenotype,
          searchDiseaseSelect,
          searchTermSelect, 
          searchGeneSelect, 
          searchDiseaseAssoc, 
        }
    },
    methods: {
      async displayTerms () {
        this.loading = true;
        const id = this.diseases.find(i => i.diseaseName === this.disease).diseaseId
        let url = this.hpoBaseUrl + '/disease/' + id
        const data = await apiService.fetchCardioData(url)
        const cardioData = data && data.cardioData

        if (cardioData) {
          this.loading = false;
        }

        this.$emit('handleAdvancedSearch', {
          terms: apiService.findData(cardioData)[0].terms,
          name: this.disease
        })
      },
      async displayTermsGene () {
        this.loading = true;
        const id = this.diseaseAsoc.find(i => i.diseaseName === this.diseaseA).diseaseId
        let url = this.hpoBaseUrl + '/disease/' + id
        const data = await apiService.fetchCardioData(url)
        const cardioData = data && data.cardioData

        if (cardioData) {
          this.loading = false;
        }

        this.$emit('handleAdvancedSearch', {
          terms: apiService.findData(cardioData)[0].terms,
          name: this.diseaseA
        })
      },
    }
}
</script>

<style scoped>
    .el-select {
        width: 100%;
    }
</style>