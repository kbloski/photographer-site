import style from './contact.module.scss';

export function Contact(){
    return (
        <>
            <ul className="list-unstyled">
                <li className="list-item">
                    <a href="tel:555555555" className={style.link}>phone: 555 555 555</a>
                </li>
                <li className="list-item">
                    <a href="mailto:admin@example.com" className={style.link}>email: admin@example.com</a>
                </li>
            </ul>
        </>
    )
}