"use client";
import Link from "next/link";
import React, { useContext, useState } from "react";
import styles from "./navbar.module.css";
import DarkModeToggle from "../DarkModeToggle/DarkModeToggle";
import { signOut, useSession } from "next-auth/react";
import { FaBars } from "react-icons/fa6";
import { ThemeContext } from "../../../../context/ThemeContext";
const Navbar = () => {
	const links = [
		{
			id: 1,
			title: "Home",
			url: "/",
		},
		{
			id: 2,
			title: "Portfolio",
			url: "/portfolio",
		},
		{
			id: 3,
			title: "Blog",
			url: "/blog",
		},
		{
			id: 4,
			title: "About",
			url: "/about",
		},
		{
			id: 5,
			title: "Contact",
			url: "/contact",
		},
		{
			id: 6,
			title: "Dashboard",
			url: "/dashboard",
		},
	];

	const session = useSession();
	const [showNavbar, setShowNavbar] = useState(false);
	const { mode } = useContext(ThemeContext);

	const handleShowNavbar = (e) => {
		e.stopPropagation();
		//Check if Navbar just opened
		if (!showNavbar) {
			//Help to trigger close when click outside mobile nav
			document.addEventListener("click", handleOutsideClick);
		}
		setShowNavbar(!showNavbar);
	};

	const handleOutsideClick = () => {
		setShowNavbar(false);
		document.removeEventListener("click", handleOutsideClick);
	};

	return (
		<div className={styles.container}>
			<Link
				className={styles.logo}
				href="/"
			>
				Zen<span>Enterprice</span>
			</Link>
			<div className={styles.toggleWrapper}>
				<DarkModeToggle />
				<div className={`${styles.linksWrapper} ${showNavbar && styles.active} ${mode}navbar`}>
					<ul>
						{links.map((link) => (
							<li key={link.id}>
								<Link
									className={styles.link}
									href={link.url}
								>
									{link.title}
								</Link>
							</li>
						))}
					</ul>
					{session.status === "authenticated" && (
						<button
							className={styles.logout}
							onClick={signOut}
						>
							Logout
						</button>
					)}
				</div>
				<div
					className={styles.menu_icon}
					onClick={handleShowNavbar}
				>
					<FaBars />
				</div>
			</div>
		</div>
	);
};

export default Navbar;
