import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query"
import { api } from "@/api/axios"

interface Post {
  id: number
  username: string
  created_datetime: string
  title: string
  content: string
}

interface PostsResponse {
  count: number
  next: string | null
  previous: string | null
  results: Post[]
}

export function useInfinitePosts() {
  return useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: async ({ pageParam }) => {
      // If we have a pageParam (next URL), fetch it directly
      // Otherwise fetch the base endpoint
      const url = pageParam || ""
      const response = await api.get<PostsResponse>(url)
      return response.data
    },
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) => lastPage.next,
  })
}

export function useCreatePost() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (newPost: {
      username: string
      title: string
      content: string
    }) => {
      const response = await api.post("", newPost)
      return response.data
    },
    onSuccess: () => {
      // Invalidate so that the feed refetches and shows the new post
      queryClient.invalidateQueries({ queryKey: ["posts"] })
    },
  })
}

export function useDeletePost() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: number) => {
      const response = await api.delete(`/${id}/`)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] })
    },
  })
}

export function useUpdatePost() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: number
      data: { title: string; content: string }
    }) => {
      const response = await api.patch(`/${id}/`, data)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] })
    },
  })
}
