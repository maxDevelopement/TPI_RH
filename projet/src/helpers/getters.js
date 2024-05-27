import { eachDayOfInterval, format } from 'date-fns'

function checkUserConnexion(){
    console.log("sessionstorage user : ", JSON.parse(sessionStorage.getItem('user')))
    return sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')) : null;
}

function calculInterval(start, end){
    const startDate = new Date(start)
    const endDate = new Date(end)
    if(startDate && endDate){
        return eachDayOfInterval({start: startDate, end: endDate}).map(date => format(date, 'yyyy-MM-dd'))
    }
  }
export {
    checkUserConnexion,
    calculInterval
}
