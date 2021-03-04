import {ref} from 'vue'

function getCardioData() {
    let cardioData = ref([])
    const error = ref(null)

    async function fetchCardioData(url) {
        
        try {
            let data = await fetch(url)
            if (!data.ok) {
                throw Error("Unable to get data from external database");
            }

            let json = await data.json()
            cardioData.value.push(json)
        }
        catch(dataErrors) {
            error.value = dataErrors.message
            console.log(error.value)
        }
    }

    return {cardioData, error, fetchCardioData}
}

export default getCardioData