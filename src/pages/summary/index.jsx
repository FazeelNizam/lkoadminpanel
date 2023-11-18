import React from "react";
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import styles from "./summary.module.css";
import Header from "../../components/header";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import CardMembershipOutlinedIcon from "@mui/icons-material/CardMembershipOutlined";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import LineChart from "../../components/lineChart";
import RadialBarChart from "../../components/radialBarChart";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

const Summary = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [offers, setOffers] = useState([]);
  const [users, setUsers] = useState([]);
  const [superMarkets, setSuperMarkets] = useState([]);

  const accessToken = localStorage.getItem("accessToken");
  useEffect(() => {
    const config = {
      method: "GET",
      url: `http://209.23.9.3:3300/api/users/all`,
      headers: {
        "content-type": "application/json",
        token: `Bearer ${accessToken}`,
      },
      data: {},
    };
    axios(config)
      .then((response) => {
        setUsers(response.data.users);
        console.log(users);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    const config = {
      method: "GET",
      url: `http://209.23.9.3:3300/api/supermarkets/all`,
      headers: {
        "content-type": "application/json",
        token: `Bearer ${accessToken}`,
      },
      data: {},
    };
    axios(config)
      .then((response) => {
        setSuperMarkets(response.data.supermarkets);
        console.log(superMarkets);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    const config = {
      method: "GET",
      url: `http://209.23.9.3:3300/api/offers/all`,
      headers: {
        "content-type": "application/json",
        token: `Bearer ${accessToken}`,
      },
      data: {},
    };
    axios(config)
      .then((response) => {
        setOffers(response.data.offers);
        console.log(offers);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Box m="0 32px">
      <Header title="Summary" subtitle="Hello," />
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="180px"
        gap="20px"
      >
        {/* ROW 1 */}

        {/* Card 1 */}
        <Box
          className={styles.statCardContainer}
          gridColumn="span 4"
          backgroundColor={colors.primary[400]}
        >
          <Box className={styles.cardBody}>
            <Box className={styles.cardTitleContainer}>
              <Box>
                <CardMembershipOutlinedIcon sx={{ fontSize: "28px" }} />
                <Typography
                  variant="h3"
                  sx={{ color: colors.grey[100] }}
                  className={styles.cardTitle}
                >
                  Supermarkets
                </Typography>
              </Box>
            </Box>
            <Box className={styles.cardStatContainer}>
              <Box className={styles.cardStat}>
                <Typography
                  variant="h4"
                  sx={{ color: colors.greenAccent[500] }}
                >
                  Active
                </Typography>
                <Typography
                  variant="h5"
                  fontStyle="italic"
                  sx={{ color: colors.greenAccent[600] }}
                >
                  16
                </Typography>
              </Box>
              <Box className={styles.cardStat}>
                <Typography variant="h4" sx={{ color: colors.redAccent[500] }}>
                  Inactive
                </Typography>
                <Typography
                  variant="h5"
                  fontStyle="italic"
                  sx={{ color: colors.redAccent[600] }}
                >
                  0
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Card 2 */}
        <Box
          className={styles.statCardContainer}
          gridColumn="span 4"
          backgroundColor={colors.primary[400]}
        >
          <Box className={styles.cardBody}>
            <Box className={styles.cardTitleContainer}>
              <Box>
                <LocalMallOutlinedIcon sx={{ fontSize: "28px" }} />
                <Typography
                  variant="h3"
                  sx={{ color: colors.grey[100] }}
                  className={styles.cardTitle}
                >
                  Offers
                </Typography>
              </Box>
            </Box>
            <Box className={styles.cardStatContainer}>
              <Box className={styles.cardStat}>
                <Typography
                  variant="h4"
                  sx={{ color: colors.greenAccent[500] }}
                >
                  Active
                </Typography>
                <Typography
                  variant="h5"
                  fontStyle="italic"
                  sx={{ color: colors.greenAccent[600] }}
                >
                  18
                </Typography>
              </Box>
              <Box className={styles.cardStat}>
                <Typography variant="h4" sx={{ color: colors.redAccent[500] }}>
                  Inactive
                </Typography>
                <Typography
                  variant="h5"
                  fontStyle="italic"
                  sx={{ color: colors.redAccent[600] }}
                >
                  0
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Card 3 */}
        <Box
          className={styles.statCardContainer}
          gridColumn="span 4"
          backgroundColor={colors.primary[400]}
        >
          <Box className={styles.cardBody}>
            <Box className={styles.cardTitleContainer}>
              <Box>
                <PeopleOutlinedIcon sx={{ fontSize: "28px" }} />
                <Typography
                  variant="h3"
                  sx={{ color: colors.grey[100] }}
                  className={styles.cardTitle}
                >
                  Customers
                </Typography>
              </Box>
            </Box>
            <Box className={styles.cardStatContainer}>
              <Box className={styles.cardStat}>
                <Typography
                  variant="h4"
                  sx={{ color: colors.greenAccent[500] }}
                >
                  Active
                </Typography>
                <Typography
                  variant="h5"
                  fontStyle="italic"
                  sx={{ color: colors.greenAccent[600] }}
                >
                  11
                </Typography>
              </Box>
              <Box className={styles.cardStat}>
                <Typography variant="h4" sx={{ color: colors.redAccent[500] }}>
                  Inactive
                </Typography>
                <Typography
                  variant="h5"
                  fontStyle="italic"
                  sx={{ color: colors.redAccent[600] }}
                >
                  0
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* ROW 2 */}
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h3"
                fontWeight="600"
                color={colors.grey[100]}
              >
                Time Chart
              </Typography>
            </Box>
          </Box>
          <Box height="300px" m="-20px 0 0 0">
            <LineChart isDashboard={true} />
          </Box>
        </Box>

        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h3"
                fontWeight="600"
                color={colors.grey[100]}
              >
                Type Chart
              </Typography>
            </Box>
          </Box>
          <Box height="300px" m="-20px 0 0 0">
            <RadialBarChart />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Summary;
