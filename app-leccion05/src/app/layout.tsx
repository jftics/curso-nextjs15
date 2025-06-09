import "./globals.css";
import Navigation from "./components/Navigation";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navigation></Navigation>
        {children}
      </body>
    </html>
  );
}
