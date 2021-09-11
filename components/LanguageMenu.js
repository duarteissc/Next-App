import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import i18next from 'i18next';

import { languages } from '../i18n/config';
import styles from "../styles/Home.module.css";
const LanguageMenu = (props) => {
	const router = useRouter();
	const { pathname } = router;

	const classes = ['text-sm', 'md:text-base', 'm-0.5', 'p-0.5'];

	return (
		<div className="flex flex-wrap content-end text-gray-300">
			<div className={styles.breadcrumb}>
				<div
					style={{
						padding: "4px",
						marginRight: "4px",
					}}
				>
					<span>Current Language: </span>
					<span
						style={{
							borderRadius: "3px",
							backgroundColor: "blue",
							color: "white",
							padding: "2px",
						}}
					>
						{i18next.t('siteMeta.languaje')}
					</span>
				</div>


				{languages.map((lang, index) => {
					const current = ['uppercase', i18next.language === lang ? 'text-blue-600' : ''];
					const path = pathname.replace(/\[lang\]/i, lang);
					return (

						< div key={index} style={{margin:".2em"}}>
							{/* Otra alternativa */}
							{/* <Link
								prefetch={false}
								activeClassName={i18next.t('siteMeta.languaje') === pathname}
								as={path}
								href={pathname}
							>
								<a className={classes.concat(current).join(' ').trim()}>
									{i18next.t(lang)}</a>
							</Link> */}
							<Link key={index} prefetch={false} href={pathname} as={path}>
								<a className={classes.concat(current).join(' ').trim()}>{i18next.t(lang)}</a>
							</Link>
						</div>

					);
				})}
			</div>
		</div >
	);
};

export default LanguageMenu;
