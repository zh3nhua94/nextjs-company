"use client";
import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import useSWR from "swr";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Loading from "@/app/components/loading/Loading";
import Image from "next/image";
import Link from "next/link";

const Dashboard = () => {
	const session = useSession(); //can get login details here
	const router = useRouter();
	//fetch posts
	const fetcher = (...args) => fetch(...args).then((res) => res.json());
	const { data, mutate, error, isLoading } = useSWR(`/api/posts?username=${session?.data?.user.name}`, fetcher);

	useEffect(() => {
		if (session.status === "unauthenticated") {
			router.push("/dashboard/login");
		}
	}, [session.status, router]);

	if (session.status === "loading") {
		// return <p>Loading...</p>;
		return <Loading />;
	}

	const handleSubmit = async (e) => {
		e.preventDefault();
		const title = e.target[0].value;
		const desc = e.target[1].value;
		const img = e.target[2].value;
		const content = e.target[3].value;
		const authorImg = session.data.user.image ? session.data.user.image : null;
		try {
			await fetch("/api/posts", {
				method: "POST",
				body: JSON.stringify({
					title,
					desc,
					img,
					content,
					authorImg,
					username: session.data.user.name,
				}),
			});
			mutate();
			e.target.reset(); //reset form
		} catch (err) {
			console.log(err);
		}
	};

	const handleDelete = async (id) => {
		try {
			await fetch(`/api/posts/${id}`, {
				method: "DELETE",
			});
			mutate();
		} catch (err) {
			console.log(err);
		}
	};
	if (session.status === "authenticated") {
		return (
			<div className={styles.container}>
				<div className={styles.posts}>
					{/* check if user has created posts before? */}
					{data?.length == 0 || !data ? (
						<div className={styles.noFound}>No Posts found.</div>
					) : (
						data?.map((post) => (
							<div
								className={styles.post}
								key={post._id}
							>
								<div className={styles.imgContainer}>
									<Link href={`/blog/${post._id}`}>
										<Image
											src={post.img}
											alt=""
											width={200}
											height={100}
											className={styles.img}
										/>
									</Link>
								</div>
								<h2 className={styles.postTitle}>
									<Link href={`/blog/${post._id}`}>{post.title}</Link>
								</h2>
								<span
									className={styles.delete}
									onClick={() => handleDelete(post._id)}
								>
									X
								</span>
							</div>
						))
					)}
				</div>
				<form
					className={styles.new}
					onSubmit={handleSubmit}
				>
					<h1 className={styles}>Add New Post</h1>
					<input
						className={styles.input}
						type="text"
						placeholder="Title"
					/>
					<input
						className={styles.input}
						type="text"
						placeholder="Desc"
					/>
					<input
						className={styles.input}
						type="text"
						placeholder="Image URL"
					/>
					<textarea
						className={styles.textarea}
						rows="10"
						cols="30"
						placeholder="Content"
					></textarea>
					<button className={styles.button}>Send</button>
				</form>
			</div>
		);
	}
};

export default Dashboard;
