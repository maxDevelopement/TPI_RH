
export default async function loginRequest(pseudo, password){
    try{
        console.log("data to send : ", typeof(pseudo), ", ", typeof(password)) // renvoie les bonnes données
        const url = `http://localhost:3000/api/login`
        const body = {
            pseudo: pseudo,
            password: password
        } 
        const request = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
        if(request.ok){
            const response = await request.json()
            return response
        }
    }catch(error){
        console.log(error)
    }
}