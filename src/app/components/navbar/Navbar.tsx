import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from '@/app/components/navbar/navbar.module.scss';
/// <reference types="react" />
/// <reference types="react-dom" />

export const Navbar = () => {

    return (
        <nav className={styles.navbar}>
            <Link href="/">
                <Image
                    src="/crab-image.png"
                    alt="Crab Space Invaders"
                    title="Logo FakeCompany"
                    width="60"
                    height="45"
                    priority={true}
                />
            </Link>
            <ul>
                <li>
                    <Link href="/exchange-rate">
                        Rate
                    </Link>
                </li>
                <li>
                    <Link href="/about">
                        About
                    </Link>
                </li>
            </ul>
        </nav>
    );
};
