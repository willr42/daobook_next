export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return <main className="flex min-h-screen flex-col sm:flex-row">{children}</main>;
}
