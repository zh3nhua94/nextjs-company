"use client";
import React, { useState } from "react";
import styles from "./page.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Register = () => {
	const [err, setErr] = useState(false);

	const router = useRouter(); //make sure from next/navigation;

	const handleSubmit = async (e) => {
		e.preventDefault();
		const name = e.target[0].value;
		const email = e.target[1].value;
		const password = e.target[2].value;
		try {
			const res = await fetch("/api/auth/register", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					name,
					email,
					password,
				}),
			});
			if (res.ok) {
				// console.log(res);
				router.push("/dashboard/login?success=Account has been created");
			}
		} catch (err) {
			setErr(true);
			console.log(err);
		}
	};

	return (
		<div className={styles.container}>
			<form
				className={styles.form}
				onSubmit={handleSubmit}
			>
				<input
					className={styles.input}
					placeholder="username"
					type="text"
					required
					minLength="8"
				/>
				<input
					className={styles.input}
					placeholder="email"
					type="email"
					required
				/>
				<input
					className={styles.input}
					placeholder="password"
					type="password"
					required
					minLength="8"
				/>
				<button className={styles.button}>Register</button>
			</form>
			<Link
				href="/dashboard/login"
				className={styles.togglePage}
			>
				Login with an existing account
			</Link>
			{err && "Something went wrong!"}
		</div>
	);
};

export default Register;
