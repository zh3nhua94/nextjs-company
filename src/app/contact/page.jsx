import React from "react";
import styles from "./page.module.css";
import Image from "next/image";
import Form from "@/app/components/form/form";

export const metadata = {
	title: "Contact",
	description: "Drop us a message now!",
};

const Contact = () => {
	return (
		<div className={styles.container}>
			<h1 className={styles.title}>Let&#39;s Keep in Touch</h1>
			<div className={styles.content}>
				<div className={styles.imgContainer}>
					<Image
						className={styles.img}
						src="/contact.png"
						alt=""
						fill={true}
					/>
				</div>
				<Form />
			</div>
		</div>
	);
};

export default Contact;
