import "./globals.css";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Roboto } from "next/font/google";

// Font config
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const roboto = Roboto({
  variable: "--font-roboto",
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ["latin"],
});

// ✅ Metadata with favicon
export const metadata: Metadata = {
  title: "Bahari - Frontend Developer & Full Stack Developer",
  description:
    "Bahari is a Frontend Developer and Full Stack Developer experienced in building innovative and responsive web applications.",
  keywords: [
    "Frontend Developer",
    "Full Stack Developer",
    "Web Development",
    "Laravel",
    "Next.js",
    "API Developer",
    "Portofolio Developer",
  ],
  authors: [{ name: "Bahari" }],
  viewport: "width=device-width, initial-scale=1, shrink-to-fit=no",
  icons: {
    icon: "https://res.cloudinary.com/du0tz73ma/image/upload/v1733663814/Group_1_1_z6fjj3.png", // ✅ favicon diatur di sini
  },
  openGraph: {
    title: "Bahari - Frontend Developer & Full Stack Developer",
    description:
      "Bahari is experienced in building innovative web applications using Laravel,react,vue, and Next.js.",
    url: "https://baharihari.com",
    type: "website",
    images: [
      {
        url: "https://res.cloudinary.com/du0tz73ma/image/upload/c_fill,w_2475,h_3420/v1733248656/IMG-20241110-WA0013_jwgzp5.jpg",
        width: 2475,
        height: 3420,
        alt: "Bahari profile image",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bahari - Frontend Developer & Full Stack Developer",
    description:
      "Build responsive and modern web applications with Bahari, an experienced developer.",
    images: [
      "https://res.cloudinary.com/du0tz73ma/image/upload/c_fill,w_2475,h_3420/v1733248656/IMG-20241110-WA0013_jwgzp5.jpg",
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        style={{ fontFamily: "Roboto" }}
        className={`${geistSans.variable} ${geistMono.variable} ${roboto.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
