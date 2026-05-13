// pages/_app.jsx  (Pages Router)
// OU app/layout.jsx (App Router — adaptar conforme seu setup)

import { useState } from "react";
import SplashScreen from "@/components/SplashScreen";

export default function App({ Component, pageProps }) {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && (
        <SplashScreen
          onFinished={() => setLoading(false)}
          minDuration={3000} // tempo mínimo que a splash fica visível (ms)
        />
      )}
      {!loading && <Component {...pageProps} />}
    </>
  );
}

// ─────────────────────────────────────────────
// Se quiser uma transição suave ao fechar a splash,
// substitua o onFinished por um fade-out:
//
// const [visible, setVisible] = useState(true);
// const [fading, setFading] = useState(false);
//
// function handleFinished() {
//   setFading(true);
//   setTimeout(() => setVisible(false), 600);
// }
//
// No componente SplashScreen, adicione ao root:
// style={{ ...styles.root, opacity: fading ? 0 : 1, transition: "opacity 0.6s ease" }}
// ─────────────────────────────────────────────
