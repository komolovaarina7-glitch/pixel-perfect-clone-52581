import { createFileRoute, redirect, useRouter } from "@tanstack/react-router";
import {
  BriefcaseBusiness,
  Check,
  FileText,
  Image as ImageIcon,
  Inbox,
  LayoutDashboard,
  LogOut,
  Menu,
  Plus,
  Save,
  Settings,
  Trash2,
  Upload,
  UserPlus,
  Users,
  X,
} from "lucide-react";
import { useMemo, useState, type FormEvent, type ReactNode } from "react";
import {
  deleteCaseStudy,
  deleteMedia,
  deleteSubmission,
  getAdminPanelData,
  getAdminSession,
  inviteAdminUser,
  logoutAdmin,
  revokeAdminUser,
  saveCaseStudy,
  saveContentItem,
  saveSiteSetting,
  updateSubmissionStatus,
  uploadMedia,
} from "@/lib/api/admin.functions";
import type {
  AdminCaseStudy,
  AdminPanelData,
  AssetSubmissionRow,
  SiteContentItem,
  SiteSetting,
} from "@/lib/admin/types";

export const Route = createFileRoute("/admin")({
  beforeLoad: async () => {
    const session = await getAdminSession();
    if (!session.authenticated) throw redirect({ to: "/admin/login" });
  },
  loader: () => getAdminPanelData(),
  component: AdminPage,
});

type Tab = "overview" | "content" | "cases" | "media" | "submissions" | "users" | "settings";

const tabs: Array<{ id: Tab; label: string; icon: typeof LayoutDashboard }> = [
  { id: "overview", label: "Обзор", icon: LayoutDashboard },
  { id: "content", label: "Контент сайта", icon: FileText },
  { id: "cases", label: "Кейсы", icon: BriefcaseBusiness },
  { id: "media", label: "Фотографии", icon: ImageIcon },
  { id: "submissions", label: "Заявки", icon: Inbox },
  { id: "users", label: "Пользователи", icon: Users },
  { id: "settings", label: "Настройки", icon: Settings },
];

