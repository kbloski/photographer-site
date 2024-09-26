"use client";

import { createApiUrl } from "packages/frontend-app-nextjs/src/common/api/apiUtils";
import { useCheckLogged } from "packages/frontend-app-nextjs/src/common/hooks/useCheckLogged";
import { webTokenManger } from "packages/frontend-app-nextjs/src/common/services/tokenManager";
import { generateZodErrorString } from "packages/frontend-app-nextjs/src/common/utils/zodErrorUtils";
import { ChangeEvent, useState } from "react";
import { UserSchema } from "shared/src/schemas/UserSchema";
import { UserType, UserRoles } from "shared/src/types/UserType";
import { ZodError } from "zod";

export default function RegisterPage() {
    const roles = [...Object.entries(UserRoles)];
    const { logged, user } = useCheckLogged();
    const [errorMessage, setErrorMsg] = useState<string>();
    const [userData, setUserData] = useState<Partial<UserType>>();

    function onChange(event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> ) {
        const name = event.target.name;
        const value = event.target.value;

        setUserData((prev) => {
            const newUser: Record<string, string> = { ...prev } as Record<string, string>;
            newUser[name] = value;

            try {
                UserSchema.parse(newUser);
                setErrorMsg("");
            } catch (err) {
                setErrorMsg(generateZodErrorString(err as ZodError));
            }
            
            return newUser;
        });
    }

    
    function onsubmit( event : React.FormEvent){
        event.preventDefault();
        
        fetch(
            createApiUrl('/api/v1/user/add'),
            {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json',
                    'authorization' : `Bearer ${webTokenManger.getLocalToken()}`
                },
                body: JSON.stringify( userData )
            }
        ).then( response => {
            if (!response.ok) throw new Error(response.statusText);
        }).catch( err => setErrorMsg(err.message))
    }

    return (
        <div className="w-100 p-2 pt-5">
            <h3>Register Form</h3>
            {errorMessage && (
                <div className="alert alert-danger">{errorMessage}</div>
            )}
            <form onSubmit={onsubmit} id="register-form">
                {logged && user?.role === "admin" && (
                    <div>
                        <label htmlFor="roleControl" className="form-label">
                            ROLE
                        </label>
                        <select name="role" className="form-control" onChange={ onChange}>
                            {roles.map(([roleKey, roleValue]) => (
                                <>
                                    <option
                                        value={roleValue}
                                        className=""
                                        selected={
                                            roleValue === "client"
                                                ? true
                                                : false
                                        }
                                    >
                                        {roleKey}
                                    </option>
                                </>
                            ))}
                        </select>
                    </div>
                )}
                <div>
                    <label htmlFor="usernameControl" className="form-label">
                        Username
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        name="username"
                        id="usernameControl"
                        onChange={onChange}
                        value={ userData?.username ?? "" }
                    />
                </div>
                <div>
                    <label htmlFor="emailControl" className="form-label">
                        Email
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        name="email"
                        id="emailControl"
                        onChange={onChange}
                        value={ userData?.email ?? ''}
                    />
                </div>
                <div>
                    <label htmlFor="passwordControl" className="form-label">
                        Password
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        name="password"
                        id="passwordControl"
                        onChange={onChange}
                        value={ userData?.password ?? ''}
                    />
                </div>
                <div>
                    <label htmlFor="phoneControll" className="form-label">
                        Phone
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        name="phone"
                        id="phoneControll"
                        onChange={onChange}
                        value={ userData?.phone ?? ''}
                    />
                </div>
                <div className="p-2 d-flex justify-content-end">
                    <button type="submit"
                     className={`btn btn-primary ${ errorMessage ? 'disabled' : ''}`}
                     >
                        Register
                    </button>
                </div>
            </form>
        </div>
    );
}
