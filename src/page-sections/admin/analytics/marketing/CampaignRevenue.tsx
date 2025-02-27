import { Card, useTheme } from "@mui/material";
import merge from "lodash.merge";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
// CUSTOM COMPONENTS
import { Paragraph } from "@/components/typography";
import { Percentage } from "@/components/percentage";
import { MoreButton } from "@/components/more-button";
import { FlexBetween, FlexBox } from "@/components/flexbox";
// CUSTOM UTILS METHOD
import { baseChartOptions } from "@/utils/baseChartOptions";

const CampaignRevenue = () => {
  const theme = useTheme();

  const data = [
    { month: "Jan", revenue: 65000 },
    { month: "Feb", revenue: 72000 },
    { month: "Mar", revenue: 68000 },
    { month: "Apr", revenue: 85000 },
    { month: "May", revenue: 92000 },
    { month: "Jun", revenue: 98000 },
  ];

  // REACT CHART DATA SERIES
  const chartSeries = [
    {
      name: "Revenue",
      data: data.map(item => item.revenue),
    },
  ];

  // REACT CHART CATEGORIES LABEL
  const chartCategories = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // REACT CHART OPTIONS
  const chartOptions = merge(baseChartOptions(theme), {
    grid: {
      show: true,
      strokeDashArray: 3,
      borderColor: theme.palette.divider,
    },
    colors: [
      theme.palette.primary.main,
      theme.palette.primary[300],
      theme.palette.primary[100],
    ],
    xaxis: {
      categories: data.map(item => item.month),
      crosshairs: { show: true },
      labels: { show: true, style: { colors: theme.palette.text.secondary } },
    },
    yaxis: {
      min: 0,
      show: true,
      // max: 50000,
      tickAmount: 5,
      labels: {
        formatter: (value) => "$" + (value / 1000).toFixed(2) + "K",
        style: { colors: theme.palette.text.secondary },
      },
    },
  } as ApexOptions);

  return (
    <Card sx={{ pt: 3, px: 2, pb: 1 }}>
      <FlexBetween px={2}>
        <Paragraph fontSize={18} fontWeight={500}>
          Campaign Revenue
        </Paragraph>

        {/* <MoreButton size="small" /> */}
      </FlexBetween>
      <Chart
        type="area"
        height={270}
        series={chartSeries}
        options={chartOptions}
      />
    </Card>
  );
};

export default CampaignRevenue;
