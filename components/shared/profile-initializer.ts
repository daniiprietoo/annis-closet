"use client";

import { useEffect } from "react";
import { useConvexAuth, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

export function ProfileInitializer() {
  const { isAuthenticated } = useConvexAuth();
  const ensureProfile = useMutation(api.profiles.ensureProfile);

  useEffect(() => {
    if (isAuthenticated) {
      ensureProfile({});
    }
  }, [isAuthenticated, ensureProfile]);

  return null;
}
