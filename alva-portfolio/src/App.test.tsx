import { cleanup, render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { afterEach, describe, expect, it } from "vitest"
import App, { THEME_KEY, storedNight } from "./App"

afterEach(() => {
  cleanup()
  document.body.style.overflow = ""
  document.documentElement.removeAttribute("data-dark")
  document.documentElement.style.backgroundColor = ""
  document.documentElement.style.colorScheme = ""
  localStorage.clear()
})

describe("App", () => {
  it("exposes a skip link to main", () => {
    render(<App />)
    const skip = screen.getByRole("link", { name: "Skip to content" })
    expect(skip).toHaveAttribute("href", "#main")
    expect(document.getElementById("main")).toBeTruthy()
  })

  it("keeps focus on the burger, locks scroll, and inerts the page when the menu opens", async () => {
    const user = userEvent.setup()
    render(<App />)
    const burger = screen.getByRole("button", { name: "Open menu" })
    await user.click(burger)

    expect(burger).toHaveAccessibleName("Close menu")
    expect(burger).toHaveFocus()
    expect(document.body.style.overflow).toBe("hidden")
    expect(document.getElementById("main")).toHaveAttribute("inert")
    expect(screen.getByRole("button", { name: "Dismiss menu" })).toBeInTheDocument()
  })

  it("closes the menu from the backdrop and from Escape", async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.click(screen.getByRole("button", { name: "Open menu" }))

    await user.click(screen.getByRole("button", { name: "Dismiss menu" }))
    expect(screen.getByRole("button", { name: "Open menu" })).toBeInTheDocument()
    expect(document.getElementById("main")).not.toHaveAttribute("inert")

    await user.click(screen.getByRole("button", { name: "Open menu" }))
    await user.keyboard("{Escape}")
    expect(screen.getByRole("button", { name: "Open menu" })).toBeInTheDocument()
    expect(document.body.style.overflow).toBe("")
  })

  it("treats missing storage as light, not night", () => {
    localStorage.removeItem(THEME_KEY)
    expect(storedNight()).toBe(false)
    localStorage.setItem(THEME_KEY, "light")
    expect(storedNight()).toBe(false)
    localStorage.setItem(THEME_KEY, "night")
    expect(storedNight()).toBe(true)
  })

  it("defaults to light when no theme is stored", async () => {
    localStorage.removeItem(THEME_KEY)
    render(<App />)

    expect(screen.getByRole("button", { name: "Switch to dark mode" })).toBeInTheDocument()
    expect(document.querySelector(".site-root")).not.toHaveAttribute("data-dark")
    await waitFor(() => {
      expect(document.documentElement).not.toHaveAttribute("data-dark")
      expect(localStorage.getItem(THEME_KEY)).toBe("light")
    })
  })

  it("restores night only when that choice is stored", async () => {
    localStorage.setItem(THEME_KEY, "night")
    render(<App />)

    expect(screen.getByRole("button", { name: "Switch to light mode" })).toBeInTheDocument()
    expect(document.querySelector(".site-root")).toHaveAttribute("data-dark", "true")
    await waitFor(() => {
      expect(document.documentElement).toHaveAttribute("data-dark", "true")
    })
  })
})
