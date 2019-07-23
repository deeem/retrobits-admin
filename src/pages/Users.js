import React, { useState, useEffect } from 'react'
import axios from '../axios-retrobits'
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableFooter,
  TablePagination,
} from '@material-ui/core'
import TablePaginationActions from '../components/Users/TablePaginationAcitons'
import {extractPageParamFromUrl} from '../components/Users/helpers'

const Users = () => {
  const [rows, setRows] = useState([])
  const [pagination, setPagination] = useState({})
  const [page, setPage] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  function combineFetchParams() {
    let params = {}

    if (page) {
      params = {
        ...params,
        page: page,
      }
    }

    return params
  }

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      setIsError(false)
      try {
        const response = await axios('users', {
          params: combineFetchParams(),
        })
        setRows(response.data.data)
        // setPage(+response.data.meta.current_page)
        setPagination({
          count: response.data.meta.total,
          page: response.data.meta.current_page,
          rowsPerPage: response.data.meta.per_page,
          last_page: response.data.meta.last_page,
          first: extractPageParamFromUrl(response.data.links.first),
          last: extractPageParamFromUrl(response.data.links.last),
          next: extractPageParamFromUrl(response.data.links.next),
          prev: extractPageParamFromUrl(response.data.links.prev),
        })
        setPage(response.data.meta.current_page)
      } catch (error) {
        setIsError(true)
      }

      setIsLoading(false)
    }
    fetchData()
  }, [page])

  const handleOnChangePage = (event, page) => {
    setPage(+page)
    setIsLoading(true)
  }

  const paginationActions = () => {
    return (
      <TablePaginationActions
        changePage={handleOnChangePage}
        page={pagination.page}
        firstPage={pagination.first}
        lastPage={pagination.last_page}
        nextPage={pagination.next}
        prevPage={pagination.prev}
      />
    )
  }

  let table = (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>id</TableCell>
          <TableCell align="right">name</TableCell>
          <TableCell align="right">email</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map(row => (
          <TableRow key={row.id}>
            <TableCell component="th" scope="row">
              {row.id}
            </TableCell>
            <TableCell align="right">{row.name}</TableCell>
            <TableCell>{row.email}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TablePagination
            count={pagination.count}
            page={pagination.page - 1}
            rowsPerPage={pagination.rowsPerPage}
            //   onChangeRowsPerPage={this.handleChangeRowsPerPage}
            onChangePage={handleOnChangePage}
            ActionsComponent={paginationActions}
          />
        </TableRow>
      </TableFooter>
    </Table>
  )

  return (
    <Paper>
      {isLoading && <div>Loading...</div>}
      {isError && <div>Something wrong...</div>}
      {!isLoading && table}
    </Paper>
  )
}

export default Users
