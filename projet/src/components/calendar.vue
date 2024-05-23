
<template>
  <nav-bar />
  <h1>Calendrier personnel</h1>
  <FullCalendar :options="calendarOptions" />
</template>

<script>

import navBar from './navBar.vue';
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import { checkUserConnexion } from '../helpers/getters'
import { eachDayOfInterval, format } from 'date-fns'
export default {
  components: {
      FullCalendar, // make the <FullCalendar> tag available
      'nav-bar': navBar
  },
  data() {

    return {
      calendarOptions: {
        plugins: [ dayGridPlugin, interactionPlugin ],
        initialView: 'dayGridMonth',
        dateClick: this.handleDateClick,
        events: this.showAllLeaveRequests()
      }
    }
  },
  methods: {
    handleDateClick: function(arg) {
      alert('click : ' + arg.dateStr)
    },
    showAllLeaveRequests(){
      const user = checkUserConnexion()
      const allLeaveRequests = user.leaveRequests
      console.log("allLeaveRequests : ", allLeaveRequests)
      if(!allLeaveRequests.length){
        return
      }
      let allEvents = []
      allLeaveRequests.forEach(leaveRequest => {    
        console.log("leave req status : ", leaveRequest.status)    
        if(leaveRequest.endDate !== null){
          const allDates =this.getAllDates(leaveRequest.startDate, leaveRequest.endDate)
          allDates.forEach((date) => {
              allEvents.push(this.createEvent(leaveRequest.status, date))
          })
        }else{
          allEvents.push(this.createEvent(leaveRequest.status, leaveRequest.startDate))
        }
      })
      console.log("final data : ", allEvents)
      return allEvents
    },
    getAllDates(start, end){  
      let allDates= []
      if(start === end){
        allDates.push(startDate)
        return allDates
      }else{
        const startDate = new Date(start)
        const endDate = new Date(end)
        allDates = eachDayOfInterval({start: startDate, end: endDate}).map(date => format(date, 'yyyy-MM-dd'))
        return allDates
      }
    },
    createEvent(status, date){
      let dataToReturn
      console.log("createEvent () : ", status)
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