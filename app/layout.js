import './globals.css'

export const metadata = {
  title: '관리자 대시보드',
  description: 'Admin Dashboard',
}

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <head>
        {/* <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tabler/core@latest/dist/css/tabler.min.css" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tabler/core@latest/dist/css/tabler-flags.min.css" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tabler/core@latest/dist/css/tabler-payments.min.css" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tabler/core@latest/dist/css/tabler-vendors.min.css" /> */}
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
      </head>
      <body className="theme-light font-sans">
        {/* <script src="https://cdn.jsdelivr.net/npm/@tabler/core@latest/dist/js/tabler.min.js" defer></script> */}
        {children}
      </body>
    </html>
  );
}
