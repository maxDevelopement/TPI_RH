<template>
    <div>
        <nav-bar />
        <h1>Congé</h1>
    </div>
</template>
<script>
    import { ref } from 'vue'
    import navBar from './navBar.vue';
    export default{
        name: 'conge',
        components: {
            'nav-bar': navBar
        }
    }
</script>