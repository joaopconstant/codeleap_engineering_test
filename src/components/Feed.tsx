import { useInfinitePosts } from "@/hooks/usePosts"
import { PostCard, type Post } from "@/components/PostCard"
import { CreatePostForm } from "@/components/CreatePostForm"
import { Button } from "@/components/ui/button"

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
      <header className="mx-auto flex w-full max-w-200 items-center justify-between bg-primary p-6 text-white shadow-sm">
        <h1 className="text-2xl font-bold">CodeLeap Network</h1>
        <button
          onClick={onLogout}
          className="text-sm font-medium hover:underline"
        >
          Logout
        </button>
      </header>
      <main className="mx-auto min-h-[calc(100svh-80px)] w-full max-w-200 flex-1 bg-white p-6">
        <CreatePostForm currentUser={currentUser} />

        {status === "pending" ? (
          <p className="mt-8 text-center text-muted-foreground">
            Loading posts...
          </p>
        ) : status === "error" ? (
          <p className="mt-8 text-center text-destructive">
            Error:{" "}
            {error instanceof Error ? error.message : "Failed to load posts"}
          </p>
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
                >
                  {isFetchingNextPage ? "Loading more..." : "Load More"}
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
