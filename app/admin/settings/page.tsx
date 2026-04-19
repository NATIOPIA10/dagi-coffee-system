"use client";

import { useEffect, useState, useRef } from "react";
import { supabase } from "../../../lib/supabase";
import { useRouter } from "next/navigation";
import { saveSettingsAction } from "../../actions/settings";

type Settings = {
  store_name: string;
  phone_number: string;
  store_address: string;
  hours_weekday: string;
  hours_weekend: string;
  contact_email: string;
  hero_tagline: string;
  about_title: string;
  about_body_1: string;
  about_body_2: string;
  hero_image_url: string;
  about_image_1_url: string;
  about_image_2_url: string;
  about_image_3_url: string;
  map_image_url: string;
  visit_us_title: string;
};

const defaultSettings: Settings = {
  store_name: "",
  phone_number: "",
  store_address: "",
  hours_weekday: "",
  hours_weekend: "",
  contact_email: "",
  hero_tagline: "",
  about_title: "",
  about_body_1: "",
  about_body_2: "",
  hero_image_url: "",
  about_image_1_url: "",
  about_image_2_url: "",
  about_image_3_url: "",
  map_image_url: "",
  visit_us_title: "",
};

type Tab = "store" | "content" | "images";

type ImageField =
  | "hero_image_url"
  | "about_image_1_url"
  | "about_image_2_url"
  | "about_image_3_url"
  | "map_image_url";

type UploadState = {
  [K in ImageField]?: { uploading: boolean; preview: string | null };
};

const IMAGE_FIELDS: { key: ImageField; label: string; description: string; fallback: string }[] = [
  {
    key: "hero_image_url",
    label: "Hero Background",
    description: "Full-width hero image on the homepage.",
    fallback: "https://lh3.googleusercontent.com/aida-public/AB6AXuArUShAhW61dEAatKNSpqRWVJXFg_8IROO8pPR69SztieNPEtbEX33tA8BH9PDS1A7M8esbod_KGL8Cf8N0AtnMl3iTN_cdrhIsD4frmpv1SdSDHyQHl69zTE926i9roUx7sGmMp_f-9NMx0sp7iGXEQX4ge77hmswwxANoJUAXX6y9pYbbxNKJqW8lu5zebYIHudrzoBqU4WloaZ1rPAjV8J-Ktoky-ztWsSwA9YKK_KvpDiLsu3R5mHbNcrnQvn3xd3Nt8ANoaQ",
  },
  {
    key: "about_image_1_url",
    label: "About: Barista Photo",
    description: "Tall portrait-style photo in the About section.",
    fallback: "https://lh3.googleusercontent.com/aida-public/AB6AXuCcyphmQv3IxpXTfM6Z1ZQ820g4sAkRj9Udg4WXGwGmHhwvP101mJ_kEX6Z1Y7RSiFn3t2NOuxps1EVWrsCfr7nTPHmBYTajhQZ7pX1XrDvUPIDo-paTeogbkF0frJW7mdhcg6tmcJUst49CnAZDBmDzdAb-Wtwrx03FjlypbtQRdJ9buDl7bFZC8nilDktf5T1kGe6izTbI7hGUAiQC_7ODWBYytqi2y7VgJfTe_qKJfK-bxF_g8saG5pELY6MEbwSSD8zxwZlZw",
  },
  {
    key: "about_image_2_url",
    label: "About: Roasting Beans",
    description: "Square photo of coffee beans being roasted.",
    fallback: "/roasting_beans.png",
  },
  {
    key: "about_image_3_url",
    label: "About: Cafe Interior",
    description: "Tall photo of the cafe interior.",
    fallback: "/cafe_interior.png",
  },
  {
    key: "map_image_url",
    label: "Location Map Image",
    description: "Map placeholder shown in the Visit Us section.",
    fallback: "/map.png",
  },
];

