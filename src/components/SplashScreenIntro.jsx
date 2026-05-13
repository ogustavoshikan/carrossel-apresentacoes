import { useEffect, useRef, useState } from "react";

const IMAGES = [
  "https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/Pagina%20inicio/TIAJOANABRIGADEIROS_slide_1%20(4).png",
  "https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/Pagina%20inicio/TIAJOANABRIGADEIROS_slide_1%20(5).png",
  "https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/Pagina%20inicio/TIAJOANABRIGADEIROS_slide_4.png",
  "https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/Pagina%20inicio/TIAJOANABRIGADEIROS_slide_2%20(5).png",
  "https://wpkufemyqzwkylrfkihp.supabase.co/storage/v1/object/public/Carrossel%20Studio/Pagina%20inicio/TIAJOANABRIGADEIROS_slide_2%20(6).png",
];

const STAGE_W      = 680;
const CARD_W       = 230;
const CARD_H       = 325;
const CARD_W_MAIN  = 265;
const CARD_H_MAIN  = 355;
const GAP          = 14;

function getFan(active) {
  return IMAGES.map((_, i) => {
    const off    = i - active;
    const abs    = Math.abs(off);
    const isMain = i === active;
    return {
      x:       STAGE_W / 2 - (isMain ? CARD_W_MAIN : CARD_W) / 2 + off * (CARD_W + GAP) * 0.74,
      y:       isMain ? 0 : 14 + abs * 9,
      rot:     off * 5,
      scale:   isMain ? 1 : 1 - abs * 0.055,
      z:       5 - abs,
      opacity: abs > 2 ? 0 : isMain ? 1 : 0.72 - abs * 0.12,
      w:       isMain ? CARD_W_MAIN : CARD_W,
      h:       isMain ? CARD_H_MAIN : CARD_H,
      isMain,
    };
  });
}

// Delays de revelação: centro primeiro, depois laterais
const REVEAL_DELAYS = [900, 700, 500, 700, 900];

