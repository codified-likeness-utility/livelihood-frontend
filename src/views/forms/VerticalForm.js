import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import classnames from "classnames";
import CreateAssociate from '../CreateAssociate'
import {
	Card,
	CardHeader,
	CardTitle,
	CardBody,
	CardSubtitle,
	FormGroup,
	Row,
	Col,
	Input,
	Form,
	Button,
	Label,
	CustomInput,
	Popover,
	PopoverHeader,
	PopoverBody,
} from "reactstrap";

const VerticalForm = () => {
	const { register, errors, handleSubmit, trigger, reset } = useForm();
	const [valErrors, setValErrors] = useState({});
	const [searchUrl, setSearchUrl] = useState("");
	const [personalizedMessage, setPersonalizedMessage] = useState("");
	const [searchPage, setSearchPage] = useState(0);
	const [numberOfRequests, setNumberOfRequests] = useState(0);
	const [popoverOpen, setPopoverOpen] = useState(false);

	const onSubmit = (data) => {
		const apiKey = process.env.REACT_APP_GH_API_KEY
		const account = process.env.REACT_APP_GH_ACCOUNT

		const myHeaders = new Headers();

		myHeaders.append(
			"Authorization",
			apiKey
		);
		myHeaders.append(
			"Growth-Hacking-Credentials",
			account
		);
			
		const requestOptions = {
			method: "POST",
			headers: myHeaders,
			body: JSON.stringify({
				"searchUrl": data.searchUrl,
				"message": data.message,
				"page": parseInt(data.page),
				"maxConnections": parseInt(data.maxConnections)
			}),
			redirect: "follow",
		};

		fetch("https://api.growth-hacking.io/linkedin/search-connect", requestOptions)
			.then(response => response.json())
			.then(result => {
				console.log(result)
				CreateAssociate(result.result)
			})
			.catch(error => console.log('error', error));
	};

	useEffect(async () => {
		const result = await fetch("./api/formValues.json"); // result: { firstName: 'test', lastName: 'test2' }
		reset(result); // asynchronously reset your form values
	}, [reset]);

	const handleSearchUrlChange = (e) => {
		const errs = valErrors;
		if (errs.searchUrl) delete errs.searchUrl;
		setSearchUrl(e.target.value);
		setValErrors(errs);
	};

	const handlePersonalizedMessageChange = (e) => {
		const errs = valErrors;
		if (errs.personalizedMessage) delete errs.personalizedMessage;
		setPersonalizedMessage(e.target.value);
		setValErrors(errs);
	};

	const handleSearchPageChange = (e) => {
		const errs = valErrors;
		if (errs.searchPage) delete errs.searchPage;
		setSearchPage(e.target.value);
		setValErrors(errs);
	};

	const handleNumberOfRequestsChange = (e) => {
		const errs = valErrors;
		if (errs.numberOfRequests) delete errs.numberOfRequests;
		setNumberOfRequests(e.target.value);
		setValErrors(errs);
	};

	return (
		<Card>
			<CardHeader>
				<CardTitle tag='h4'>
					Search & Connect with LinkedIn Members
				</CardTitle>
				<br></br>
				<br></br>
				<Button.Ripple color='primary' outline id='controlledPopover'>
					Directions
				</Button.Ripple>
				<Popover
					placement='right'
					target='controlledPopover'
					isOpen={popoverOpen}
					toggle={() => setPopoverOpen(!popoverOpen)}
				>
					<PopoverHeader>How to get started</PopoverHeader>
					<PopoverBody>
						Create a new search from
						<a href='https://www.linkedin.com/search'>
							{" "}
							www.linkedin.com/search
						</a>{" "}
						by entering the title of the type of person you would
						like to connect with and applying any necessary filters.
						Once you have applied your filters, copy and paste the
						link from your browser into the LinkedIn Search URL
						field.
					</PopoverBody>
				</Popover>
			</CardHeader>

			<CardBody>
				<Form onSubmit={handleSubmit(onSubmit)}>
					<Row>
						<Col sm='12'>
							<FormGroup>
								<Label className='form-label' for='searchUrl'>
									LinkedIn Search URL
								</Label>
								<Input
									type='text'
									value={searchUrl}
									name='searchUrl'
									id='searchUrl'
									placeholder='Perform search on LinkedIn and paste URL here...'
									onChange={handleSearchUrlChange}
									className={classnames({
										"is-invalid": errors["searchUrl"],
									})}
									innerRef={register({
										required: true,
										validate: (value) => value !== "",
									})}
								/>
								{Object.keys(valErrors).length &&
								valErrors.searchUrl ? (
									<small className='text-danger'>
										{valErrors.searchUrl}
									</small>
								) : null}
							</FormGroup>
						</Col>
						<Col sm='12'>
							<FormGroup>
								<Label
									className='form-label'
									for='personalizedMessage'
								>
									Personalized Message - replace their name
									with $firstName
								</Label>
								<Input
									type='textarea'
									value={personalizedMessage}
									name='message'
									id='personalizedMessage'
									placeholder='e.x. Hey $firstName, I thought we might like to connect!'
									onChange={handlePersonalizedMessageChange}
									className={classnames({
										"is-invalid":
											errors["personalizedMessage"],
									})}
									innerRef={register({
										required: true,
										validate: (value) => value !== "",
									})}
								/>
								{Object.keys(valErrors).length &&
								valErrors.personalizedMessage ? (
									<small className='text-danger'>
										{valErrors.personalizedMessage}
									</small>
								) : null}
							</FormGroup>
						</Col>
						<Col sm='12'>
							<FormGroup>
								<Label for='searchPage'>Search Page #</Label>
								<Input
									type='number'
									value={parseInt(searchPage)}
									name='page'
									id='searchPage'
									placeholder='The page of the search results you would like to start from...'
									onChange={handleSearchPageChange}
									className={classnames({
										"is-invalid": errors["searchPage"],
									})}
									innerRef={register({
										required: true,
										validate: (value) => value !== "",
									})}
								/>
								{Object.keys(valErrors).length &&
								valErrors.searchPage ? (
									<small className='text-danger'>
										{valErrors.searchPage}
									</small>
								) : null}
							</FormGroup>
						</Col>
						<Col sm='12'>
							<FormGroup>
								<Label for='numberOfRequests'>
									Number of Requests to Send
								</Label>
								<Input
									type='number'
									value={parseInt(numberOfRequests)}
									name='maxConnections'
									id='numberOfRequests'
									placeholder='Maximum number of connection requests to send...'
									onChange={handleNumberOfRequestsChange}
									className={classnames({
										"is-invalid":
											errors["numberOfRequests"],
									})}
									innerRef={register({
										required: true,
										validate: (value) => value !== "",
									})}
								/>
								{Object.keys(valErrors).length &&
								valErrors.numberOfRequests ? (
									<small className='text-danger'>
										{valErrors.numberOfRequests}
									</small>
								) : null}
							</FormGroup>
						</Col>
						<Col sm='12'>
							<FormGroup className='d-flex mb-0'>
								<Button.Ripple
									className='mr-1'
									color='primary'
									type='submit'
									onClick={(e) =>
										console.log("form submitted!")
									}
								>
									Submit
								</Button.Ripple>
								<Button.Ripple
									outline
									color='secondary'
									type='reset'
								>
									Reset
								</Button.Ripple>
							</FormGroup>
						</Col>
					</Row>
				</Form>
			</CardBody>
		</Card>
	);
};
export default VerticalForm;
