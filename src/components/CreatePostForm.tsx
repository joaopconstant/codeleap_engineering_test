import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useCreatePost } from "@/hooks/usePosts"
import { Loader2 } from "lucide-react"

interface CreatePostFormProps {
  currentUser: string
}

export function CreatePostForm({ currentUser }: CreatePostFormProps) {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")

  const createPostMutation = useCreatePost()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim() || !content.trim()) return

    createPostMutation.mutate(
      { username: currentUser, title: title.trim(), content: content.trim() },
      {
        onSuccess: () => {
          setTitle("")
          setContent("")
        },
      }
    )
  }

  return (
    <Card className="mb-6 w-full animate-in rounded-xl border-border shadow-md duration-500 fade-in slide-in-from-top-4">
      <form onSubmit={handleSubmit}>
        <CardHeader className="p-4 pb-2 sm:p-6 sm:pb-2">
          <CardTitle className="text-[22px] font-bold">
            What's on your mind?
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 p-4 pt-2 sm:p-6 sm:pt-2">
          <div className="flex flex-col gap-2">
            <label htmlFor="title" className="text-sm font-medium">
              Title
            </label>
            <Input
              id="title"
              placeholder="Hello world"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="h-8 border-input px-3 focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-0 disabled:opacity-50"
              disabled={createPostMutation.isPending}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="content" className="text-sm font-medium">
              Content
            </label>
            <textarea
              id="content"
              placeholder="Content here"
              rows={3}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full resize-none rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
              disabled={createPostMutation.isPending}
            />
          </div>
          <div className="flex justify-end pt-2">
            <Button
              type="submit"
              disabled={
                !title.trim() || !content.trim() || createPostMutation.isPending
              }
              className="bg-primary px-8 font-bold text-white hover:bg-primary/90 disabled:bg-muted disabled:text-muted-foreground disabled:opacity-50"
            >
              {createPostMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                "Create"
              )}
            </Button>
          </div>
        </CardContent>
      </form>
    </Card>
  )
}
