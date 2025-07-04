import TeamGrid from "@/components/AdminPortal/Team/TeamGrid";
import TeamGridFrontend from "@/components/AdminPortal/Team/TeamGridFrontend";


export const metadata = { title: 'Our Team • Eleganza Bank' };

export default function TeamPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12 space-y-10">
      <header className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Meet the Team</h1>
        <p className="text-muted-foreground">
          Dedicated professionals powering Eleganza’s innovative banking.
        </p>
      </header>

      <TeamGridFrontend />
    </div>
  );
}
