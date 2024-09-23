import { constactInfo } from '../../config';
import style from './contact.module.scss';

export function Contact(){
    return (
        <>
            <ul className="list-unstyled d-block">
                {   constactInfo.phone &&
                    <li className="list-item">
                        <a href={`tel:${constactInfo.phone}`} className={style.link}>Tel: {constactInfo.phone}</a>
                    </li>
                }
                {   constactInfo.email &&
                    <li className="list-item">
                        <a href={`mailto:${constactInfo.email}`} className={style.link}>Email: {constactInfo.email}</a>
                    </li>
                }
            </ul>
        </>
    )
}