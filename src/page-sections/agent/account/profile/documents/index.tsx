import { Grid, Stack, Box } from "@mui/material";
// CUSTOM COMPONENTS
// import Summery from "./Summery";

const Overview = () => {
  return (
    <Box mt={3}>
      <Grid container spacing={3}>
        <Grid item lg={12} md={12} xs={12}>
          <Stack spacing={3}>
          <Card sx={{ padding: 3 }}>
            <FlexBetween>
              <H6 fontSize={16}>Summary</H6>
              {/* <MoreButton size="small" /> */}
            </FlexBetween>

            <Paragraph color="text.secondary" mt={2} fontWeight={400}>
              Experienced travel agency with over 10 years in luxury travel planning. Specializing in European destinations and customized tour packages.
              {/* The new iPad combines the power and capability of a computer with the
              ease of use and versatility you’d never expect from one. <br /> <br />{" "}
              And now it’s even more versatile, with a larger 10.2‑inch Retina
              display, support he new iPad combines the power and capability of a
              computer with the ease of use and versatility you’d never expect */}
            </Paragraph>
          </Card>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Overview;
