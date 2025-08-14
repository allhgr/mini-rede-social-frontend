"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const MenuLateral = () => {
    const pathname = usePathname();

    return (
        <aside style={{
            width: "140px",
            background: "#1976d2",
            color: "white",
            borderRight: "4px solid #ccc",
            padding: "20px"
        }}>
            <h3>Menu</h3>
            <ul style={{ listStyle: "none", padding: "0px" }}>
                <li
                    style={{
                        padding: "10px",
                        background: pathname === "/" ? "#1565c0" : "transparent",
                        borderRadius: "10px"
                    }}>
                    <Link href={"/"} style={{ textDecoration: "none", color: "inherit" }}>
                        Home
                    </Link>

                </li>
                <li style={{
                    padding: "10px",
                    background: pathname === "/usuarios" ? "#1565c0" : "transparent",
                    borderRadius: "10px"  
                }}>
                    <Link href={"/usuarios"} style={{ textDecoration: "none", color: "inherit" }}>
                        Usuarios
                    </Link>
                </li>
            </ul>
        </aside>
    )
};

export default MenuLateral;