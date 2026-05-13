"use client";

import {
  useEffect,
  useState
} from "react";

export default function InstallButton() {

  const [
    promptEvent,
    setPromptEvent
  ] = useState<any>(null);

  const [
    installed,
    setInstalled
  ] = useState(false);

  useEffect(() => {

    window.addEventListener(
      "beforeinstallprompt",
      (e: any) => {

        e.preventDefault();

        setPromptEvent(e);

      }
    );

    window.addEventListener(
      "appinstalled",
      () => {

        setInstalled(true);

      }
    );

  }, []);

  async function installApp() {

    if (!promptEvent) return;

    promptEvent.prompt();

    await promptEvent.userChoice;

  }

  if (
    !promptEvent ||
    installed
  ) return null;

  return (

    <button
      onClick={installApp}

      style={{
        position: "fixed",

        bottom: "20px",

        left: "20px",

        background:
          "linear-gradient(to right,#2563eb,#1d4ed8)",

        color: "white",

        border: "none",

        padding:
          "16px 22px",

        borderRadius:
          "18px",

        fontSize: "18px",

        zIndex: 9999,

        boxShadow:
          "0 10px 30px rgba(0,0,0,0.3)",

        animation:
          "pulse 1.5s infinite"
      }}
    >

      📲 تثبيت التطبيق

      <style>
        {`
          @keyframes pulse {

            0%{
              transform:scale(1);
            }

            50%{
              transform:scale(1.05);
            }

            100%{
              transform:scale(1);
            }

          }
        `}
      </style>

    </button>

  );

}