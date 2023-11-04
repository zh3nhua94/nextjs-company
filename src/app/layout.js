import Navbar from "@/app/components/navbar/navbar";
import "./reset.css";
import "./globals.css";
import { Inter } from "next/font/google";
import Footer from "@/app/components/footer/footer";
import { ThemeProvider } from "../../context/ThemeContext";
import AuthProvider from "@/app/components/AuthProvider/AuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: "Zen Enterprise",
	description: "We got your back!",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<ThemeProvider>
					<AuthProvider>
						<div className="container">
							<Navbar />
							{children}
							<Footer />
						</div>
					</AuthProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}
