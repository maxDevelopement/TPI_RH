<script>
    import { useRouter } from 'vue-router'
    import { ref } from 'vue'
    import { checkUserConnexion } from '../helpers/getters';
   
    export default{
        name: 'navBar',
        setup(){
            const router = useRouter()
            const activeLink = ref('')
            const job = (job) => { return job === 'HR' }
            const goToProfil = () => {
                console.log("job : ", job)
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
                handleLogout,
                job,
                checkUserConnexion
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
            <a class="nav-link" :class="{active: activeLink.value === 'calendrier'}" aria-current="page" @click="goToCalendar">Calendrier</a>
        </li>          
        <li v-if="job(checkUserConnexion().contract.job)" class="nav-item">
            <a class="nav-link" :class="{active: activeLink.value === 'hr'}" aria-current="page" @click="goToHr">RH</a>
        </li>
        <li v-if="job(checkUserConnexion().contract.job)" class="nav-item">
            <a class="nav-link" :class="{active: activeLink.value === 'conge'}" aria-current="page" @click="goToConge">Demande de congés</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" aria-current="page" @click="handleLogout">Logout</a>
        </li>
    </ul>
</template>