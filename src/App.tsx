import { useState } from "react"
import { SignupModal } from "@/components/SignupModal"
import { Feed } from "@/components/Feed"

export function App() {
  const [username, setUsername] = useState<string | null>(() => {
    return localStorage.getItem("username")
  })

  const handleLogin = (name: string) => {
    localStorage.setItem("username", name)
    setUsername(name)
  }

  const handleLogout = () => {
    localStorage.removeItem("username")
    setUsername(null)
  }

  return username ? (
    <Feed onLogout={handleLogout} />
  ) : (
    <SignupModal onLogin={handleLogin} />
  )
}

export default App
