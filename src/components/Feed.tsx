import { useInfinitePosts } from "@/hooks/usePosts"
import { PostCard, type Post } from "@/components/PostCard"
import { CreatePostForm } from "@/components/CreatePostForm"
import { Button } from "@/components/ui/button"
import { Loader2, AlertCircle } from "lucide-react"

interface FeedProps {
  onLogout: () => void
}

export function Feed({ onLogout }: FeedProps) {
  const currentUser = localStorage.getItem("username") || ""

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    error,
  } = useInfinitePosts()

  return (
    <div className="flex min-h-svh flex-col">
      <header className="mx-auto flex w-full max-w-[800px] items-center justify-between bg-primary p-4 sm:p-6 text-white shadow-sm">
        <h1 className="text-xl sm:text-2xl font-bold">CodeLeap Network</h1>
        <button
          onClick={onLogout}
          className="text-sm font-medium hover:underline"
        >
          Logout
        </button>
      </header>
      <main className="mx-auto min-h-[calc(100svh-[64px])] sm:min-h-[calc(100svh-80px)] w-full max-w-[800px] flex-1 bg-white p-4 sm:p-6">
        <CreatePostForm currentUser={currentUser} />

        {status === "pending" ? (
          <div className="flex justify-center mt-12 mb-12">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : status === "error" ? (
          <div className="mt-8 rounded-md bg-destructive/10 p-4 border border-destructive/20 text-destructive flex items-start gap-3">
            <AlertCircle className="h-5 w-5 mt-0.5 shrink-0" />
            <div className="flex flex-col">
              <span className="font-semibold">Failed to load posts</span>
              <span className="text-sm">{error instanceof Error ? error.message : "An unexpected error occurred."}</span>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-6 pb-8">
            {data.pages.map((page, i) => (
              <div key={i} className="flex flex-col gap-6">
                {page.results.map((post: Post) => (
                  <PostCard
                    key={post.id}
                    post={post}
                    currentUser={currentUser}
                  />
                ))}
              </div>
            ))}

            {/* Simple infinite scroll placeholder logic for now */}
            {hasNextPage && (
              <div className="mt-4 flex justify-center pt-4">
                <Button
                  variant="outline"
                  onClick={() => fetchNextPage()}
                  disabled={isFetchingNextPage}
                  className="min-w-[140px]"
                >
                  {isFetchingNextPage ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Loading...
                    </>
                  ) : (
                    "Load More"
                  )}
                </Button>
              </div>
            )}

            {!hasNextPage && data.pages[0].count > 0 && (
              <p className="mt-4 pt-4 text-center text-sm text-muted-foreground">
                No more posts to load
              </p>
            )}

            {data.pages[0].count === 0 && (
              <p className="mt-8 text-center text-muted-foreground">
                No posts yet. Be the first to post!
              </p>
            )}
          </div>
        )}
      </main>
    </div>
  )
}
