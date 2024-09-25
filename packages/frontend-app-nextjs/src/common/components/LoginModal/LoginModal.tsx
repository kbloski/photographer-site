"use client";

import { useEffect, useState } from "react";
import { UserSchema } from "shared/src/schemas/UserSchema";
import { createApiUrl } from "../../api/apiUtils";
import { webTokenManger } from "../../services/tokenManager";
import { useCheckLogged } from "../../hooks/useCheckLogged";
import { generateZodErrorString } from "../../utils/zodErrorUtils";
import { ZodError } from "zod";
import { manualDropModalBootstrap } from "../../helpers/bootstrapHelper";

export function LoginModal() {
    const { logged } = useCheckLogged();
    const [modalId, setModalId] = useState<string>();
    const [loginData, setLoginData] = useState({});
    const [message, setMessage] = useState<string>("");

    useEffect(() => {
        const id = `loginModal${Math.round(Math.random() * 1000)}`;
        setModalId(id);
    }, []);

    function onChange(event: React.ChangeEvent<HTMLInputElement>) {
        const name = event.target.name;
        const value = event.target.value;

        setLoginData((prev) => {
            const newLoginData: Record<string, string> = { ...prev };
            newLoginData[name] = value;

            try {
                UserSchema.omit({ username: true }).parse(newLoginData);
                setMessage("");
            } catch (err) {
                setMessage(generateZodErrorString(err as ZodError));
            }

            return newLoginData;
        });
    }

    async function onSubmitAction(event: React.FormEvent) {
        event.preventDefault();
        const userData = loginData;

        await fetch(createApiUrl("/api/login"), {
            method: "POST",
            body: JSON.stringify(userData),
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        })
            .then((response) => {
                if (!response.ok) throw new Error( response.statusText);
                return response.json();
            })
            .then((data) => {
                if (data) {
                    webTokenManger.setLocalToken(data.token)
                    
                    const modalElement = document.getElementById(String(modalId)) as HTMLElement;
                    manualDropModalBootstrap(modalElement);
                    
                    window.location.reload()
                };
            })
            .catch( (err : Error)=>{ setMessage(err.message ) })
    }

    function logOut(){
        webTokenManger.deleteLocalToken();
        window.location.reload();
    }

    return (
        <div className="p-3">
            {logged ? (
                <button
                    className="btn btn-danger"
                    onClick={ logOut }
                >
                    Log out
                </button>
            ) : (
                <button
                    className="btn btn-success"
                    data-bs-toggle="modal"
                    data-bs-target={`#${modalId}`}
                >
                    Login
                </button>
            )}

            <div
                className="modal fade"
                id={modalId}
                data-bs-backdrop="static"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="login-title">Formularz logowania</h5>
                            <button
                                className="btn btn-danger btn-close"
                                data-bs-dismiss="modal"
                            ></button>
                        </div>
                        <div className="modal-body" id="modal-body">
                            <div
                                className={
                                    "alert " +
                                    (message ? "alert-danger" : "alert-success")
                                }
                            >
                                {message ? message : "Success Validation"}
                            </div>
                            <form onSubmit={onSubmitAction}>
                                <label
                                    htmlFor="emailControl"
                                    className="form-label"
                                >
                                    Login
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="email"
                                    id="emailControl"
                                    onChange={onChange}
                                />

                                <label
                                    htmlFor="passwordControl"
                                    className="form-label"
                                >
                                    Password
                                </label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="passwordControl"
                                    name="password"
                                    onChange={onChange}
                                ></input>
                                <div className="p-2 d-flex justify-content-end">
                                    <button className="btn btn-secondary disabled">
                                        Register
                                    </button>
                                    <button
                                        className="btn btn-primary ms-2"
                                        onClick={onSubmitAction}
                                    >
                                        Login
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
