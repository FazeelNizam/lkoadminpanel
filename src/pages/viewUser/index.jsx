import React, { useEffect, useState } from 'react'
import { Box, Button, TextField, useTheme } from '@mui/material'
import Header from '../../components/header'
import { tokens } from '../../theme'
import { Formik } from 'formik'
import * as yup from 'yup'
import useMediaQuery from '@mui/material/useMediaQuery'
import PhotoCameraFrontOutlinedIcon from '@mui/icons-material/PhotoCameraFrontOutlined'
import styles from './viewUser.module.css'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import DP from './dp.png'

const checkoutSchema = yup.object().shape({
  fullName: yup.string().required('Required'),
  emailAddress: yup.string().email('Invalid email').required('Required'),
  userType: yup.string().required('Required'),
  status: yup.string().required('Required'),
})

const ViewUser = () => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const isNonMobile = useMediaQuery('(min-width:600px)')
  const [image, setImage] = useState([])
  const [imageURL, setImageURL] = useState([])
  const [user, setUser] = useState([])
  const { id } = useParams()

  useEffect(() => {
    if (image.length < 1) return
    const newImageUrl = []
    image.forEach((image) => newImageUrl.push(URL.createObjectURL(image)))
    setImageURL(newImageUrl)
  }, [image])

  function onImageChange(e) {
    setImage([...e.target.files])
  }

  const handleFormSubmit = (values) => {
    console.log(values)
    // window.location.reload(false)
  }

  console.log(id)

  // GET with Axios
  const accessToken = localStorage.getItem('accessToken')
  useEffect(() => {
    const config = {
      method: 'GET',
      url: `http://209.23.9.3:3300/api/users/one/${id}`,
      headers: {
        'content-type': 'application/json',
        token: `Bearer ${accessToken}`,
      },
      data: {},
    }
    axios(config)
      .then((response) => {
        setUser(response.data.user)
        console.log(response)
        // setImageURL(`http://209.23.9.3:3300/uploads/${response.data.user}`)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  const initialValues = {
    fullName: user.fullName,
    emailAddress: user.emailAddress,
    userType: user.userType,
    status: user.status,
    userCode: user.userCode,
    dateCreated: user.dateCreated,
    lastUpdate: user.dateUpdated,
  }

  return (
    <Box m="0 32px">
      <Header title={user.fullName} subtitle={user.userType} />
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
        enableReinitialize={true}
      >
        {({
          values,
          errors,
          touched,
          dirty,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
          handleReset,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box display="flex" mb="32px">
              <input
                accept="image/*"
                style={{ display: 'none' }}
                id="raised-button-file"
                multiple
                type="file"
                onChange={onImageChange}
              />
              <label htmlFor="raised-button-file">
                {image.length < 1 ? (
                  <Box
                    className={styles.imageContainer}
                    width="150px"
                    height="150px"
                    borderRadius="50%"
                    bgcolor={colors.primary[400]}
                    sx={{ cursor: 'pointer' }}
                  >
                    <img src={DP} alt="offerImage" />
                    {/* 'https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500' */}
                  </Box>
                ) : (
                  <Box
                    className={styles.imageContainer}
                    width="150px"
                    height="150px"
                    borderRadius="50%"
                    bgcolor={colors.primary[400]}
                    sx={{ cursor: 'pointer' }}
                  >
                    {imageURL.map((imageSrc) => (
                      <img src={imageSrc} />
                    ))}
                  </Box>
                )}
              </label>
            </Box>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                '& > div': { gridColumn: isNonMobile ? undefined : 'span 4' },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="User Code"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.userCode || ''}
                name="userCode"
                disabled={true}
                error={!!touched.userCode && !!errors.userCode}
                helperText={touched.userCode && errors.userCode}
                sx={{ gridColumn: 'span 1' }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Date Created"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.dateCreated || ''}
                name="dateCreated"
                disabled={true}
                error={!!touched.dateCreated && !!errors.dateCreated}
                helperText={touched.dateCreated && errors.dateCreated}
                sx={{ gridColumn: 'span 1' }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Last Updated On"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.lastUpdate || ''}
                name="lastUpdate"
                disabled={true}
                error={!!touched.lastUpdate && !!errors.lastUpdate}
                helperText={touched.lastUpdate && errors.lastUpdate}
                sx={{ gridColumn: 'span 1' }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Full Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.fullName || ''}
                name="fullName"
                error={!!touched.fullName && !!errors.fullName}
                helperText={touched.fullName && errors.fullName}
                sx={{ gridColumn: 'span 4' }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.emailAddress || ''}
                name="emailAddress"
                error={!!touched.emailAddress && !!errors.emailAddress}
                helperText={touched.emailAddress && errors.emailAddress}
                sx={{ gridColumn: 'span 4' }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="User Type"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.userType || ''}
                name="userType"
                error={!!touched.userType && !!errors.userType}
                helperText={touched.userType && errors.userType}
                sx={{ gridColumn: 'span 4' }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Status"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.status || ''}
                name="address"
                error={!!touched.status && !!errors.status}
                helperText={touched.status && errors.status}
                sx={{ gridColumn: 'span 4' }}
              />
            </Box>
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="end"
              gap="20px"
              mt="20px"
            >
              <Button
                type="submit"
                color="error"
                variant="contained"
                disabled={!dirty || isSubmitting}
                onClick={handleReset}
              >
                Reset
              </Button>
              <Button
                type="submit"
                color="secondary"
                variant="contained"
                disabled={!dirty || isSubmitting}
              >
                Update User Details
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  )
}

export default ViewUser
