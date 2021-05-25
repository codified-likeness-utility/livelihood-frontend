import { Award } from 'react-feather'
import Avatar from '@components/avatar'
import { Card, CardBody, CardText } from 'reactstrap'
import decorationLeft from '@src/assets/images/elements/decore-left.png'
import decorationRight from '@src/assets/images/elements/decore-right.png'

const CardCongratulations = () => {

  const userData = JSON.parse(localStorage.getItem('userData'))

  return (
    <Card className='card-congratulations'>
      <CardBody className='text-center'>
        <img className='congratulations-img-left' src={decorationLeft} alt='decor-left' />
        <img className='congratulations-img-right' src={decorationRight} alt='decor-right' />
        <Avatar icon={<Award size={28} />} className='shadow' color='primary' size='xl' />
        <div className='text-center'>
          <h1 className='mb-1 text-white'>Nice job, {userData["firstName"]}!</h1>
          <CardText className='m-auto w-75'>
            You are connecting with <strong>57.6%</strong> of the LinkedIn Members you are interacting with!
          </CardText>
        </div>
      </CardBody>
    </Card>
  )
}

export default CardCongratulations