export default function AdminSettingsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>("store");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [uploadState, setUploadState] = useState<UploadState>({});
  const fileRefs = useRef<{ [K in ImageField]?: HTMLInputElement | null }>({});

  useEffect(() => {
    async function fetchSettings() {
      const { data } = await supabase.from("store_settings").select("*").eq("id", 1).single();
      if (data) {
        setSettings({ ...defaultSettings, ...data });
      }
      setLoading(false);
    }
    fetchSettings();
  }, []);

  function handleTextChange(field: keyof Settings, value: string) {
    setSettings((prev) => ({ ...prev, [field]: value }));
  }

  async function handleImageUpload(field: ImageField, file: File) {
    // Preview immediately
    const previewUrl = URL.createObjectURL(file);
    setUploadState((prev) => ({
      ...prev,
      [field]: { uploading: true, preview: previewUrl },
    }));

    const fileExt = file.name.split(".").pop();
    const fileName = `${field}_${Date.now()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from("menu_images")
      .upload(fileName, file, { cacheControl: "3600", upsert: true });

    if (uploadError) {
      setMessage({ type: "error", text: "Image upload failed: " + uploadError.message });
      setUploadState((prev) => ({ ...prev, [field]: { uploading: false, preview: null } }));
      return;
    }

    const { data } = supabase.storage.from("menu_images").getPublicUrl(fileName);
    setSettings((prev) => ({ ...prev, [field]: data.publicUrl }));
    setUploadState((prev) => ({ ...prev, [field]: { uploading: false, preview: data.publicUrl } }));
  }

  async function handleSave() {
    setSaving(true);
    setMessage(null);

    try {
      // Server Action: updates DB + calls revalidatePath so the live website
      // immediately reflects the new settings without a manual page refresh.
      await saveSettingsAction(settings);
      setMessage({ type: "success", text: "All changes saved! The website has been updated." });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Unknown error";
      setMessage({ type: "error", text: "Error saving: " + msg });
    } finally {
      setSaving(false);
    }
  }

  const tabs: { id: Tab; label: string; icon: string }[] = [
    { id: "store", label: "Store Info", icon: "storefront" },
    { id: "content", label: "Page Content", icon: "article" },
    { id: "images", label: "Images", icon: "image" },
  ];

  if (loading) {
    return (
      <div className="p-8 max-w-4xl mx-auto flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-4">
          <span className="material-symbols-outlined animate-spin text-primary text-5xl">progress_activity</span>
          <p className="text-on-surface-variant font-medium">Loading settings…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="font-serif text-3xl text-primary font-bold">Website Settings</h1>
          <p className="text-on-surface-variant mt-2">
            Control every piece of content on your public website from here.
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-primary text-on-primary px-6 py-3 rounded-xl font-bold hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center gap-2 flex-shrink-0"
        >
          {saving ? (
            <span className="material-symbols-outlined animate-spin text-[20px]">progress_activity</span>
          ) : (
            <span className="material-symbols-outlined text-[20px]">save</span>
          )}
          {saving ? "Saving…" : "Save Changes"}
        </button>
      </div>

      {/* Toast */}
      {message && (
        <div
          className={`mb-6 p-4 rounded-xl flex items-center gap-3 font-medium transition-all ${
            message.type === "success"
              ? "bg-green-100 text-green-800 border border-green-200"
              : "bg-red-100 text-red-800 border border-red-200"
          }`}
        >
          <span className="material-symbols-outlined">
            {message.type === "success" ? "check_circle" : "error"}
          </span>
          {message.text}
          <button onClick={() => setMessage(null)} className="ml-auto opacity-60 hover:opacity-100">
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-1 bg-surface-container-low p-1 rounded-2xl mb-8 border border-outline-variant/20">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-medium text-sm transition-all ${
              activeTab === tab.id
                ? "bg-surface-container-lowest text-primary shadow-sm"
                : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container"
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* ── TAB: Store Info ── */}
      {activeTab === "store" && (
        <div className="space-y-6">
          <SectionCard title="Store Identity" icon="storefront">
            <Field label="Store Name" required>
              <TextInput
                value={settings.store_name}
                onChange={(v) => handleTextChange("store_name", v)}
                placeholder="e.g. Dagi Coffee"
              />
            </Field>
          </SectionCard>

          <SectionCard title="Visit Us & Contact" icon="location_on">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Field label="Section Title" className="md:col-span-2">
                <TextInput
                  value={settings.visit_us_title}
                  onChange={(v) => handleTextChange("visit_us_title", v)}
                  placeholder="e.g. Visit Us or Find Us"
                />
              </Field>
              <Field label="Store Address" className="md:col-span-2">
                <TextInput
                  value={settings.store_address}
                  onChange={(v) => handleTextChange("store_address", v)}
                  placeholder="Dilla, SNNPR, Ethiopia"
                />
              </Field>
              <Field label="Phone Number" required>
                <TextInput
                  type="tel"
                  value={settings.phone_number}
                  onChange={(v) => handleTextChange("phone_number", v)}
                  placeholder="+251 911 234 567"
                />
              </Field>
              <Field label="Contact Email">
                <TextInput
                  type="email"
                  value={settings.contact_email}
                  onChange={(v) => handleTextChange("contact_email", v)}
                  placeholder="hello@dagicoffee.com"
                />
              </Field>

              <div className="md:col-span-2 pt-6 border-t border-outline-variant/10">
                <label className="block text-sm font-bold text-on-surface mb-2">Location Map Image</label>
                <p className="text-xs text-on-surface-variant mb-4">
                  The map image shown on the homepage Visit Us section.
                </p>
                <div className="flex flex-col sm:flex-row gap-6 bg-surface-container p-4 rounded-xl border border-outline-variant/20">
                  <div className="relative flex-shrink-0 w-32 h-24 rounded-lg overflow-hidden bg-surface-container-low border border-outline-variant/20">
                    <img
                      src={uploadState.map_image_url?.preview || settings.map_image_url || "/map.png"}
                      alt="Map preview"
                      className="w-full h-full object-cover"
                    />
                    {uploadState.map_image_url?.uploading && (
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <span className="material-symbols-outlined animate-spin text-white text-2xl">progress_activity</span>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col justify-center gap-3">
                    <input
                      ref={(el) => { fileRefs.current.map_image_url = el; }}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleImageUpload("map_image_url", file);
                      }}
                    />
                    <button
                      onClick={() => fileRefs.current.map_image_url?.click()}
                      disabled={uploadState.map_image_url?.uploading}
                      className="flex items-center gap-2 px-4 py-2 bg-primary text-on-primary rounded-xl text-sm font-bold hover:opacity-90 transition-opacity disabled:opacity-50"
                    >
                      <span className="material-symbols-outlined text-[18px]">upload</span>
                      {uploadState.map_image_url?.uploading ? "Uploading…" : "Replace Map Image"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </SectionCard>

          <SectionCard title="Operating Hours" icon="schedule">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Field label="Monday – Saturday">
                <TextInput
                  value={settings.hours_weekday}
                  onChange={(v) => handleTextChange("hours_weekday", v)}
                  placeholder="7:00 AM – 9:00 PM"
                />
              </Field>
              <Field label="Sunday">
                <TextInput
                  value={settings.hours_weekend}
                  onChange={(v) => handleTextChange("hours_weekend", v)}
                  placeholder="8:00 AM – 8:00 PM"
                />
              </Field>
            </div>
          </SectionCard>
        </div>
      )}

      {/* ── TAB: Page Content ── */}
      {activeTab === "content" && (
        <div className="space-y-6">
          <SectionCard title="Hero Section" icon="panorama">
            <p className="text-sm text-on-surface-variant mb-4">
              The large full-screen banner visitors see first on the homepage.
            </p>
            <Field label="Tagline / Subtitle">
              <TextInput
                value={settings.hero_tagline}
                onChange={(v) => handleTextChange("hero_tagline", v)}
                placeholder="Fresh Coffee • Cozy Atmosphere • Dilla, Ethiopia"
              />
            </Field>
          </SectionCard>

          <SectionCard title="About Section" icon="auto_stories">
            <p className="text-sm text-on-surface-variant mb-4">
              Text shown in the "Our Story" section on the homepage.
            </p>
            <div className="space-y-5">
              <Field label="Section Heading">
                <TextInput
                  value={settings.about_title}
                  onChange={(v) => handleTextChange("about_title", v)}
                  placeholder="Our Story in Dilla"
                />
              </Field>
              <Field label="First Paragraph">
                <TextareaInput
                  value={settings.about_body_1}
                  onChange={(v) => handleTextChange("about_body_1", v)}
                  rows={4}
                  placeholder="Nestled in the heart of Dilla…"
                />
              </Field>
              <Field label="Second Paragraph">
                <TextareaInput
                  value={settings.about_body_2}
                  onChange={(v) => handleTextChange("about_body_2", v)}
                  rows={4}
                  placeholder="Whether you're starting your morning…"
                />
              </Field>
            </div>
          </SectionCard>
        </div>
      )}

      {/* ── TAB: Images ── */}
      {activeTab === "images" && (
        <div className="space-y-6">
          <div className="p-4 bg-primary/5 border border-primary/20 rounded-xl flex items-start gap-3">
            <span className="material-symbols-outlined text-primary text-[20px] mt-0.5">info</span>
            <p className="text-sm text-on-surface-variant">
              Upload images to replace the ones currently shown on the website. Images are stored in
              Supabase Storage and update the site immediately after saving.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {IMAGE_FIELDS.map((field) => {
              const state = uploadState[field.key];
              const currentUrl = settings[field.key] || field.fallback;
              const previewUrl = state?.preview || currentUrl;

              return (
                <div
                  key={field.key}
                  className="bg-surface-container-lowest rounded-2xl border border-outline-variant/20 p-6 flex flex-col sm:flex-row gap-6"
                >
                  {/* Preview */}
                  <div className="relative flex-shrink-0 w-full sm:w-48 h-32 rounded-xl overflow-hidden bg-surface-container-low border border-outline-variant/20">
                    {previewUrl ? (
                      <img
                        src={previewUrl}
                        alt={field.label}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-on-surface-variant">
                        <span className="material-symbols-outlined text-4xl opacity-40">image</span>
                      </div>
                    )}
                    {state?.uploading && (
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <span className="material-symbols-outlined animate-spin text-white text-3xl">
                          progress_activity
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Info + Upload */}
                  <div className="flex-1 flex flex-col justify-between gap-4">
                    <div>
                      <h3 className="font-bold text-on-surface text-base">{field.label}</h3>
                      <p className="text-sm text-on-surface-variant mt-1">{field.description}</p>
                      {settings[field.key] && (
                        <p className="text-xs text-on-surface-variant/60 mt-2 truncate font-mono">
                          {settings[field.key]}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-3 flex-wrap">
                      <input
                        ref={(el) => { fileRefs.current[field.key] = el; }}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleImageUpload(field.key, file);
                        }}
                      />
                      <button
                        onClick={() => fileRefs.current[field.key]?.click()}
                        disabled={state?.uploading}
                        className="flex items-center gap-2 px-4 py-2 bg-primary text-on-primary rounded-xl text-sm font-bold hover:opacity-90 transition-opacity disabled:opacity-50"
                      >
                        <span className="material-symbols-outlined text-[18px]">upload</span>
                        {state?.uploading ? "Uploading…" : "Replace Image"}
                      </button>
                      {settings[field.key] && (
                        <button
                          onClick={() => {
                            setSettings((prev) => ({ ...prev, [field.key]: "" }));
                            setUploadState((prev) => ({ ...prev, [field.key]: { uploading: false, preview: null } }));
                          }}
                          className="flex items-center gap-2 px-4 py-2 border border-outline-variant/30 text-on-surface-variant rounded-xl text-sm font-medium hover:bg-surface-container-high transition-colors"
                        >
                          <span className="material-symbols-outlined text-[18px]">restart_alt</span>
                          Use Default
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Bottom Save */}
      <div className="mt-10 pt-6 border-t border-outline-variant/20 flex justify-end">
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-primary text-on-primary px-8 py-3 rounded-xl font-bold hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center gap-2"
        >
          {saving ? (
            <span className="material-symbols-outlined animate-spin text-[20px]">progress_activity</span>
          ) : (
            <span className="material-symbols-outlined text-[20px]">save</span>
          )}
          {saving ? "Saving…" : "Save All Changes"}
        </button>
      </div>
    </div>
  );
}

/* ── Reusable sub-components ── */

function SectionCard({
  title,
  icon,
  children,
}: {
  title: string;
  icon: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-surface-container-lowest rounded-2xl shadow-sm border border-outline-variant/20 p-8">
      <h2 className="text-lg font-bold text-on-surface mb-6 flex items-center gap-2">
        <span className="material-symbols-outlined text-primary text-[22px]">{icon}</span>
        {title}
      </h2>
      {children}
    </div>
  );
}

function Field({
  label,
  required,
  className,
  children,
}: {
  label: string;
  required?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`space-y-2 ${className ?? ""}`}>
      <label className="block text-sm font-bold text-on-surface">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {children}
    </div>
  );
}

function TextInput({
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full bg-surface-container border border-outline-variant/30 rounded-xl px-4 py-3 text-on-surface placeholder-on-surface-variant/40 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
    />
  );
}

function TextareaInput({
  value,
  onChange,
  placeholder,
  rows = 3,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  rows?: number;
}) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      className="w-full bg-surface-container border border-outline-variant/30 rounded-xl px-4 py-3 text-on-surface placeholder-on-surface-variant/40 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none leading-relaxed"
    />
  );
}
