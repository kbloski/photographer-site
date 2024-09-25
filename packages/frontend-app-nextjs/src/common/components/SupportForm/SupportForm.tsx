"use client";

import { ChangeEvent, use, useState } from "react";
import { useCheckLogged } from "../../hooks/useCheckLogged";
import { MessageSchema } from "packages/shared/src/schemas/MessageSchema";
import { generateZodErrorString } from "../../utils/zodErrorUtils";
import { ZodError } from "zod";
import { createApiUrl } from "../../api/apiUtils";
import { contactDetails } from "../../config";
import { webTokenManger } from "../../services/tokenManager";

export function SupportForm() {
    const { user } = useCheckLogged();
    const [successMessage, setSuccessMessage] = useState<string>();
    const [validationMessage, setValidationMessage] = useState<string>();
    const [messageData, setMessageData] = useState({});
    const [pending, setPending] = useState<boolean>(false);
    

    function handleChange(event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>  ) {
        const name = event.target.name;
        const value = event.target.value;

        setMessageData((prev) => {
            const newMessage: Record<string, string> = prev ? { ...prev } : {};
            newMessage[name] = value;

            if (user?.email) newMessage.email = user.email;

            try {
                MessageSchema.parse(newMessage);
                setValidationMessage("");
            } catch (err) {
                setValidationMessage(generateZodErrorString(err as ZodError));
            }

            return newMessage;
        });
    }

    function handleSubmit( event: React.FormEvent ){
        event.preventDefault();

        setPending(true);
        
        fetch(
            createApiUrl(`/api/v1/message/sendTo/${contactDetails.userId}`),
            {
                method: 'POST',
                headers: {
                    'authorization' : `Bearer ${webTokenManger.getLocalToken()}`,
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify( messageData)
            }
        )
        .then( response => {
            if (!response.ok) throw new Error( response.statusText );
            setSuccessMessage('Message sent.')
        } )
        .catch( err => setValidationMessage( err.message ) )
        .finally( () => setPending( false ));

    }

    return (
        <div className="container p-2 bg-light">
            <h3 className="">Contact Form</h3>
            {   successMessage &&
                <div className="alert alert-success">
                    {successMessage}
                </div>
            }
            <div>
                { validationMessage &&
                    <div className="alert alert-danger">
                        {validationMessage}
                    </div>
                }
            </div>
            <form onSubmit={ handleSubmit }>
                <div className="p-3">
                    <label htmlFor="emailControl" className="form-label">
                        Your email: { user?.email }
                    </label> 
                        <input
                            hidden={ Boolean(user?.email) }
                            type="email"
                            name="email"
                            id="emailControl"
                            className="form-control"
                            required
                            onChange={handleChange}
                            defaultValue={ user?.email }
                        />
                    
                </div>

                <div>
                    <label htmlFor="nameControl" className="form-label">
                        Subject
                    </label>
                    <input
                        type="text"
                        id="nameControl"
                        name="subject"
                        className="form-control w-100"
                        required
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="messageControl">Message</label>
                    <textarea
                        name="message"
                        className="form-control"
                        id="messageControl"
                        onChange={ handleChange }
                    ></textarea>
                </div>
                { pending ?
                        <div className="alert alert-warning">
                            Wysyłanie wiadomości
                        </div>
                    : 
                        <div className="d-flex justify-content-end p-2">
                            <button className="btn btn-success">Send </button>
                        </div>
                }
            </form>
        </div>
    );
}
