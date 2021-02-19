
const apiMap = {
    "TNNT": "https://hpo.jax.org/api/hpo/disease/OMIM:115195",
    "MYBPC3": "https://hpo.jax.org/api/hpo/disease/OMIM:115197",
    "MYH": "https://hpo.jax.org/api/hpo/disease/OMIM:192600",
    "TPM1": "https://hpo.jax.org/api/hpo/disease/OMIM:115196"
}

const searchArray = ["TNNT", "MYBPC3", "MYH", "TPM1"];

const searchByTerm = (term) => {

}

export default {
    searchByTerm,
    apiMap,
    searchArray
}