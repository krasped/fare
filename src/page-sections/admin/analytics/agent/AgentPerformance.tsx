import { Card, useTheme } from "@mui/material";
import merge from "lodash.merge";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
// CUSTOM COMPONENTS
import { FlexBetween } from "@/components/flexbox";
import { Paragraph } from "@/components/typography";
import { MoreButton } from "@/components/more-button";
// CUSTOM UTILS METHOD
import { baseChartOptions } from "@/utils/baseChartOptions";

const data = [
  { name: "John", orders: 145, revenue: 28500 },
  { name: "Sarah", orders: 132, revenue: 25800 },
  { name: "Mike", orders: 164, revenue: 32000 },
  { name: "Lisa", orders: 129, revenue: 24700 },
];

const AgentPerformance = () => {


  const theme = useTheme();

  // REACT CHART CATEGORIES LABEL
  const chartCategories = ["SAT", "SUN", "MON", "TUE", "WED", "THU", "FRI"];

  // REACT CHART DATA SERIES
  const chartSeries = [
    { name: "Agent Performance", data: data.map(item => item.orders) },
  ];

  // REACT CHART OPTIONS
  const chartOptions = merge(baseChartOptions(theme), {
    stroke: { width: 0 },
    grid: {
      show: true,
      strokeDashArray: 3,
      borderColor: theme.palette.divider,
    },
    colors: [theme.palette.primary.main, theme.palette.divider],
    xaxis: {
      categories: data.map(item => item.name),
      labels: { show: true, style: { colors: theme.palette.text.secondary } },
    },

    yaxis: {
      min: 0,
      show: true,
      max: 500,
      tickAmount: 5,
      labels: {
        // formatter: (value) => value / 1000 + "K",
        style: { colors: theme.palette.text.secondary },
      },
    },

    plotOptions: {
      bar: {
        borderRadius: 9,
        distributed: true,
        columnWidth: "17%",
        borderRadiusApplication: "end",
      },
    },

    tooltip: {
      y: {
        formatter: function (val: number, { dataPointIndex, w }) {
          // return `${w.globals.labels[dataPointIndex]} : ${val}`;
          return `revenue: ${data[dataPointIndex].revenue}/ orders: ${data[dataPointIndex].orders}`;
        },
      },
    },
  } as ApexOptions);

  return (
    <Card sx={{ pt: 3, px: 2, pb: 1 }}>
      <FlexBetween px={2}>
        <Paragraph fontSize={18} fontWeight={500}>
          Sales
        </Paragraph>

        {/* <MoreButton size="small" /> */}
      </FlexBetween>

      <Chart
        type="bar"
        height={300}
        series={chartSeries}
        options={chartOptions}
      />
    </Card>
  );
};

export default AgentPerformance;
