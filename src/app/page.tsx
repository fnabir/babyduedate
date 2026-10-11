import Calculator from "@/components/Calculator";
import Result from "@/components/Result";
import { RandomFact } from "@/components/Facts";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col gap-8 items-center justify-start px-4 lg:px-16 py-12 lg:py-16 leading-relaxed text-lg">
      <Header />
      <Calculator />
      <Result />
      <RandomFact />
      <Footer />
    </main>
  );
}
