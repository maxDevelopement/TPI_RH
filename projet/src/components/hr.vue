<template>
    <div>
        <nav-bar />
        <h1>HR</h1>
    </div>
</template>
<script>
    import { ref } from 'vue'
    import navBar from './navBar.vue';
    export default{
        name: 'hr',
        components: {
            'nav-bar': navBar
        }
    }
</script>