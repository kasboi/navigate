import { render, screen, RenderResult, waitFor } from "@testing-library/react"
import Home from "@/pages"
import "@testing-library/jest-dom"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

describe("Heading", () => {
    let component: RenderResult

    beforeEach(() => {
        const queryClient = new QueryClient()

        component = render(
            <QueryClientProvider client={queryClient}>
                <Home />
            </QueryClientProvider>
        )
    })

    afterEach(() => {
        component.unmount()
    })

    it("display primary heading", () => {
        const heading = screen.getByRole("heading", { name: "Urban Areas" })
        expect(heading).toBeInTheDocument()
    })

    it("paragraph text", () => {
        // const queryClient = new QueryClient()

        // render(
        //   <QueryClientProvider client={queryClient}>
        //     <Home />
        //   </QueryClientProvider>
        // )
        const paragraph = screen.getByText("Powered by Teleport Open API")
        expect(paragraph).toBeInTheDocument()
    })

    it("displays skeleton conditionally", async () => {

      const skeletonContainer = screen.findByTestId("skeleton-card")

      await waitFor(() => {
          expect(skeletonContainer).toBeInTheDocument()
      })

      const cardContainer = screen.findByTestId("card-container")
      await waitFor(() => {
          expect(cardContainer).toBeInTheDocument()
      })
  })
})
