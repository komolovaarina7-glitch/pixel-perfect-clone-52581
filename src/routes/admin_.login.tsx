import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { LockKeyhole } from "lucide-react";
import { useState, type FormEvent } from "react";
import { getAdminSession, loginAdmin } from "@/lib/api/admin.functions";

export const Route = createFileRoute("/admin_/login")({
  beforeLoad: async () => {
    const session = await getAdminSession();
    if (session.authenticated) throw redirect({ to: "/admin" });
    return { configured: session.configured };
  },
  component: AdminLogin,
});

function AdminLogin() {
  const { configured } = Route.useRouteContext();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError("");
    try {
      const result = await loginAdmin({ data: { email, password } });
      if (result.ok) {
        await navigate({ to: "/admin" });
        return;
      }
      setError(
        result.code === "forbidden"
          ? "У этого аккаунта нет прав администратора."
          : result.code === "not_configured"
            ? "База данных ещё не подключена."
            : "Неверный email или пароль.",
      );
    } catch {
      setError("Не удалось выполнить вход. Попробуйте ещё раз.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="fixed inset-0 z-[100] grid min-h-screen place-items-center overflow-auto bg-[#101412] px-5 py-10 text-white">
      <div className="w-full max-w-md rounded-[28px] border border-white/10 bg-[#181d1a] p-7 shadow-2xl sm:p-9">
        <div className="mb-9 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#d6ff73] text-[#111511]">
          <LockKeyhole size={25} />
        </div>
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#d6ff73]">
          Reposition Lab
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight">Вход в админ‑панель</h1>
        <p className="mt-3 text-sm leading-6 text-white/60">
          Здесь находятся тексты сайта, фотографии, заявки и доступы пользователей.
        </p>

        {!configured ? (
          <div className="mt-7 rounded-2xl border border-amber-300/20 bg-amber-300/10 p-4 text-sm leading-6 text-amber-100">
            Админ‑панель готова, но база данных пока не включена. После подключения Supabase вход
            станет доступен.
          </div>
        ) : null}

        <form onSubmit={submit} className="mt-8 space-y-5">
          <label className="block">
            <span className="mb-2 block text-sm text-white/70">Email</span>
            <input
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="h-12 w-full rounded-xl border border-white/15 bg-white/[0.04] px-4 text-base outline-none transition focus:border-[#d6ff73]/70"
              placeholder="name@example.com"
            />
          </label>
          <label className="block">
            <span className="mb-2 block text-sm text-white/70">Пароль</span>
            <input
              type="password"
              required
              minLength={8}
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="h-12 w-full rounded-xl border border-white/15 bg-white/[0.04] px-4 text-base outline-none transition focus:border-[#d6ff73]/70"
              placeholder="••••••••"
            />
          </label>
          {error ? (
            <p role="alert" className="rounded-xl bg-red-400/10 px-4 py-3 text-sm text-red-200">
              {error}
            </p>
          ) : null}
          <button
            type="submit"
            disabled={busy || !configured}
            className="h-12 w-full rounded-xl bg-[#d6ff73] px-5 text-sm font-semibold text-[#111511] transition hover:bg-[#e3ff9f] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {busy ? "Входим…" : "Войти"}
          </button>
        </form>
        <a href="/" className="mt-6 inline-flex text-sm text-white/50 transition hover:text-white">
          ← Вернуться на сайт
        </a>
      </div>
    </div>
  );
}
