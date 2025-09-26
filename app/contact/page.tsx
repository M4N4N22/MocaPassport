export default function ContactPage() {
    return (
      <main className="mx-auto max-w-3xl px-6 py-12 sm:py-16">
        <h1 className="text-3xl font-semibold tracking-tight">Request Infrastructure Access</h1>
        <p className="mt-2 text-foreground/70">Tell us about your use case and we’ll reach out.</p>
        <form className="mt-8 grid gap-4">
          <input className="w-full rounded-md border bg-background p-3" placeholder="Company / Team" />
          <input className="w-full rounded-md border bg-background p-3" placeholder="Email" type="email" />
          <textarea className="min-h-28 w-full rounded-md border bg-background p-3" placeholder="Describe your use case" />
          <button type="submit" className="inline-flex h-10 items-center justify-center rounded-md bg-red-600 px-4 text-sm font-medium text-white hover:bg-red-500">Submit</button>
        </form>
      </main>
    );
  }