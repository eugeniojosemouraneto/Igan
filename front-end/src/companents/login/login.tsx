import styles from './login.module.css'

import iganLogo from '../../assets/logo-jinks.jpg'

export default function Login() {
    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <div className={styles.logo}>
                    <div>
                        <aside>Pagina de login.</aside>
                        <strong>Para acessar o Igan, seu assistende de gestão do dia a dia, é necessario fazer login.</strong>
                    </div>
                    <img src={iganLogo} alt="" />
                </div>
                <main>
                    <form action="">
                        <div className={styles.formComponent}>
                            <strong>Digite o seu email</strong>
                            <input type="email" name="email" id="email" placeholder="email"/>
                        </div>
                        <div className={styles.formComponent}>
                            <strong>Digite a sua senha</strong>
                            <input type="password" name="password" id="password" placeholder="senha"/>
                        </div>
                        <div className={styles.submitButton}>
                            <button type="submit">Efetuar o login</button>
                        </div>
                        <br />
                        <a href="">Registrar no Igan</a>
                    </form>
                </main>
            </div>
        </div>
    )
}