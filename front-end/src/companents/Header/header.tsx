import styles from './header.module.css'

// interfaces
import { interfaceHeader } from '../../interfaces/header.interfaces'

import iganLogo from '../../assets/logo-jinks.jpg'

export default function Header(datas: interfaceHeader) {
    return (
        <header className={styles.header}>
            <img src={iganLogo} alt="Logotipo da Igan" />
            <strong>Igan / {datas.namePage}</strong>
        </header>
    )
}