import { DateTime } from "luxon";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useUrls } from "../../context/UrlContext";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const PowerChart = () => {
  const { isLoggedIn, accessToken } = useContext(AuthContext);

  const { baseUrl, usageElectricityEndpoint } = useUrls();

  const { data, isPending, isError } = useQuery({
    queryKey: ["electricity", accessToken],
    queryFn: async () => {
      const response = await fetch(`${baseUrl}/${usageElectricityEndpoint}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`, // Dodaj token JWT do nagłówka
        },
      });
      return await response.json();
    },
    enabled: !!accessToken,
  });

  if (!accessToken) {
    return <p>Musisz się zalogować, aby zobaczyć dane.</p>;
  }

  if (isError) {
    return <p>Błąd pobierania</p>;
  }

  if (isPending) {
    return <p>Ładowanie danych - prąd...</p>;
  }

  const power = data.electricity_usage;

  const dailyUsage = power?.slice(0, -1).map((item, index) => {
    const startD = DateTime.fromISO(item.date);
    const endD = DateTime.fromISO(power[index + 1].date);
    const diffInDays = endD.diff(startD, "days").days;

    const startUsageL1 = item.L1_usage;
    const endUsageL1 = power[index + 1].L1_usage;

    const startUsageL2 = item.L2_usage;
    const endUsageL2 = power[index + 1].L2_usage;

    const diffInL1 = endUsageL1 - startUsageL1;
    const diffInL2 = endUsageL2 - startUsageL2;

    return {
      dzień: power[index + 1].date,
      L1: +(diffInL1 / diffInDays).toFixed(2),
      L2: +(diffInL2 / diffInDays).toFixed(2),
      unit: "kWh",
    };
  });

  function CustomTooltip({ active, payload, label }) {
    if (active) {
      return (
        <div className="tooltipPower">
          <p>{payload[0]?.payload.dzień}</p>
          <p>
            L1: {payload[0]?.value} {payload[0]?.payload.unit}
          </p>
          <p>
            L2: {payload[1]?.value} {payload[1]?.payload.unit}
          </p>
        </div>
      );
    }
    return null;
  }

  const dataLen = power?.length;

  const todayDate = DateTime.now();
  // const yesterdayDate = DateTime.now().minus({ days: 1 });
  const tomorrowDate = DateTime.now().plus({ days: 1 });

  const startDate =
    isLoggedIn && dataLen !== 0 ? DateTime.fromISO(power[0]?.date) : todayDate;

  const endDate =
    isLoggedIn && dataLen !== 0
      ? DateTime.fromISO(power[dataLen - 1]?.date)
      : tomorrowDate;

  const diffInDays = endDate.diff(startDate, "days").days;
  const daysFromDbBeginning = Math.floor(diffInDays);

  const beginningPowerUsage1 = power[0]?.L1_usage;
  const beginningPowerUsage2 = power[0]?.L2_usage;

  const currentPowerUsageL1 = dataLen !== 0 ? power[dataLen - 1]?.L1_usage : 0;
  const currentPowerUsageL2 = dataLen !== 0 ? power[dataLen - 1]?.L2_usage : 0;

  const averagePowerusageL1 =
    dataLen > 2
      ? (currentPowerUsageL1 - beginningPowerUsage1) / daysFromDbBeginning
      : 0;
  const averagePowerusageL2 =
    dataLen > 2
      ? (currentPowerUsageL2 - beginningPowerUsage2) / daysFromDbBeginning
      : 0;

  const totalAveragePowerUsage = (
    averagePowerusageL1 + averagePowerusageL2
  ).toFixed(2);

  return (
    <>
      <h2>Prąd - zużycie dzienne</h2>
      <div className="chart">
        <ResponsiveContainer>
          <AreaChart
            data={dailyUsage}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="L1Fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#32CD32" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#32CD32" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="L2Fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#40E0D0" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#40E0D0" stopOpacity={0.2} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="dzień"
              tick={{ fontSize: 11, fontWeight: "bold", fill: "#f0e68c" }}
            />
            <YAxis
              tickFormatter={(number) => `${number} kWh`}
              tick={{ fontSize: 11, fontWeight: "bold", fill: "#f0e68c" }}
            />
            <CartesianGrid opacity={0.1} vertical={false} />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="L1"
              stroke="#228B22"
              fill="url(#L1Fill)"
              fillOpacity={1}
            />
            <Area
              type="monotone"
              dataKey="L2"
              stroke="#20B2AA"
              fillOpacity={1}
              fill="url(#L2Fill)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <p>
        Średnie dzienne zużycie: <span>{totalAveragePowerUsage} kWh</span>
      </p>
    </>
  );
};

export default PowerChart;
