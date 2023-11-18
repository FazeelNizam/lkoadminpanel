import React, { useContext } from "react";
import styles from "./topBar.module.css";

import { Box, IconButton, Tooltip, useTheme } from "@mui/material";
import { ColorModeContext, tokens } from "../../../theme";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import PowerSettingsNewOutlinedIcon from "@mui/icons-material/PowerSettingsNewOutlined";
import { useNavigate } from "react-router-dom";

const TopBar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.removeItem("accessToken");
    navigate("/");
    window.location.reload(false);
  };

  return (
    <Box className={styles.container}>
      <Box className={styles.iconConatiner}>
        <Tooltip title="Change theme" arrow>
          <IconButton onClick={colorMode.toggleColorMode}>
            {theme.palette.mode === "dark" ? (
              <DarkModeOutlinedIcon />
            ) : (
              <LightModeOutlinedIcon />
            )}
          </IconButton>
        </Tooltip>
        <Tooltip title="Notifications" arrow>
          <IconButton>
            <NotificationsOutlinedIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Logout" arrow>
          <IconButton onClick={handleLogOut}>
            <PowerSettingsNewOutlinedIcon />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
};

export default TopBar;
