import { useTheme } from "@/components/theme-provider"
import { Moon, Sun } from "lucide-react"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  function toggleTheme() {
    const nextTheme =
      theme === "dark"
        ? "light"
        : theme === "light"
          ? "dark"
          : window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "light"
            : "dark"
    setTheme(nextTheme)
  }

  return (
    <button
      onClick={toggleTheme}
      className="flex cursor-pointer items-center gap-2 text-sm font-medium hover:text-gray-200"
      title="Toggle theme"
    >
      {theme === "dark" ? (
        <Sun className="h-5 w-5" />
      ) : (
        <Moon className="h-5 w-5" />
      )}
    </button>
  )
}
