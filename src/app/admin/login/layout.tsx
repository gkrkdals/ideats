import React from "react";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="ko">
      <head>
        <title>로그인</title>
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
