"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useState } from "react";

const MenuLateral = () => {
    const pathname = usePathname();
    const [colapsado, setColapsado] = useState<boolean>(false);

    return (
        <aside style={{
            width: colapsado ? "60px" : "170px",
            background: "#1976d2",
            color: "white",
            borderRight: "4px solid #ccc",
            padding: "20px",
            transition: "width 0.3s ease",
            display: "flex",
            flexDirection: "column",
            alignItems: colapsado ? "center" : "flex-start"
        }}>

            <button onClick={() => setColapsado(!colapsado)} style={{
                background: "transparent",
                color: "white",
                border: "none",
                cursor: "pointer",
                alignSelf: colapsado ? "center" : "flex-end",
                marginBottom: "20px"
            }}>
                {colapsado ? ">" : "<"}
            </button>

            <h3>Menu</h3>
            <ul style={{ listStyle: "none", padding: "0px", margin: "0px", width: "100%" }}>
                <li style={{
                    padding: "10px",
                    background: pathname === "/" ? "#1565c0" : "transparent",
                    borderRadius: "10px",
                    textAlign: colapsado ? "center" : "left"
                }}>
                    <Link href={"/"} style={{
                        textDecoration: "none",
                        color: "inherit",
                        display: "flex",
                        justifyContent: colapsado ? "center" : "flex-start",
                        gap: colapsado ? 0 : "10px",
                    }}>
                        🏠 {colapsado ? "" : "Home"}
                    </Link>

                </li>
                <li style={{
                    padding: "10px",
                    background: pathname === "/usuarios" ? "#1565c0" : "transparent",
                    borderRadius: "10px",
                    textAlign: colapsado ? "center" : "left"
                }}>
                    <Link href={"/usuarios"} style={{
                        textDecoration: "none",
                        color: "inherit",
                        display: "flex",
                        justifyContent: colapsado ? "center" : "flex-start"
                    }}>
                        👤 {colapsado ? "" : "Usuarios"}
                    </Link>
                </li>
            </ul>
        </aside>
    )
};

export default MenuLateral;