import { api } from "@/lib/axios";
import type { AcademyResponse } from "@/types/academy";

export const academyApi = {
  getAcademyInfo: async ({
    slug,
    subdomain,
  }: {
    slug?: string;
    subdomain?: string;
  }): Promise<AcademyResponse> => {
    const params = slug
      ? `?slug=${slug}`
      : subdomain
      ? `?subdomain=${subdomain}`
      : "";
    const response = await api.get(`/academy/info${params}`);
    return response.data;
  },
};
