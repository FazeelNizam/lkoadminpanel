import React, { useEffect, useState } from 'react'
import { Box, Button, TextField, useTheme } from '@mui/material'
import Header from '../../components/header'
import { tokens } from '../../theme'
import { Formik } from 'formik'
import * as yup from 'yup'
import useMediaQuery from '@mui/material/useMediaQuery'
import PhotoCameraFrontOutlinedIcon from '@mui/icons-material/PhotoCameraFrontOutlined'
import styles from './viewOffer.module.css'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const checkoutSchema = yup.object().shape({
  tittle: yup.string().required('Required'),
  offerDescription: yup.string().required('Required'),
  offerSupermarket: yup.string().required('Required'),
  offerLocation: yup.string().required('Required'),
  category: yup.string().required('Required'),
  offerType: yup.string().required('Required'),
  endDate: yup.date().required('Required'),
  status: yup.string().required('Required'),
})

const ViewOffer = () => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const isNonMobile = useMediaQuery('(min-width:600px)')
  const [image, setImage] = useState([])
  const [imageURL, setImageURL] = useState([])
  const [offer, setOffer] = useState([])
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

  // GET with Axios
  const accessToken = localStorage.getItem('accessToken')
  useEffect(() => {
    const config = {
      method: 'GET',
      url: `http://209.23.9.3:3300/api/offers/one/${id}`,
      headers: {
        'content-type': 'application/json',
        token: `Bearer ${accessToken}`,
      },
      data: {},
    }
    axios(config)
      .then((response) => {
        setOffer(response.data.offer)
        console.log(response)
        // setImageURL(`http://209.23.9.3:3300/uploads/${response.data.user}`)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  const initialValues = {
    tittle: offer.offerTitle,
    offerDescription: offer.offerDescription,
    offerSupermarket: offer.offerSupermarket,
    offerLocation: offer.offerLocation,
    category: offer.offerCategory,
    offerType: offer.offerType,
    endDate: offer.offerEndDate,
    status: offer.offerStatus,
    offerCode: offer.offerCode,
    dateCreated: offer.dateCreated,
    lastUpdate: offer.dateUpdated,
  }

  return (
    <Box m="0 32px">
      <Header title={offer.offerTitle} subtitle={offer.offerCategory} />
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
                    <img
                      src={`http://209.23.9.3:3300/uploads/${offer.offerImage}`}
                      alt="offerImage"
                    />
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
                label="Offer Code"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.offerCode || ''}
                name="offerCode"
                disabled={true}
                error={!!touched.offerCode && !!errors.offerCode}
                helperText={touched.offerCode && errors.offerCode}
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
                label="Offer Tittle"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.tittle || ''}
                name="tittle"
                error={!!touched.tittle && !!errors.tittle}
                helperText={touched.tittle && errors.tittle}
                sx={{ gridColumn: 'span 4' }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Description"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.offerDescription || ''}
                name="offerDescription"
                error={!!touched.offerDescription && !!errors.offerDescription}
                helperText={touched.offerDescription && errors.offerDescription}
                sx={{ gridColumn: 'span 4' }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Offer Supermarket"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.offerSupermarket || ''}
                name="offerSupermarket"
                error={!!touched.offerSupermarket && !!errors.offerSupermarket}
                helperText={touched.offerSupermarket && errors.offerSupermarket}
                sx={{ gridColumn: 'span 4' }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Offer Location"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.offerLocation || ''}
                name="offerLocation"
                error={!!touched.offerLocation && !!errors.offerLocation}
                helperText={touched.offerLocation && errors.offerLocation}
                sx={{ gridColumn: 'span 4' }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Category"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.category || ''}
                name="category"
                error={!!touched.category && !!errors.category}
                helperText={touched.category && errors.category}
                sx={{ gridColumn: 'span 4' }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Offer Type"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.offerType || ''}
                name="offerType"
                error={!!touched.offerType && !!errors.offerType}
                helperText={touched.offerType && errors.offerType}
                sx={{ gridColumn: 'span 4' }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="End Date"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.endDate || ''}
                name="endDate"
                error={!!touched.endDate && !!errors.endDate}
                helperText={touched.endDate && errors.endDate}
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
                name="status"
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

export default ViewOffer
