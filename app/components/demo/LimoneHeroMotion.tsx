"use client";

import { useEffect, useState } from "react";

export default function LimoneHeroMotion() {
  const [lemonKey, setLemonKey] = useState(0);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    const schedule = () => {
      const delay = 9000 + Math.random() * 9000;
      timer = setTimeout(() => {
        setLemonKey((key) => key + 1);
        schedule();
      }, delay);
    };

    schedule();
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="limone-hero-motion" aria-hidden="true">
      <span className="limone-leaf limone-leaf-one" />
      <span className="limone-leaf limone-leaf-two" />
      <span className="limone-leaf limone-leaf-three" />
      <span className="limone-leaf limone-leaf-four" />
      <span key={lemonKey} className="limone-falling-lemon" />
      <style jsx>{`
        .limone-hero-motion {
          position: absolute;
          z-index: 2;
          inset: 0;
          overflow: hidden;
          pointer-events: none;
        }

        .limone-leaf {
          position: absolute;
          width: 82px;
          height: 34px;
          border-radius: 100% 0 100% 0;
          background: linear-gradient(135deg, rgba(123, 157, 60, 0.78), rgba(37, 72, 31, 0.9));
          filter: drop-shadow(0 8px 10px rgba(0, 0, 0, 0.15));
          transform-origin: 0 50%;
          animation: limone-leaf-sway 1.8s ease-in-out infinite alternate;
        }

        .limone-leaf-one {
          top: 18%;
          right: 12%;
          transform: rotate(-26deg);
        }

        .limone-leaf-two {
          top: 31%;
          right: 25%;
          width: 62px;
          height: 26px;
          transform: rotate(32deg);
          animation-delay: -1.4s;
        }

        .limone-leaf-three {
          top: 12%;
          left: 23%;
          width: 58px;
          height: 24px;
          transform: rotate(145deg);
          animation-delay: -2.6s;
        }

        .limone-leaf-four {
          top: 42%;
          left: 38%;
          width: 45px;
          height: 19px;
          transform: rotate(155deg);
          animation-delay: -3.2s;
        }

        .limone-falling-lemon {
          position: absolute;
          top: 23%;
          left: 58%;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: radial-gradient(circle at 35% 30%, #fff1a3 0 12%, #e6c94f 42%, #ae7d1f 100%);
          box-shadow: inset -4px -5px 7px rgba(94, 54, 9, 0.22), 0 7px 14px rgba(0, 0, 0, 0.2);
          opacity: 0;
          animation: limone-lemon-drop 3.8s cubic-bezier(0.25, 0.7, 0.35, 1) forwards;
        }

        .limone-falling-lemon::after {
          content: "";
          position: absolute;
          top: -5px;
          left: 16px;
          width: 12px;
          height: 7px;
          border-radius: 100% 0 100% 0;
          background: #47733a;
          transform: rotate(-24deg);
        }

        @keyframes limone-leaf-sway {
          0% { margin-left: -5px; rotate: -4deg; }
          100% { margin-left: 8px; rotate: 6deg; }
        }

        @keyframes limone-lemon-drop {
          0% { opacity: 0; transform: translate3d(0, -18px, 0) rotate(0deg); }
          10% { opacity: 1; }
          68% { opacity: 1; }
          100% { opacity: 0; transform: translate3d(58px, 610px, 0) rotate(420deg); }
        }

        @media (prefers-reduced-motion: reduce) {
          .limone-leaf,
          .limone-falling-lemon {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}
