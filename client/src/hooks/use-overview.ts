"use client";
import { useEffect } from "react";
import { useGlobalState } from "@/store/global-store";
import useFetchOverviewData from "./use-get-overview-data";

export default function useOverview() {
  const query = useFetchOverviewData();
  const setGlobalData = useGlobalState((state) => state.setGlobalData);

  useEffect(() => {
    if (query.isSuccess) {
      setGlobalData(query.data.data);
    }
  }, [query.isSuccess, query.data]);

  return query;
}
