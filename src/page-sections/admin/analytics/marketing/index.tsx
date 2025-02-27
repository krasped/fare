import { Box, Button, Grid } from "@mui/material";
// CUSTOM PAGE SECTION COMPONENTS
import { H6, Paragraph } from "@/components/typography";
import FromLastMonth from "../FromLastMonth";
import { FlexBox } from "@/components/flexbox";
import { DownloadOutlined } from "@mui/icons-material";
import { useSnackbar } from "@/contexts/snackbarContext";
import CampaignDistribution from "./CampaignDistribution";
import MarketingPerformanceDetails from "./MarketingPerformanceDetails";
import CampaignRevenue from "./CampaignRevenue";

const MarketingAnalytics = () => {
    const showSnackbar = useSnackbar();
  
  return (
    <Box pt={2} pb={4}>
      <Grid container spacing={3}>
        <Grid item lg={3} sm={6} xs={12}>
          <FromLastMonth name={"Total Campaigns"} percentage={+2} number={24} />
        </Grid>

        <Grid item lg={3} sm={6} xs={12}>
          <FromLastMonth name={"Marketing ROI"} percentage={+15.4} string={"287%"}/>
        </Grid>

        <Grid item lg={3} sm={6} xs={12}>
          <FromLastMonth name={"Conversion Rate"} percentage={+3.1} string={"18.2%"}/>
        </Grid>

        <Grid item lg={3} sm={6} xs={12}>
          <FromLastMonth name={"Marketing Revenue"} percentage={+12.5} isCurrency number={89.320} />
        </Grid>

        <Grid item md={6} xs={12}>
          <CampaignRevenue/>
        </Grid>

        <Grid item md={6} xs={12}>
          <CampaignDistribution /> 
        </Grid>

        <Grid item md={12} xs={12} spacing={3}>
          <MarketingPerformanceDetails/>
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

export default MarketingAnalytics;
