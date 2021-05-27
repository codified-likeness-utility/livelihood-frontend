// ** React Imports
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import classnames from "classnames";
import CreateJob from "../../../CreateJob";
import Flatpickr from "react-flatpickr";

import {
	User,
	Briefcase,
	Mail,
	Calendar,
	DollarSign,
	X,
	Linkedin,
	Zap,
	Type,
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
	Label
} from "reactstrap";

import "@styles/react/libs/flatpickr/flatpickr.scss";

const AddNewModal = ({ state, open, handleModal }) => {
	const { register, errors, handleSubmit, trigger, reset } = useForm();
	const [valErrors, setValErrors] = useState({});
	const [dateApplied, setDateApplied] = useState("");
	const [jobTitle, setJobTitle] = useState("");
	const [companyName, setCompanyName] = useState("");
	const [description, setDescription] = useState("");
	const [jobPostUrl, setjobPostUrl] = useState("");
	const [salary, setSalary] = useState("");

	// Custom close button
	const CloseBtn = (
		<X className='cursor-pointer' size={15} onClick={handleModal} />
	);

	const onSubmit = (data) => {
		console.log(dateApplied);
		CreateJob(data);
	};

	const handleJobTitleChange = (e) => {
		const errs = valErrors;
		if (errs.jobTitle) delete errs.jobTitle;
		setJobTitle(e.target.value);
		setValErrors(errs);
	};

	const handleCompanyNameChange = (e) => {
		const errs = valErrors;
		if (errs.companyName) delete errs.companyName;
		setCompanyName(e.target.value);
		setValErrors(errs);
	};

	const handleDescriptionChange = (e) => {
		const errs = valErrors;
		if (errs.description) delete errs.description;
		setDescription(e.target.value);
		setValErrors(errs);
	};

	const handleJobPostUrlChange = (e) => {
		const errs = valErrors;
		if (errs.jobPostUrl) delete errs.jobPostUrl;
		setjobPostUrl(e.target.value);
		setValErrors(errs);
	};

	const handleSalaryChange = (e) => {
		const errs = valErrors;
		if (errs.salary) delete errs.salary;
		setSalary(e.target.value);
		setValErrors(errs);
	};

	const handleDateAppliedChange = (e) => {
		const errs = valErrors;
		if (errs.dateApplied) delete errs.dateApplied;
		setDateApplied(e.target.value);
		setValErrors(errs);
	};

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
				<h5 className='modal-title'>New Application Entry</h5>
			</ModalHeader>
			<ModalBody className='flex-grow-1'>
				<Form onSubmit={handleSubmit(onSubmit)}>
					<FormGroup>
						<Label for='jobTitle'>Job Title</Label>
						<InputGroup>
							<InputGroupAddon addonType='prepend'>
								<InputGroupText>
									<Briefcase size={15} />
								</InputGroupText>
							</InputGroupAddon>
							<Input
								type='text'
								value={jobTitle}
								name='jobTitle'
								id='jobTitle'
								placeholder='Web Developer'
								onChange={handleJobTitleChange}
								className={classnames({
									"is-invalid": errors["jobTitle"],
								})}
								innerRef={register({
									required: true,
									validate: (value) => value !== "",
								})}
							/>
							{Object.keys(valErrors).length &&
							valErrors.jobTitle ? (
								<small className='text-danger'>
									{valErrors.jobTitle}
								</small>
							) : null}
						</InputGroup>
					</FormGroup>

					<FormGroup>
						<Label for='companyName'>Company Name</Label>
						<InputGroup>
							<InputGroupAddon addonType='prepend'>
								<InputGroupText>
									<Zap size={15} />
								</InputGroupText>
							</InputGroupAddon>
							<Input
								type='text'
								value={companyName}
								name='companyName'
								id='companyName'
								placeholder='Wayne Enterprise'
								onChange={handleCompanyNameChange}
								className={classnames({
									"is-invalid": errors["companyName"],
								})}
								innerRef={register({
									required: true,
									validate: (value) => value !== "",
								})}
							/>
							{Object.keys(valErrors).length &&
							valErrors.companyName ? (
								<small className='text-danger'>
									{valErrors.companyName}
								</small>
							) : null}
						</InputGroup>
					</FormGroup>

					<FormGroup>
						<Label for='jobPostUrl'>Job Post Url</Label>
						<InputGroup>
							<InputGroupAddon addonType='prepend'>
								<InputGroupText>
									<Linkedin size={15} />
								</InputGroupText>
							</InputGroupAddon>
							<Input
								type='text'
								value={jobPostUrl}
								name='jobPostUrl'
								id='jobPostUrl'
								placeholder='www.linkedin.com/bruce-wayne'
								onChange={handleJobPostUrlChange}
								className={classnames({
									"is-invalid": errors["jobPostUrl"],
								})}
								innerRef={register({
									required: true,
									validate: (value) => value !== "",
								})}
							/>
							{Object.keys(valErrors).length &&
							valErrors.jobPostUrl ? (
								<small className='text-danger'>
									{valErrors.jobPostUrl}
								</small>
							) : null}
						</InputGroup>
					</FormGroup>

					<FormGroup>
						<Label for='dateApplied'>Date Applied</Label>
						<InputGroup>
							<InputGroupAddon addonType='prepend'>
								<InputGroupText>
									<Calendar size={15} />
								</InputGroupText>
							</InputGroupAddon>
							<Input
								type='date'
								value={dateApplied}
								name='dateApplied'
								id='dateApplied'
								placeholder='www.linkedin.com/bruce-wayne'
								onChange={handleDateAppliedChange}
								className={classnames({
									"is-invalid": errors["dateApplied"],
								})}
								innerRef={register({
									required: true,
									validate: (value) => value !== "",
								})}
							/>
							{Object.keys(valErrors).length &&
							valErrors.dateApplied ? (
								<small className='text-danger'>
									{valErrors.dateApplied}
								</small>
							) : null}
							{/* <Flatpickr
								className='form-control'
								id='dateApplied'
								value={dateApplied}
								onChange={date => setDateApplied(date)}
							/> */}
						</InputGroup>
					</FormGroup>

					<FormGroup>
						<Label for='salary'>Salary</Label>
						<InputGroup>
							<InputGroupAddon addonType='prepend'>
								<InputGroupText>
									<DollarSign size={15} />
								</InputGroupText>
							</InputGroupAddon>
							<Input
								type='text'
								value={salary}
								name='salary'
								id='salary'
								placeholder='$130,000'
								onChange={handleSalaryChange}
								className={classnames({
									"is-invalid": errors["salary"],
								})}
								innerRef={register({
									required: true,
									validate: (value) => value !== "",
								})}
							/>
							{Object.keys(valErrors).length &&
							valErrors.salary ? (
								<small className='text-danger'>
									{valErrors.salary}
								</small>
							) : null}
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
							<Input
								type='textarea'
								value={description}
								name='description'
								id='description'
								placeholder='Short description of the job from job post page'
								onChange={handleDescriptionChange}
								className={classnames({
									"is-invalid": errors["description"],
								})}
								innerRef={register({
									required: true,
									validate: (value) => value !== "",
								})}
							/>
							{Object.keys(valErrors).length &&
							valErrors.description ? (
								<small className='text-danger'>
									{valErrors.description}
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
	);
};

export default AddNewModal;
