import React, { useState } from 'react'
import {
  Box,
  Typography,
  Button,
  useTheme,
  Tooltip,
  IconButton,
} from '@mui/material'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

import styles from './supermarkets.module.css'
import Header from '../../components/header'

import { tokens } from '../../theme'

import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import { useEffect } from 'react'

const Supermarkets = () => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const [superMarkets, setSuperMarkets] = useState([])
  const navigate = useNavigate()

  // GET with Axios
  const accessToken = localStorage.getItem('accessToken')
  useEffect(() => {
    const config = {
      method: 'GET',
      url: `http://209.23.9.3:3300/api/supermarkets/all`,
      headers: {
        'content-type': 'application/json',
        token: `Bearer ${accessToken}`,
      },
      data: {},
    }
    axios(config)
      .then((response) => {
        setSuperMarkets(response.data.supermarkets)
        console.log(superMarkets)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  const handleProceed = (rowId) => {
    navigate(`/supermarkets/viewsupermarket/${rowId}`)
  }

  const columns = [
    {
      field: 'supermarketImage',
      headerName: 'Picture',
      width: 150,
      renderCell: (params) => {
        return (
          <Box className={styles.cellWithImg}>
            <img
              className={styles.cellImg}
              src={`http://209.23.9.3:3300/uploads/${params.row.supermarketImage}`}
              alt="supermarkets"
            />
          </Box>
        )
      },
    },
    { field: 'supermarketCode', headerName: 'Code ', width: 200 },
    {
      field: 'supermarketName',
      headerName: 'Name',
      cellClassName: 'name-column--cell',
      width: 200,
    },
    {
      field: 'supermarketCategory',
      headerName: 'Category',
      align: 'left',
      width: 200,
    },
    {
      field: 'supermarketLocation',
      headerName: 'Location',
      width: 200,
    },
    {
      field: 'supermarketStatus',
      headerName: 'Status',
      width: 200,
      renderCell: ({ row: { supermarketStatus } }) => {
        return (
          <Box>
            {supermarketStatus === 'active' && (
              <Typography color={colors.greenAccent[400]} sx={{ ml: '5px' }}>
                {supermarketStatus}
              </Typography>
            )}
            {supermarketStatus === 'inactive' && (
              <Typography color={colors.redAccent[400]} sx={{ ml: '5px' }}>
                {supermarketStatus}
              </Typography>
            )}
          </Box>
        )
      },
    },

    {
      field: 'actions',
      headerName: 'Actions',
      type: 'actions',
      cellClassName: 'actions',
      flex: 1,
      renderCell: (params) => {
        return (
          <Box p="5px" display="flex" justifyContent="center" gap="10px">
            <Tooltip title="View supermarket" arrow>
              <IconButton onClick={() => handleProceed(params.row._id)}>
                <VisibilityOutlinedIcon fontSize="large" />
              </IconButton>
            </Tooltip>

            <Tooltip title="Remove supermarket" arrow>
              <IconButton color="error">
                <DeleteOutlineOutlinedIcon
                  fontSize="large"
                  sx={{ color: colors.redAccent[500] }}
                />
              </IconButton>
            </Tooltip>
          </Box>
        )
      },
    },
  ]

  return (
    <Box m="0 32px">
      <Header
        title="Current Supermarkets"
        subtitle="All available supermarkets"
      />
      <Box display="flex" justifyContent="end">
        <Link to="/supermarkets/addsupermarket">
          <Button
            type="submit"
            size="large"
            color="secondary"
            variant="contained"
          >
            Add Supermarket
          </Button>
        </Link>
      </Box>
      <Box
        height="75vh"
        mt="10px"
        sx={{
          '& .MuiDataGrid-toolbarContainer': {
            backgroundColor: colors.blueAccent[700],
            borderTopLeftRadius: '5px',
            borderTopRightRadius: '5px',
          },
          '& .MuiButtonBase-root': {
            color: colors.grey[200],
          },
          '& .MuiDataGrid-root': {
            border: 'none',
          },
          '& .MuiDataGrid-cell': {
            borderBottom: 'none',
          },
          '& .name-column--cell': {
            color: colors.greenAccent[300],
          },
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: colors.blueAccent[700],
            borderBottom: 'none',
            borderRadius: 0,
          },
          '& .MuiDataGrid-virtualScroller': {
            backgroundColor: colors.primary[400],
          },
          '& .MuiDataGrid-footerContainer': {
            borderTop: 'none',
            backgroundColor: colors.blueAccent[700],
          },
          '& .MuiCheckbox-root': {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid
          slots={{ toolbar: GridToolbar }}
          checkboxSelection
          rows={superMarkets}
          columns={columns}
          rowHeight={150}
          getRowId={(superMarkets) => superMarkets._id}
        />
      </Box>
    </Box>
  )
}

export default Supermarkets
