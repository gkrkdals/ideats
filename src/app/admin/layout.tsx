import React from "react";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="ko">
      <head>
        <title>관리자 페이지</title>
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
