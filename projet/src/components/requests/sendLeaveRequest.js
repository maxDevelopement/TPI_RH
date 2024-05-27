export default async function sendLeaveRequest(body){
    try{
        const request = await fetch('http://localhost:3000/api/insertLeaveRequest', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }) 
        if(request.ok){
            const response = await request.json()
            console.log(response)
        }
    }catch(error){
        console.log("error : ", error)
    }
}