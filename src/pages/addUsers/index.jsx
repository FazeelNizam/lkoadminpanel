import React from 'react'
import { Box, Button, TextField, useTheme } from '@mui/material'
import { tokens } from '../../theme'
import styles from './addUsers.module.css'
import Header from '../../components/header'
import AddUsersForm from '../../components/addUserForm/AddUsersForm'

const AddUsers = () => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)

  return (
    <Box m="0 32px">
      <Header title="ADD USERS" subtitle="Create new user profile" />
      <AddUsersForm />
    </Box>
  )
}

export default AddUsers
