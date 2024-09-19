import Link from 'next/link';
import { Navigation } from '../Navigation/Navigation';
import { commonMetadata } from '../../shared-metadata';
import { Contact } from '../Contact/Contact';

export function Header(){

    return (
        <>
            <div className='navbar p-2'>
                <Link href='/' className='navbar-brand'>
                    <h3>{ commonMetadata.title }</h3>
                </Link>
                <Contact />
            </div>
            <div className={'bg-light text-secondary p-2'}>
                <Navigation />
            </div>
        </>
    )
}