/**
 * Página de preview del Design System — solo para desarrollo.
 * Acceder en: http://localhost:3000/design
 */
import { Button, ButtonArrow } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SectionHeading } from "@/components/common/SectionHeading";
import { ScriptureQuote } from "@/components/common/ScriptureQuote";
import { Container } from "@/components/common/Container";
import { Skeleton, SermonCardSkeleton } from "@/components/ui/skeleton";
import {
  MinistryCard,
  SermonCard,
  EventCard,
  StaffCard,
  TestimonialCard,
  CellGroupCard,
} from "@/components/cards";

export default function DesignSystemPage() {
  return (
    <div className="min-h-screen bg-bg-base">

      {/* ─── Header ────────────────────────────────────────────── */}
      <div className="bg-bg-surface border-b border-border py-6">
        <Container>
          <p className="text-label text-gold">Design System Preview</p>
          <h1 className="text-h1 mt-1">Roca de Vida Panamá</h1>
        </Container>
      </div>

      <Container section>
        <div className="flex flex-col gap-20">

          {/* ─── Tipografía ─────────────────────────────────────── */}
          <section>
            <p className="text-label text-text-muted mb-8">Tipografía</p>
            <div className="flex flex-col gap-6">
              <div>
                <p className="text-label text-text-muted mb-2">text-display · League Spartan 900</p>
                <p className="text-display">Una iglesia firme</p>
              </div>
              <div>
                <p className="text-label text-text-muted mb-2">text-h1 · League Spartan 800</p>
                <p className="text-h1">Sobre la Roca</p>
              </div>
              <div>
                <p className="text-label text-text-muted mb-2">text-h2 · League Spartan 700</p>
                <p className="text-h2">Nuestros Ministerios</p>
              </div>
              <div>
                <p className="text-label text-text-muted mb-2">text-h3 · League Spartan 700</p>
                <p className="text-h3">Ministerio de Jóvenes</p>
              </div>
              <div>
                <p className="text-label text-text-muted mb-2">text-label · Bebas Neue</p>
                <p className="text-label text-gold">Próximo Servicio · Domingo 9:00am</p>
              </div>
              <div>
                <p className="text-label text-text-muted mb-2">text-lead · Raleway 400</p>
                <p className="text-lead">Edificando vidas, fortaleciendo familias y alcanzando nuestra ciudad.</p>
              </div>
              <div>
                <p className="text-label text-text-muted mb-2">body · Raleway 400</p>
                <p className="font-body text-text-secondary max-w-prose">
                  Roca de Vida Panamá es una comunidad de fe que cree en el poder transformador del
                  evangelio. Nos reunimos cada semana para adorar, crecer y conectarnos como familia.
                </p>
              </div>
            </div>
          </section>

          {/* ─── Paleta ─────────────────────────────────────────── */}
          <section>
            <p className="text-label text-text-muted mb-8">Paleta de colores</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { name: "bg-base", color: "#000000", class: "bg-bg-base border border-border" },
                { name: "bg-surface", color: "#111111", class: "bg-bg-surface" },
                { name: "bg-raised", color: "#1a1a1a", class: "bg-bg-raised" },
                { name: "gold", color: "#FFCC4D", class: "bg-gold" },
                { name: "gold-muted", color: "#C6A867", class: "bg-gold-muted" },
                { name: "gold-deep", color: "#7A594C", class: "bg-gold-deep" },
                { name: "text-primary", color: "#F8F8F8", class: "bg-text-primary" },
                { name: "text-secondary", color: "#A0A0A0", class: "bg-text-secondary" },
              ].map((swatch) => (
                <div key={swatch.name} className="flex flex-col gap-2">
                  <div className={`h-16 rounded-sm ${swatch.class}`} />
                  <p className="text-label text-text-secondary">{swatch.name}</p>
                  <p className="font-body text-[0.75rem] text-text-muted font-mono">{swatch.color}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ─── Botones ─────────────────────────────────────────── */}
          <section>
            <p className="text-label text-text-muted mb-8">Botones</p>
            <div className="flex flex-wrap gap-4 items-center">
              <Button variant="primary">Conócenos</Button>
              <Button variant="secondary">Ver prédica</Button>
              <Button variant="outline">Donar</Button>
              <Button variant="ghost" className="group">
                Saber más <ButtonArrow />
              </Button>
              <Button variant="primary" size="sm">Pequeño</Button>
              <Button variant="primary" size="lg">Grande</Button>
              <Button variant="primary" disabled>Desactivado</Button>
            </div>
          </section>

          {/* ─── Badges ──────────────────────────────────────────── */}
          <section>
            <p className="text-label text-text-muted mb-8">Badges</p>
            <div className="flex flex-wrap gap-3 items-center">
              <Badge variant="gold">Destacado</Badge>
              <Badge variant="outline">Sermón</Badge>
              <Badge variant="surface">Ministerios</Badge>
              <Badge variant="live">● En Vivo</Badge>
              <Badge variant="gold">15 Jun</Badge>
              <Badge variant="outline">Serie: Fe</Badge>
            </div>
          </section>

          {/* ─── SectionHeading ──────────────────────────────────── */}
          <section>
            <p className="text-label text-text-muted mb-8">Section Headings</p>
            <div className="grid md:grid-cols-2 gap-12">
              <SectionHeading
                label="Ministerios"
                heading="Encuentra tu lugar"
                subheading="Tenemos un espacio para cada etapa de vida. Descubre dónde puedes conectar."
              />
              <SectionHeading
                label="Últimas prédicas"
                heading="Palabra para tu vida"
                subheading="Accede al archivo completo de sermones y estudios bíblicos."
                align="center"
              />
            </div>
          </section>

          {/* ─── Scripture Quote ──────────────────────────────────── */}
          <section>
            <p className="text-label text-text-muted mb-8">Scripture Quote</p>
            <div className="grid md:grid-cols-2 gap-12">
              <ScriptureQuote
                text="Edificaré mi iglesia, y las puertas del infierno no prevalecerán contra ella."
                reference="Mateo 16:18"
              />
              <ScriptureQuote
                text="Porque nadie puede poner otro fundamento que el que está puesto, el cual es Jesucristo."
                reference="1 Corintios 3:11"
                size="large"
                align="center"
              />
            </div>
          </section>

          {/* ─── Formularios ─────────────────────────────────────── */}
          <section>
            <p className="text-label text-text-muted mb-8">Formularios</p>
            <div className="grid md:grid-cols-2 gap-6 max-w-2xl">
              <Input label="Nombre completo" placeholder="Tu nombre" required />
              <Input label="Email" type="email" placeholder="tu@email.com" required />
              <Input
                label="Con error"
                placeholder="Texto inválido"
                error="Este campo es requerido"
                required
              />
              <Input
                label="Con hint"
                placeholder="URL del video"
                hint="Formato: https://youtube.com/watch?v=..."
              />
              <div className="md:col-span-2">
                <Textarea
                  label="Mensaje"
                  placeholder="Escribe tu mensaje aquí..."
                  required
                />
              </div>
            </div>
          </section>

          {/* ─── Skeletons ───────────────────────────────────────── */}
          <section>
            <p className="text-label text-text-muted mb-8">Loading Skeletons</p>
            <div className="grid sm:grid-cols-3 gap-6 max-w-2xl">
              <SermonCardSkeleton />
              <SermonCardSkeleton />
              <SermonCardSkeleton />
            </div>
          </section>

          {/* ─── Overlays ────────────────────────────────────────── */}
          <section>
            <p className="text-label text-text-muted mb-8">Overlays sobre imagen</p>
            <div className="grid sm:grid-cols-3 gap-4">
              {(["card", "hero", "dark"] as const).map((type) => (
                <div key={type} className="relative aspect-video rounded-sm overflow-hidden">
                  {/* Placeholder de imagen — reemplazar por CmsImage en producción */}
                  <div className="absolute inset-0 bg-gradient-to-br from-bg-raised to-bg-surface" />
                  <div className={`absolute inset-0 overlay-${type}`} />
                  <div className="absolute bottom-3 left-3">
                    <p className="text-label text-gold">overlay-{type}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ─── MinistryCard ────────────────────────────────────── */}
          <section>
            <p className="text-label text-text-muted mb-8">MinistryCard</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { name: "Jóvenes", slug: "jovenes", tagline: "15 a 20 años", category: "Ministerio" },
                { name: "Mujeres", slug: "mujeres", tagline: "Comunidad femenina", category: "Ministerio" },
                { name: "Roca Kids", slug: "roca-kids", tagline: "Niños y familias", category: "Ministerio" },
                { name: "Hombres", slug: "hombres", tagline: "Liderazgo e identidad", category: "Ministerio" },
              ].map((m) => (
                <MinistryCard
                  key={m.slug}
                  name={m.name}
                  slug={m.slug}
                  tagline={m.tagline}
                  category={m.category}
                  heroImage={{
                    url: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&h=533&fit=crop",
                    alt: m.name,
                  }}
                />
              ))}
            </div>
          </section>

          {/* ─── SermonCard ──────────────────────────────────────── */}
          <section>
            <p className="text-label text-text-muted mb-8">SermonCard — default / horizontal / featured</p>
            <div className="flex flex-col gap-10">
              {/* Featured */}
              <SermonCard
                layout="featured"
                title="La fe que mueve montañas"
                slug="fe-que-mueve-montanas"
                youtubeUrl="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                pastor={{ name: "Ps. Carlos Rodríguez" }}
                date="2024-05-05"
                series="Fe Inquebrantable"
                scripture="Marcos 11:22-24"
                duration="48 min"
              />
              {/* Default grid */}
              <div className="grid sm:grid-cols-3 gap-5">
                {["Gracia suficiente", "El corazón del Padre", "Identidad en Cristo"].map((title, i) => (
                  <SermonCard
                    key={title}
                    title={title}
                    slug={`sermon-${i}`}
                    youtubeUrl="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                    pastor={{ name: "Ps. María González" }}
                    date="2024-04-21"
                    series="Fundamentos"
                    duration="36 min"
                  />
                ))}
              </div>
              {/* Horizontal */}
              <div className="flex flex-col gap-2 max-w-xl">
                {["El poder de la oración", "Vivir en comunidad"].map((title, i) => (
                  <SermonCard
                    key={title}
                    layout="horizontal"
                    title={title}
                    slug={`sermon-h-${i}`}
                    youtubeUrl="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                    pastor={{ name: "Ps. Luis Herrera" }}
                    date="2024-03-10"
                    duration="42 min"
                  />
                ))}
              </div>
            </div>
          </section>

          {/* ─── EventCard ───────────────────────────────────────── */}
          <section>
            <p className="text-label text-text-muted mb-8">EventCard — default / horizontal</p>
            <div className="flex flex-col gap-8">
              <div className="grid sm:grid-cols-3 gap-5">
                {[
                  { title: "Noche de Adoración", date: "2025-06-15", time: "7:00 PM", location: "Templo principal" },
                  { title: "Retiro de Jóvenes", date: "2025-06-28", time: "8:00 AM", location: "Albrook, Panamá" },
                  { title: "Conferencia de Liderazgo", date: "2025-07-05", time: "9:00 AM", location: "Centro de conferencias" },
                ].map((ev) => (
                  <EventCard
                    key={ev.title}
                    title={ev.title}
                    slug="evento-ejemplo"
                    date={ev.date}
                    time={ev.time}
                    location={ev.location}
                    ministry={{ name: "Jóvenes", slug: "jovenes" }}
                    banner={{
                      url: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&h=338&fit=crop",
                      alt: ev.title,
                    }}
                  />
                ))}
              </div>
              <div className="flex flex-col gap-2 max-w-2xl">
                {["Bautismos Junio", "Clase de Nuevos Creyentes"].map((title) => (
                  <EventCard
                    key={title}
                    layout="horizontal"
                    title={title}
                    slug="evento-horizontal"
                    date="2025-06-22"
                    time="10:00 AM"
                    location="Iglesia Roca de Vida"
                    banner={{
                      url: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&h=338&fit=crop",
                      alt: title,
                    }}
                  />
                ))}
              </div>
            </div>
          </section>

          {/* ─── StaffCard ───────────────────────────────────────── */}
          <section>
            <p className="text-label text-text-muted mb-8">StaffCard — default / compact</p>
            <div className="flex flex-col gap-8">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                {[
                  { name: "Pastor Carlos R.", title: "Pastor Principal", bio: "Lleva más de 20 años ministrando en Panamá con un corazón por la familia y la comunidad." },
                  { name: "Pastora Ana M.", title: "Pastora de Mujeres", bio: "Apasionada por ver a cada mujer caminar en su identidad y propósito divino." },
                  { name: "Luis Herrera", title: "Líder de Jóvenes", bio: "Conectando a la próxima generación con la fe y el propósito de Dios." },
                  { name: "Carmen Ruiz", title: "Directora Kids", bio: "Creando experiencias de fe para los más pequeños de la familia." },
                ].map((s) => (
                  <StaffCard
                    key={s.name}
                    name={s.name}
                    title={s.title}
                    bio={s.bio}
                    photo={{
                      url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop&face=center",
                      alt: s.name,
                    }}
                  />
                ))}
              </div>
              {/* Compact */}
              <div>
                <p className="text-label text-text-muted mb-4">Variante compact</p>
                <div className="flex flex-wrap gap-8">
                  {["Pastor Carlos", "Pastora Ana", "Luis H.", "Carmen R."].map((name) => (
                    <StaffCard
                      key={name}
                      layout="compact"
                      name={name}
                      title="Liderazgo"
                      photo={{
                        url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop",
                        alt: name,
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ─── TestimonialCard ─────────────────────────────────── */}
          <section>
            <p className="text-label text-text-muted mb-8">TestimonialCard — default / minimal</p>
            <div className="flex flex-col gap-8">
              <div className="grid sm:grid-cols-3 gap-5">
                {[
                  { name: "Sofía Martínez", ministry: "Ministerio de Mujeres", quote: "Roca de Vida me ayudó a encontrar mi propósito y a sanar heridas que cargaba por años. Estoy agradecida por cada persona en esta iglesia." },
                  { name: "Andrés López", ministry: "Jóvenes Adultos", quote: "Encontré una comunidad auténtica que me acompañó en los momentos más difíciles. Hoy puedo decir que la fe cambia vidas." },
                  { name: "Patricia Gómez", ministry: "Bendecidos para Bendecir", quote: "Este ministerio me enseñó que servir es la forma más alta de vivir. Mi vida tiene un nuevo significado desde que llegué a RDV." },
                ].map((t) => (
                  <TestimonialCard key={t.name} name={t.name} ministry={t.ministry} quote={t.quote} />
                ))}
              </div>
              {/* Minimal */}
              <div className="max-w-lg">
                <p className="text-label text-text-muted mb-4">Variante minimal</p>
                <TestimonialCard
                  layout="minimal"
                  name="Roberto Sánchez"
                  ministry="Ministerio de Hombres"
                  quote="Dios restauró mi familia a través de esta iglesia. Lo que parecía imposible, Él lo hizo posible."
                />
              </div>
            </div>
          </section>

          {/* ─── CellGroupCard ───────────────────────────────────── */}
          <section>
            <p className="text-label text-text-muted mb-8">CellGroupCard — default / compact</p>
            <div className="flex flex-col gap-8">
              <div className="grid sm:grid-cols-3 gap-5">
                <CellGroupCard
                  name="Grupo Costa del Este"
                  neighborhood="Costa del Este"
                  district="Panamá Este"
                  schedule="Martes 7:30 PM"
                  leaderName="Marco Rodríguez"
                  capacity={15}
                  enrolled={12}
                />
                <CellGroupCard
                  name="Grupo San Francisco"
                  neighborhood="San Francisco"
                  district="Ciudad de Panamá"
                  schedule="Jueves 7:00 PM"
                  leaderName="Isabela Torres"
                  capacity={12}
                  enrolled={11}
                  isFull={false}
                />
                <CellGroupCard
                  name="Grupo Clayton"
                  neighborhood="Clayton"
                  district="Panamá Oeste"
                  schedule="Miércoles 7:00 PM"
                  leaderName="Juan Pérez"
                  capacity={15}
                  enrolled={15}
                  isFull
                />
              </div>
              {/* Compact */}
              <div>
                <p className="text-label text-text-muted mb-4">Variante compact</p>
                <div className="flex flex-col gap-2 max-w-sm">
                  {["Miraflores", "Bethania", "Albrook"].map((n) => (
                    <CellGroupCard
                      key={n}
                      layout="compact"
                      name={`Grupo ${n}`}
                      neighborhood={n}
                      schedule="Viernes 7:00 PM"
                      leaderName="Líder"
                    />
                  ))}
                </div>
              </div>
            </div>
          </section>

        </div>
      </Container>
    </div>
  );
}
