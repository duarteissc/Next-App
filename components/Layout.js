import Head from 'next/head';
import Link from 'next/link';
import i18next from 'i18next';
import LanguageMenu from './LanguageMenu';
import styles from "../styles/Home.module.css";
const Layout = function ({ children, home }) {

	return (
		<>
		
			<div className={styles.container}>
				<main className={styles.main}>
					<LanguageMenu />

					<header>
						<h1>{i18next.t('siteMeta.title')}</h1>
					</header>

					{children}


					{!home && (
						<Link href={`/[lang]`} as={`/${i18next.language}`}>
							<a className="text-blue-600">{i18next.t('backTo')} /</a>
						</Link>
					)}
				</main>


			</div>
		</>
	);
};
export default Layout;
