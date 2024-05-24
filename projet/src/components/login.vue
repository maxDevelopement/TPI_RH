<template>
    <form 
        id="loginForm"
        @submit.prevent="handleLoginSubmit"
    >
        <div class="form-group">
            <h3>LOGIN</h3>
            <input 
                id="loginInputPseudo" 
                type="text" 
                v-model="pseudo"
                placeholder="Pseudo" 
                class="form-control"
            >
            <input 
                id="loginInputPassword" 
                type="password" 
                v-model="password"
                placeholder="Mot de passe" 
                class="form-control"
            >
            <input 
                id="loginInputSubmit" 
                type="submit" 
                value="Submit" 
                class="btn btn-primary"
            >
        </div>
        <div    
            id="authentification-error" 
            class="alert alert-danger alert-dismissible fade show"
            v-if="this.error"
        >
            <strong>error : </strong> pseudo ou mot de passe incorrecte, en cas de problème contactez le support
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        </div> 
    </form>

</template>

<script>
    import { ref } from 'vue'
    import { useRouter } from 'vue-router'
    import loginRequest from './requests/login.js'

    export default {
        name: 'loginForm',  
        userData: ref(sessionStorage.getItem("user")),   
        data(){
            const router = useRouter()
            const goToProfil = () => {
                router.push('/profil')
            }
            return {
                pseudo: '',
                password: '',
                error: false,
                userData: 0,
                goToProfil
            }
        },
        methods: {
            async handleLoginSubmit(){
                const testLogin = await loginRequest(this.pseudo, this.password)
                try{
                    if(testLogin.msg === `error_data`){
                        console.log("error !")
                        this.error = true
                        return
                    }
                    this.error = false
                    if(testLogin.msg === 'success_login'){
                        const data = {
                            employee:testLogin.data.employee,
                            contract: testLogin.data.contract,
                            leaveRequests: testLogin.data.leaveRequests,
                            evaluations: testLogin.data.evaluations
                        }
                        sessionStorage.setItem("user", JSON.stringify(data))
                        this.goToProfil()
                    }
                }catch(error){
                    this.error= true
                }
                
            }
        }
    }
</script>