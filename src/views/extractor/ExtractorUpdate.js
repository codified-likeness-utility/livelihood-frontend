import { useState, useEffect } from "react";

const ExtractorUpdate = result => {
    result.map(res => {
        debugger
        fetch('http://localhost:3000/api/v1/extractor', {
            method: 'POST',
            headers: {
                "content-type": "application/json",
				"accept": "application/json",
				"authorization": `Bearer ${localStorage.token}`,
            },
            body: JSON.stringify({
                fullName: res.fullName,
                firstName: res.firstName.replace(/\W/g, ''),
                lastName: res.lastName.replace(/\W/g, ''),
                title: res.title.replace(/\W/g, ''),
                profileUrl: res.profileUrl,
                profileImageUrl: res.profileImageUrl,
                connectionDegree: '1st'

            })
        })
            .then(result => result.json())
            .then(newConnection => {
                console.log(newConnection)
            })
    })
}

export default ExtractorUpdate;