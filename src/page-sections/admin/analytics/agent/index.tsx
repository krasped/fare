import { Box, Button, Grid } from "@mui/material";
// CUSTOM PAGE SECTION COMPONENTS
import { H6, Paragraph } from "@/components/typography";
import FromLastMonth from "../FromLastMonth";
import { FlexBox } from "@/components/flexbox";
import { DownloadOutlined } from "@mui/icons-material";
import { useSnackbar } from "@/contexts/snackbarContext";
import ConversionRates from "./ConversionRates";
import AgentPerformance from "./AgentPerformance";
import AgentPerformanceDetails from "./AgentPerformanceDetails";

const AgentAnalytics = () => {
    const showSnackbar = useSnackbar();
  
  return (
    <Box pt={2} pb={4}>
      <Grid container spacing={3}>
        <Grid item lg={3} sm={6} xs={12}>
          <FromLastMonth name={"Active Agents"} percentage={+4} number={47} />
        </Grid>

        <Grid item lg={3} sm={6} xs={12}>
          <FromLastMonth name={"Average Revenue per Agent"} percentage={+12} number={2.732}/>
        </Grid>

        <Grid item lg={3} sm={6} xs={12}>
          <FromLastMonth name={"Average Conversion Rate"} percentage={-2.4} string={"24.5%"}/>
        </Grid>

        <Grid item lg={3} sm={6} xs={12}>
          <FromLastMonth name={"Total Agent Revenue"} percentage={+8.2} isCurrency number={23} />
        </Grid>

        <Grid item md={6} xs={12}>
          <AgentPerformance /> 
        </Grid>

        <Grid item md={6} xs={12}>
          <ConversionRates /> 
        </Grid>

        <Grid item md={12} xs={12} spacing={3}>
          <AgentPerformanceDetails/>
        </Grid>

        
      </Grid>
      <FlexBox paddingTop={3} width={"100%"} justifyContent={"flex-end"}>
        <Button
          variant="contained"
          startIcon={<DownloadOutlined />}
          onClick={() => {showSnackbar('Report Generated', 'Your report has been generated and is ready for download.');}}
        >
          Export Data
        </Button>
      </FlexBox>
    </Box>
  );
};

export default AgentAnalytics;
