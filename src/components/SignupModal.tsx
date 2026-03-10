import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

interface SignupModalProps {
  onLogin: (username: string) => void
}

export function SignupModal({ onLogin }: SignupModalProps) {
  const [username, setUsername] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (username.trim()) {
      onLogin(username.trim())
    }
  }

  return (
    <div className="flex min-h-svh items-center justify-center p-4">
      <Card className="w-full max-w-125 rounded-xl border-none shadow-md">
        <form onSubmit={handleSubmit}>
          <CardHeader className="pb-4">
            <CardTitle className="text-[22px] font-bold">
              Welcome to CodeLeap network!
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="username" className="text-sm font-medium">
                Please enter your username
              </label>
              <Input
                id="username"
                autoComplete="off"
                placeholder="John doe"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="border-brand h-10 px-3 focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-0"
              />
            </div>
            <div className="flex justify-end pt-2">
              <Button
                type="submit"
                disabled={!username.trim()}
                className="bg-primary px-6 font-bold text-white hover:bg-primary/90 disabled:bg-[#cccccc] disabled:opacity-50"
              >
                ENTER
              </Button>
            </div>
          </CardContent>
        </form>
      </Card>
    </div>
  )
}
