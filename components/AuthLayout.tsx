export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center px-4">
      {children}
    </div>
  );
}
