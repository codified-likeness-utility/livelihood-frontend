
const CreateApplication = newJobData => {
    console.log(newJobData)
    console.log('Data posting to server...')
    fetch('http://localhost:3000/api/v1/applications', {
        method: 'POST',
        headers: {
            "content-type": "application/json",
            "accept": "application/json",
            "authorization": `Bearer ${localStorage.token}`,
        },
        body: JSON.stringify(newJobData)
    })
        .then(response => response.json())
        .then(newApplication => {
            console.log(newApplication)
        })
}

export default CreateApplication