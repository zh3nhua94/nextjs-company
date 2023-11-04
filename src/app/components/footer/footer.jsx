import React from "react";
import styles from "./footer.module.css";
import Image from "next/image";

const Footer = () => {
	return (
		<div className={styles.container}>
			<div className={styles.footerText}>&copy;2023 Zen Enterprise. All rights reserved.</div>
			<div className={styles.social}>
				<Image
					src="/1.png"
					alt=""
					width={15}
					height={15}
					className={styles.icon}
				/>
				<Image
					src="/2.png"
					alt=""
					width={15}
					height={15}
					className={styles.icon}
				/>
				<Image
					src="/3.png"
					alt=""
					width={15}
					height={15}
					className={styles.icon}
				/>
				<Image
					src="/4.png"
					alt=""
					width={15}
					height={15}
					className={styles.icon}
				/>
			</div>
		</div>
	);
};

export default Footer;
