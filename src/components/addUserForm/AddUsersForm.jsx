import React, { useEffect, useState } from 'react'
import { Box, Button, TextField, useTheme } from '@mui/material'
import { tokens } from '../../theme'
import { Formik } from 'formik'
import * as yup from 'yup'
import useMediaQuery from '@mui/material/useMediaQuery'
import PhotoCameraFrontOutlinedIcon from '@mui/icons-material/PhotoCameraFrontOutlined'
import styles from './addUsersForm.module.css'

const checkoutSchema = yup.object().shape({
  firstName: yup.string().required('Required'),
  lastName: yup.string().required('Required'),
  emailAddress: yup.string().email('Invalid email').required('Required'),
  userType: yup.string().required('Required'),
  status: yup.string().required('Required'),
})
const initialValues = {
  firstName: '',
  lastName: '',
  emailAddress: '',
  userType: '',
  status: '',
}

const AddUsersForm = () => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const isNonMobile = useMediaQuery('(min-width:600px)')
  const [image, setImage] = useState([])
  const [imageURL, setImageURL] = useState([])

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
  }

  return (
    <Box m="0 32px">
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
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
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    width="150px"
                    height="150px"
                    borderRadius="50%"
                    bgcolor={colors.primary[400]}
                    sx={{ cursor: 'pointer' }}
                  >
                    <PhotoCameraFrontOutlinedIcon />
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
                label="First Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.firstName}
                name="firstName"
                error={!!touched.firstName && !!errors.firstName}
                helperText={touched.firstName && errors.firstName}
                sx={{ gridColumn: 'span 2' }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Last Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.lastName}
                name="lastName"
                error={!!touched.lastName && !!errors.lastName}
                helperText={touched.lastName && errors.lastName}
                sx={{ gridColumn: 'span 2' }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.emailAddress}
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
                value={values.userType}
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
                value={values.status}
                name="address"
                error={!!touched.status && !!errors.status}
                helperText={touched.status && errors.status}
                sx={{ gridColumn: 'span 4' }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Create New User
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  )
}

export default AddUsersForm
