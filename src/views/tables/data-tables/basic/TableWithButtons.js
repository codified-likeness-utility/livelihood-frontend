
import { Fragment, useState, useEffect, forwardRef } from 'react'
import AddNewModal from './AddNewModal'
import FormModal from './FormModal';
import ReactPaginate from 'react-paginate'
import DataTable from 'react-data-table-component'
import { ChevronDown,Plus, MoreVertical, Trash, Edit, UploadCloud } from 'react-feather'
import {
  Card,
  CardHeader,
  CardTitle,
  Button,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Input,
  Label,
  Row,
  Col,
  UncontrolledDropdown,
  Badge,
  Spinner
} from 'reactstrap'


const DataTableWithButtons = () => {
  // ** States
  const [formModal, setFormModal] = useState(false)
  const [modal, setModal] = useState(false)
  const [currentPage, setCurrentPage] = useState(0)
  const [searchValue, setSearchValue] = useState('')
  const [filteredData, setFilteredData] = useState([])
  const [data, setData] = useState()
  const [isLoading, setLoading] = useState(false)
  const [addRecord, setAddRecord] = useState(false)
  const [jobData, setJobData] = useState()

  useEffect(() => {
    loadData();
  }, [])

// ** Get initial Data from Rails Server
  const loadData = async () => {
    setLoading(true)
    console.log("Loading...")
    fetch('http://localhost:3000/api/v1/jobs', {
      method: 'GET',
      headers: {
        "content-type": "application/json",
        "accept": "application/json",
        "authorization": `Bearer ${localStorage.token}`,
      },
    })
      .then(response => response.json())
      .then(associateData => {
        console.log(associateData)
        setData(associateData)
        setLoading(false)
      })

  }

  const states = ['success', 'danger', 'warning', 'info', 'dark', 'primary', 'secondary']
  
  // ** Status Badges for connections
  const status = {
    1: { title: 'Applied', color: 'light-info' },
    2: { title: 'Interview', color: 'light-secondary' },
    3: { title: 'Technical', color: 'light-warning' },
    4: { title: 'Rejected', color: 'light-danger' },
    5: { title: 'Offer', color: 'light-success' }
  }

  // ** Columns in Table
  const columns = [
    {
      name: 'Job Title',
      selector: 'jobTitle',
      sortable: true,
      minWidth: '300px',
      cell: row => (
        <div className='d-flex align-items-center'>
          <div className='user-info text-truncate ml-1'>
            <span className='d-block font-weight-bold text-truncate'>{row.jobTitle}</span>
            <small>{row.post}</small>
          </div>
        </div>
      )
    },
    {
      name: 'Company',
      selector: 'companyName',
      sortable: true,
      minWidth: '100px'
    },
    {
      name: 'Date Applied',
      selector: 'dateApplied',
      sortable: true,
      minWidth: '100px'
    },
    {
      name: 'Salary',
      selector: 'salary',
      sortable: true,
      minWidth: '150px'
    },
    {
      name: 'Status',
      selector: 'applications[0].status',
      sortable: true,
      minWidth: '150px',
      cell: row => {
        return (
          <Badge color={
              row.applications[0].status === 'Applied' ? status[1].color :
                row.applications[0].status === 'Interview' ? status[2].color :
                  row.applications[0].status === 'Technical' ? status[3].color :
                    row.applications[0].status === 'Rejected' ? status[4].color :
                      row.applications[0].status === 'Offer' ? status[5].color :
                        null
                      } pill>
            {
              row.applications[0].status === 'Applied' ? status[1].title :
              row.applications[0].status === 'Interview' ? status[2].title :
                row.applications[0].status === 'Technical' ? status[3].title :
                  row.applications[0].status === 'Rejected' ? status[4].title :
                    row.applications[0].status === 'Offer' ? status[5].title : null
            }
          </Badge>
        )
      }
    },
    {
      name: 'Actions',
      allowOverflow: true,
      cell: row => {
        const jobClicked = row
        return (
          <div className='d-flex'>
            <UncontrolledDropdown>
              <DropdownToggle className='pr-1' tag='span'>
                <MoreVertical size={15} />
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem className='w-100' onClick={() => {
                  console.log(jobClicked)
                  handleJobData(jobClicked)
                  handleFormModal()
                }}>
                  <UploadCloud size={15} />
                  <span className='align-middle ml-50'>Update</span>
                </DropdownItem>
                <DropdownItem className='w-100' onClick={e => e.preventDefault()}>
                  <Trash size={15} />
                  <span className='align-middle ml-50'>Delete</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            <Edit size={15} />
          </div>
        )
      }
    }
  ]

   // ** Function to handle Modal toggle
  const handleModal = () => setModal(!modal)

  // ** Function to handle re-render after new record is added
  const handleFormModal = () => setFormModal(!formModal)
  
  const handleJobData = jobClicked => setJobData(jobClicked)
  
  const handleLoad = () => loadData()

   // ** Function to handle filtering data values
   const handleFilter = e => {
     const value = e.target.value
     let updatedData = []
     setSearchValue(value)
  
     if (value.length) {
       updatedData = data.filter(item => {
         const startsWith =
           item.jobTitle.toLowerCase().startsWith(value.toLowerCase()) ||
           item.companyName.toLowerCase().startsWith(value.toLowerCase()) ||
           item.description.toLowerCase().startsWith(value.toLowerCase()) ||
           item.applications[0].status.toLowerCase().startsWith(value.toLowerCase())

 
         const includes =
           item.jobTitle.toLowerCase().includes(value.toLowerCase()) ||
           item.companyName.toLowerCase().includes(value.toLowerCase()) ||
           item.description.toLowerCase().includes(value.toLowerCase()) ||
           item.applications[0].status.toLowerCase().includes(value.toLowerCase())
           
 
         if (startsWith) {
           return startsWith
         } else if (!startsWith && includes) {
           return includes
         } else return null
       })
       setFilteredData(updatedData)
       setSearchValue(value)
     }
   }
 
  // ** Function to handle Pagination
  const handlePagination = page => {
    setCurrentPage(page.selected)
  }
  
  // ** Custom Pagination
  const CustomPagination = () => (
    <ReactPaginate
      previousLabel=''
      nextLabel=''
      forcePage={currentPage}
      onPageChange={page => handlePagination(page)}
      pageCount={searchValue.length ? filteredData.length / 7 : data.length / 7 || 1}
      breakLabel='...'
      pageRangeDisplayed={2}
      marginPagesDisplayed={2}
      activeClassName='active'
      pageClassName='page-item'
      breakClassName='page-item'
      breakLinkClassName='page-link'
      nextLinkClassName='page-link'
      nextClassName='page-item next'
      previousClassName='page-item prev'
      previousLinkClassName='page-link'
      pageLinkClassName='page-link'
      breakClassName='page-item'
      breakLinkClassName='page-link'
      containerClassName='pagination react-paginate separated-pagination pagination-sm justify-content-end pr-1 mt-1'
    />
  )
    // ** Expandable Row Structure
  const ExpandableTable = ({ data }) => {
    return (
      <div className='expandable-content p-2'>
        <p>
          <span className='font-weight-bold'>Company:</span> {data.companyName}
        </p>
        <p>
          <span className='font-weight-bold'>Job Title:</span> {data.jobTitle}
        </p>
        <p>
          <span className='font-weight-bold'>Salary Offered:</span> {data.salary}
        </p>
        <p>
          <span className='font-weight-bold'>Job Post URL: </span><a href={data.jobPostUrl}> {data.jobPostUrl}</a>
        </p>
        <p>
          <span className='font-weight-bold'>Status of Application:</span> {data.applications[0].status}
        </p>
        <p className='m-0'>
          <span className='font-weight-bold'>Notes:</span> {data.description}
        </p>
      </div>
    )
  }

  return (
    <Fragment>
      <Card>
        <CardHeader className='flex-md-row flex-column align-md-items-center align-items-start border-bottom'>
          <CardTitle tag='h4'>Job Applications Tracker</CardTitle>
          <div className='d-flex mt-md-0 mt-1'>
            
          <Button.Ripple
									className='mr-1'
									color='primary'
									type='submit'
									onClick={handleLoad}
								>
									{isLoading ? <><Spinner color='white' size='sm' /><span className='ml-50'>Loading...</span></> : "Refresh"}
								</Button.Ripple>
            
            <Button className='ml-2' color='primary' onClick={handleModal}>
              <Plus size={15} />
              <span className='align-middle ml-50'>Add Record</span>
            </Button>
            
          </div>
        </CardHeader>
        <Row className='justify-content-end mx-0'>
          <Col className='d-flex align-items-center justify-content-end mt-1' md='6' sm='12'>
            <Label className='mr-1' for='search-input'>
              Search
            </Label>
            <Input
              className='dataTable-filter mb-50'
              type='text'
              bsSize='sm'
              id='search-input'
              value={searchValue}
              onChange={(e) => handleFilter(e)}
            />
          </Col>
        </Row>
        <DataTable
          noHeader
          pagination
          expandableRows
          columns={columns}
          paginationPerPage={7}
          className='react-dataTable'
          sortIcon={<ChevronDown size={10} />}
          paginationDefaultPage={currentPage + 1}
          expandableRowsComponent={<ExpandableTable />}
          paginationComponent={CustomPagination}
          data={searchValue.length ? filteredData : data}
          
        />
      </Card>
      <FormModal job={jobData} open={formModal} handleFormModal={handleFormModal}/>
      <AddNewModal open={modal} handleModal={handleModal} />
    </Fragment>
  )
}

export default DataTableWithButtons
