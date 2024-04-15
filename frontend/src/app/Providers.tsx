"use client";
import React, { useEffect, useRef, useState } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { Provider as ReduxProvider } from "react-redux";
import { AppStore, makeStore } from "@/lib/store";
import { persistStore } from "redux-persist";

type Props = {
  children: React.ReactNode;
};

export default function Providers({ children, ...props }: Props) {
  const storeRef = useRef<AppStore>();
  const [reRenderUI, setReRenderUI] = useState(0);

  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore();
  }

  useEffect(() => {
    persistStore(storeRef.current as ReturnType<typeof makeStore>);
    setReRenderUI(reRenderUI + 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ReduxProvider
      store={storeRef.current}
      key={`redux-provider-${reRenderUI}`}
    >
      <NextThemesProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        storageKey="theme"
      >
        {children}
      </NextThemesProvider>
    </ReduxProvider>
  );
}

