import { queryKeys } from "@/lib/query-keys";
import type { AcademyResponse } from "@/types/academy";
import { useQuery } from "@tanstack/react-query";
import { academyApi } from "../services/academy";

export const useAcademy = (data: { slug?: string; subdomain?: string }) => {
  return useQuery<AcademyResponse>({
    queryKey: queryKeys.academy.details(),
    queryFn: () => academyApi.getAcademyInfo(data),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};
