import { useEffect } from "react";
import { useConvexAuth, useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export function useCurrentProfile() {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const ensure = useMutation(api.profiles.ensure);
  const me = useQuery(api.profiles.me);

  useEffect(() => {
    if (isAuthenticated && me === null) {
      ensure({}).catch(() => {});
    }
  }, [isAuthenticated, me, ensure]);

  return { profile: me, isAuthenticated, isLoading };
}
