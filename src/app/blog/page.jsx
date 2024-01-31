import React from "react";
import styles from "./page.module.css";
import Link from "next/link";
import Image from "next/image";

async function getData() {
	const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/api/posts", {
		cache: "no-store",
	});

	if (res.headers.get("Content-Type") !== "application/json") {
		return null;
	}

	// if (!res.ok) {
	// 	throw new Error("Failed to fetch data");
	// }
	return res.json();
}

const Blog = async () => {
	const data = await getData();
	const sortByDate = (a, b) => {
		const aTime = new Date(a.createdAt).getTime();
		const bTime = new Date(b.createdAt).getTime();
		return bTime - aTime;
	};
	return (
		<div className={styles.mainContainer}>
			{data?.sort(sortByDate).map((item) => (
				<Link
					key={item._id}
					href={`/blog/${item._id}`}
					className={styles.container}
				>
					<div className={styles.imageContainer}>
						<Image
							src={item.img}
							alt=""
							width={400}
							height={250}
							className={styles.image}
						/>
					</div>
					<div className={styles.content}>
						<h1 className={styles.title}>{item.title}</h1>
						<p className={styles.desc}>{item.desc}</p>
					</div>
				</Link>
			))}
		</div>
	);
};

export default Blog;
export const dynamic = "force-dynamic";
