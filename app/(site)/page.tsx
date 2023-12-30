import styles from './page.module.css';
import AuthForm from './components/authForm';



export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.sign}>
        Sign into your account
        <div className={styles.regfrom}>
          <AuthForm/>
        </div>
      </div>
    </main>
  )
}
