<template>
    <v-row>
        <textarea v-model="CommentsMkDwn"></textarea>
        {{ CommentsMkDwn}}
    </v-row>
</template>
<script>
export default {
    name: "Info-View",
    data() {
        return {
            CommentsMkDwn: "Voilàààààà!!!!! 'Return' pour affichage de résultat c'est pas compliqué non?"
        }
    }
};
</script>
<style>
</style>