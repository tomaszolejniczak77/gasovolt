import React from "react";
import { DateTime } from "luxon";
import { useQuery } from "@tanstack/react-query";
import { gasQueryOptions } from "../../queries/gasQueryOpitions";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const GasChart = () => {
  const { data, isPending } = useQuery(gasQueryOptions);

  if (isPending) {
    return <p>Ładowanie danych - gaz...</p>;
  }

  const dailyUsage = data.slice(0, -1).map((entry, index) => {
    const difference = data[index + 1].usage - entry.usage;
    return {
      dzień: entry.date,
      zużycie: parseFloat(difference.toFixed(1)),
      unit: "m³",
    };
  });

  function CustomTooltip({ active, payload, label }) {
    if (active) {
      return (
        <div className="tooltip">
          <p>{payload[0]?.payload.dzień}</p>
          {payload[0]?.value} {payload[0]?.payload.unit}
        </div>
      );
    }
    return null;
  }

  const dataLen = data.length;

  const startDate = DateTime.fromISO("2024-10-03");
  const endDate = DateTime.fromISO(data[dataLen - 1].date);
  const diffInDays = endDate.diff(startDate, "days").days;

  const daysFromDbBeginning = Math.floor(diffInDays);
  const currentGasUsage = data[dataLen - 1].usage;
  const averageGasUsage = (currentGasUsage / daysFromDbBeginning).toFixed(2);

  return (
    <>
      <h2>Gaz - zużycie dzienne</h2>
      <div className="chart">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={dailyUsage}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="blueFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2196f3" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#2196f3" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="dzień"
              tick={{ fontSize: 11, fontWeight: "bold", fill: "#f0e68c" }}
            />
            <YAxis
              tickFormatter={(number) => `${number} m³`}
              tick={{ fontSize: 11, fontWeight: "bold", fill: "#f0e68c" }}
            />
            <CartesianGrid opacity={0.1} vertical={false} />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="zużycie"
              stroke="#2196f3"
              fill="url(#blueFill)"
              fillOpacity={1}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <p>
        Średnie dzienne zużycie: <span>{averageGasUsage} m³</span>
      </p>
    </>
  );
};

export default GasChart;
