import { CursorGlow } from "@/components/animations/cursor-glow";
import { Footer } from "@/components/organisms/footer";
import { Navbar } from "@/components/organisms/navbar";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="relative min-h-screen overflow-hidden scanlines">
      <CursorGlow />
      <div className="relative z-10">
        <Navbar />
        {children}
        <Footer />
      </div>
    </main>
  );
}
