import React from 'react'
import { Box, Typography, useTheme } from '@mui/material'
import { tokens } from '../../theme'
import styles from './userHeader.module.css'

const UserHeader = ({ name, userMail }) => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  return (
    <Box mb="30px">
      <Typography
        variant="h2"
        className={styles.title}
        color={colors.grey[100]}
      >
        {name}
      </Typography>
      <Typography variant="h5" color={colors.greenAccent[400]}>
        {userMail}
      </Typography>
    </Box>
  )
}

export default UserHeader
