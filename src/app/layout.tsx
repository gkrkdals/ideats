import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>아이디어츠</title>
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
