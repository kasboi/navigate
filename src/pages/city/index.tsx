import { useEffect } from "react"

const Vibes = () => {
    const fetcher = async () => {
        const res = await fetch("https://api.teleport.org/api/urban_areas/")
        const data = await res.json()
        // console.log(data)
        const urbanAreas = data["_links"]["ua:item"]
        // console.log(urbanAreas)
        urbanAreas.forEach((urbanArea: any) => {
            const input = urbanArea.href.split(":").pop()
            // const output = input[input.length - 2]
            console.log(input)
        })

        // .then((response) => response.json())
        // .then((data) => {
        //     const urbanAreas = data._links["ua:items"]
        //     urbanAreas.forEach((urbanArea: any) => {
        //         console.log(urbanArea.href.split("/").pop())
        //     })
        // })
        // .catch((error) => console.error(error))
    }

    useEffect(() => {
        fetcher()
    }, [])
    return <>Test API</>
}

export default Vibes
