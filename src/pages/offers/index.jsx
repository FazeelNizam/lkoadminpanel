import React, { useEffect, useState } from 'react'
import {
  Box,
  Typography,
  Button,
  useTheme,
  Tooltip,
  IconButton,
} from '@mui/material'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

import styles from './offers.module.css'
import Header from '../../components/header'

import { tokens } from '../../theme'
import { mockDataDevice } from '../../data/mockData'

import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'

const Offers = () => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const [offers, setOffers] = useState([])
  const navigate = useNavigate()

  // GET with Axios
  const accessToken = localStorage.getItem('accessToken')
  useEffect(() => {
    const config = {
      method: 'GET',
      url: `http://209.23.9.3:3300/api/offers/all`,
      headers: {
        'content-type': 'application/json',
        token: `Bearer ${accessToken}`,
      },
      data: {},
    }
    axios(config)
      .then((response) => {
        setOffers(response.data.offers)
        console.log(offers)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  const handleProceed = (rowId) => {
    navigate(`/offers/viewoffer/${rowId}`)
  }

  const columns = [
    {
      field: 'offerImage',
      headerName: 'Picture',
      width: 150,
      renderCell: (params) => {
        return (
          <Box className={styles.cellWithImg}>
            <img
              className={styles.cellImg}
              src={`http://209.23.9.3:3300/uploads/${params.row.offerImage}`}
              alt="offerImage"
            />
          </Box>
        )
      },
    },
    { field: 'offerCode', headerName: 'Offer Code ', width: 100 },
    {
      field: 'offerTitle',
      headerName: 'Offer Title',
      renderCell: (params) => {
        return (
          <Box className={styles.offerTitle}>
            <p>{params.row.offerTitle}</p>
          </Box>
        )
      },
      width: 300,
    },
    {
      field: 'offerSupermarket',
      headerName: 'Offer Supermarket',
      width: 200,
    },
    {
      field: 'offerCategory',
      headerName: 'Offer Category',
      width: 200,
    },

    {
      field: 'offerType',
      headerName: 'Offer Type',
      width: 100,
    },
    {
      field: 'offerLocation',
      headerName: 'Offer Location',
      width: 100,
    },

    {
      field: 'offerStatus',
      headerName: 'Status',
      width: 100,
      renderCell: ({ row: { offerStatus } }) => {
        return (
          <Box>
            {offerStatus === 'active' && (
              <Typography color={colors.greenAccent[400]} sx={{ ml: '5px' }}>
                {offerStatus}
              </Typography>
            )}
            {offerStatus === 'inactive' && (
              <Typography color={colors.redAccent[400]} sx={{ ml: '5px' }}>
                {offerStatus}
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
      <Header title="Current Offers" subtitle="All available offers" />
      <Box display="flex" justifyContent="end">
        <Link to="/offers/addoffer">
          <Button
            type="submit"
            size="large"
            color="secondary"
            variant="contained"
          >
            Add Offer
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
          rows={offers}
          columns={columns}
          rowHeight={100}
          getRowId={(offer) => offer._id}
        />
      </Box>
    </Box>
  )
}

export default Offers
