<template>
  <div class="page">
    <div class="wrapper">
      <h1 class="title">Dashboard</h1>
      <ProfileCard />
      <SearchBar @handleSearch="onSeachChild"/>
      <div v-if="data" class="content">
        <InfoCard v-if="data && data.apiData" :terms="data.apiData.terms" :name="data.name"/>
        <CommonChart />
      </div>
      <div v-if="!data " class="empty">
        <Empty />
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import firebase from "firebase";
import CommonChart from '@/components/CommonChart';
import SearchBar from '@/components/SearchBar';
import ProfileCard from '@/components/ProfileCard';
import Empty from '@/components/Empty';
import InfoCard from '@/components/InfoCard';

export default {
  name: "Dashboard",
  setup() {
    const user = ref(null);
    const data = ref(null)

    function onSeachChild (value) {
      console.log(value);
      data.value = value;
    }

    return { user, data, onSeachChild };
  },
  components: {
    CommonChart,
    SearchBar,
    ProfileCard,
    Empty,
    InfoCard
  },
  mounted() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.user = user;
      } else {
        this.user = null;
      }
    });
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
