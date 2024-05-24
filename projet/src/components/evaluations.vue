<template>
    <div>
        <h1>Evaluations</h1>
        <div v-for="(evaluation, index) in evaluations" class="form-group row" :key="index">
            <label for="year" class="col-sm-2 col-form-label">Année</label>
            <div class="col-sm-10">                    
                <input type="text" class="form-control" id="year" :value="evaluation.evaluationYear" readonly>
            </div>
            <label for="perf" class="col-sm-2 col-form-label">Note</label>
            <div class="col-sm-10">                    
                <input type="text" class="form-control" id="perf" :value="evaluation.performanceNote" readonly>
            </div>
            <label for="positiv" class="col-sm-2 col-form-label">Positif</label>
            <div class="col-sm-10">                    
                <input type="text" class="form-control" id="positiv" :value="evaluation.positiv" readonly>
            </div>
            <label for="negativ" class="col-sm-2 col-form-label">Négatif</label>
            <div class="col-sm-10">                    
                <input type="text" class="form-control" id="negativ" :value="evaluation.negativ" readonly>
            </div>
            <hr>
        </div>
    </div>
</template>
<script>
import { checkUserConnexion } from '../helpers/getters.js'
    export default{
        name: 'evaluations',
        setup(){
            const evaluations = checkUserConnexion().evaluations
            return {
                evaluations
            }
        }
    }
</script>