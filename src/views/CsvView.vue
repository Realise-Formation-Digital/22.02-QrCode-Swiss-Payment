<template>
    <div>
        CSV
        <v-file-input accept="csv/*" label="File input" @change="papaparse"></v-file-input>
    </div>
</template>

<script>
// !!!!!!!!!!!!!!!!!!!! A décommenter plus tard (Crée une erreur pour le moment)!!!!!!!!!!!!!!!!!!!!!!!!!!!
// import CsvService from '../services/csvService.js';
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

export default {
  name: "csv-view",
  data: () =>({
    payload: {
// Payload à mettre (En attente du site QRcodes)
    },
    loading: false,
  }),
  methods: {

    async sendCsvList(){
        try{
            console.log('[Views][CsvView][sendCsvList] Called sendCsvList with params', )
            
            //todo use papaparse to convert from csv to json
            //todo send to the service the json produced

            // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!! A décommenter plus tard !!!!!!!!!!!!!!!!!! 
            // const response = await CsvService.sendJsonList();
            // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!! (response crée une erreur pour le moment)

            //todo handle the answer with zip or pdf to download

        }catch(e){
            console.error('[Views][CsvView][sendCsvList] An error has occurred when send the csv list', e)
            //todo handle the error
        }
    },
    papaparse(file) {
      console.log("Ciao", file)
      this.$papa.parse(file, {
        download: true,
        header: true,
        complete: function (results) {
          console.log(results)
        }
      });
    }
  } 
}
</script>