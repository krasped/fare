import { Theme } from "@mui/material";
import { ApexOptions } from "apexcharts";
import { format } from "./currency";

// chart options
export const baseChartOptions = (theme: Theme): ApexOptions => ({
  chart: {
    stacked: true,
    toolbar: { show: false },
    background: "rgba(255, 255, 255, 0)",
    fontFamily: theme.typography.fontFamily,
    // dropShadow: { enabled: false },
  },

  states: {
    active: { filter: { type: "none" } },
    hover: { filter: { type: "none" } },
  },

  grid: { show: false },
  legend: { show: false },
  dataLabels: { enabled: false },
  theme: { mode: theme.palette.mode },
  stroke: { width: 3, curve: "smooth" },

  yaxis: { show: false },

  xaxis: {
    labels: { show: false },
    axisTicks: { show: false },
    axisBorder: { show: false },
    crosshairs: {
      show: false,
      opacity: 1,
      fill: { color: theme.palette.primary.main },
      stroke: { color: theme.palette.primary.main },
    },
  },

  tooltip: {
    shared: false,
    x: { show: false },
    marker: { show: false },
    style: { fontSize: "14px", fontFamily: theme.typography.fontFamily },
    y: {
      title: { formatter: () => "" },
      formatter: function (val: number, { dataPointIndex, w }) {
        return `${w.globals.categoryLabels[dataPointIndex]} : ${format(val)}`;
      },
    },
  },

  markers: {
    strokeWidth: 5,
    strokeOpacity: 0.2,
    strokeColors: theme.palette.primary.main,
  },
});
