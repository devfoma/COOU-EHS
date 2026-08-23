import '../styles.css';
import { CampusSafetyProvider } from '../lib/CampusSafetyProvider';

export const metadata = {
  title: 'COOU-EHS | Environmental Health & Safety',
  description: 'Campus hazard reporting, response tracking, and safety notices for COOU Uli Campus.'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Outfit:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body>
        <CampusSafetyProvider>
          {children}
        </CampusSafetyProvider>
      </body>
    </html>
  );
}