export default function SplashScreenIntro({ onFinished, minDuration = 13500 }) {
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [cardStyles, setCardStyles] = useState(() =>
    IMAGES.map(() => ({
      transform:  `translate(${STAGE_W / 2 - CARD_W / 2}px, 60px) rotate(0deg) scale(0.85)`,
      opacity:    0,
      width:      CARD_W,
      height:     CARD_H,
      zIndex:     1,
      transition: "none",
    }))
  );

  const activeRef   = useRef(2);
  const intervalRef = useRef(null);
  const timerRef    = useRef(null);

  // Aplica posições do leque
  const applyFan = (active, animate) => {
    const fan = getFan(active);
    setCardStyles(fan.map((p) => ({
      transform:  `translate(${p.x}px,${p.y}px) rotate(${p.rot}deg) scale(${p.scale})`,
      opacity:    p.opacity,
      width:      p.w,
      height:     p.h,
      zIndex:     p.z,
      transition: animate
        ? "transform 0.55s cubic-bezier(0.34,1.2,0.64,1), opacity 0.4s ease, width 0.55s ease, height 0.55s ease, box-shadow 0.4s ease"
        : "none",
      isMain: p.isMain,
    })));
  };

  useEffect(() => {
    const fan = getFan(2);

    // Revelar cards em cascata
    REVEAL_DELAYS.forEach((delay, i) => {
      setTimeout(() => {
        const p = fan[i];
        setCardStyles((prev) => {
          const next = [...prev];
          next[i] = {
            transform:  `translate(${p.x}px,${p.y}px) rotate(${p.rot}deg) scale(${p.scale})`,
            opacity:    p.opacity,
            width:      p.w,
            height:     p.h,
            zIndex:     p.z,
            transition: "transform 0.65s cubic-bezier(0.34,1.4,0.64,1), opacity 0.5s ease, width 0.65s ease, height 0.65s ease",
            isMain:     p.isMain,
          };
          return next;
        });
      }, delay);
    });

    // Iniciar swipe loop após revelação
    const swipeStart = setTimeout(() => {
      intervalRef.current = setInterval(() => {
        activeRef.current = activeRef.current < 4 ? activeRef.current + 1 : 0;
        applyFan(activeRef.current, true);
      }, 1800);
    }, 2600);

    // Duração mínima antes de fechar — para o swipe e faz fade-out de 1500ms
    timerRef.current = setTimeout(() => {
      clearInterval(intervalRef.current); // para a animação dos cards
      setIsFadingOut(true);
      setTimeout(() => onFinished?.(), 2000);
    }, minDuration);

    return () => {
      clearTimeout(swipeStart);
      clearTimeout(timerRef.current);
      clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <div style={{
      ...styles.root,
      opacity:    isFadingOut ? 0 : 1,
      transition: isFadingOut ? "opacity 1.5s ease" : "none",
    }}>
      {/* Vinheta */}
      <div style={styles.vignette} />

      {/* Cantos decorativos */}
      {["tl","tr","bl","br"].map((pos) => (
        <div key={pos} style={{ ...styles.corner, ...styles[pos] }} />
      ))}

      {/* Logo */}
      <div style={styles.logo}>
        <div style={styles.icon}>CS</div>
        <div>
          <div style={styles.brandName}>
            <span style={styles.brandAccent}>Carrossel</span> Studio
          </div>
          <div style={styles.brandSub}>Sistema inteligente de carrosséis</div>
        </div>
      </div>

      {/* Stage — leque de cards */}
      <div style={styles.stage}>
        {IMAGES.map((src, i) => (
          <div
            key={i}
            style={{
              ...styles.slide,
              transform:  cardStyles[i].transform,
              opacity:    cardStyles[i].opacity,
              width:      cardStyles[i].width,
              height:     cardStyles[i].height,
              zIndex:     cardStyles[i].zIndex,
              transition: cardStyles[i].transition,
              boxShadow:  cardStyles[i].isMain
                ? "0 0 0 1.5px #DE1E40, 0 20px 60px rgba(222,30,64,0.35)"
                : "0 20px 60px rgba(0,0,0,0.7)",
            }}
          >
            <img src={src} alt={`Slide ${i + 1}`} style={styles.img} />
          </div>
        ))}
      </div>

      {/* Loader */}
      <div style={styles.loaderWrap}>
        <div style={styles.track}>
          <div style={styles.fill} />
        </div>
        <div style={styles.loadLabel}>Carregando</div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;700;900&display=swap');

        @keyframes loopBar {
          0%   { width: 0%;   margin-left: 0%; }
          50%  { width: 55%;  margin-left: 22%; }
          100% { width: 0%;   margin-left: 100%; }
        }
        @keyframes lFade {
          0%, 100% { opacity: .25; }
          50%      { opacity: .7; }
        }
        @keyframes fadeDown {
          from { opacity: 0; transform: translateY(-14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }

        .cs-intro-logo    { animation: fadeDown .7s cubic-bezier(.22,1,.36,1) forwards; }
        .cs-intro-loader  { animation: fadeIn .6s ease 1.8s both; }
        .cs-intro-fill    { animation: loopBar 2s ease-in-out infinite; }
        .cs-intro-label   { animation: lFade 2s ease-in-out infinite; }
      `}</style>
    </div>
  );
}

const styles = {
  root: {
    position:       "fixed",
    inset:          0,
    background:     "#080808",
    display:        "flex",
    flexDirection:  "column",
    alignItems:     "center",
    justifyContent: "center",
    fontFamily:     "'Outfit', sans-serif",
    zIndex:         9999,
  },
  vignette: {
    position:       "absolute",
    inset:          0,
    background:     "radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,0.75) 100%)",
    pointerEvents:  "none",
    zIndex:         10,
  },
  corner: {
    position:    "absolute",
    width:       22,
    height:      22,
    borderColor: "rgba(222,30,64,0.3)",
    borderStyle: "solid",
    zIndex:      11,
  },
  tl: { top: 18, left: 18,  borderWidth: "1px 0 0 1px" },
  tr: { top: 18, right: 18, borderWidth: "1px 1px 0 0" },
  bl: { bottom: 18, left: 18,  borderWidth: "0 0 1px 1px" },
  br: { bottom: 18, right: 18, borderWidth: "0 1px 1px 0" },
  logo: {
    position:       "relative",
    zIndex:         11,
    display:        "flex",
    alignItems:     "center",
    gap:            16,
    marginBottom:   40,
    opacity:        0,
    animation:      "fadeDown .7s cubic-bezier(.22,1,.36,1) .2s forwards",
  },
  icon: {
    width:          68,
    height:         68,
    borderRadius:   18,
    background:     "#DE1E40",
    display:        "flex",
    alignItems:     "center",
    justifyContent: "center",
    fontWeight:     900,
    fontSize:       26,
    color:          "white",
    letterSpacing:  -1,
    boxShadow:      "0 4px 28px rgba(222,30,64,0.5)",
  },
  brandName: {
    fontWeight:    900,
    fontSize:      34,
    letterSpacing: 5,
    color:         "white",
    textTransform: "uppercase",
    lineHeight:    1,
  },
  brandAccent: { color: "#DE1E40" },
  brandSub: {
    fontWeight:    300,
    fontSize:      12,
    letterSpacing: 5,
    color:         "rgba(255,255,255,0.25)",
    textTransform: "uppercase",
    marginTop:     6,
  },
  stage: {
    position:     "relative",
    width:        STAGE_W,
    height:       460,
    marginBottom: 48,
  },
  slide: {
    position:     "absolute",
    borderRadius: 12,
    overflow:     "hidden",
    background:   "#111",
    willChange:   "transform, opacity",
  },
  img: {
    width:         "100%",
    height:        "100%",
    objectFit:     "cover",
    display:       "block",
    pointerEvents: "none",
  },
  loaderWrap: {
    position:       "relative",
    zIndex:         11,
    display:        "flex",
    flexDirection:  "column",
    alignItems:     "center",
    gap:            7,
    opacity:        0,
    animation:      "fadeIn .6s ease 1.8s both",
  },
  track: {
    width:        200,
    height:       1,
    background:   "rgba(255,255,255,0.07)",
    borderRadius: 99,
    overflow:     "hidden",
  },
  fill: {
    height:       "100%",
    background:   "#DE1E40",
    borderRadius: 99,
    animation:    "loopBar 2s ease-in-out infinite",
  },
  loadLabel: {
    fontSize:      10,
    letterSpacing: 5,
    color:         "rgba(255,255,255,0.18)",
    textTransform: "uppercase",
    animation:     "lFade 2s ease-in-out infinite",
  },
};
