import React, { useEffect, useState } from 'react'
import { Box, Button, TextField, useTheme } from '@mui/material'
import { tokens } from '../../theme'
import { Field, Formik } from 'formik'
import * as yup from 'yup'
import useMediaQuery from '@mui/material/useMediaQuery'
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined'
import styles from './addOfferForm.module.css'

const checkoutSchema = yup.object().shape({
  offerTitle: yup.string().required('Required'),
  offerSupermarket: yup.string().required('Required'),
  offerCategory: yup.string().required('Required'),
  offerType: yup.string().required('Required'),
  offerLocation: yup.string().required('Required'),
  offerStatus: yup.string().required('Required'),
})
const initialValues = {
  offerTitle: '',
  offerSupermarket: '',
  offerCategory: '',
  offerType: '',
  offerLocation: '',
  offerStatus: '',
}

const AddOfferForm = () => {
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
            <Box display="flex" width="100%" flexDirection="row" gap="32px">
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
                      width="250px"
                      height="150px"
                      borderRadius="10px"
                      bgcolor={colors.primary[400]}
                      sx={{ cursor: 'pointer' }}
                    >
                      <CameraAltOutlinedIcon />
                    </Box>
                  ) : (
                    <Box
                      className={styles.imageContainer}
                      width="250px"
                      height="150px"
                      borderRadius="10px"
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
                width="100%"
                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                sx={{
                  '& > div': { gridColumn: isNonMobile ? undefined : 'span 4' },
                }}
              >
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Offer Tittle"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.offerTitle}
                  name="offerTitle"
                  error={!!touched.offerTitle && !!errors.offerTitle}
                  helperText={touched.offerTitle && errors.offerTitle}
                  sx={{ gridColumn: 'span 4' }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Offer Supermarket"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.offerSupermarket}
                  name="offerSupermarket"
                  error={
                    !!touched.offerSupermarket && !!errors.offerSupermarket
                  }
                  helperText={
                    touched.offerSupermarket && errors.offerSupermarket
                  }
                  sx={{ gridColumn: 'span 4' }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Offer Category"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.offerCategory}
                  name="offerCategory"
                  error={!!touched.offerCategory && !!errors.offerCategory}
                  helperText={touched.offerCategory && errors.offerCategory}
                  sx={{ gridColumn: 'span 4' }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Offer Type"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.offerType}
                  name="offerType"
                  error={!!touched.offerType && !!errors.offerType}
                  helperText={touched.offerType && errors.offerType}
                  sx={{ gridColumn: 'span 4' }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Offer Location"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.offerLocation}
                  name="offerLocation"
                  error={!!touched.offerLocation && !!errors.offerLocation}
                  helperText={touched.offerLocation && errors.offerLocation}
                  sx={{ gridColumn: 'span 4' }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Offer Status"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.offerStatus}
                  name="offerStatus"
                  error={!!touched.offerStatus && !!errors.offerStatus}
                  helperText={touched.offerStatus && errors.offerStatus}
                  sx={{ gridColumn: 'span 4' }}
                />
              </Box>
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Create New Offer
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  )
}

export default AddOfferForm
