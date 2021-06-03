import moment from "moment";
import { useState, useEffect } from "react";
import Button from "reactstrap/lib/Button";
import ExtractorUpdate from "./ExtractorUpdate";

const ConnectionExtractor = (data) => {
    
    const apiKey = process.env.REACT_APP_GH_API_KEY;
    const account = process.env.REACT_APP_GH_ACCOUNT;

    const myHeaders = new Headers();

    myHeaders.append("Authorization", apiKey);
    myHeaders.append("Growth-Hacking-Credentials", account);

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify({
            "sortBy": "recentlyAdded",
            "connectedAfter": data.connectedAfter,
            "numberConnections": parseInt(data.numberConnections)
        }),
        redirect: "follow",
    };

    fetch(
        "https://api.growth-hacking.io/linkedin/connections-extractor",
        requestOptions
    )
        .then((response) => response.json())
        .then((result) => {
            console.log(result);
            ExtractorUpdate(result.result);
        })
        .catch((error) => {
            console.log("error", error);
        });

};

export default ConnectionExtractor;
