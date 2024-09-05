import CityTable from "@/components/references/city-table";
import CitiesPage from "./cities/page";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <CitiesPage />
    </main>
  );
}
