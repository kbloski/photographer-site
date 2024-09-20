import Link from 'next/link';
import { Navigation } from '../Navigation/Navigation';
import { commonMetadata } from '../../shared-metadata';
import { LoginModal } from '../LoginModal/LoginModal';

export function Header(){

    return (
        <>
            <div className='navbar p-2'>
                <Link href='/' className='navbar-brand flex-grow-1'>
                    <h3>{ commonMetadata.title }</h3>
                </Link>
                <LoginModal />
            </div>
            <div className={'bg-light text-secondary p-2'}>
                <Navigation />
            </div>
        </>
    )
}