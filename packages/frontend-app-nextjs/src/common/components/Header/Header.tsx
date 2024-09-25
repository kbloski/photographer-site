import Link from "next/link";
import { Navigation } from "../Navigation/Navigation";
import { commonMetadata } from "../../shared-metadata";
import { LoginModal } from "../LoginModal/LoginModal";
import { useCheckLogged } from "../../hooks/useCheckLogged";

export function Header() {
    const { logged, user } = useCheckLogged();
    return (
        <>
            <div className="navbar p-2">
                <Link href="/" className="navbar-brand flex-grow-1">
                    <h3>{commonMetadata.title}</h3>
                </Link>
                <div className="d-flex">
                    {logged && user ? (
                        <div>
                            <div>Username: {user.username}</div>
                            <div> Email: {user.email} </div>
                        </div>
                    ) : (
                        <></>
                    )}
                    <LoginModal />
                </div>
            </div>
            <div className={"bg-light text-secondary p-2"}>
                <Navigation />
            </div>
        </>
    );
}
