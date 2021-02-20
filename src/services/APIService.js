
const apiLinks = [
    { "value": "TNNT", "link": "https://hpo.jax.org/api/hpo/disease/OMIM:115195" },
    { "value": "MYBPC3", "link": "https://hpo.jax.org/api/hpo/disease/OMIM:115197" },
    { "value": "MYH", "link": "https://hpo.jax.org/api/hpo/disease/OMIM:192600" },
    { "value": "TPM1", "link": "https://hpo.jax.org/api/hpo/disease/OMIM:115196" }
];

const getApiData = async (link) => {
    const response = await fetch(link);
    const data = await response.json();
    return findData(data)[0];
}

const findData = (data) => {
    return data.catTermsMap.filter(catergory => {
        if(catergory.catLabel === "Cardiovascular") {
            return catergory
        }
    })
}

export default {
    getApiData,
    apiLinks
}