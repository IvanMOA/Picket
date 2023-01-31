import { test } from "vitest";
import { render, screen } from "@testing-library/vue";
import SomeBasicTable from "./SomeBasicTable.vue";
import { expect } from "vitest"

test("Renders a spinner", () => {
  render(<SomeBasicTable />)
  expect(screen.getByText("Hello world")).not.toBeNull()
  expect(screen.getByText("Hello button")).toBeDisabled()
})
