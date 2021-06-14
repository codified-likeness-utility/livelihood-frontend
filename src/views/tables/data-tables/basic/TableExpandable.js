// ** React Imports
import { useState, useEffect } from 'react'
import Avatar from '@components/avatar'
import ReactPaginate from 'react-paginate'
import { ChevronDown, MoreVertical, FileText, Archive, Trash, Edit, UploadCloud  } from 'react-feather'
import DataTable from 'react-data-table-component'
import { Button, Card, CardHeader, CardTitle, Badge, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Spinner } from 'reactstrap'
import ExtractionModal from './ExtractionModal'

const ApplicationsTracker = () => {

  const [modal, setModal] = useState(false)
  const [isLoading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(0)
  const [data, setData] = useState([])

  useEffect(() => {
    loadData();
  }, [])

// ** Get initial Data
  const loadData = async () => {
    setLoading(true)
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
        console.log(associateData)
        setData(associateData)
        setLoading(false)
      })
  }

// ** Expandable Table Structure
  const ExpandableTable = ({ data }) => {
    return (
      <div className='expandable-content p-2'>
        <p>
          <span className='font-weight-bold'>Company:</span> {data.company}
        </p>
        <p>
          <span className='font-weight-bold'>Title:</span> {data.title}
        </p>
        <p>
          <span className='font-weight-bold'>Email:</span> {data.email}
        </p>
        <p>
          <span className='font-weight-bold'>Profile URL: </span><a href={data.profileUrl}> {data.profileUrl}</a>
        </p>
        <p>
          <span className='font-weight-bold'>Connection Degree:</span> {data.connectionDegree}
        </p>
        <p >
          <span className='font-weight-bold'>Last Message Sent:</span> {data.lastMessageSent}
        </p>
        <div className='d-flex'>
          <Button className='ml-2' color='primary' onClick='...'>
              <span className='align-middle ml-50'>Scrape LinkedIn Profile</span>
          </Button>
        </div>
      </div>
    )
  }

  const states = ['success', 'danger', 'warning', 'info', 'dark', 'primary', 'secondary']

// ** Status badge colors
  const status = {
    1: { title: 'Connected', color: 'light-success' },
    2: { title: 'Pending', color: 'light-warning' },
    3: { title: 'Pending', color: 'light-warning' }
  }

// ** Table Column Structure
  const columns = [
    {
      name: 'Name',
      selector: 'firstName',
      sortable: true,
      minWidth: '250px',
      maxWidth: '300px',
      cell: row => (
        <div className='d-flex align-items-center'>
          {row.profileImageUrl === null ? (
            <Avatar color='light-primary' content={row.firstName + " " + row.lastName} initials />
          ) : (
            <Avatar img={row.profileImageUrl} />
          )}
          <div className='user-info text-truncate ml-1'>
            <span className='d-block font-weight-bold text-truncate'>{row.firstName} {row.lastName}</span>
            {/* <small>{row.connectionDegree}</small> */}
          </div>
        </div>
      )
    },
    {
      name: 'Title',
      selector: 'title',
      sortable: true,
      minWidth: '150px',
      maxWidth: '600px'
    },
    {
      name: 'Status',
      selector: 'connectionDegree',
      sortable: true,
      minWidth: '150px',
      maxWidth: '250px',
      cell: row => {
        return (
          <Badge color={row.connectionDegree === '1st' ? status[1].color : status[2].color } pill>
            {row.connectionDegree === '1st' ? status[1].title : status[2].title}
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
                  <UploadCloud size={15} />
                  <span className='align-middle ml-50'>Update</span>
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

  // ** Function to handle filter
  const handlePagination = page => {
    setCurrentPage(page.selected)
  }

  // ** Custom Pagination
  const CustomPagination = () => (
    <ReactPaginate
      previousLabel={''}
      nextLabel={''}
      forcePage={currentPage}
      onPageChange={page => handlePagination(page)}
      pageCount={data.length / 10 || 1}
      breakLabel={'...'}
      pageRangeDisplayed={2}
      marginPagesDisplayed={2}
      activeClassName={'active'}
      pageClassName={'page-item'}
      nextLinkClassName={'page-link'}
      nextClassName={'page-item next'}
      previousClassName={'page-item prev'}
      previousLinkClassName={'page-link'}
      pageLinkClassName={'page-link'}
      breakClassName='page-item'
      breakLinkClassName='page-link'
      containerClassName={'pagination react-paginate separated-pagination pagination-sm justify-content-end pr-1'}
    />
  )

  const handleModal = () => setModal(!modal)

  const handleLoad = () => loadData()

  return (
    <Card>
      <CardHeader>
        <CardTitle tag='h4'>LinkedIn Connections</CardTitle>
        <div className='d-flex mt-md-0 mt-1'>
          <Button.Ripple
            className='mr-1'
            color='primary'
            type='submit'
            onClick={handleLoad}
          >
            {isLoading ? <><Spinner color='white' size='sm' /><span className='ml-50'>Loading...</span></> : "Refresh"}
          </Button.Ripple>
          <Button.Ripple
            className='ml-2'
            color='primary'
            type='submit'
            onClick={handleModal}
          >
            {isLoading ? <><Spinner color='white' size='sm' /><span className='ml-50'>Loading...</span></> : "Extract New Connections"}
          </Button.Ripple>
        </div>
      </CardHeader>
      <DataTable
        noHeader
        pagination
        data={data}
        expandableRows
        columns={columns}
        expandOnRowClicked
        className='react-dataTable'
        sortIcon={<ChevronDown size={10} />}
        paginationDefaultPage={currentPage + 1}
        expandableRowsComponent={<ExpandableTable />}
        paginationRowsPerPageOptions={[10, 25, 50, 100]}
        paginationComponent={CustomPagination}
      />
      <ExtractionModal  open={modal} handleModal={handleModal} />
    </Card>
  )
}

export default ApplicationsTracker
