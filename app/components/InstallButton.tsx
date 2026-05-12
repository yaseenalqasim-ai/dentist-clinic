"use client";

import { useEffect, useState } from "react";

export default function InstallButton() {

  const [promptEvent, setPromptEvent] =
    useState<any>(null);

  useEffect(() => {

    window.addEventListener(
      "beforeinstallprompt",
      (e: any) => {

        e.preventDefault();

        setPromptEvent(e);

      }
    );

  }, []);

  async function installApp() {

    if (!promptEvent) return;

    promptEvent.prompt();

    await promptEvent.userChoice;
  }

  if (!promptEvent) return null;

  return (

    <button
      onClick={installApp}

      style={{
        position: "fixed",

        bottom: "20px",

        left: "20px",

        background: "#2563eb",

        color: "white",

        border: "none",

        padding: "15px",

        borderRadius: "15px",

        fontSize: "18px",

        zIndex: 9999,

        cursor: "pointer"
      }}
    >

      📲 تثبيت التطبيق

    </button>

  );

}