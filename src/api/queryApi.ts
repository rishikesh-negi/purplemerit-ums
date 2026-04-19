import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useRefreshSession } from "../hooks/useRefreshSession";

export function useQueryWithReauth(
  query: (...args: unknown[]) => Promise<{ data: unknown; statusCode: number }>,
  queryKey: string,
) {
  const queryClient = useQueryClient();
  const { refreshSession, isRefreshingSession } = useRefreshSession();

  const { data, isLoading, error } = useQuery({
    queryKey: [queryKey],
    queryFn: query,
  });

  if (data?.statusCode === 401) {
    refreshSession(undefined, {
      onSettled() {
        queryClient.invalidateQueries({ queryKey: [queryKey] });
      },
    });
  } else return { data, isLoading, isRefreshingSession, error };
}
