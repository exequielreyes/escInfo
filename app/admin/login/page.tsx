import { redirect } from "next/navigation";
import { verifyCredentials, createSession } from "@/lib/auth";
import Container from "@/components/Container";

async function login(formData: FormData) {
  "use server";
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");

  let valid = false;
  let errorMessage = "Email o contraseña incorrectos.";

  try {
    valid = await verifyCredentials(email, password);
  } catch (err) {
    errorMessage =
      err instanceof Error ? err.message : "Error de configuración del servidor.";
  }

  if (!valid) {
    redirect(`/admin/login?error=${encodeURIComponent(errorMessage)}`);
  }

  await createSession(email);
  redirect("/admin");
}

export default function AdminLoginPage({
  searchParams,
}: {
  searchParams: { error?: string };
}) {
  return (
    <section className="flex min-h-screen items-center justify-center px-5">
      <Container className="max-w-sm">
        <div className="rounded-lg border border-slate-200 bg-white p-8">
          <p className="eyebrow">// panel de administración</p>
          <h1 className="mt-2 font-display text-2xl font-medium text-ink-900">
            Iniciar sesión
          </h1>

          {searchParams.error && (
            <p className="mt-4 rounded bg-coral/10 px-3 py-2 text-sm text-coral">
              {searchParams.error}
            </p>
          )}

          <form action={login} className="mt-6 space-y-4">
            <div>
              <label className="font-mono text-xs text-slate-500" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="mt-1 w-full rounded border border-slate-200 px-3 py-2 text-sm focus:border-teal-600"
              />
            </div>
            <div>
              <label className="font-mono text-xs text-slate-500" htmlFor="password">
                Contraseña
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="mt-1 w-full rounded border border-slate-200 px-3 py-2 text-sm focus:border-teal-600"
              />
            </div>
            <button
              type="submit"
              className="w-full rounded bg-teal-600 px-4 py-2.5 font-mono text-sm text-white hover:bg-teal-400"
            >
              Ingresar
            </button>
          </form>
        </div>
      </Container>
    </section>
  );
}
