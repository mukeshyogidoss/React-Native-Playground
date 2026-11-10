import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import {
  initNotification,
  setupForegroundNotificationListener,
  checkInitialNotification,
} from "./notifications/notificationServices";

const queryClient = new QueryClient();

export default function RootLayout() {
  useEffect(() => {
    // 1. Initialize notification channels and permissions
    initNotification();

    // 2. Cold-start check: handle app opened directly from a notification tap
    checkInitialNotification();

    // 3. Foreground listener: handle taps when notification appears while app is open
    const unsubscribe = setupForegroundNotificationListener();

    return () => {
      if (typeof unsubscribe === "function") {
        unsubscribe();
      }
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </QueryClientProvider>
  );
}
