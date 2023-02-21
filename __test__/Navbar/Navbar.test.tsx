import { screen, render, waitFor, act } from "@testing-library/react"
import "@testing-library/jest-dom"
import Navbar from "@/components/Navbar/Navbar"
import { useState } from "react"

const isLoading = true
const setFilter = jest.fn()
const data = [
    {
        name: "Abidjan",
        length: 7,
        href: "/cities/abidjan",
    },
    {
        name: "Abuja",
        length: 5,
        href: "/cities/abuja",
    },
    {
        name: "Accra",
        length: 5,
        href: "/cities/accra",
    },
]
const showAfrica = false
const setshowAfrica = jest.fn()
describe("Test Navbar search component", () => {
    beforeEach(() => {
        render(
            <Navbar
                isLoading={isLoading}
                setFilter={setFilter}
                data={data}
                showAfrica={showAfrica}
                setshowAfrica={setshowAfrica}
            />
        )
    })

    it("should render search component", () => {
        const searchInput = screen.getByPlaceholderText(/Search for area/i)
        expect(searchInput).toBeInTheDocument()
    })

    it("should have input field disabled when isLoading == false", () => {
        const inputField = screen.getByPlaceholderText(/Search for area/!)
        expect(inputField).toBeDisabled()
    })
})

describe("seperate test for the search input field", () => {
    function TestComponent() {
        const [isLoading, setIsLoading] = useState(true)

        return (
            <>
                <Navbar
                    isLoading={isLoading}
                    setFilter={setFilter}
                    data={data}
                    showAfrica={showAfrica}
                    setshowAfrica={setshowAfrica}
                />
                <button onClick={() => act(() => setIsLoading(false))}>
                    Set Loading to False
                </button>
            </>
        )
    }

    test("conditionally enables/disables input field based on isLoading value", async () => {
        render(<TestComponent />)

        const inputField = screen.getByPlaceholderText(/Search for area/)

        await waitFor(() => {
            expect(inputField).toBeDisabled()
        })

        const button = screen.getByText("Set Loading to False")
        button.click()

        await waitFor(() => {
            expect(inputField).not.toBeDisabled()
        })
    })
})
