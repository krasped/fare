import { Box, Grid } from "@mui/material";
// CUSTOM PAGE SECTION COMPONENTS
import Order from "../FromLastMonth";
import FromLastMonth from "../FromLastMonth";
import ResentActivity from "../ResentActivity";
import { H6, Paragraph } from "@/components/typography";
import SystemAlerts from "../SystemAlerts";
import PendingApprovals from "../PendingApprovals";

const DashboardPageView = () => {
  return (
    <Box pt={2} pb={4}>
      <H6 fontSize={18}>Dashboard</H6>
      <Paragraph color="text.secondary" mb={3}>
        Welcome back to your dashboard
      </Paragraph>
      <Grid container spacing={3}>
        <Grid item lg={3} sm={6} xs={12}>
          <FromLastMonth name={"Total Users"} percentage={+12.5} number={2.543} description={"from last month"} />
        </Grid>

        <Grid item lg={3} sm={6} xs={12}>
          <FromLastMonth name={"Active Users"} percentage={+8.2} number={1.832} description={"from last month"} />
        </Grid>

        <Grid item lg={3} sm={6} xs={12}>
          <FromLastMonth name={"Revenue"} percentage={+15.3} isCurrency number={45.234} description={"from last month"} />
        </Grid>

        <Grid item lg={3} sm={6} xs={12}>
          <FromLastMonth name={"Pending Approvals"} percentage={5} isPercentage={false} number={23} description={"require immediate action"} />
        </Grid>

        <Grid item md={8} xs={12}>
          {/* <Sales />*/}
          <ResentActivity /> 
        </Grid>

        <Grid container item md={4} xs={12} spacing={3}>
          <Grid item xs={12}>
            <SystemAlerts />
          </Grid>
          <Grid item xs={12}>
            <PendingApprovals />
          </Grid>
        </Grid>

        
      </Grid>
    </Box>
  );
};

export default DashboardPageView;
