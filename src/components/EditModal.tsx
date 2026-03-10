import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useUpdatePost } from "@/hooks/usePosts"
import { Loader2 } from "lucide-react"

interface EditModalProps {
  isOpen: boolean
  onClose: () => void
  post: {
    id: number
    title: string
    content: string
  }
}

export function EditModal({ isOpen, onClose, post }: EditModalProps) {
  const [title, setTitle] = useState(post.title)
  const [content, setContent] = useState(post.content)

  const handleOpenChange = (open: boolean) => {
    if (open) {
      setTitle(post.title)
      setContent(post.content)
    }
    if (!open) onClose()
  }

  const updateMutation = useUpdatePost()

  const handleSave = () => {
    if (!title.trim() || !content.trim()) return

    updateMutation.mutate(
      { id: post.id, data: { title: title.trim(), content: content.trim() } },
      {
        onSuccess: () => {
          onClose()
        },
      }
    )
  }

  const isSaveDisabled =
    !title.trim() || !content.trim() || updateMutation.isPending

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle className="pb-2 text-[22px] font-bold">
            Edit item
          </DialogTitle>
        </DialogHeader>
        <div className="mt-2 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="edit-title" className="text-sm font-medium">
              Title
            </label>
            <Input
              id="edit-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="h-10 border-input px-3 hover:border-input focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-0 disabled:opacity-50"
              disabled={updateMutation.isPending}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="edit-content" className="text-sm font-medium">
              Content
            </label>
            <Textarea
              id="edit-content"
              rows={4}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              disabled={updateMutation.isPending}
            />
          </div>
        </div>
        {updateMutation.isError && (
          <p className="text-sm text-destructive">
            Failed to save changes. Please try again.
          </p>
        )}
        <div className="mt-4 flex justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={updateMutation.isPending}
            className="cursor-pointer px-6 font-bold"
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleSave}
            disabled={isSaveDisabled}
            className="bg-success px-8 font-bold text-white hover:bg-success/85 disabled:bg-muted disabled:text-muted-foreground disabled:opacity-50"
          >
            {updateMutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              "Save"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
