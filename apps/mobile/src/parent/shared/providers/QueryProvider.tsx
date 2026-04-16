import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// 전역에서 한 번만 쓸 쿼리 클라이언트
const queryClient = new QueryClient();

export function QueryProvider({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
