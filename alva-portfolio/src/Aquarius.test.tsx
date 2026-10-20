import { cleanup, render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { afterEach, describe, expect, it } from "vitest"
import { Aquarius } from "./Aquarius"
import { copy } from "./content"

afterEach(() => {
  cleanup()
})

describe("Aquarius", () => {
  it("keeps a star lit after click and shows a fact when all are lit", async () => {
    const user = userEvent.setup()
    render(
      <div className="reveal is-in">
        <Aquarius />
      </div>,
    )

    const stars = screen.getAllByRole("button", { name: /Star \d+ of 12/ })
    expect(stars).toHaveLength(12)
    expect(screen.queryByText(copy.aquariusFact)).not.toBeInTheDocument()

    await user.click(stars[0])
    expect(stars[0]).toHaveAttribute("aria-pressed", "true")
    await user.click(stars[0])
    expect(stars.filter((star) => star.getAttribute("aria-pressed") === "true")).toHaveLength(1)

    for (const star of stars) {
      await user.click(star)
    }

    expect(screen.getByText(copy.aquariusFact)).toBeInTheDocument()
    expect(screen.getByRole("group", { name: copy.aquariusFact })).toBeInTheDocument()
  })
})
