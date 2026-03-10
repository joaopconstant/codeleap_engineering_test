import { formatDistanceToNow } from "date-fns"
import { Trash2, Edit } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useState } from "react"
import { DeleteModal } from "./DeleteModal"
import { EditModal } from "./EditModal"
import { cn } from "@/lib/utils"

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
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const isOwner = currentUser === post.username

  // date-fns formatDistanceToNow returns strings like 'about 1 month'
  // we append ' ago' to better match the Figma ('25 minutes ago')
  const timeAgo = `${formatDistanceToNow(new Date(post.created_datetime))} ago`

  return (
    <Card
      className={cn(
        "w-full overflow-hidden rounded-xl border-none shadow-md transition-all duration-300",
        isDeleting
          ? "-mt-6 mb-0 h-0 scale-95 border-0 opacity-0"
          : "animate-in duration-500 fill-mode-both fade-in slide-in-from-bottom-4"
      )}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 bg-primary px-4 py-4 text-white sm:px-6 sm:py-6">
        <CardTitle className="truncate pr-3 text-xl font-bold">
          {post.title}
        </CardTitle>
        {isOwner && (
          <div className="flex shrink-0 items-center gap-4">
            <button
              title="Delete"
              className="cursor-pointer transition-opacity hover:opacity-80 disabled:opacity-50"
              onClick={() => setIsDeleteModalOpen(true)}
            >
              <Trash2 className="h-5 w-5" />
            </button>
            <button
              title="Edit"
              className="cursor-pointer transition-opacity hover:opacity-80 disabled:opacity-50"
              onClick={() => setIsEditModalOpen(true)}
            >
              <Edit className="h-5 w-5" />
            </button>
          </div>
        )}
      </CardHeader>
      <CardContent className="flex flex-col gap-4 p-4 sm:p-6 sm:pb-6">
        <div className="flex items-center justify-between text-sm font-medium text-muted-foreground">
          <span>@{post.username}</span>
          <span>{timeAgo}</span>
        </div>
        <p className="leading-relaxed whitespace-pre-wrap text-foreground">
          {post.content}
        </p>
      </CardContent>

      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        postId={post.id}
        onDeleteStart={() => setIsDeleting(true)}
        onDeleteError={() => setIsDeleting(false)}
      />

      <EditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        post={{ id: post.id, title: post.title, content: post.content }}
      />
    </Card>
  )
}
