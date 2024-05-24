<script>
    import { useRouter } from 'vue-router'
    import { ref } from 'vue'
   
    export default{
        name: 'leaveRequestForm',
    }
</script>
<template>
    <form>
        <div class="form-group">
            <label for="startDate" class="col-sm-2 col-form-label">Date début : </label>
            <div class="col-sm-10">
                <input type="date" class="form-control" id="startDate">
            </div>
            <label for="endDate" class="col-sm-2 col-form-label">Date fin : </label>
            <div class="col-sm-10">
                <input type="date" class="form-control" id="endDate">
            </div>
        </div>
    </form>
</template>