<template>
    <div>
        <nav-bar />
        <h1>Profil</h1>
        <form>
            <h3>Données personnelles</h3>
            <div class="form-group row">
                <label for="staticEmail" class="col-sm-2 col-form-label">Prenom : </label>
                <div class="col-sm-10">
                    <input type="text" class="form-control" id="staticEmail" :value="employeeData.firstname" readonly>
                </div>
                <label for="lastname" class="col-sm-2 col-form-label">Nom : </label>
                <div class="col-sm-10">
                    <input type="text" class="form-control" id="lastname" :value="employeeData.lastname" readonly>
                </div>
                <label for="email" class="col-sm-2 col-form-label">Email</label>
                <div class="col-sm-10">
                    <input type="text" class="form-control" id="email" :value="employeeData.email" readonly>
                </div>
                <label for="phone" class="col-sm-2 col-form-label">Téléphone</label>
                <div class="col-sm-10">
                    <input type="text" class="form-control" id="phone" :value="employeeData.phone" readonly>
                </div>
                <label for="iban" class="col-sm-2 col-form-label">IBAN</label>
                <div class="col-sm-10">
                    <input type="text" class="form-control" id="iban" :value="employeeData.iban" readonly>
                </div>
                <label for="street" class="col-sm-2 col-form-label">Rue</label>           
                <div class="col-sm-10">                    
                    <input type="text" class="form-control" id="street" :value="employeeData.street" readonly>
                </div> 
                <label for="number" class="col-sm-2 col-form-label">Numéro</label>
                <div class="col-sm-10">                    
                    <input type="text" class="form-control" id="number" :value="employeeData.number" readonly>
                </div>  
                <label for="npa" class="col-sm-2 col-form-label">NPA</label>
                <div class="col-sm-10">                    
                    <input type="text" class="form-control" id="npa" :value="employeeData.npa" readonly>
                </div>   
                <label for="city" class="col-sm-2 col-form-label">Ville</label>
                <div class="col-sm-10">                    
                    <input type="text" class="form-control" id="city" :value="employeeData.city" readonly>
                </div>
            </div>
            <div class="form-group row">
                <h3>Contrat</h3>              
                <label for="type" class="col-sm-2 col-form-label">Type</label>
                <div class="col-sm-10">                    
                    <input type="text" class="form-control" id="type" :value="contractData.type" readonly>
                </div>   
                <label for="service" class="col-sm-2 col-form-label">Service</label>
                <div class="col-sm-10">                    
                    <input type="text" class="form-control" id="service" :value="contractData.service" readonly>
                </div> 
                <label for="rate" class="col-sm-2 col-form-label">Taux</label>
                <div class="col-sm-10">                    
                    <input type="text" class="form-control" id="rate" :value="`${contractData.rate}%`" readonly>
                </div> 
                <label for="startDate" class="col-sm-2 col-form-label">Date de début</label>
                <div class="col-sm-10">                    
                    <input type="text" class="form-control" id="startDate" :value="contractData.startDate" readonly>
                </div>
                <label for="endDate" class="col-sm-2 col-form-label">Date de fin</label>
                <div class="col-sm-10">                    
                    <input type="text" class="form-control" id="endDate" :value="contractData.endDate" readonly>
                </div>
            </div>
        </form>
    </div>
</template>
<script>
    import navBar from './navBar.vue';
    import { checkUserConnexion } from '../helpers/getters'

    export default{
        name: 'profil',
        components: {
            'nav-bar': navBar
        },
        data(){
            const data = checkUserConnexion()
            const employeeData = data.employee
            const contractData = data.contract
            console.log("datas : ", employeeData, ", ", contractData)
            return {
                employeeData,
                contractData
            }
        }
    }
</script>