import { useState } from "react";
import Nav from "../components/navbar";

export default function Home() {
    const [isBlibliotecario, setIsBlibliotecario] = useState(false)

    return (
        <>
        <Nav />
        {isBlibliotecario? (
            <>
            penis
            </>
        ) : (
            <>
            xereca
            </>
        ) }
        </>

    )
}