function AdminPage() {
  const result = Route.useLoaderData();
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("overview");
  const [mobileMenu, setMobileMenu] = useState(false);
  const [busy, setBusy] = useState("");
  const [notice, setNotice] = useState<{ type: "success" | "error"; text: string } | null>(null);

  if (!result.ok) {
    return (
      <AdminFrame>
        <div className="mx-auto mt-24 max-w-lg rounded-3xl border border-red-200 bg-white p-8 text-center shadow-sm">
          <h1 className="text-xl font-semibold text-slate-900">Данные пока не загрузились</h1>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Проверьте, что база данных подключена и миграции применены.
          </p>
          <button
            onClick={() => router.invalidate()}
            className="mt-6 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white"
          >
            Повторить
          </button>
        </div>
      </AdminFrame>
    );
  }

  const data = result.data;

  async function runAction(
    key: string,
    action: () => Promise<{ ok: boolean; code?: string }>,
    successText: string,
  ) {
    setBusy(key);
    setNotice(null);
    try {
      const actionResult = await action();
      if (!actionResult.ok) throw new Error(actionResult.code ?? "failed");
      setNotice({ type: "success", text: successText });
      await router.invalidate();
    } catch {
      setNotice({
        type: "error",
        text: "Не удалось сохранить изменение. Проверьте подключение и попробуйте ещё раз.",
      });
    } finally {
      setBusy("");
    }
  }

  async function logout() {
    await logoutAdmin();
    window.location.assign("/admin/login");
  }

  return (
    <AdminFrame>
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 border-r border-slate-200 bg-white lg:block">
        <Sidebar tab={tab} setTab={setTab} email={data.currentUser.email} logout={logout} />
      </aside>

      {mobileMenu ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            aria-label="Закрыть меню"
            className="absolute inset-0 bg-slate-950/40"
            onClick={() => setMobileMenu(false)}
          />
          <aside className="relative h-full w-[min(88vw,320px)] bg-white shadow-2xl">
            <button
              aria-label="Закрыть меню"
              onClick={() => setMobileMenu(false)}
              className="absolute right-4 top-4 rounded-lg p-2 text-slate-500"
            >
              <X size={20} />
            </button>
            <Sidebar
              tab={tab}
              setTab={(next) => {
                setTab(next);
                setMobileMenu(false);
              }}
              email={data.currentUser.email}
              logout={logout}
            />
          </aside>
        </div>
      ) : null}

      <div className="min-h-screen lg:pl-64">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white/95 px-4 backdrop-blur sm:px-7">
          <div className="flex items-center gap-3">
            <button
              aria-label="Открыть меню"
              onClick={() => setMobileMenu(true)}
              className="rounded-xl border border-slate-200 p-2 text-slate-700 lg:hidden"
            >
              <Menu size={20} />
            </button>
            <div>
              <p className="text-xs text-slate-500">Админ‑панель</p>
              <h1 className="text-base font-semibold text-slate-950">
                {tabs.find((item) => item.id === tab)?.label}
              </h1>
            </div>
          </div>
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="rounded-xl border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
          >
            Открыть сайт
          </a>
        </header>

        <main className="p-4 sm:p-7 lg:p-9">
          {notice ? (
            <div
              role="status"
              className={`mb-6 flex items-center gap-3 rounded-2xl px-4 py-3 text-sm ${
                notice.type === "success"
                  ? "bg-emerald-50 text-emerald-800"
                  : "bg-red-50 text-red-800"
              }`}
            >
              {notice.type === "success" ? <Check size={18} /> : <X size={18} />}
              {notice.text}
            </div>
          ) : null}

          {tab === "overview" ? <Overview data={data} setTab={setTab} /> : null}
          {tab === "content" ? (
            <ContentSection data={data.content} busy={busy} runAction={runAction} />
          ) : null}
          {tab === "cases" ? (
            <CasesSection data={data.cases} busy={busy} runAction={runAction} />
          ) : null}
          {tab === "media" ? (
            <MediaSection data={data.media} busy={busy} runAction={runAction} />
          ) : null}
          {tab === "submissions" ? (
            <SubmissionsSection data={data.submissions} busy={busy} runAction={runAction} />
          ) : null}
          {tab === "users" ? (
            <UsersSection data={data.users} busy={busy} runAction={runAction} />
          ) : null}
          {tab === "settings" ? (
            <SettingsSection data={data.settings} busy={busy} runAction={runAction} />
          ) : null}
        </main>
      </div>
    </AdminFrame>
  );
}

function AdminFrame({ children }: { children: ReactNode }) {
  return (
    <div className="fixed inset-0 z-[90] min-h-screen overflow-auto bg-[#f5f7f6] font-sans text-slate-900">
      {children}
    </div>
  );
}

