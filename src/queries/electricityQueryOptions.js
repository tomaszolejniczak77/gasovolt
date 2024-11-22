const URL = "http://192.168.1.225:5000/usage/electricity";

export const electricityQueryOptions = {
  queryFn: async () => {
    const response = await fetch(URL);
    return await response.json();
  },
  queryKey: ["electricity"],
};
