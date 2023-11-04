import React from "react";
import styles from "./page.module.css";
import Image from "next/image";
import { notFound } from "next/navigation";

async function getData(id) {
	const res = await fetch(process.env.NEXT_PUBLIC_API_URL + `/api/posts/${id}`, {
		cache: "no-store",
	});

	if (res.headers.get("Content-Type") !== "application/json") {
		return null;
	}

	if (!res.ok) {
		return notFound();
	}

	return res.json();
}

// Dynamic metadata
export async function generateMetadata({ params }) {
	const post = await getData(params.id);
	return {
		title: post.title,
		description: post.desc,
	};
}

const BlogPost = async ({ params }) => {
	const data = await getData(params.id);

	return (
		<div className={styles.container}>
			{/* top container */}
			<div className={styles.top}>
				<div className={styles.info}>
					<h1 className={styles.title}>{data.title}</h1>
					<p className={styles.desc}>{data.desc}</p>
					<div className={styles.author}>
						{data.authorImg && (
							<Image
								src={data.authorImg}
								alt=""
								width={40}
								height={40}
								className={styles.avatar}
							/>
						)}
						<span className={styles.username}>Written by {data.username}</span>
					</div>
				</div>
				<div className={styles.imageContainer}>
					<Image
						src={data.img}
						alt=""
						fill={true}
						className={styles.image}
					/>
				</div>
			</div>
			{/* bottom container */}
			<div className={styles.content}>
				<p className={styles.text}>{data.content}</p>
			</div>
		</div>
	);
};

export default BlogPost;
