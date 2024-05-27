<script>
import { checkUserConnexion } from '../helpers/getters.js';
import sendLeaveRequest from './requests/sendLeaveRequest.js'
    export default{
        name: 'leaveRequestForm',
        data(){
            return {
                startDate: '',
                endDate: '',
                reason: 'vacances',
                paidStatus: 'unpaid',
                error: false,
                today: new Date().toISOString().split('T')[0]
            }            
        },
        methods: {
            async handleSendForm(){
                const dataToSend = {
                    fkContract: checkUserConnexion().contract.idContract,
                    startDate: this.startDate,
                    endDate: this.endDate,
                    payed: this.paidStatus === 'paid',
                    reason: this.reason
                }
                if(!dataToSend.startDate){
                    this.handleError()
                    return
                }
                console.log("dataToSend : ", dataToSend)
                const request = await sendLeaveRequest(dataToSend)
            },
            handleError(){
                this.error = true
            }
        }
    }
</script>
<template>
    <form @submit.prevent="handleSendForm">
        <h3>Faire une demande de congé</h3>
        <div class="form-floating mb-3">
            <input v-model="startDate" type="date" class="form-control" id="startDate" :min="today">
            <label for="startDate">Date de début</label>
            <input v-model="endDate" type="date" class="form-control" id="endDate" :min="startDate || today">
            <label for="endDate">Date de fin</label>
        </div>
        <div class="col-md">
            <div class="form-floating">
                <select v-model="reason" class="form-select" id="reason" aria-label="Floating label select example">
                    <option selected value="vacances">Vacances</option>
                    <option value="maladie">Maladie</option>
                    <option value="urgence">Urgence personnelle</option>
                    <option value="autres">Autres</option>
                </select>
                <label for="reason">Raison</label>
            </div>
        </div>
        <div class="form-check">
            <input v-model="paidStatus" class="form-check-input" type="radio" name="paidStatus" value="paid" id="paid">
            <label class="form-check-label" for="paid">
                Payé
            </label>
        </div>
        <div class="form-check">
            <input v-model="paidStatus" class="form-check-input" type="radio" name="paidStatus" value="unpaid" id="unpaid">
            <label class="form-check-label" for="unpaid">
                Non-payé
            </label>
        </div>
        <input type="submit" class="btn btn-primary" value="Envoyer la demande de congé" @click="console.log('click');">
        <br>
        <input type="button" class="btn btn-primary" value="Annuler" @click="console.log('click');">
    </form>
    <div v-if="error" class="alert alert-danger" role="alert">Vous devez remplir tous les champs</div>
</template>