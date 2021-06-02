
// ** Get Jobs from database
export const getJobData = () => {
	return (dispatch) => {
		return fetch("http://localhost:3000/api/v1/jobs", {
			method: "GET",
			headers: {
				"content-type": "application/json",
				accept: "application/json",
				authorization: `Bearer ${localStorage.token}`,
			},
		})
			.then((response) => response.json())
			.then((response) => {
				dispatch({
					type: "GET_DATA",
					data: response,
				});
			});
	};
};

