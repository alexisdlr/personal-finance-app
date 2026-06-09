// hooks/useFetchOverviewData.ts
import { useQuery } from "@tanstack/react-query";
import api from "@/services/api";

const fetchOverviewData = async () => {
  const response = await api.get("/overview"); // Ajusta la URL según tu configuración
  return response.data;
};

const useFetchOverviewData = () => {

  return useQuery({
    queryKey: ["overviewData"],
    queryFn: fetchOverviewData
  });
};

export default useFetchOverviewData;
