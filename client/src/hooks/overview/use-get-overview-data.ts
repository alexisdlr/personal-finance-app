import { useQuery } from "@tanstack/react-query";
import api from "@/services/api";
import { OverviewResponse } from "@/types/api";

const fetchOverviewData = async (): Promise<OverviewResponse> => {
  const response = await api.get<OverviewResponse>("/overview");

  return response.data;
};

const useFetchOverviewData = () => {
  return useQuery<OverviewResponse>({
    queryKey: ["overviewData"],
    queryFn: fetchOverviewData,
  });
};

export default useFetchOverviewData;
