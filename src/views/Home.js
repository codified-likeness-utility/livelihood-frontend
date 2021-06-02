import { Fragment, useContext } from 'react'
import { connect } from 'react-redux'
import { Row, Col } from 'reactstrap'
import Breadcrumbs from '@components/breadcrumbs'
import { Card, CardHeader, CardBody, CardTitle, CardText, CardLink } from 'reactstrap'
import VerticalForm from './forms/VerticalForm'
import TableWithButtons from './tables/data-tables/basic/TableWithButtons'
import TableExpandable from './tables/data-tables/basic/TableExpandable'
import StatsCard from './cards/statistics/StatsCard'
import CardCongratulations from './cards/advance/CardCongratulations'
import { ThemeColors } from '../utility/context/ThemeColors'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import { FormProvider } from 'react-hook-form'
import { max } from 'moment'

const Home = () => {

  
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
        </CardBody>
      </Card>

    </div>
  )
}
// const mapStateToProps = state => {
//   jobs: state.getData
// }

// export default connect(mapStateToProps)(Home)
export default Home
