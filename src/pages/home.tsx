import { useState } from "react";
import Nav from "../components/navbar";

export default function Home() {
    const [isblibliotecario, setIsblibliotecario] = useState(false)
    
    return (
        <>
        <Nav />
        {isblibliotecario? (
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