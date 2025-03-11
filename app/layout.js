import './globals.css'
import Providers from './providers';

export const metadata = {
    title: '관리자 대시보드',
    description: 'Admin Dashboard',
}

export default function RootLayout({ children }) {
    return (
        <html lang="ko">
            <head>
                <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
            </head>
            <body className="theme-light font-sans">
                <Providers>
                    {children}
                </Providers>
            </body>
        </html>
    );
}
