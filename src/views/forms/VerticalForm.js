import { useState } from "react";
import { useForm } from "react-hook-form";
import classnames from 'classnames'

import {
	Card,
	CardHeader,
	CardTitle,
	CardBody,
	FormGroup,
	Row,
	Col,
	Input,
	Form,
	Button,
	Label,
	CustomInput,
} from "reactstrap";

const VerticalForm = () => {

  const { register, errors, handleSubmit, trigger } = useForm();

  const [valErrors, setValErrors] = useState({})
  const [searchUrl, setSearchUrl] = useState('')
  const [personalizedMessage, setPersonalizedMessage] = useState('')
  const [searchPage, setSearchPage] = useState('')
  const [numberOfRequests, setNumberOfRequests] = useState('')

	

  const onSubmit = (data) => {
    reset()
		debugger
		// fetch('http://localhost:3000/api/v1/users', {
		//   method: 'POST',
		//   headers: {
		//     'content-type': 'application/json',
		//      accept: 'application/json'
		//   },
		//   body: JSON.stringify(data)
		// })
		//   .then(response => response.json())
		//   .then(newUser => {
		//     if (newUser !== undefined) {
		//       localStorage.token = newUser.jwt
		//       setLoggedIn(true)
		//       const newUserData = {
		//         firstName: newUser.user.firstName,
		//         lastName: newUser.user.lastName,
		//         username: newUser.user.username,
		//         avatar: newUser.user.avatar
		//       }
		//       localStorage.setItem('userData', JSON.stringify(newUserData))
		//     }
		//   })
		//   .catch(err => console.log(err))
  };
  
  const handleSearchUrlChange = e => {
    const errs = valErrors
    if (errs.searchUrl) delete errs.searchUrl
    setSearchUrl(e.target.value)
    setValErrors(errs)
  }

  const handlePersonalizedMessageChange = e => {
    const errs = valErrors
    if (errs.personalizedMessage) delete errs.personalizedMessage
    setPersonalizedMessage(e.target.value)
    setValErrors(errs)
  }

  const handleSearchPageChange = e => {
    const errs = valErrors
    if (errs.searchPage) delete errs.searchPage
    setSearchPage(e.target.value)
    setValErrors(errs)
  }

  const handleNumberOfRequestsChange = e => {
    const errs = valErrors
    if (errs.numberOfRequests) delete errs.numberOfRequests
    setNumberOfRequests(e.target.value)
    setValErrors(errs)
  }

	return (
		<Card>
			<CardHeader>
				<CardTitle tag='h4'>Vertical Form</CardTitle>
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
                  className={classnames({ 'is-invalid': errors['searchUrl'] })}
                  innerRef={register({ required: true, validate: value => value !== '' })}
                />
                {Object.keys(valErrors).length && valErrors.searchUrl ? (
                  <small className='text-danger'>{valErrors.searchUrl}</small>
                ) : null}
							</FormGroup>
						</Col>
						<Col sm='12'>
							<FormGroup>
								<Label className='form-label' for='personalizedMessage'>
									Personalized Message - replace their name
									with $firstName
								</Label>
								<Input
                  type='text'
                  value={personalizedMessage}
									name='personalizedMessage'
									id='personalizedMessage'
                  placeholder='e.x. Hey $firstName, I thought we might like to connect!'
                  onChange={handlePersonalizedMessageChange}
                  className={classnames({ 'is-invalid': errors['personalizedMessage'] })}
                  innerRef={register({ required: true, validate: value => value !== '' })}
                />
                {Object.keys(valErrors).length && valErrors.personalizedMessage ? (
                  <small className='text-danger'>{valErrors.personalizedMessage}</small>
                ) : null}
							</FormGroup>
						</Col>
						<Col sm='12'>
							<FormGroup>
								<Label for='searchPage'>Search Page #</Label>
								<Input
                  type='number'
                  value={searchPage}
									name='searchPage'
									id='searchPage'
                  placeholder='The page of the search results you would like to start from...'
                  onChange={handleSearchPageChange}
                  className={classnames({ 'is-invalid': errors['searchPage'] })}
                  innerRef={register({ required: true, validate: value => value !== '' })}
                />
                {Object.keys(valErrors).length && valErrors.searchPage ? (
                  <small className='text-danger'>{valErrors.searchPage}</small>
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
                  value={numberOfRequests}
									name='numberOfRequests'
									id='numberOfRequests'
                  placeholder='Maximum number of connection requests to send...'
                  onChange={handleNumberOfRequestsChange}
                  className={classnames({ 'is-invalid': errors['numberOfRequests'] })}
                  innerRef={register({ required: true, validate: value => value !== '' })}
                />
                {Object.keys(valErrors).length && valErrors.numberOfRequests ? (
                  <small className='text-danger'>{valErrors.numberOfRequests}</small>
                ) : null}
							</FormGroup>
						</Col>
						<Col sm='12'>
							<FormGroup>
								<CustomInput
									type='checkbox'
									id='remember-me-vertical'
									label='Remember Me'
									defaultChecked={false}
								/>
							</FormGroup>
						</Col>
						<Col sm='12'>
							<FormGroup className='d-flex mb-0'>
								<Button.Ripple
									className='mr-1'
									color='primary'
									type='submit'
									onClick={(e) => console.log('form submitted!')}
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
