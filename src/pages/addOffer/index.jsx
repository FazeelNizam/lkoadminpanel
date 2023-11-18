import React from "react";
import { Box, Button, TextField, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import styles from "./addOffer.module.css";
import Header from "../../components/header";
import AddOfferForm from "../../components/addOfferForm/AddOfferForm";

const AddOffer = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box m="0 32px">
      <Header title="Add Offer" subtitle="Create new offer" />
      <AddOfferForm />
    </Box>
  );
};

export default AddOffer;
