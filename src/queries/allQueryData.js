const URL = "http://192.168.1.225:5000/usage/all";

export const allQueryOptions = {
  queryFn: async () => {
    const response = await fetch(URL);
    return await response.json();
  },
  queryKey: ["all"],
};
