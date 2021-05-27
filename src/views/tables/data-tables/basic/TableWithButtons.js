
import { Fragment, useState, useEffect, forwardRef } from 'react'
import Avatar from '@components/avatar'
import AddNewModal from './AddNewModal'
import { ThemeColors } from '../../../../utility/context/ThemeColors'
import ReactPaginate from 'react-paginate'
import DataTable from 'react-data-table-component'
import { ChevronDown, Share, Printer, FileText, File, Grid, Copy, Plus, MoreVertical, Archive, Trash, Edit } from 'react-feather'
import {
  Card,
  CardHeader,
  CardTitle,
  Button,
  UncontrolledButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Input,
  Label,
  Row,
  Col,
  UncontrolledDropdown,
  Badge
} from 'reactstrap'

// ** Bootstrap Checkbox Component
const BootstrapCheckbox = forwardRef(({ onClick, ...rest }, ref) => (
  <div className='custom-control custom-checkbox'>
    <input type='checkbox' className='custom-control-input' ref={ref} {...rest} />
    <label className='custom-control-label' onClick={onClick} />
  </div>
))

const DataTableWithButtons = () => {
  // ** States
  const [modal, setModal] = useState(false)
  const [currentPage, setCurrentPage] = useState(0)
  const [searchValue, setSearchValue] = useState('')
  const [filteredData, setFilteredData] = useState([])
  const [data, setData] = useState([])

  useEffect(() => {
    loadData();
  }, [])

// ** Get initial Data
  const loadData = async () => {
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
        setData(associateData)
      })
  }
  

  
const states = ['success', 'danger', 'warning', 'info', 'dark', 'primary', 'secondary']

    const status = { ///this could be connectionDegree
      1: { title: 'Current', color: 'light-primary' },
      2: { title: 'Professional', color: 'light-success' },
      3: { title: 'Rejected', color: 'light-danger' },
      4: { title: 'Resigned', color: 'light-warning' },
      5: { title: 'Applied', color: 'light-info' }
    }

const columns = [
  {
    name: 'Title',
    selector: 'jobTitle',
    sortable: true,
    minWidth: '300px',
    cell: row => (
      <div className='d-flex align-items-center'>
        {/* {row.avatar === '' ? (
          <Avatar color={`light-${states[row.status]}`} content={row.full_name} initials />
        ) : (
          <Avatar img={require(`@src/assets/images/portrait/small/avatar-s-${row.avatar}`).default} />
        )} */}
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
    selector: 'start_date',
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
    name: 'Age',
    selector: 'age',
    sortable: true,
    minWidth: '100px'
  },
  {
    name: 'Status',
    selector: 'status',
    sortable: true,
    minWidth: '150px',
    cell: row => {
      return (
        <Badge color={status[Math.floor(Math.random() * 5) + 1].color} pill>
          {status[Math.floor(Math.random() * 5) + 1].title}
        </Badge>
      )
    }
  },
  {
    name: 'Actions',
    allowOverflow: true,
    cell: row => {
      return (
        <div className='d-flex'>
          <UncontrolledDropdown>
            <DropdownToggle className='pr-1' tag='span'>
              <MoreVertical size={15} />
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem tag='a' href='/' className='w-100' onClick={e => e.preventDefault()}>
                <FileText size={15} />
                <span className='align-middle ml-50'>Details</span>
              </DropdownItem>
              <DropdownItem tag='a' href='/' className='w-100' onClick={e => e.preventDefault()}>
                <Archive size={15} />
                <span className='align-middle ml-50'>Archive</span>
              </DropdownItem>
              <DropdownItem tag='a' href='/' className='w-100' onClick={e => e.preventDefault()}>
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

  // ** Function to handle filter
  const handleFilter = e => {
    const value = e.target.value
    let updatedData = []
    setSearchValue(value)

    
    if (value.length) {
      debugger 
      updatedData = data.filter(item => {
        const startsWith =
          item.jobTitle.toLowerCase().startsWith(value.toLowerCase()) ||
          item.companyName.toLowerCase().startsWith(value.toLowerCase())
          // item.description.toLowerCase().startsWith(value.toLowerCase())
          // item.age.toLowerCase().startsWith(value.toLowerCase()) ||
          // item.salary.toLowerCase().startsWith(value.toLowerCase()) ||
          // item.start_date.toLowerCase().startsWith(value.toLowerCase()) ||
          // status[item.status].title.toLowerCase().startsWith(value.toLowerCase())

        const includes =
          item.jobTitle.toLowerCase().includes(value.toLowerCase()) ||
          item.companyName.toLowerCase().includes(value.toLowerCase())
          // item.description.toLowerCase().includes(value.toLowerCase())
          // item.age.toLowerCase().includes(value.toLowerCase()) ||
          // item.salary.toLowerCase().includes(value.toLowerCase()) ||
          // item.start_date.toLowerCase().includes(value.toLowerCase()) ||
          // status[item.status].title.toLowerCase().includes(value.toLowerCase())

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

  return (
    <Fragment>
      <Card>
        <CardHeader className='flex-md-row flex-column align-md-items-center align-items-start border-bottom'>
          <CardTitle tag='h4'>Job Applications Tracker</CardTitle>
          <div className='d-flex mt-md-0 mt-1'>
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
              onChange={handleFilter}
            />
          </Col>
        </Row>
        <DataTable
          noHeader
          pagination
          selectableRows
          columns={columns}
          paginationPerPage={7}
          className='react-dataTable'
          sortIcon={<ChevronDown size={10} />}
          paginationDefaultPage={currentPage + 1}
          paginationComponent={CustomPagination}
          data={searchValue.length ? filteredData : data}
          selectableRowsComponent={BootstrapCheckbox}
        />
      </Card>
      <AddNewModal open={modal} handleModal={handleModal}/>
    </Fragment>
  )
}

export default DataTableWithButtons
