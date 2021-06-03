import Nouislider from 'nouislider-react'
import { Card, CardHeader, CardTitle, CardBody } from 'reactstrap'

const SliderScalePips = ({ direction }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle tag='h4'>Number of New Connections to Extract</CardTitle>
      </CardHeader>
      <CardBody>
        <Nouislider
          className='mt-1 mb-3'
          start={1}
          step={5}
          tooltips={true}
          direction={direction}
          range={{
            min: 0,
            max: 30
          }}
          pips={{
            mode: 'steps',
            stepped: true,
            density: 5
          }}
        />
      </CardBody>
    </Card>
  )
}

export default SliderScalePips
