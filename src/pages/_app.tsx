import type { AppProps } from "next/app";
import { AuthProvider } from "../../src/context/AuthContext";
import { LibraryProvider } from "../../src/context/LibraryContext";
import ClientLayout from "../../app/client-layout";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <LibraryProvider>
        <ClientLayout>
          <Component {...pageProps} />
        </ClientLayout>
      </LibraryProvider>
    </AuthProvider>
  );
}