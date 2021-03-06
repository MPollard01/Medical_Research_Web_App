const getChartOptions = (data) => {
    const axisTitleArr = data.title.split("vs");
    const yTitle = axisTitleArr[0];
    const xTitle = axisTitleArr[1];
    const xCategories = data.data.map(obj => {
        return `${obj.x}`;
    })

    const chartOptions = {
        xaxis: {
          categories: xCategories.sort(),
          title: {
            text: xTitle
          }
        },
        yaxis: {
          title: {
            text: yTitle
          }
        }
    }

    return chartOptions;
};

const getSeries = (data) => {
    const names = Object.keys(data.data[0]).filter((key) => {
        if(key !== 'x') {
            return key
        }
        return null
    });
  
    const series = names && names.map(name => {
        return {
          name: name,
          data: data.data.map(obj => {

              return obj[name] ? obj[name] : null
          })
        }
    })
  
    return series;
}

export default {
    getChartOptions,
    getSeries
}