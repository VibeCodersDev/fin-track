export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 overflow-hidden">
      {/* Background gradient decoration */}
      <div className="absolute inset-0 -z-10 bg-background">
        <div className="absolute top-[-30%] left-[-20%] h-[600px] w-[600px] rounded-full bg-primary/8 blur-3xl" />
        <div className="absolute bottom-[-20%] right-[-15%] h-[500px] w-[500px] rounded-full bg-purple-500/8 blur-3xl" />
        <div className="absolute top-[20%] right-[10%] h-[300px] w-[300px] rounded-full bg-blue-500/5 blur-3xl" />
      </div>
      <div className="w-full max-w-md">{children}</div>
    </div>
  );
}
