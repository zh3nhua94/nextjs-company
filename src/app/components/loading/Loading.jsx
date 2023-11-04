import React from "react";
import styles from "./loading.module.css";

const Loading = () => {
	return (
		// <div className={styles.spinner_square}>
		// 	<div className={`${styles.square_1} ${styles.square}`}></div>
		// 	<div className={`${styles.square_2} ${styles.square}`}></div>
		// 	<div className={`${styles.square_3} ${styles.square}`}></div>
		// </div>
		<div className={styles.loadingCircle}></div>
	);
};

export default Loading;
