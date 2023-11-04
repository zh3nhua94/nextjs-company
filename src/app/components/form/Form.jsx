"use client";
import React, { useRef, useState } from "react";
import Button from "@/app/components/Button/Button";
import emailjs from "@emailjs/browser";
import styles from "./form.module.css";
export const dynamic = "force-dynamic";
export const revalidate = 0;

const Form = () => {
	const form = useRef();
	const [err, setErr] = useState("");
	console.log(err);

	const sendEmail = (e) => {
		e.preventDefault();
		console.log(err);

		emailjs.sendForm("service_pwdkgh9", "template_81bd2zq", form.current, "pwe9uAXRa9cBuC8-i").then(
			(result) => {
				setErr("success");
				console.log(result.text);
			},
			(error) => {
				setErr("fail");
				console.log(error.text);
			}
		);
		console.log(err);
	};

	return (
		<form
			ref={form}
			className={styles.form}
			onSubmit={sendEmail}
		>
			<input
				className={styles.input}
				type="text"
				placeholder="Name"
				name="name"
				required
			/>
			<input
				className={styles.input}
				type="email"
				placeholder="Email"
				name="email"
				required
			/>
			<textarea
				className={styles.textarea}
				placeholder="Message"
				rows="10"
				cols="30"
				name="message"
				required
			></textarea>
			{/* <Button
				url="#"
				text="Send"
				type="submit"
			/> */}
			<button
				className={styles.btn}
				type="submit"
			>
				Send
			</button>
			<div>
				<p className={err === "fail" ? `${styles.sendFail} ${styles.show}` : styles.sendFail}>
					Error: Form failed to submit.
				</p>
				<p className={err === "success" ? `${styles.sendSuccess} ${styles.show}` : styles.sendSuccess}>
					Form has been submitted.
				</p>
			</div>
		</form>
	);
};

export default Form;
