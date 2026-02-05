import { Providers } from './providers';
import './globals.css';

export const metadata = {
  title: 'Task App',
  description: 'Secure Cookie Auth',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}