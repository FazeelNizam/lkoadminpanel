import React from "react";
import { Box, Button, TextField, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import styles from "./addSupermarket.module.css";
import Header from "../../components/header";
import AddSupermarketForm from "../../components/addSupermarketForm/AddSupermarketForm";

const AddSupermarket = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box m="0 32px">
      <Header title="Add Supermarket" subtitle="Create new supermarket" />
      <AddSupermarketForm />
    </Box>
  );
};

export default AddSupermarket;
