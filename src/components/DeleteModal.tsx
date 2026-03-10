import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useDeletePost } from "@/hooks/usePosts"

interface DeleteModalProps {
  isOpen: boolean
  onClose: () => void
  postId: number
}

export function DeleteModal({ isOpen, onClose, postId }: DeleteModalProps) {
  const deleteMutation = useDeletePost()

  const handleDelete = () => {
    deleteMutation.mutate(postId, {
      onSuccess: () => {
        onClose()
      },
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="pb-2 text-[22px] font-bold">
            Are you sure you want to delete this item?
          </DialogTitle>
        </DialogHeader>
        <div className="mt-4 flex justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={deleteMutation.isPending}
            className="px-6 font-bold"
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={handleDelete}
            disabled={deleteMutation.isPending}
            className="px-6 font-bold"
          >
            {deleteMutation.isPending ? "Deleting..." : "Delete"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
