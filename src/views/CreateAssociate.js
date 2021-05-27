import moment from 'moment';

const CreateAssociate = result => {
    
    result.map(res => {
        
        fetch('http://localhost:3000/api/v1/associates', {
            method: 'POST',
            headers: {
                "content-type": "application/json",
				"accept": "application/json",
				"authorization": `Bearer ${localStorage.token}`,
            },
            body: JSON.stringify({
                firstName: res.firstName.replace(/\W/g, ''),
                lastName:  res.lastName.replace(/\W/g, ''),
                title: res.description,
                profileUrl: res.profileUrl,
                connectionDegree: res.connectionDegree.replace(/\W/g, ''),
                linkedinPremium: res.isPremium,
                message1: res.message,
                lastMessageSent: moment().format('MM/D/YYYY hh:mm:ss'),
                profileImageUrl: res.profileImageUrl
            })
        })
            .then(response => response.json())
            .then(associate => console.log(associate))
    })
}

export default CreateAssociate