<script>
    import { useRouter } from 'vue-router'
    import { ref } from 'vue'
   
    export default{
        name: 'navBar',
        data(){
            const router = useRouter()
            const activeLink = ref('')
 
            const goToProfil = () => {
                activeLink.value = 'profil'
                router.push('/profil')
            }
            const goToCalendar = () => {
                activeLink.value = 'calendar'
                router.push('/calendar')
            }
            const goToHr = () => {
                activeLink.value = 'hr'
                router.push('/hr')
            }
            const goToConge = () => {
                activeLink.value = 'conge'
                router.push('/conge')
            }
            const handleLogout = () => {
                sessionStorage.setItem("user", null)
                router.push('/')
            }
            return {
                activeLink,
                goToProfil,
                goToCalendar,
                goToHr,
                goToConge,
                handleLogout
            }
        }
    }
</script>
<template>
    <ul class="nav nav-tabs">
        <li class="nav-item">
            <a class="nav-link" :class="{active: activeLink === 'profil'}" aria-current="page" @click="goToProfil">Profil</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" :class="{active: activeLink === 'calendrier'}" @click="goToCalendar">Calendrier</a>
        </li>            
        <li class="nav-item">
            <a class="nav-link" :class="{active: activeLink === 'hr'}" @click="goToHr">RH</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" :class="{active: activeLink === 'conge'}" @click="goToConge">Demande de congés</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" @click="handleLogout">Logout</a>
        </li>
    </ul>
</template>