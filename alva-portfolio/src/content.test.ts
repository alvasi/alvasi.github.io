import { describe, expect, it } from "vitest"
import { skills, voice } from "./content"

describe("content", () => {
  it("returns the night string when dark", () => {
    expect(voice(true, "day", "night")).toBe("night")
    expect(voice(false, "day", "night")).toBe("day")
  })

  it("lists C++ before Java among languages", () => {
    const langs = skills.filter((skill) => skill.cat === "lang").map((skill) => skill.name)
    expect(langs.indexOf("C++")).toBeGreaterThan(-1)
    expect(langs.indexOf("C++")).toBeLessThan(langs.indexOf("Java"))
  })
})
