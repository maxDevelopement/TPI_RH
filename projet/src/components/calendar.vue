
<template>
  <nav-bar />
  <div>
    <h1>Calendrier personnel</h1>
    <FullCalendar :options="calendarOptions" />
  </div>
  <leaveRequestForm v-if="leaveRequestForm" />
  <input v-if="!leaveRequestForm" class="btnbtn-primary" type="button" id="openSendLeaveRequestForm" value="Faire une demande de congé" @click="handleOpenLeaveRequestPopup">
</template>

<script>

import navBar from './navBar.vue'
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import { checkUserConnexion } from '../helpers/getters'
import { calculInterval } from '../helpers/getters'
import leaveRequestForm from './leaveRequestForm.vue'

export default {
  components: {
    'nav-bar': navBar,
    'leaveRequestForm': leaveRequestForm,
      FullCalendar, 
  },
  data() {
    return {
      leaveRequestForm: false,
      remaningsLeaves: 0,
      calendarOptions: {
        plugins: [ dayGridPlugin, interactionPlugin ],
        initialView: 'dayGridMonth',
        dateClick: this.handleDateClick,
        events: this.showAllLeaveRequests(),
      }
    }
  },
  methods: {
    handleOpenLeaveRequestPopup(){
      console.log("click open !")
      this.leaveRequestForm = true
    },
    handleCloseLeaveRequestPopup(){
      this.leaveRequestForm = false
    },
    handleDateClick: function(arg) {
      alert('click : ' + arg.dateStr)
    },
    showAllLeaveRequests(){
      const user = checkUserConnexion()
      const allLeaveRequests = user.leaveRequests
      if(!allLeaveRequests.length){
        return
      }
      let allEvents = []
      allLeaveRequests.forEach(leaveRequest => {    
        if(leaveRequest.endDate !== null){
          const allDates =this.getAllDates(leaveRequest.startDate, leaveRequest.endDate)
          allDates.forEach((date) => {
              allEvents.push(this.createEvent(leaveRequest.status, date))
              this.calculRemaningLeaves(leaveRequest.status)
          })
        }else{
          allEvents.push(this.createEvent(leaveRequest.status, leaveRequest.startDate))
          this.calculRemaningLeaves(leaveRequest.status)
        }
      })
      return allEvents
    },
    calculRemaningLeaves(status){
      if(status === 'accepted'){
        this.remaningsLeaves++ 
      }
    },
    getAllDates(start, end){  
      let allDates= []
      if(start === end){
        allDates.push(startDate)
        return allDates
      }else{
        allDates = calculInterval(start, end)
        return allDates
      }
    },
    createEvent(status, date){
      let dataToReturn
      switch(status){
        case 'accepted': {
          dataToReturn = {
            title: 'validé',
            date: date,
            classNames: ['validated-leaveRequest']
          } 
          break
        }
        case 'refused': {
          dataToReturn = {
            title: 'refusé',
            date: date,
            classNames: ['refused-leaveRequest']
          }
          break
        }
        case 'pending': {
          dataToReturn = {
            title: 'en attente',
            date: date,
            classNames: ['pending-leaveRequest']
          }
          break
        }
      }
      return dataToReturn
    }
  }
} 
</script>
<style>
  .validated-leaveRequest{
    background-color: #20B745;
    border: 1px solid #02FB3E;
  }
  .refused-leaveRequest{
    background-color: #A80000;
    border: 1px solid #FB0202;
  }
  .pending-leaveRequest{
    background-color: #0059A8 ;
    border: 1px solid #0087FF;
  }
</style>