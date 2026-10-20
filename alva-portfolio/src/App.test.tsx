import { cleanup, render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { afterEach, describe, expect, it } from "vitest"
import App from "./App"

afterEach(() => {
  cleanup()
  document.body.style.overflow = ""
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
})