function Sidebar({
  tab,
  setTab,
  email,
  logout,
}: {
  tab: Tab;
  setTab: (tab: Tab) => void;
  email: string;
  logout: () => void;
}) {
  return (
    <div className="flex h-full flex-col p-4">
      <div className="px-3 pb-7 pt-3">
        <div className="text-lg font-bold tracking-tight">REPOSITION LAB</div>
        <div className="mt-1 text-xs text-slate-500">Управление сайтом</div>
      </div>
      <nav className="space-y-1">
        {tabs.map((item) => {
          const Icon = item.icon;
          const active = item.id === tab;
          return (
            <button
              key={item.id}
              onClick={() => setTab(item.id)}
              className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium transition ${
                active
                  ? "bg-[#e8f8bb] text-[#28320e]"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"
              }`}
            >
              <Icon size={19} />
              {item.label}
            </button>
          );
        })}
      </nav>
      <div className="mt-auto rounded-2xl bg-slate-100 p-3">
        <p className="truncate text-xs text-slate-500">{email}</p>
        <button
          onClick={logout}
          className="mt-3 flex items-center gap-2 text-sm font-medium text-slate-700 hover:text-slate-950"
        >
          <LogOut size={16} /> Выйти
        </button>
      </div>
    </div>
  );
}

function Overview({ data, setTab }: { data: AdminPanelData; setTab: (tab: Tab) => void }) {
  const newSubmissions = data.submissions.filter((item) => item.status === "new").length;
  const cards: Array<{
    label: string;
    value: number;
    tab: Tab;
    icon: typeof FileText;
    hint: string;
  }> = [
    {
      label: "Тексты",
      value: data.content.length,
      tab: "content",
      icon: FileText,
      hint: "редактируемых блоков",
    },
    {
      label: "Кейсы",
      value: data.cases.length,
      tab: "cases",
      icon: BriefcaseBusiness,
      hint: "материалов в базе",
    },
    {
      label: "Фотографии",
      value: data.media.length,
      tab: "media",
      icon: ImageIcon,
      hint: "файлов загружено",
    },
    {
      label: "Новые заявки",
      value: newSubmissions,
      tab: "submissions",
      icon: Inbox,
      hint: "нужно посмотреть",
    },
  ];

  return (
    <div className="mx-auto max-w-7xl">
      <section className="rounded-[28px] bg-[#172019] p-6 text-white sm:p-9">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#d6ff73]">
          Всё в одном месте
        </p>
        <h2 className="mt-4 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
          Добро пожаловать в управление Reposition Lab
        </h2>
        <p className="mt-4 max-w-2xl text-sm leading-6 text-white/60">
          Меняйте материалы сайта, просматривайте обращения и управляйте доступом команды.
        </p>
      </section>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <button
              key={card.label}
              onClick={() => setTab(card.tab)}
              className="rounded-3xl border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="flex items-start justify-between">
                <div className="rounded-xl bg-slate-100 p-2.5 text-slate-700">
                  <Icon size={20} />
                </div>
                <span className="text-3xl font-semibold">{card.value}</span>
              </div>
              <h3 className="mt-6 font-semibold">{card.label}</h3>
              <p className="mt-1 text-xs text-slate-500">{card.hint}</p>
            </button>
          );
        })}
      </div>
      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <Panel title="Последние заявки" description="Самые свежие обращения с сайта">
          {data.submissions.length ? (
            <div className="divide-y divide-slate-100">
              {data.submissions.slice(0, 4).map((item) => (
                <button
                  key={item.id}
                  onClick={() => setTab("submissions")}
                  className="flex w-full items-center justify-between gap-4 py-4 text-left"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold">{item.contact_name}</p>
                    <p className="truncate text-xs text-slate-500">
                      {item.asset_type} · {item.location}
                    </p>
                  </div>
                  <Status status={item.status} />
                </button>
              ))}
            </div>
          ) : (
            <Empty text="Заявок пока нет." />
          )}
        </Panel>
        <Panel title="Доступ команды" description="Администраторы панели">
          <div className="space-y-3">
            {data.users.slice(0, 5).map((user) => (
              <div key={user.id} className="flex items-center gap-3 rounded-2xl bg-slate-50 p-3">
                <div className="grid h-9 w-9 place-items-center rounded-full bg-[#e8f8bb] text-xs font-bold">
                  {user.email.slice(0, 1).toUpperCase()}
                </div>
                <p className="truncate text-sm font-medium">{user.email}</p>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </div>
  );
}

type RunAction = (
  key: string,
  action: () => Promise<{ ok: boolean; code?: string }>,
  successText: string,
) => Promise<void>;

function ContentSection({
  data,
  busy,
  runAction,
}: {
  data: SiteContentItem[];
  busy: string;
  runAction: RunAction;
}) {
  const [group, setGroup] = useState("home");
  const [search, setSearch] = useState("");
  const groups = useMemo(() => Array.from(new Set(data.map((item) => item.group_name))), [data]);
  const visibleItems = useMemo(() => {
    const query = search.trim().toLowerCase();
    return data.filter((item) => {
      if (group !== "all" && item.group_name !== group) return false;
      if (!query) return true;
      return [item.label, item.content_key, item.value_en, item.value_ru].some((value) =>
        value.toLowerCase().includes(query),
      );
    });
  }, [data, group, search]);
  const groupLabel = (value: string) => {
    const labels: Record<string, string> = {
      common: "Общие кнопки и подписи",
      header: "Шапка и меню",
      footer: "Подвал сайта",
      home: "Главная",
      who: "Кто мы",
      services: "Услуги",
      cases: "Страница кейсов",
      approach: "Подход",
    };
    if (value.startsWith("case-")) return `Кейс: ${value.slice(5)}`;
    return labels[value] ?? value;
  };

  return (
    <Section
      title="Контент сайта"
      description="Редактируйте английскую и русскую версии. Изменение появится после сохранения."
    >
      <div className="mb-5 grid gap-3 rounded-2xl border border-slate-200 bg-white p-4 sm:grid-cols-2">
        <Field label="Раздел сайта">
          <select value={group} onChange={(event) => setGroup(event.target.value)} className={controlClass}>
            <option value="all">Все разделы</option>
            {groups.map((value) => (
              <option key={value} value={value}>
                {groupLabel(value)}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Найти текст">
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Введите слово или фразу"
            className={controlClass}
          />
        </Field>
      </div>
      <div className="space-y-4">
        {visibleItems.map((item) => (
          <ContentEditor key={item.id} item={item} busy={busy} runAction={runAction} />
        ))}
        {!data.length ? <Empty text="Текстовые блоки появятся после подключения базы." /> : null}
        {data.length && !visibleItems.length ? <Empty text="В этом разделе ничего не найдено." /> : null}
      </div>
    </Section>
  );
}

function ContentEditor({
  item,
  busy,
  runAction,
}: {
  item: SiteContentItem;
  busy: string;
  runAction: RunAction;
}) {
  const [en, setEn] = useState(item.value_en);
  const [ru, setRu] = useState(item.value_ru);
  const [published, setPublished] = useState(item.published);
  const key = `content-${item.id}`;
  return (
    <Panel title={item.label} description={`${item.group_name} · ${item.content_key}`}>
      <div className="grid gap-4 lg:grid-cols-2">
        <Field label="English">
          <textarea
            value={en}
            onChange={(event) => setEn(event.target.value)}
            rows={5}
            className={controlClass}
          />
        </Field>
        <Field label="Русский">
          <textarea
            value={ru}
            onChange={(event) => setRu(event.target.value)}
            rows={5}
            className={controlClass}
          />
        </Field>
      </div>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <label className="flex items-center gap-2 text-sm text-slate-600">
          <input
            type="checkbox"
            checked={published}
            onChange={(event) => setPublished(event.target.checked)}
          />
          Показывать на сайте
        </label>
        <ActionButton
          busy={busy === key}
          onClick={() =>
            runAction(
              key,
              () =>
                saveContentItem({
                  data: {
                    id: item.id,
                    groupName: item.group_name,
                    contentKey: item.content_key,
                    label: item.label,
                    valueEn: en,
                    valueRu: ru,
                    published,
                  },
                }),
              "Текст сохранён.",
            )
          }
        >
          <Save size={16} /> Сохранить
        </ActionButton>
      </div>
    </Panel>
  );
}

function CasesSection({
  data,
  busy,
  runAction,
}: {
  data: AdminCaseStudy[];
  busy: string;
  runAction: RunAction;
}) {
  const [adding, setAdding] = useState(false);
  return (
    <Section
      title="Кейсы"
      description="Создавайте карточки объектов и управляйте их публикацией."
      action={
        <button onClick={() => setAdding(true)} className={primaryButtonClass}>
          <Plus size={17} /> Добавить кейс
        </button>
      }
    >
      <div className="space-y-4">
        {adding ? (
          <CaseEditor
            item={emptyCase}
            busy={busy}
            runAction={runAction}
            onCancel={() => setAdding(false)}
          />
        ) : null}
        {data.map((item) => (
          <CaseEditor key={item.id} item={item} busy={busy} runAction={runAction} />
        ))}
        {!data.length && !adding ? <Empty text="Кейсов в базе пока нет." /> : null}
      </div>
    </Section>
  );
}

const emptyCase: AdminCaseStudy = {
  id: "",
  slug: "",
  title_en: "",
  title_ru: "",
  theme_en: "",
  theme_ru: "",
  challenge_en: "",
  challenge_ru: "",
  logic_en: "",
  logic_ru: "",
  direction_en: "",
  direction_ru: "",
  image_url: "",
  published: false,
  sort_order: 100,
  updated_at: "",
};

function CaseEditor({
  item,
  busy,
  runAction,
  onCancel,
}: {
  item: AdminCaseStudy;
  busy: string;
  runAction: RunAction;
  onCancel?: () => void;
}) {
  const [form, setForm] = useState(item);
  const key = `case-${item.id || "new"}`;
  const update = <K extends keyof AdminCaseStudy>(field: K, value: AdminCaseStudy[K]) =>
    setForm((current) => ({ ...current, [field]: value }));

  async function save() {
    await runAction(
      key,
      () =>
        saveCaseStudy({
          data: {
            ...(form.id ? { id: form.id } : {}),
            slug: form.slug,
            titleEn: form.title_en,
            titleRu: form.title_ru,
            themeEn: form.theme_en,
            themeRu: form.theme_ru,
            challengeEn: form.challenge_en,
            challengeRu: form.challenge_ru,
            logicEn: form.logic_en,
            logicRu: form.logic_ru,
            directionEn: form.direction_en,
            directionRu: form.direction_ru,
            imageUrl: form.image_url,
            published: form.published,
            sortOrder: Number(form.sort_order),
          },
        }),
      "Кейс сохранён.",
    );
    onCancel?.();
  }

  return (
    <Panel
      title={form.title_ru || form.title_en || "Новый кейс"}
      description={form.slug || "Заполните адрес страницы"}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Адрес страницы (латиницей)">
          <input
            value={form.slug}
            onChange={(event) =>
              update(
                "slug",
                event.target.value
                  .toLowerCase()
                  .replace(/[^a-z0-9-]+/g, "-")
                  .replace(/^-+|-+$/g, ""),
              )
            }
            placeholder="slovenia-castle"
            className={controlClass}
          />
        </Field>
        <Field label="Порядок">
          <input
            type="number"
            min={0}
            value={form.sort_order}
            onChange={(event) => update("sort_order", Number(event.target.value))}
            className={controlClass}
          />
        </Field>
        <Field label="Название — English">
          <input
            value={form.title_en}
            onChange={(event) => update("title_en", event.target.value)}
            className={controlClass}
          />
        </Field>
        <Field label="Название — Русский">
          <input
            value={form.title_ru}
            onChange={(event) => update("title_ru", event.target.value)}
            className={controlClass}
          />
        </Field>
        <Field label="Тема — English">
          <input
            value={form.theme_en}
            onChange={(event) => update("theme_en", event.target.value)}
            className={controlClass}
          />
        </Field>
        <Field label="Тема — Русский">
          <input
            value={form.theme_ru}
            onChange={(event) => update("theme_ru", event.target.value)}
            className={controlClass}
          />
        </Field>
      </div>
      <Field label="Ссылка на фотографию">
        <input
          value={form.image_url}
          onChange={(event) => update("image_url", event.target.value)}
          placeholder="Скопируйте ссылку из раздела «Фотографии»"
          className={controlClass}
        />
      </Field>
      <BilingualAreas
        label="Проблема объекта"
        en={form.challenge_en}
        ru={form.challenge_ru}
        setEn={(value) => update("challenge_en", value)}
        setRu={(value) => update("challenge_ru", value)}
      />
      <BilingualAreas
        label="Логика решения"
        en={form.logic_en}
        ru={form.logic_ru}
        setEn={(value) => update("logic_en", value)}
        setRu={(value) => update("logic_ru", value)}
      />
      <BilingualAreas
        label="Направление"
        en={form.direction_en}
        ru={form.direction_ru}
        setEn={(value) => update("direction_en", value)}
        setRu={(value) => update("direction_ru", value)}
      />
      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <label className="flex items-center gap-2 text-sm text-slate-600">
          <input
            type="checkbox"
            checked={form.published}
            onChange={(event) => update("published", event.target.checked)}
          />
          Опубликован
        </label>
        <div className="flex gap-2">
          {onCancel ? (
            <button onClick={onCancel} className={secondaryButtonClass}>
              Отмена
            </button>
          ) : null}
          {form.id ? (
            <button
              onClick={() => {
                if (!window.confirm("Удалить этот кейс?")) return;
                void runAction(
                  `delete-${form.id}`,
                  () => deleteCaseStudy({ data: { id: form.id } }),
                  "Кейс удалён.",
                );
              }}
              disabled={busy === `delete-${form.id}`}
              className={dangerButtonClass}
            >
              <Trash2 size={16} />
            </button>
          ) : null}
          <ActionButton busy={busy === key} onClick={save}>
            <Save size={16} /> Сохранить
          </ActionButton>
        </div>
      </div>
    </Panel>
  );
}

function BilingualAreas({
  label,
  en,
  ru,
  setEn,
  setRu,
}: {
  label: string;
  en: string;
  ru: string;
  setEn: (value: string) => void;
  setRu: (value: string) => void;
}) {
  return (
    <div className="mt-5">
      <p className="mb-2 text-sm font-semibold text-slate-800">{label}</p>
      <div className="grid gap-4 lg:grid-cols-2">
        <Field label="English">
          <textarea
            rows={4}
            value={en}
            onChange={(event) => setEn(event.target.value)}
            className={controlClass}
          />
        </Field>
        <Field label="Русский">
          <textarea
            rows={4}
            value={ru}
            onChange={(event) => setRu(event.target.value)}
            className={controlClass}
          />
        </Field>
      </div>
    </div>
  );
}

function MediaSection({
  data,
  busy,
  runAction,
}: {
  data: AdminPanelData["media"];
  busy: string;
  runAction: RunAction;
}) {
  const [file, setFile] = useState<File | null>(null);
  const [altEn, setAltEn] = useState("");
  const [altRu, setAltRu] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!file) return;
    const base64 = await fileToBase64(file);
    await runAction(
      "upload-media",
      () =>
        uploadMedia({
          data: {
            name: file.name,
            mimeType: file.type as "image/jpeg" | "image/png" | "image/webp",
            base64,
            altEn,
            altRu,
          },
        }),
      "Фотография загружена.",
    );
    setFile(null);
    setAltEn("");
    setAltRu("");
  }

  return (
    <Section
      title="Фотографии"
      description="JPG, PNG или WebP до 10 МБ. После загрузки ссылку можно использовать в кейсах."
    >
      <Panel title="Загрузить фотографию" description="Файл сохранится в защищённом хранилище">
        <form onSubmit={submit}>
          <label className="flex min-h-36 cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-5 text-center transition hover:border-slate-500">
            <Upload size={24} className="text-slate-500" />
            <span className="mt-3 text-sm font-semibold">
              {file ? file.name : "Выберите фотографию"}
            </span>
            <span className="mt-1 text-xs text-slate-500">Нажмите здесь</span>
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className="sr-only"
              onChange={(event) => setFile(event.target.files?.[0] ?? null)}
            />
          </label>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <Field label="Описание — English">
              <input
                value={altEn}
                onChange={(event) => setAltEn(event.target.value)}
                className={controlClass}
              />
            </Field>
            <Field label="Описание — Русский">
              <input
                value={altRu}
                onChange={(event) => setAltRu(event.target.value)}
                className={controlClass}
              />
            </Field>
          </div>
          <div className="mt-4 flex justify-end">
            <ActionButton busy={busy === "upload-media"} disabled={!file} type="submit">
              <Upload size={16} /> Загрузить
            </ActionButton>
          </div>
        </form>
      </Panel>

      <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {data.map((asset) => (
          <div
            key={asset.id}
            className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"
          >
            <div className="aspect-[4/3] bg-slate-100">
              <img
                src={asset.public_url}
                alt={asset.alt_ru || asset.alt_en || asset.name}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="p-4">
              <p className="truncate text-sm font-semibold">{asset.name}</p>
              <p className="mt-1 text-xs text-slate-500">
                {(asset.size_bytes / 1024 / 1024).toFixed(1)} МБ
              </p>
              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => {
                    void navigator.clipboard.writeText(asset.public_url);
                  }}
                  className={`${secondaryButtonClass} flex-1`}
                >
                  Копировать ссылку
                </button>
                <button
                  aria-label="Удалить фотографию"
                  onClick={() => {
                    if (!window.confirm("Удалить эту фотографию?")) return;
                    void runAction(
                      `media-${asset.id}`,
                      () =>
                        deleteMedia({
                          data: { id: asset.id, storagePath: asset.storage_path },
                        }),
                      "Фотография удалена.",
                    );
                  }}
                  disabled={busy === `media-${asset.id}`}
                  className={dangerButtonClass}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {!data.length ? <Empty text="Загруженных фотографий пока нет." /> : null}
    </Section>
  );
}

function SubmissionsSection({
  data,
  busy,
  runAction,
}: {
  data: AssetSubmissionRow[];
  busy: string;
  runAction: RunAction;
}) {
  const [filter, setFilter] = useState<"all" | AssetSubmissionRow["status"]>("all");
  const visible = useMemo(
    () => (filter === "all" ? data : data.filter((item) => item.status === filter)),
    [data, filter],
  );

  return (
    <Section
      title="Заявки"
      description="Конфиденциальные обращения, отправленные через форму на сайте."
      action={
        <select
          value={filter}
          onChange={(event) =>
            setFilter(event.target.value as "all" | AssetSubmissionRow["status"])
          }
          className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm"
        >
          <option value="all">Все</option>
          <option value="new">Новые</option>
          <option value="reviewing">В работе</option>
          <option value="closed">Закрытые</option>
          <option value="rejected">Отклонённые</option>
        </select>
      }
    >
      <div className="space-y-4">
        {visible.map((item) => (
          <Panel
            key={item.id}
            title={`${item.contact_name} — ${item.asset_type}`}
            description={`${formatDate(item.created_at)} · ${item.location}`}
          >
            <div className="grid gap-5 lg:grid-cols-[1fr_260px]">
              <div>
                <p className="text-sm leading-6 text-slate-700">{item.challenge}</p>
                <dl className="mt-5 grid gap-3 text-sm sm:grid-cols-2">
                  <Info label="Email" value={item.contact_email} />
                  <Info label="Компания" value={item.organization || "—"} />
                  <Info label="Состояние" value={item.condition || "—"} />
                  <Info label="Владение" value={item.ownership || "—"} />
                  <Info label="Связаться через" value={item.contact_method} />
                  <Info label="Язык" value={item.locale.toUpperCase()} />
                </dl>
              </div>
              <div className="rounded-2xl bg-slate-50 p-4">
                <Field label="Статус">
                  <select
                    value={item.status}
                    disabled={busy === `submission-${item.id}`}
                    onChange={(event) => {
                      const status = event.target.value as AssetSubmissionRow["status"];
                      void runAction(
                        `submission-${item.id}`,
                        () => updateSubmissionStatus({ data: { id: item.id, status } }),
                        "Статус заявки обновлён.",
                      );
                    }}
                    className={controlClass}
                  >
                    <option value="new">Новая</option>
                    <option value="reviewing">В работе</option>
                    <option value="closed">Закрыта</option>
                    <option value="rejected">Отклонена</option>
                  </select>
                </Field>
                <a
                  href={`mailto:${item.contact_email}`}
                  className={`${primaryButtonClass} mt-3 w-full justify-center`}
                >
                  Написать
                </a>
                <button
                  onClick={() => {
                    if (!window.confirm("Безвозвратно удалить эту заявку?")) return;
                    void runAction(
                      `delete-submission-${item.id}`,
                      () => deleteSubmission({ data: { id: item.id } }),
                      "Заявка удалена.",
                    );
                  }}
                  className={`${dangerButtonClass} mt-2 w-full justify-center`}
                >
                  <Trash2 size={16} /> Удалить
                </button>
              </div>
            </div>
          </Panel>
        ))}
        {!visible.length ? <Empty text="Заявок с таким статусом нет." /> : null}
      </div>
    </Section>
  );
}

function UsersSection({
  data,
  busy,
  runAction,
}: {
  data: AdminPanelData["users"];
  busy: string;
  runAction: RunAction;
}) {
  const [email, setEmail] = useState("");
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await runAction(
      "invite-user",
      () => inviteAdminUser({ data: { email } }),
      "Приглашение отправлено.",
    );
    setEmail("");
  }

  return (
    <Section
      title="Пользователи"
      description="Только администраторы из этого списка могут войти в панель."
    >
      <Panel title="Пригласить администратора" description="Пользователь получит письмо">
        <form onSubmit={submit} className="flex flex-col gap-3 sm:flex-row">
          <input
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="email@example.com"
            className={`${controlClass} flex-1`}
          />
          <ActionButton busy={busy === "invite-user"} type="submit">
            <UserPlus size={16} /> Пригласить
          </ActionButton>
        </form>
      </Panel>
      <div className="mt-5 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        {data.map((user) => (
          <div
            key={user.id}
            className="flex flex-col gap-4 border-b border-slate-100 p-5 last:border-0 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="flex min-w-0 items-center gap-3">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#e8f8bb] text-sm font-bold">
                {user.email.slice(0, 1).toUpperCase()}
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold">{user.email}</p>
                <p className="text-xs text-slate-500">
                  Последний вход:{" "}
                  {user.lastSignInAt ? formatDate(user.lastSignInAt) : "ещё не входил"}
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                if (!window.confirm("Убрать права администратора?")) return;
                void runAction(
                  `revoke-${user.id}`,
                  () => revokeAdminUser({ data: { id: user.id } }),
                  "Доступ администратора отключён.",
                );
              }}
              disabled={busy === `revoke-${user.id}`}
              className={dangerButtonClass}
            >
              Отключить доступ
            </button>
          </div>
        ))}
      </div>
    </Section>
  );
}

function SettingsSection({
  data,
  busy,
  runAction,
}: {
  data: SiteSetting[];
  busy: string;
  runAction: RunAction;
}) {
  return (
    <Section
      title="Настройки"
      description="Основные данные компании, которые используются на сайте."
    >
      <div className="space-y-4">
        {data.map((setting) => (
          <SettingEditor
            key={setting.setting_key}
            setting={setting}
            busy={busy}
            runAction={runAction}
          />
        ))}
        {!data.length ? <Empty text="Настройки появятся после подключения базы." /> : null}
      </div>
    </Section>
  );
}

function SettingEditor({
  setting,
  busy,
  runAction,
}: {
  setting: SiteSetting;
  busy: string;
  runAction: RunAction;
}) {
  const [value, setValue] = useState(setting.value);
  const key = `setting-${setting.setting_key}`;
  return (
    <Panel title={setting.label} description={setting.setting_key}>
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          value={value}
          onChange={(event) => setValue(event.target.value)}
          className={`${controlClass} flex-1`}
        />
        <ActionButton
          busy={busy === key}
          onClick={() =>
            runAction(
              key,
              () =>
                saveSiteSetting({
                  data: {
                    key: setting.setting_key,
                    label: setting.label,
                    value,
                  },
                }),
              "Настройка сохранена.",
            )
          }
        >
          <Save size={16} /> Сохранить
        </ActionButton>
      </div>
    </Panel>
  );
}

function Section({
  title,
  description,
  action,
  children,
}: {
  title: string;
  description: string;
  action?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="mx-auto max-w-7xl">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-slate-950">{title}</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">{description}</p>
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}

function Panel({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-5">
        <h3 className="font-semibold text-slate-950">{title}</h3>
        {description ? <p className="mt-1 text-xs text-slate-500">{description}</p> : null}
      </div>
      {children}
    </section>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-semibold text-slate-600">{label}</span>
      {children}
    </label>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs text-slate-500">{label}</dt>
      <dd className="mt-1 break-words font-medium text-slate-800">{value}</dd>
    </div>
  );
}

function Status({ status }: { status: AssetSubmissionRow["status"] }) {
  const label = {
    new: "Новая",
    reviewing: "В работе",
    closed: "Закрыта",
    rejected: "Отклонена",
  }[status];
  const style = {
    new: "bg-blue-50 text-blue-700",
    reviewing: "bg-amber-50 text-amber-700",
    closed: "bg-emerald-50 text-emerald-700",
    rejected: "bg-slate-100 text-slate-600",
  }[status];
  return <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${style}`}>{label}</span>;
}

function Empty({ text }: { text: string }) {
  return (
    <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center text-sm text-slate-500">
      {text}
    </div>
  );
}

function ActionButton({
  busy,
  disabled,
  type = "button",
  onClick,
  children,
}: {
  busy: boolean;
  disabled?: boolean;
  type?: "button" | "submit";
  onClick?: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={busy || disabled}
      className={primaryButtonClass}
    >
      {busy ? "Сохраняем…" : children}
    </button>
  );
}

function formatDate(value: string) {
  if (!value) return "—";
  return new Intl.DateTimeFormat("ru", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

function fileToBase64(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("File could not be read."));
    reader.onload = () => {
      const result = String(reader.result ?? "");
      resolve(result.slice(result.indexOf(",") + 1));
    };
    reader.readAsDataURL(file);
  });
}

const controlClass =
  "min-h-11 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-500 focus:ring-2 focus:ring-slate-100";
const primaryButtonClass =
  "inline-flex min-h-11 items-center gap-2 rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50";
const secondaryButtonClass =
  "inline-flex min-h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50";
const dangerButtonClass =
  "inline-flex min-h-10 items-center gap-2 rounded-xl border border-red-100 bg-red-50 px-3 py-2 text-sm font-semibold text-red-700 transition hover:bg-red-100 disabled:opacity-50";
