import { contactDetails } from '../../config';
import style from './contact.module.scss';

export function Contact(){
    return (
        <>
            <ul className="list-unstyled d-block">
                <h3>contactDetails</h3>
                {   contactDetails.phone &&
                    <li className="list-item">
                        Tel:<a href={`tel:${contactDetails.phone}`} className={style.link}> {contactDetails.phone}</a>
                    </li>
                }
                {   contactDetails.email &&
                    <li className="list-item">
                        Email:<a href={`mailto:${contactDetails.email}`} className={style.link}> {contactDetails.email}</a>
                    </li>
                }
            </ul>
        </>
    )
}