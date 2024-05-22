<template>
    <div>
        <nav-bar />
        <h1>Calendrier</h1>
    </div>
</template>
<script>
    import navBar from './navBar.vue';
    
    export default{
        name: 'calendar',
        components: {
            'nav-bar': navBar
        }
    }
</script>