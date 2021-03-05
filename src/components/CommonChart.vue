<template>
  <div class="common-chart-wrapper">
    <div v-if="loading" id="loading">
        <img
          id="loading-image"
          src="../assets/ajax-loader.gif"
          alt="Loading..."
        />
    </div>
    <el-card shadow="hover" class="box-card">
    <el-dropdown @command="handleCommand">
      <el-button>
        Graphs<i class="el-icon-arrow-down el-icon--right"></i>
      </el-button>
      <template v-slot:dropdown>
      <el-dropdown-menu v-for="graph in graphs" :key="graph">
        <el-dropdown-item :command="graph">{{graph.title}}</el-dropdown-item>
      </el-dropdown-menu>
      </template>
    </el-dropdown>
    <div id="chart">
        <VueApexCharts 
          ref="realtimeChart"
          type="line" 
          height="350" 
          :options="chartOptions" 
          :series="series">
        </VueApexCharts>
    </div>
    </el-card>
  </div>
</template>

<script>
import graph from '@/utils/Graph'
import VueApexCharts from 'vue3-apexcharts'

export default {
  props: {
    graphs: {
      type: Object
    }
  },
  data() {
      return {
        loading: false,
        series: [],
        chartOptions: {
            chart: {
              height: 350,
              type: 'line',
              dropShadow: {
                enabled: true,
                color: '#000',
                top: 18,
                left: 7,
                blur: 10,
                opacity: 0.2
              },
              toolbar: {
                show: false
              }
            },
            dataLabels: {
              enabled: true
            },
            stroke: {
              curve: 'smooth'
            },
            title: {
              text: '',
              align: 'left'
            },
            grid: {
              borderColor: '#e7e7e7',
              row: {
                colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                opacity: 0.5
              }
            },
            xaxis: {
              categories: [],
              title: {
                text: ''
              }
            },
            yaxis: {
              title: {
                text: ''
              },
              min: 0,
              max: 10
            },
            legend: {
              position: 'top',
              horizontalAlign: 'right',
              floating: true,
              offsetY: -25,
              offsetX: -5
            }
        }
      }
  },
  methods: {
    async handleCommand(graphData) {
      this.loading = true;

      if (graphData) {
        this.loading = false;
        const chartOptions = graph.getChartOptions(graphData);
        const series = graph.getSeries(graphData);
        this.series = series;
        this.chartOptions = {
          ...this.chartOptions,
          title: {
            text: graphData.title,
            align: 'left'
          },
          xaxis: chartOptions.xaxis,
          yaxis: chartOptions.yaxis
        }
      }
    }
  },
  components: {
      VueApexCharts
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.common-chart-wrapper {
    margin-top: 1rem;
    text-align: left;
}

.el-button {
  margin-bottom: 1rem;
}

.box-card {
  margin-bottom: 1rem;
}
</style>
