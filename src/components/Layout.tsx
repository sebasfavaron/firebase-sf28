import type { ReactNode } from "react";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import Navbar from "./Navbar";

const queryClient = new QueryClient();

export const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <Navbar />
      <main className="mt-16 flex min-h-screen flex-col items-center justify-center overflow-auto bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
        {children}
      </main>
      {/* <Footer /> */}
    </QueryClientProvider>
  );
};
