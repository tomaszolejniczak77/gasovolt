const URL = "https://192.168.1.225:5000/usage/gas";

export const gasQueryOptions = {
  queryFn: async () => {
    const response = await fetch(URL);
    return await response.json();
  },
  queryKey: ["gas"],
};
