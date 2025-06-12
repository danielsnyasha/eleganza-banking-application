export default function LandingContent() {
    return (
      <main className="min-h-[80vh] flex flex-col items-center justify-center px-4">
        <h2 className="text-4xl font-bold mb-4">
          Welcome to <span className="text-sky-500">Eleganza Banking</span>
        </h2>
        <p className="max-w-xl text-center">
          Eleganza offers secure, reliable, and seamless banking solutions. Tailored products to suit all your banking needs.
        </p>
        <div className="mt-8 flex gap-4">
          <Button className="bg-sky-500 hover:bg-sky-600">Open an Account</Button>
          <Button variant="outline">Learn More</Button>
        </div>
      </main>
    );
  }
  