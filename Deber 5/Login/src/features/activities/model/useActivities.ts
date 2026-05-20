import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/shared/api/supabase";
import { useSession } from "@/features/session/model/useSession";

export interface Activity {
  id:       string;
  user_id:  string;
  type:     "deber" | "taller" | "prueba" | "reunion";
  subject:  string;
  deadline: string;
}

export const ACTIVITIES_KEY = ["activities"] as const;

export const useActivities = () => {
  const queryClient = useQueryClient();
  const { user } = useSession();

  const getActivities = useQuery({
    queryKey: ACTIVITIES_KEY,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("activities")
        .select("*")
        .order("deadline", { ascending: true });
      if (error) throw error;
      return data as Activity[];
    },
    enabled: !!user,
  });

  const createActivity = useMutation({
    mutationFn: async (newActivity: Omit<Activity, "id" | "user_id">) => {
      const { data, error } = await supabase
        .from("activities")
        .insert([{ ...newActivity, user_id: user?.id }])
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ACTIVITIES_KEY }),
  });

  const updateActivity = useMutation({
    mutationFn: async (
      { id, ...fields }: { id: string } & Partial<Pick<Activity, "type" | "subject" | "deadline">>
    ) => {
      const { data, error } = await supabase
        .from("activities")
        .update(fields)
        .eq("id", id)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ACTIVITIES_KEY }),
  });

  const deleteActivity = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("activities").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ACTIVITIES_KEY }),
  });

  return {
    activities: getActivities.data ?? [],
    isLoading: getActivities.isLoading,
    createActivity,
    updateActivity,
    deleteActivity,
  };
};
