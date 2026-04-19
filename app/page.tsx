import Link from "next/link";
import QRCodeDisplay from "./components/QRCodeDisplay";
import ThemeToggle from "./components/ThemeToggle";
import ContactForm from "./components/ContactForm";
import { supabase } from "../lib/supabaseClient";

export const revalidate = 0; // Disable caching so settings update immediately

export default async function Home() {
  const [{ data: settings }, { data: featuredItems }] = await Promise.all([
    supabase.from("store_settings").select("*").eq("id", 1).single(),
    supabase.from("menu_items").select("*").eq("in_stock", true).order("category").limit(6),
  ]);

  // Store Info
  const storeName = settings?.store_name || "Dagi Coffee";
  const storeAddress = settings?.store_address || "Dilla, Ethiopia";
  const phoneNumber = settings?.phone_number || "+251 911 234 567";
  const contactEmail = settings?.contact_email || "hello@dagicoffee.com";
  const hoursWeekday = settings?.hours_weekday || "7:00 AM - 9:00 PM";
  const hoursWeekend = settings?.hours_weekend || "8:00 AM - 8:00 PM";

  // Page Content
  const heroTagline =
    settings?.hero_tagline || "Fresh Coffee • Cozy Atmosphere • Dilla, Ethiopia";
  const aboutTitle = settings?.about_title || "Our Story in Dilla";
  const aboutBody1 =
    settings?.about_body_1 ||
    "Nestled in the heart of Dilla, Ethiopia—a region globally celebrated for its exceptional coffee heritage—Dagi Coffee offers more than just a beverage; it offers an experience. We pride ourselves on sourcing the finest local beans, roasting them to perfection, and serving them in an environment that feels like home.";
  const aboutBody2 =
    settings?.about_body_2 ||
    "Whether you're starting your morning with a robust espresso or winding down with a creamy cappuccino, our cozy atmosphere is designed to be your sanctuary. Every cup is a testament to our commitment to quality and the rich coffee culture of Ethiopia.";
  const visitUsTitle = settings?.visit_us_title || "Visit Us";

  // Images (fall back to originals if not set)
  const heroImageUrl =
    settings?.hero_image_url ||
    "https://lh3.googleusercontent.com/aida-public/AB6AXuArUShAhW61dEAatKNSpqRWVJXFg_8IROO8pPR69SztieNPEtbEX33tA8BH9PDS1A7M8esbod_KGL8Cf8N0AtnMl3iTN_cdrhIsD4frmpv1SdSDHyQHl69zTE926i9roUx7sGmMp_f-9NMx0sp7iGXEQX4ge77hmswwxANoJUAXX6y9pYbbxNKJqW8lu5zebYIHudrzoBqU4WloaZ1rPAjV8J-Ktoky-ztWsSwA9YKK_KvpDiLsu3R5mHbNcrnQvn3xd3Nt8ANoaQ";
  const aboutImage1Url =
    settings?.about_image_1_url ||
    "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=800";
  const aboutImage2Url = 
    settings?.about_image_2_url || 
    "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&q=80&w=800";
  const aboutImage3Url = 
    settings?.about_image_3_url || 
    "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=800";
  const aboutImageUrl = aboutImage1Url; // For compatibility
  const mapImageUrl = settings?.map_image_url || "/map.png";

  return (
    <>
      {/* TopNavBar */}
      <nav className="fixed top-0 w-full z-50 bg-stone-50/70 backdrop-blur-lg dark:bg-stone-950/70 shadow-sm dark:shadow-none bg-stone-100/10">
        <div className="flex justify-between items-center px-6 py-4 w-full max-w-screen-2xl mx-auto">
          <Link
            className="text-2xl font-serif italic tracking-tight text-stone-900 dark:text-stone-50 font-headline"
            href="#"
          >
            {storeName}
          </Link>
          <div className="hidden md:flex items-center space-x-8 font-serif text-stone-900 dark:text-stone-50">
            <Link
              className="text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-50 transition-colors hover:bg-stone-200/50 dark:hover:bg-stone-800/50 rounded-lg transition-all duration-300 px-3 py-2 scale-95 active:scale-90"
              href="/menu"
            >
              Menu
            </Link>
            <Link
              className="text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-50 transition-colors hover:bg-stone-200/50 dark:hover:bg-stone-800/50 rounded-lg transition-all duration-300 px-3 py-2 scale-95 active:scale-90"
              href="#about"
            >
              About
            </Link>
            <Link
              className="text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-50 transition-colors hover:bg-stone-200/50 dark:hover:bg-stone-800/50 rounded-lg transition-all duration-300 px-3 py-2 scale-95 active:scale-90"
              href="#location"
            >
              Location
            </Link>
            <Link
              className="text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-50 transition-colors hover:bg-stone-200/50 dark:hover:bg-stone-800/50 rounded-lg transition-all duration-300 px-3 py-2 scale-95 active:scale-90"
              href="#qr"
            >
              QR Code
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <button className="bg-primary text-on-primary px-6 py-2 rounded-md font-body text-sm hover:opacity-90 transition-opacity hidden md:block">
              Order Now
            </button>
            <button className="md:hidden text-stone-900 dark:text-stone-100">
              <span className="material-symbols-outlined">menu</span>
            </button>
          </div>
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <section className="relative min-h-[921px] flex items-center justify-center pt-24 pb-12 px-6 overflow-hidden bg-surface-container-highest">
          <div className="absolute inset-0 z-0">
            <img
              alt="Cozy Dagi Coffee shop interior in Dilla Ethiopia with warm lighting, espresso machine, and wooden tables"
              className="w-full h-full object-cover object-center"
              src={heroImageUrl}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent"></div>
          </div>
          <div className="relative z-10 max-w-4xl mx-auto text-center mt-16">
            <h1 className="font-headline text-5xl md:text-7xl lg:text-8xl text-primary mb-6 tracking-tight leading-tight animate-fade-in-up opacity-0">
              {storeName}
            </h1>
            <p className="font-body text-lg md:text-xl text-on-surface-variant max-w-2xl mx-auto mb-10 animate-fade-in-up stagger-1 opacity-0">
              {heroTagline}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up stagger-2 opacity-0">
              <Link
                className="px-8 py-4 bg-primary text-on-primary rounded-md font-body font-medium hover:opacity-90 transition-all hover:scale-105 active:scale-95 w-full sm:w-auto text-center"
                href="/menu"
              >
                View Menu
              </Link>
              <Link
                className="px-8 py-4 glass-card text-primary rounded-md font-body font-medium hover:bg-surface-container-lowest transition-colors w-full sm:w-auto text-center"
                href="#location"
              >
                Visit Us
              </Link>
            </div>
          </div>
        </section>

        {/* Menu Section */}
        <section className="py-24 px-6 bg-surface" id="menu">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-headline text-4xl text-primary mb-4">Our Menu</h2>
              <p className="font-body text-on-surface-variant max-w-xl mx-auto">
                Crafted with precision, served with passion. Experience the finest beans from the region.
              </p>
            </div>
            {featuredItems && featuredItems.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {featuredItems.map((item, index) => (
                  <div
                    key={item.id}
                    className={`group relative bg-surface-container-low rounded-2xl overflow-hidden border border-outline-variant/10 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 animate-fade-in-up opacity-0 stagger-${(index % 4) + 1}`}
                  >
                    <div className="aspect-square overflow-hidden">
                      <img
                        alt={item.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        src={item.image_url || "/placeholder-coffee.jpg"}
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex justify-between items-baseline mb-2">
                        <h3 className="font-headline text-xl text-primary">{item.name}</h3>
                        <span className="font-body text-primary-container font-semibold">{item.price} Birr</span>
                      </div>
                      {item.description && (
                        <p className="font-body text-sm text-on-surface-variant line-clamp-2">{item.description}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 text-on-surface-variant">
                <span className="material-symbols-outlined text-5xl mb-4 block opacity-30">coffee</span>
                <p className="font-body">No menu items yet. Add items from the <Link href="/admin" className="text-primary underline">admin panel</Link>.</p>
              </div>
            )}
            <div className="text-center mt-12">
              <Link href="/menu" className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-on-primary rounded-md font-body font-medium hover:opacity-90 transition-opacity">
                View Full Menu
                <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
              </Link>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-24 px-6 bg-surface-container-low" id="about">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
            <div className="md:w-1/2 grid grid-cols-2 gap-4 relative animate-float">
              <div className="space-y-4">
                <div className="aspect-[4/5] w-full rounded-2xl overflow-hidden shadow-lg animate-reveal stagger-1">
                  <img
                    alt="Barista preparing coffee"
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                    src={aboutImage1Url}
                  />
                </div>
                <div className="aspect-square w-full rounded-2xl overflow-hidden hidden md:block shadow-lg animate-reveal stagger-3">
                  <img
                    alt="Coffee beans roasting"
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                    src={aboutImage2Url}
                  />
                </div>
              </div>
              <div className="space-y-4 pt-12">
                <div className="aspect-[3/4] w-full rounded-2xl overflow-hidden shadow-lg animate-reveal stagger-2">
                  <img
                    alt="Cozy cafe interior"
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                    src={aboutImage3Url}
                  />
                </div>
                <div className="bg-primary/5 p-6 rounded-2xl border border-primary/10 shadow-inner hidden md:block animate-fade-in-up stagger-4">
                  <p className="font-headline text-lg text-primary italic">
                    &quot;Coffee is a language in itself.&quot;
                  </p>
                </div>
              </div>
            </div>
            <div className="md:w-1/2">
              <h2 className="font-headline text-4xl text-primary mb-6">{aboutTitle}</h2>
              <p className="font-body text-on-surface-variant mb-6 leading-relaxed">{aboutBody1}</p>
              <p className="font-body text-on-surface-variant leading-relaxed">{aboutBody2}</p>
            </div>
          </div>
        </section>

        {/* Location & Contact Section */}
        <section className="py-24 px-6 bg-surface" id="location">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
            <div>
              <h2 className="font-headline text-4xl text-primary mb-8">{visitUsTitle}</h2>
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <span className="material-symbols-outlined text-primary-container mt-1">location_on</span>
                  <div>
                    <h3 className="font-headline text-lg text-on-surface mb-1">Address</h3>
                    <p className="font-body text-on-surface-variant whitespace-pre-line">{storeAddress}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="material-symbols-outlined text-primary-container mt-1">schedule</span>
                  <div>
                    <h3 className="font-headline text-lg text-on-surface mb-1">Hours</h3>
                    <p className="font-body text-on-surface-variant">
                      Monday - Saturday: {hoursWeekday}
                      <br />
                      Sunday: {hoursWeekend}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="material-symbols-outlined text-primary-container mt-1">call</span>
                  <div>
                    <h3 className="font-headline text-lg text-on-surface mb-1">Contact</h3>
                    <p className="font-body text-on-surface-variant">
                      {phoneNumber}
                      <br />
                      {contactEmail}
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-12">
                <ContactForm />
              </div>
            </div>
            <div className="rounded-xl overflow-hidden bg-surface-container-low h-[400px]">
              <img
                alt="Map of Dilla, Ethiopia"
                className="w-full h-full object-cover opacity-80"
                src={mapImageUrl}
              />
            </div>
          </div>
        </section>

        {/* QR Code Section */}
        <section className="py-24 px-6 bg-surface-container-high relative overflow-hidden" id="qr">
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-transparent"></div>
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <h2 className="font-headline text-3xl md:text-4xl text-primary mb-6">Digital Menu</h2>
            <p className="font-body text-on-surface-variant mb-12 max-w-lg mx-auto">
              Scan the QR code to view our full menu, seasonal specials, and place an order directly
              from your table.
            </p>
            <div className="inline-block p-4 bg-surface-container-lowest rounded-xl border border-outline-variant/30 shadow-[0_32px_64px_-12px_rgba(27,28,27,0.06)]">
              <div className="w-48 h-48 flex items-center justify-center">
                <QRCodeDisplay />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full py-12 px-6 bg-stone-100 dark:bg-stone-900 text-stone-800 dark:text-stone-200 font-sans text-sm tracking-wide bg-stone-200/50 dark:bg-stone-800/50">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center max-w-7xl mx-auto text-center md:text-left">
          <div>
            <span className="font-serif text-lg text-stone-900 dark:text-stone-100">{storeName}</span>
            <p className="mt-2 text-stone-500 dark:text-stone-400">
              Crafting moments, one cup at a time in Dilla.
            </p>
          </div>
          <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-6">
            <Link
              className="text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 underline decoration-stone-300 dark:decoration-stone-700 underline-offset-4 opacity-80 hover:opacity-100 transition-opacity"
              href="#"
            >
              Instagram
            </Link>
            <Link
              className="text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 underline decoration-stone-300 dark:decoration-stone-700 underline-offset-4 opacity-80 hover:opacity-100 transition-opacity"
              href="#"
            >
              Facebook
            </Link>
            <Link
              className="text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 underline decoration-stone-300 dark:decoration-stone-700 underline-offset-4 opacity-80 hover:opacity-100 transition-opacity"
              href="#"
            >
              Privacy Policy
            </Link>
          </div>
          <div className="md:text-right text-stone-500 dark:text-stone-400">
            © 2024 {storeName}. Crafted for the senses.
          </div>
        </div>
      </footer>
    </>
  );
}
