import Link from "next/link";

export function Navigation(){
    return(
        <>
            <nav >
                <ul className="nav justify-content-center">
                    <li className="nav-item">
                        <Link href="#" className="nav-link">Home</Link>
                    </li>
                   
                    <li className="nav-item">
                        <Link href="#" className="nav-link">Packages</Link>
                    </li>
                    <li className="nav-item">
                        <Link href="#" className="nav-link">Booking</Link>
                    </li>
                    <li className="nav-item">
                        <Link href="#" className="nav-link">Gallery</Link>
                    </li>
                    <li className="nav-item">
                        <Link href="#" className="nav-link">Contact&Support</Link>
                    </li>
                </ul>
            </nav>
        </>
    );
}