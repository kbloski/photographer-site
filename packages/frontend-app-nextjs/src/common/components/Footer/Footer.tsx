import Link from "next/link";
import { Contact } from "../Contact/Contact";

export function Footer() {
    return (
        <footer className="container bg-light p-4">
            <div className="row d-block d-md-flex">
                <div className="col-6">
                    <ul className="breadcrumb">
                        <li className="breadcrumb-item">
                            <Link href="/about-me">About Me</Link>
                        </li>
                        <li className="breadcrumb-item">
                            <Link href="/faq">FaQ</Link>
                        </li>
                        <li className="breadcrumb-item">
                            <Link href="/contact">Contact</Link>
                        </li>
                    </ul>
                </div>
                <div className="col-3 p-2">
                    <h4>Tos</h4>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Laudantium, nostrum.
                    </p>
                </div>
                <div className="col-3 p-2">
                    <Contact />
                </div>
            </div>
        </footer>
    );
}
