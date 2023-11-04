"use client";
import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Loading from "@/app/components/loading/Loading";
import Link from "next/link";

const Login = () => {
	const session = useSession();
	const router = useRouter();
	useEffect(() => {
		if (session.status === "authenticated") {
			router.push("/dashboard");
		}
	}, [session.status, router]);

	if (session.status === "loading") {
		return <Loading />;
	}

	const handleSubmit = async (e) => {
		e.preventDefault();
		const email = e.target[0].value;
		const password = e.target[1].value;

		signIn("credentials", {
			email,
			password,
		})
			.then((response) => {
				console.log(response);
			})
			.catch((err) => {
				console.log("Login Error:");
				console.log(err);
			});
	};

	return (
		<div className={styles.container}>
			<form
				className={styles.form}
				onSubmit={handleSubmit}
			>
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
				<button
					className={styles.button}
					type="submit"
				>
					Login
				</button>
			</form>
			<button
				className={styles.googleBtn}
				onClick={() => signIn("google")}
			>
				<img
					src="https://developers.google.com/identity/images/g-logo.png"
					alt=""
				/>
				<span>Login with Google</span>
			</button>
			<Link
				href="/dashboard/register"
				className={styles.togglePage}
			>
				Register an account here
			</Link>
		</div>
	);
};

export default Login;
