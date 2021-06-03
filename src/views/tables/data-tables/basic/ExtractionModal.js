import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import classnames from "classnames";
import Flatpickr from "react-flatpickr";
import NumberInput from '@components/number-input'
import {
	User,
	Briefcase,
	Mail,
	Calendar,
	DollarSign,
	X,
	Linkedin,
	Zap,
    Type
} from "react-feather";
import {
	Button,
	Modal,
	ModalHeader,
	ModalBody,
	FormGroup,
	Form,
	InputGroup,
	InputGroupAddon,
	InputGroupText,
	Input,
	Label,
} from "reactstrap";
import "@styles/react/libs/flatpickr/flatpickr.scss";
import ConnectionExtractor from "../../../extractor/ConnectionExtractor";

const ExtractionModal = ({open, handleModal}) => {
    const { register, errors, handleSubmit, trigger, reset } = useForm();
    const [valErrors, setValErrors] = useState({});
    
    const [connectedAfter, setConnectedAfter] = useState("")
    const [numberConnections, setNumberConnections] = useState(0)

    const CloseBtn = (
		<X className='cursor-pointer' size={15} onClick={handleModal} />
    );
    
    const onSubmit = (data) => {
        console.log(data)
        ConnectionExtractor(data)
    }

    const handleConnectedAfterChange = (e) => {
        const errs = valErrors
        if (errs.connectedAfter) delete errs.connectedAfter
        setConnectedAfter(e.target.value)
        setValErrors(errs)
    }

    const handleNumberConnectionsChange = (e) => {
        const errs = valErrors
        if (errs.numberConnections) delete errs.numberConnections
        setNumberConnections(e.target.value)
        setValErrors(errs)
    }

    return (
        <Modal
            isOpen={open}
            toggle={handleModal}
            className='sidebar-sm'
            modalClassName='modal-slide-in'
            contentClassName='pt-0'
        >
            <ModalHeader
				className='mb-3'
				toggle={handleModal}
				close={CloseBtn}
				tag='div'
            >
            <h5 className='modal-title'>Connections Extractor Settings</h5>
            </ModalHeader>
            <ModalBody>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <FormGroup>
                        <Label for='connectedAfter'>Connected After</Label>
                        <InputGroup>
                            <InputGroupAddon addonType='prepend'>
                                <InputGroupText>
                                    <Calendar sieze={15} />
                                </InputGroupText>
                            </InputGroupAddon>
                            <Input
                                type='date'
                                value={connectedAfter}
                                name='connectedAfter'
                                id='connectedAfter'
                                placeholder='Please selsect date to search after...'
                                onChange={handleConnectedAfterChange}
                                className='w-auto ml-1'
                                className={classnames({
                                    "is-invalid": errors["connectedAfter"],
                                })}
                                innerRef={register({
                                    required: true,
                                    validate: (value) => value !== "",
                                })}
                            >
                                {Object.keys(valErrors).length && 
                                    valErrors.connectedAfter ? (
                                        <small className='text-danger'>
                                            {valErrors.connectedAfter}
                                        </small>
                                ) : null}
                            </Input>
                        </InputGroup>
                    </FormGroup>

                    <FormGroup className='mb-4'>
						<Label for='numberConnections'>Number of Connections to Extract</Label>
						<InputGroup>
							<InputGroupAddon addonType='prepend'>
								<InputGroupText>
									<User size={15} />
								</InputGroupText>
							</InputGroupAddon>
							<Input
								type='number'
								value={numberConnections}
								name='numberConnections'
                				id='numberConnections'
               					placeholder='Short description of the job from job post page'
                				onChange={handleNumberConnectionsChange}
								className={classnames({
										"is-invalid": errors["numberConnections"],
									})}
								innerRef={register({
										required: true,
										validate: (value) => value !== "",
									})}
								/>
								{Object.keys(valErrors).length &&
								valErrors.numberConnections ? (
									<small className='text-danger'>
										{valErrors.numberConnections}
									</small>
								) : null}
						</InputGroup>
                    </FormGroup>
                    
                    <Button
						className='mr-1'
            			color='primary'
            			type='submit'
						onClick={handleModal}
					>
						Submit
					</Button>
					<Button color='secondary' onClick={handleModal} outline>
                        Cancel
					</Button>
                    
                </Form>
            </ModalBody>
        </Modal>
    )
}

export default ExtractionModal