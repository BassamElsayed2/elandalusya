"use client";

import { useState, useEffect } from "react";
import { Realtor } from "@/lib/apiRealtor";

export interface MainRealtor extends Realtor {
  id: string;
  main: boolean;
  created_at: string;
}

interface UseMainRealtorReturn {
  mainRealtor: MainRealtor | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

export const useMainRealtor = (): UseMainRealtorReturn => {
  const [mainRealtor, setMainRealtor] = useState<MainRealtor | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMainRealtor = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch("/api/realtor");
      const data = await response.json();

      if (data.success) {
        setMainRealtor(data.data);
      } else {
        setMainRealtor(null);
        setError(data.message || "No main realtor found");
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to fetch main realtor"
      );
      setMainRealtor(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMainRealtor();
  }, []);

  return {
    mainRealtor,
    isLoading,
    error,
    refetch: fetchMainRealtor,
  };
};
