<template>
  <div class="searchbar-wrapper">
    <div class="vld-parent">
        <loading :active.sync="isLoading" 
        :can-cancel="true" 
        :on-cancel="onCancel"
        :is-full-page="fullPage"
        color="#c28adb"></loading>
    </div>
    <autocomplete
        :search="search"
        placeholder="Search for Cardiomyopathy data"
        aria-label="Search for Cardiomyopathy data"
        @submit="handleSubmit"
        class="searchbar"
    ></autocomplete>
  </div>
</template>

<script>
import Autocomplete from '@trevoreyre/autocomplete-vue'
import Loading from 'vue-loading-overlay';
// import datastoreService from '@/services/DatastoreService';
import apiService from '@/services/APIService';
import 'vue-loading-overlay/dist/vue-loading.css';
import '@trevoreyre/autocomplete-vue/dist/style.css';


export default {
  data() {
      return {
        query: "",
        searchArray: apiService.searchArray,
        isLoading: false,
        fullPage: true
      }
  },
  methods: {
    search(input) {
      if (input.length < 1) { return [] }
      return this.searchArray.filter(item => {
        return item.toLowerCase()
          .startsWith(input.toLowerCase())
      })
    },
    handleSubmit() {
        this.isLoading = true;
        // simulate AJAX
        setTimeout(() => {
            this.isLoading = false
        },2000)
    }
  },
  components: {
      Autocomplete,
      Loading
  },
  mounted () {
    console.log(this.query);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.searchbar-wrapper {
    text-align: left;
}
</style>
