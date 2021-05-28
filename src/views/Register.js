import { Fragment, useState, useContext } from 'react'
import { isObjEmpty } from '@utils'
import classnames from 'classnames'
import { useSkin } from '@hooks/useSkin'
import useJwt from '@src/auth/jwt/useJwt'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { handleLogin } from '@store/actions/auth'
import { Link, Redirect, useHistory } from 'react-router-dom'
import { AbilityContext } from '@src/utility/context/Can'
import InputPasswordToggle from '@components/input-password-toggle'
import { Facebook, Twitter, Mail, GitHub } from 'react-feather'
import { Row, Col, CardTitle, CardText, FormGroup, Label, Button, Form, Input, CustomInput } from 'reactstrap'
import CreateLinkedinNetwork from './CreateLinkedinNetwork'
import '@styles/base/pages/page-auth.scss'
import themeConfig from '@configs/themeConfig'


const Register = () => {
  const ability = useContext(AbilityContext)

  const [skin, setSkin] = useSkin()

  const history = useHistory()

  const dispatch = useDispatch()

  const { register, errors, handleSubmit, trigger } = useForm()

  // const [email, setEmail] = useState('')
  const [valErrors, setValErrors] = useState({})
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [avatar, setAvatar] = useState('')
  // const [terms, setTerms] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false)

  const illustration = skin === 'dark' ? 'register-v2-dark.svg' : 'register-test-large.svg',
    source = require(`@src/assets/images/pages/${illustration}`).default

  const Terms = () => {
    return (
      <Fragment>
        I agree to
        <a className='ml-25' href='/' onClick={e => e.preventDefault()}>
          privacy policy & terms
        </a>
      </Fragment>
    )
  }

  const onSubmit = data => {
    fetch('http://localhost:3000/api/v1/users', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
         accept: 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(newUser => {
        if (newUser !== undefined) {
          localStorage.token = newUser.jwt
          setLoggedIn(true)
          const newUserData = {
            firstName: newUser.user.firstName,
            lastName: newUser.user.lastName,
            username: newUser.user.username,
            avatar: newUser.user.avatar
          }
          localStorage.setItem('userData', JSON.stringify(newUserData))
          CreateLinkedinNetwork()
        }
      })
      .catch(err => console.log(err))
  }

  const handleUsernameChange = e => {
    const errs = valErrors
    if (errs.username) delete errs.username
    setUsername(e.target.value)
    setValErrors(errs)
  }

  const handleFirstNameChange = e => {
    const errs = valErrors
    if (errs.firstName) delete errs.firstName
    setFirstName(e.target.value)
    setValErrors(errs)
  }

  const handleLastNameChange = e => {
    const errs = valErrors
    if (errs.lastName) delete errs.lastName
    setLastName(e.target.value)
    setValErrors(errs)
  }

  const handleAvatarChange = e => {
    const errs = valErrors
    if (errs.avatar) delete errs.avatar
    setAvatar(e.target.value)
    setValErrors(errs)
  }

  return (
    <div className='auth-wrapper auth-v2'>
      <Row className='auth-inner m-0'>
        <Link className='brand-logo' to='/' onClick={e => e.preventDefault()}>
        <img src={themeConfig.app.appLogoImage} alt='logo' />
          <h2 className='brand-text text-primary ml-1'>livelihood</h2>
        </Link>
        <Col className='d-none d-lg-flex align-items-center p-5' lg='8' sm='12'>
          <div className='w-100 d-lg-flex align-items-center justify-content-center px-5'>
          <div className='misc-inner p-2 p-sm-3'>
        <div className='w-100 text-center'>
          <h2 className='mb-1'>Please Register For An Account 👉</h2>
                <h5 className='mb-2'>It's painless.....we promise 🖖</h5>
                <img className='img-fluid' src={source} alt='Login V2' />
        </div>
      </div>
            
          </div>
        </Col>
        <Col className='d-flex align-items-center auth-bg px-2 p-lg-5' lg='4' sm='12'>
          <Col className='px-xl-2 mx-auto' sm='8' md='6' lg='12'>
            <CardTitle tag='h2' className='font-weight-bold mb-1'>
              Growth Hacking your job search starts here 🚀🐱‍💻
            </CardTitle>
            <CardText className='mb-2'>Set your job search to AutoPilot and focus on growing your skills as a developer!</CardText>

            <Form action='/' className='auth-register-form mt-2' onSubmit={handleSubmit(onSubmit)}>

            <FormGroup>
                <Label className='form-label' for='firstName'>
                  First Name
                </Label>
                <Input
                  autoFocus
                  type='text'
                  value={firstName}
                  placeholder='Enter your first name here...'
                  id='firstName'
                  name='firstName'
                  onChange={handleFirstNameChange}
                  className={classnames({ 'is-invalid': errors['firstName'] })}
                  innerRef={register({ required: true, validate: value => value !== '' })}
                />
                {Object.keys(valErrors).length && valErrors.firstName ? (
                  <small className='text-danger'>{valErrors.firstName}</small>
                ) : null}
              </FormGroup>

              <FormGroup>
                <Label className='form-label' for='lastName'>
                  Last Name
                </Label>
                <Input
                  autoFocus
                  type='text'
                  value={lastName}
                  placeholder='Enter your last name here...'
                  id='lastName'
                  name='lastName'
                  onChange={handleLastNameChange}
                  className={classnames({ 'is-invalid': errors['lastName'] })}
                  innerRef={register({ required: true, validate: value => value !== '' })}
                />
                {Object.keys(valErrors).length && valErrors.lastName ? (
                  <small className='text-danger'>{valErrors.lastName}</small>
                ) : null}
              </FormGroup>

              <FormGroup>
                <Label className='form-label' for='username'>
                  Username
                </Label>
                <Input
                  autoFocus
                  type='text'
                  value={username}
                  placeholder='johndoe'
                  id='username'
                  name='username'
                  onChange={handleUsernameChange}
                  className={classnames({ 'is-invalid': errors['username'] })}
                  innerRef={register({ required: true, validate: value => value !== '' })}
                />
                {Object.keys(valErrors).length && valErrors.username ? (
                  <small className='text-danger'>{valErrors.username}</small>
                ) : null}
              </FormGroup>
              
              <FormGroup>
                <Label className='form-label' for='password'>
                  Password
                </Label>
                <InputPasswordToggle
                  value={password}
                  id='password'
                  name='password'
                  className='input-group-merge'
                  onChange={e => setPassword(e.target.value)}
                  className={classnames({ 'is-invalid': errors['password'] })}
                  innerRef={register({ required: true, validate: value => value !== '' })}
                />
              </FormGroup>

              <FormGroup>
                <Label className='form-label' for='avatar'>
                  Profile Picture
                </Label>
                <Input
                  autoFocus
                  type='text'
                  value={avatar}
                  placeholder='Please paste link to profile picture...'
                  id='avatar'
                  name='avatar'
                  onChange={handleAvatarChange}
                  className={classnames({ 'is-invalid': errors['avatar'] })}
                  innerRef={register({ required: true, validate: value => value !== '' })}
                />
                {Object.keys(valErrors).length && valErrors.avatar ? (
                  <small className='text-danger'>{valErrors.avatar}</small>
                ) : null}
              </FormGroup>

              <Button.Ripple type='submit' block color='primary'>
                Sign up
              </Button.Ripple>
            </Form>

            <p className='text-center mt-2'>
              <span className='mr-25'>Already have an account?</span>
              <Link to='/login'>
                <span>Sign in instead</span>
              </Link>
            </p>

          </Col>
        </Col>
      </Row>
      { loggedIn === true ? <Redirect to='/home' /> : null }
    </div>
  )
}

export default Register
