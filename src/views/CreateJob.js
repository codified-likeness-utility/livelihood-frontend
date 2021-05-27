import CreateApplication from './CreateApplication'
import DataTableWithButtons from './tables/data-tables/basic/TableWithButtons'

const CreateJob = result => {
    fetch('http://localhost:3000/api/v1/jobs', {
        method: 'POST',
        headers: {
            "content-type": "application/json",
            "accept": "application/json",
            "authorization": `Bearer ${localStorage.token}`,
        },
        body: JSON.stringify(result)
    })
        .then(response => response.json())
        .then(newJob => {
            CreateApplication(newJob)
            DataTableWithButtons()
        })
}

export default CreateJob