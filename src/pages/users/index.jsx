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
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

import styles from './addUsers.module.css'
import Header from '../../components/header'
import { tokens } from '../../theme'

import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined'
import AddModeratorOutlinedIcon from '@mui/icons-material/AddModeratorOutlined'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'

const Users = () => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const [users, setUsers] = useState([])
  const navigate = useNavigate()

  // GET with Axios
  const accessToken = localStorage.getItem('accessToken')
  useEffect(() => {
    const config = {
      method: 'GET',
      url: `http://209.23.9.3:3300/api/users/all`,
      headers: {
        'content-type': 'application/json',
        token: `Bearer ${accessToken}`,
      },
      data: {},
    }
    axios(config)
      .then((response) => {
        setUsers(response.data.users)
        console.log(users)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  const handleProceed = (rowId) => {
    navigate(`/users/viewuser/${rowId}`)
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
              src={
                'https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500'
              }
              alt="offerImage"
            />
          </Box>
        )
      },
    },
    { field: 'userCode', headerName: 'User Code ', width: 100 },
    {
      field: 'fullName',
      headerName: 'Full Name',
      width: 200,
    },
    {
      field: 'emailAddress',
      headerName: 'Email',
      width: 300,
    },
    {
      field: 'userType',
      headerName: 'User Type',
      width: 200,
    },

    {
      field: 'status',
      headerName: 'Status',
      width: 100,
      renderCell: ({ row: { status } }) => {
        return (
          <Box>
            {status === 'active' && (
              <Typography color={colors.greenAccent[400]} sx={{ ml: '5px' }}>
                {status}
              </Typography>
            )}
            {status === 'inactive' && (
              <Typography color={colors.redAccent[400]} sx={{ ml: '5px' }}>
                {status}
              </Typography>
            )}
          </Box>
        )
      },
    },

    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      renderCell: (params) => {
        return (
          <>
            <Box p="5px" display="flex" justifyContent="center" gap="10px">
              <Tooltip title="View user" arrow>
                <IconButton onClick={() => handleProceed(params.row._id)}>
                  <VisibilityOutlinedIcon fontSize="large" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Remove user" arrow>
                <IconButton color="error">
                  <DeleteOutlineOutlinedIcon
                    fontSize="large"
                    sx={{ color: colors.redAccent[500] }}
                  />
                </IconButton>
              </Tooltip>
            </Box>
          </>
        )
      },
    },
  ]

  return (
    <div>
      <Box m="0 32px">
        <Header title="Current Users" subtitle="All available users" />
        <Box display="flex" justifyContent="end">
          <Link to="/users/addusers">
            <Button
              type="submit"
              size="large"
              color="secondary"
              variant="contained"
            >
              Add User
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
            rows={users}
            columns={columns}
            rowHeight={65}
            getRowId={(users) => users._id}
          />
        </Box>
      </Box>
    </div>
  )
}

export default Users
