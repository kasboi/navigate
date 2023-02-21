import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Header from "@/components/Header/Header";

describe("Header component", () => {
  test('primary heading', () => {
    render(<Header />)

    const primaryHeading = screen.getByRole('heading', {name: /urban areas/i})
    expect(primaryHeading).toBeInTheDocument()
  })
  
  it('heading paragraph', function(){
    render(<Header />)

    const paragraphHeading = screen.getByText(/Powered by Teleport Open API/i)

    expect(paragraphHeading).toBeInTheDocument()
  })
})