import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteAccount, updateProfile } from "../api/profileMutations";
import {
  uploadProfileImage,
  type ProfileImageFile,
} from "../api/uploadProfileImage";
import { getProfile } from "../api/getProfile";
import type { UpdateProfileRequest } from "../api/profileMutations";

export const profileQueryKey = ["profile"] as const;

export function useProfileQuery() {
  return useQuery({
    queryKey: profileQueryKey,
    queryFn: () => getProfile(),
  });
}

export function useUpdateProfileMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: UpdateProfileRequest) => updateProfile(request),
    onSuccess: (profile) => {
      queryClient.setQueryData(profileQueryKey, profile);
    },
  });
}

export function useUploadProfileImageMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (image: ProfileImageFile) => uploadProfileImage(image),
    onSuccess: (profile) => {
      queryClient.setQueryData(profileQueryKey, profile);
    },
  });
}

export function useDeleteAccountMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteAccount(),
    onSuccess: async () => {
      await queryClient.cancelQueries();
      queryClient.clear();
    },
  });
}
