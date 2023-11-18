import React from 'react'
import styles from './reports.module.css'
import { Box, Button, IconButton, Typography, useTheme } from '@mui/material'
import { tokens } from '../../theme'
import Header from '../../components/header'
import LineChart from '../../components/lineChart'
import Login from '../login/Login'

const Reports = () => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)

  return (
    <div>
      <Header title="REPORTS" subtitle="Generate Reports" />
    </div>
  )
}

export default Reports
