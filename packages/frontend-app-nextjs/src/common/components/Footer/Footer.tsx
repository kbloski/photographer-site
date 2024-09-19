import Link from "next/link";
import { Contact } from "../Contact/Contact";

export function Footer(){

    return (
        <footer className="container bg-light p-4">
            <div className="row">
                <div className="col-6">
                    <ul className="breadcrumb">
                        <li className="breadcrumb-item">
                            <Link href='#'>About Me</Link>
                        </li>
                        <li className="breadcrumb-item">
                            <Link href='#'>FaQ</Link>
                        </li>
                        <li className="breadcrumb-item">
                            <Link href='#'>Contact</Link>
                        </li>
                    </ul>
                </div>
                <div className="col-3 p-2">
                    <h4>Tos</h4>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium, nostrum.
                    </p>
                </div>
                <div className="col-3 p-2">
                    <Contact />
                </div>
            </div>
        </footer>
    )
}