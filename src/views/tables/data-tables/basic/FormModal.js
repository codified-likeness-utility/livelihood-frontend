import { useState } from "react";
import { useForm } from "react-hook-form";
import classnames from "classnames";
import {
	Button,
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Label,
	Form,
	FormGroup,
	Input,
} from "reactstrap";

const FormModal = ({ job, open, handleFormModal }) => {

	const { register, errors, handleSubmit } = useForm();
	const [formModal, setFormModal] = useState(false);
	const [status, setStatus] = useState("");
	const [salary, setSalary] = useState("");
    const [description, setDescription] = useState("");
    const [jobData, setJobData] = useState()


    const onSubmit = (data) => {
        console.log(job.id)
        console.log(data)
        fetch(`http://localhost:3000/api/v1/jobs/${job.id}`, {
            method: 'PATCH',
            headers: {
                "content-type": "application/json",
                "accept": "application/json",
                "authorization": `Bearer ${localStorage.token}`,
            },
            body: JSON.stringify({
                salary: data.salary,
                description: data.description,
                status: data.status
            })
        })
            .then(response => response.json())
            .then(jobUpdate => {
                console.log(jobUpdate)
                console.log(data)
            })
	};

	const handleSalaryChange = (e) => {
		setSalary(e.target.value);
	};

	const handleStatusChange = (e) => {
		setStatus(e.target.value);
	};

	const handleDescriptionChange = (e) => {
		setDescription(e.target.value);
	};

	return (
		<Modal
			isOpen={open}
			toggle={handleFormModal}
			className='modal-dialog-centered'
		>
            <ModalHeader toggle={handleFormModal}>Login Form</ModalHeader>
            <Form onSubmit={handleSubmit(onSubmit)}>
			<ModalBody>
				
					<FormGroup>
						<Label for='status'>Job Status</Label>
						<Input
							value={status}
							type='select'
							name='status'
							id='status'
                            onChange={handleStatusChange}
                            className={classnames({
                                "is-invalid": errors["status"],
                            })}
                            innerRef={register({
                                required: true,
                                validate: (value) => value !== "",
                            })}
						>
							<option>Interview</option>
							<option>Technical</option>
							<option>Rejected</option>
							<option>Offer</option>
						</Input>
					</FormGroup>
					<FormGroup>
						<Label for='salary'>Salary</Label>
						<Input
                            value={salary}
                            name='salary'
							type='text'
							id='salary'
							placeholder='$100,000'
                            onChange={handleSalaryChange}
                            className={classnames({
                                "is-invalid": errors["salary"],
                            })}
                            innerRef={register({
                                required: true,
                                validate: (value) => value !== "",
                            })}
						/>
					</FormGroup>
					<FormGroup>
						<Label for='description'>Notes</Label>
						<Input
                            value={description}
                            name='description'
							type='textarea'
							id='description'
							placeholder='Notes and updates on job'
                            onChange={handleDescriptionChange}
                            className={classnames({
                                "is-invalid": errors["description"],
                            })}
                            innerRef={register({
                                required: true,
                                validate: (value) => value !== '',
                            })}
						/>
					</FormGroup>
				
			</ModalBody>
			<ModalFooter>
				<Button color='primary' type='submit' onClick={handleFormModal}>
					Update
				</Button>{" "}
                </ModalFooter>
                </Form>
		</Modal>
	);
};

export default FormModal;
