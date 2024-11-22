// const URL = "http://192.168.1.225:8000/usage/electricity";

const URL_SERVER =
  "https://gasovoltserver-production.up.railway.app/usage/electricity";

export const electricityQueryOptions = {
  queryFn: async () => {
    const response = await fetch(URL_SERVER);
    return await response.json();
  },
  queryKey: ["electricity"],
};
