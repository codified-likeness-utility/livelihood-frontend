import { useState, useEffect } from 'react'
import classnames from 'classnames'
import Avatar from '@components/avatar'
import { TrendingUp, User, Box, DollarSign } from 'react-feather'
import { Card, CardHeader, CardTitle, CardBody, CardText, Row, Col, Media } from 'reactstrap'

const StatsCard = ({ cols }) => {

  const [appData, setAppData] = useState([])
  const [data, setData] = useState([])

  useEffect(() => {
    loadAssociateData();
    loadApplicationData()
  }, [])

// ** Get initial Data
  const loadAssociateData = async () => {
    fetch('http://localhost:3000/api/v1/associates', {
      method: 'GET',
      headers: {
        "content-type": "application/json",
        "accept": "application/json",
        "authorization": `Bearer ${localStorage.token}`,
      },
    })
      .then(response => response.json())
      .then(associateData => {
        setData(associateData)
      })
  }

  const loadApplicationData = async () => {
    fetch('http://localhost:3000/api/v1/applications', {
      method: 'GET',
      headers: {
        "content-type": "application/json",
        "accept": "application/json",
        "authorization": `Bearer ${localStorage.token}`,
      },
    })
      .then(response => response.json())
      .then(applicationData => {
        setAppData(applicationData)
      })
  }

  //** Statistics Logic */
  const allConnections = data.length
  const firstDegreeConnections = data.filter(assoc => assoc.connectionDegree === "1st").length
  const appTotal = appData.filter(app => app.status === "Intervew" || app.status === "Technical").length
  const offerTotal = appData.filter(app => app.status === "Offer").length

  const statisticData = [
    {
      title: firstDegreeConnections,
      subtitle: 'New Connections',
      color: 'light-primary',
      icon: <TrendingUp size={24} />
    },
    {
      title: appData.length,
      subtitle: 'Job Applications',
      color: 'light-info',
      icon: <User size={24} />
    },
    {
      title: appTotal,
      subtitle: 'Interviews',
      color: 'light-danger',
      icon: <Box size={24} />
    },
    {
      title: offerTotal,
      subtitle: 'Job Offers',
      color: 'light-success',
      icon: <DollarSign size={24} />
    }
  ]

  const renderData = () => {
    return statisticData.map((item, index) => {
      const margin = Object.keys(cols)
      return (
        <Col
          key={index}
          {...cols}
          className={classnames({
            [`mb-2 mb-${margin[0]}-1`]: index !== statisticData.length - 1
          })}
        >
          <Media>
            <Avatar color={item.color} icon={item.icon} className='mr-2' />
            <Media className='my-auto' body>
              <h4 className='font-weight-bolder mb-0'>{item.title}</h4>
              <CardText className='font-small-3 mb-0'>{item.subtitle}</CardText>
            </Media>
          </Media>
        </Col>
      )
    })
  }

  return (
    <Card className='card-statistics'>
      <CardHeader>
        <CardTitle tag='h4'>Lifetime Statistics</CardTitle>
        <CardText className='card-text font-small-2 mr-25 mb-0'>Updated daily</CardText>
      </CardHeader>
      <CardBody className='statistics-body'>
        <Row>{renderData()}</Row>
      </CardBody>
    </Card>
  )
}

export default StatsCard
