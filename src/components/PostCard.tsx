import { formatDistanceToNow } from "date-fns"
import { Trash2, Edit } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export interface Post {
  id: number
  username: string
  created_datetime: string
  title: string
  content: string
}

interface PostCardProps {
  post: Post
  currentUser: string | null
}

export function PostCard({ post, currentUser }: PostCardProps) {
  const isOwner = currentUser === post.username

  // date-fns formatDistanceToNow returns strings like 'about 1 month'
  // we append ' ago' to better match the Figma ('25 minutes ago')
  const timeAgo = `${formatDistanceToNow(new Date(post.created_datetime))} ago`

  return (
    <Card className="w-full overflow-hidden rounded-xl border-none shadow-md">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 bg-primary px-6 py-4 text-white">
        <CardTitle className="text-xl font-bold">{post.title}</CardTitle>
        {isOwner && (
          <div className="flex items-center gap-4">
            <button
              title="Delete"
              className="transition-opacity hover:opacity-80"
              onClick={() => {
                /* TODO Stage 4: Delete logic */
              }}
            >
              <Trash2 className="h-5 w-5" />
            </button>
            <button
              title="Edit"
              className="transition-opacity hover:opacity-80"
              onClick={() => {
                /* TODO Stage 4: Edit logic */
              }}
            >
              <Edit className="h-5 w-5" />
            </button>
          </div>
        )}
      </CardHeader>
      <CardContent className="flex flex-col gap-4 p-6">
        <div className="flex items-center justify-between text-sm font-medium text-muted-foreground">
          <span className="text-muted-foreground">@{post.username}</span>
          <span>{timeAgo}</span>
        </div>
        <p className="leading-relaxed whitespace-pre-wrap text-foreground">
          {post.content}
        </p>
      </CardContent>
    </Card>
  )
}
