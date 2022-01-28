import React from "react";
import { useQuery } from "react-query";
import { fetchCoinHistory } from "./api";
import ApexChart from "react-apexcharts";

interface IHistorical {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

interface ChartProps {
  coinId: string;
}

const Chart = ({ coinId }: ChartProps) => {
  const { isLoading, data } = useQuery<IHistorical[]>(["ohlc", coinId], () =>
    fetchCoinHistory(coinId)
  );

  // console.log(
  //   data?.map((price) => [
  //     new Date(price.time_open).getTime(),
  //     [price.open, price.high, price.low, price.close],
  //   ])
  // );

  return (
    <div>
      {isLoading ? (
        "Loading chart..."
      ) : (
        <ApexChart
          type="candlestick"
          series={[
            {
              name: "price",
              data: data?.map((price) => [
                new Date(price.time_open).getTime(),
                [price.open, price.high, price.low, price.close],
              ]),
            },
          ]}
          options={{
            theme: {
              mode: "dark",
            },
            chart: {
              background: "transparent",
              height: 300,
              width: 500,
              toolbar: {
                show: false,
              },
            },
            plotOptions: {
              candlestick: {
                colors: {
                  upward: "#ac381b",
                  downward: "#0e62bb",
                },
              },
            },
            grid: {
              show: false,
            },
            yaxis: {
              show: false,
            },
            xaxis: {
              axisBorder: {
                show: false,
              },
              axisTicks: {
                show: false,
              },
              labels: {
                show: false,
              },
              type: "datetime",
              categories: data?.map((price) => price.time_close),
            },
            stroke: { curve: "smooth", width: 4 },

            tooltip: {
              style: {
                fontSize: "12px",
              },
              y: {
                formatter: (value) => `$${value.toFixed(3)}`,
              },
            },
          }}
        />
      )}
    </div>
  );
};

export default Chart;
