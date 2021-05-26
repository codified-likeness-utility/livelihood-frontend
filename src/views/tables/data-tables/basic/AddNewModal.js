// ** React Imports
import { useState } from 'react'

// ** Third Party Components
import Flatpickr from 'react-flatpickr'
import { User, Briefcase, Mail, Calendar, DollarSign, X, Linkedin, Zap, Type } from 'react-feather'
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  Label
} from 'reactstrap'

// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss'

const AddNewModal = ({ open, handleModal }) => {
  // ** State
  const [Picker, setPicker] = useState(new Date())

  // ** Custom close btn
  const CloseBtn = <X className='cursor-pointer' size={15} onClick={handleModal} />

  return (
    <Modal
      isOpen={open}
      toggle={handleModal}
      className='sidebar-sm'
      modalClassName='modal-slide-in'
      contentClassName='pt-0'
    >
      <ModalHeader className='mb-3' toggle={handleModal} close={CloseBtn} tag='div'>
        <h5 className='modal-title'>New Application Entry</h5>
      </ModalHeader>
      <ModalBody className='flex-grow-1'>

      <FormGroup>
          <Label for='title'>Job Title</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Briefcase size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='title' placeholder='Web Developer' />
          </InputGroup>
        </FormGroup>

        <FormGroup>
          <Label for='company-name'>Company Name</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Zap size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='company-name' placeholder='Wayne Enterprise' />
          </InputGroup>
        </FormGroup>
        
        <FormGroup>
          <Label for='poster'>Job Post Url</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Linkedin size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input type='text' id='poster' placeholder='www.linkedin.com/bruce-wayne' />
          </InputGroup>
        </FormGroup>

        <FormGroup>
          <Label for='applied-date'>Date Applied</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Calendar size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Flatpickr className='form-control' id='applied-date' value={Picker} onChange={date => setPicker(date)} />
          </InputGroup>
        </FormGroup>

        <FormGroup >
          <Label for='salary'>Salary</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <DollarSign size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input type='number' id='salary' />
          </InputGroup>
        </FormGroup>

        <FormGroup className='mb-4'>
          <Label for='description'>Description</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Type size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input type='textarea' id='description' />
          </InputGroup>
        </FormGroup>

        <Button className='mr-1' color='primary' onClick={handleModal}>
          Submit
        </Button>
        <Button color='secondary' onClick={handleModal} outline>
          Cancel
        </Button>
      </ModalBody>
    </Modal>
  )
}

export default AddNewModal
