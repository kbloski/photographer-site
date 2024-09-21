"use client";

import { useEffect, useState } from "react";
import { UserType } from "shared/src/types/UserType";
import { UserSchema } from "shared/src/schemas/UserSchema";
import { handlerChange } from "../../hooks/useFormHandlers";
import { generateZodErrorString } from "../../utils/zodErrorUtils";
import { createApiUrl } from "../../api/apiUtils";
import { webTokenManger } from "../../services/tokenManager";
import { ZodError } from "zod";

export function LoginModal() {
    const [token, setToken] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [message, setMessage] = useState<string>("");

    useEffect(() => {
        const interval = setInterval(() => {
            setToken(webTokenManger.getLocalToken());
        }, 100);

        return () => clearInterval(interval);
    });

    function onChange(
        event: React.ChangeEvent<HTMLInputElement>,
        setStateFunction: unknown
    ) {
        handlerChange(event, setStateFunction);
        const value = event.target.value;

        const userData: Omit<UserType, "username" | "id" | "role"> = {
            email: event.target.name === "email" ? value : email,
            password: event.target.name === "password" ? value : password,
        };

        let message = "";

        try {
            UserSchema.omit({ username: true }).parse(userData);
        } catch (err) {
            message = generateZodErrorString(err as ZodError);
        }

        setMessage(message);
    }

    async function onSubmitAction(event: React.FormEvent) {
        event.preventDefault();
        
        const userData = {
            email,
            password,
        };

        await fetch(createApiUrl("/api/login"), {
            method: "POST",
            body: JSON.stringify(userData),
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        })
            .then((response) => {
                if (!response.ok) {
                    setMessage(response.statusText);
                    return;
                }

                return response.json();
            })
            .then((data) => {
                if (data) {
                    webTokenManger.setLocalToken(data.token);
                    alert('Zalogowano, możesz wyjść z panelu logowania');
                }
            });
    }

    return (
        <div className="p-3">

            { token ? (
                <button
                        className="btn btn-danger"
                        onClick={ webTokenManger.deleteLocalToken }
                    >
                        Log out
                    </button>
                ) : (
                    <button
                        className="btn btn-success"
                        data-bs-toggle="modal"
                        data-bs-target="#loginModal"
                    >
                        Login
                    </button>
                ) 
            }


            <div
                className="modal fade"
                id="loginModal"
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
                                    onChange={(event) =>
                                        onChange(event, setEmail)
                                    }
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
                                    onChange={(event) =>
                                        onChange(event, setPassword)
                                    }
                                ></input>
                                <div className="p-2 d-flex justify-content-end">
                                    <button className="btn btn-secondary">
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
                        {/* <div className="modal-footer">
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    );
}
