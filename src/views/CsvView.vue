<template>
    <div @click="sendCsvList()">
        CSV
    </div>
</template>

<script>
import CsvService from '../services/csvService.js';

export default {
  name: "csv-view",
  data: () =>({
    payload: {

    },
    loading: false,
  }),
  methods: {

    async sendCsvList(){
        try{
            console.log('[Views][CsvView][sendCsvList] Called sendCsvList with params', )
            
            //todo use papaparse to convert from csv to json
            //todo send to the service the json produced
            const response = await CsvService.sendJsonList();

            // set the blog type to final pdf
            const file = new Blob([response.data], {type: 'application/pdf'});

            // process to auto download it
            const fileURL = URL.createObjectURL(file);
            const link = document.createElement('a');
            link.href = fileURL;
            link.download = "FileName" + new Date().getTime() + ".pdf";
            link.click();

        }catch(e){
            console.error('[Views][CsvView][sendCsvList] An error has occurred when send the csv list', e)
            //todo handle the error
        }
    }
  } 
}
</script>