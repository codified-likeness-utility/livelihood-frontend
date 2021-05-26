import { Fragment, useContext } from 'react'
import { Row, Col } from 'reactstrap'
import Breadcrumbs from '@components/breadcrumbs'
import { Card, CardHeader, CardBody, CardTitle, CardText, CardLink } from 'reactstrap'
import VerticalForm from './forms/VerticalForm'
import TableWithButtons from './tables/data-tables/basic/TableWithButtons'
import TableExpandable from './tables/data-tables/basic/TableExpandable'
import StatsCard from './cards/statistics/StatsCard'
import CardCongratulations from './cards/advance/CardCongratulations'
import { ThemeColors } from '../utility/context/ThemeColors'

const Home = () => {
  const { colors } = useContext(ThemeColors),
    trackBgColor = '#e9ecef'
  
  return (
    <div>

    <Fragment>
          {/* <Breadcrumbs breadCrumbTitle='Form Layouts' breadCrumbParent='Form' breadCrumbActive='Form Layouts' /> */}
          <Row className='match-height'>
            <Col md='6' sm='12'>
              <VerticalForm />
          </Col>
          <Col lg='6' sm='12'>
          <CardCongratulations />
          <StatsCard cols={{ md: '6', sm: '12' }} />
        </Col>
          </Row>
      </Fragment>

      <Fragment>
      <Row>
        <Col sm='12'>
          <TableExpandable />
        </Col>
      </Row>
    </Fragment>
      
    <Fragment>
      <Row>
        <Col sm='12'>
          <TableWithButtons />
        </Col>
      </Row>
    </Fragment>

      <Card>
        <CardHeader>
          <CardTitle>Kick start your project 🚀</CardTitle>
        </CardHeader>
        <CardBody>
          <CardText>All the best for your new project.</CardText>
          <CardText>
            Please make sure to read our{' '}
            <CardLink
              href='...'
              target='_blank'
            >
              Template Documentation
            </CardLink>{' '}
            to understand where to go from here and how to use our template.
          </CardText>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Want to integrate JWT? 🔒</CardTitle>
        </CardHeader>
        <CardBody>
          <CardText>
            We carefully crafted JWT flow so you can implement JWT with ease and with minimum efforts.
          </CardText>
          <CardText>
            Please read our{' '}
            <CardLink
              href='...'
              target='_blank'
            >
              JWT Documentation
            </CardLink>{' '}
            to get more out of JWT authentication.
          </CardText>
        </CardBody>
      </Card>

    </div>
  )
}

export default Home
