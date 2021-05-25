import React from 'react'

const CreateLinkedinNetwork = () => {
    fetch('http://localhost:3000/api/v1/linkedin_networks', {
        method: 'POST',
        headers: {
            "content-type": "application/json",
            "accept": "application/json",
            "authorization": `Bearer ${localStorage.token}`,
        },
    });
}

export default CreateLinkedinNetwork