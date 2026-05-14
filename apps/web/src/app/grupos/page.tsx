import type { Metadata } from "next";
import { MapPin } from "lucide-react";
import { Container } from "@/components/common/Container";
import { SectionHeading } from "@/components/common/SectionHeading";
import { AnimateIn } from "@/components/common/AnimateIn";
import { GroupsExplorer, type CellGroupData } from "@/components/groups/GroupsExplorer";
import { FeSinFronterasCard } from "@/components/groups/FeSinFronterasCard";
import { getCellGroups, richTextToPlain } from "@/lib/payload/client";

const DISTRICT_LABELS: Record<string, string> = {
  "ciudad-panama": "Ciudad de Panamá",
  "san-miguelito": "San Miguelito",
  "panama-oeste": "Panamá Oeste",
  chorrera: "La Chorrera",
  otro: "Otro",
};

// Leave undefined to hide the CTA; set to a Google Meet URL to show it
const FE_SIN_FRONTERAS_JOIN_URL: string | undefined = undefined;

export const metadata: Metadata = {
  title: "Grupos Celulares | Roca de Vida Panamá",
  description: "Encuentra un grupo celular cerca de ti. Nos reunimos en toda la ciudad para crecer juntos en la fe.",
};

export const revalidate = 300;

export default async function GruposPage() {
  const result = await getCellGroups();
  const rawGroups = result.docs;

  const groups: CellGroupData[] = rawGroups.map((g) => ({
    name: g.name,
    slug: g.slug,
    neighborhood: g.neighborhood,
    district: DISTRICT_LABELS[g.district] ?? g.district,
    day: g.schedule?.split(" ")[0] ?? "Otro",
    schedule: g.schedule,
    leaderName: g.leader?.name ?? "",
    leaderTitle: g.leader?.title,
    capacity: g.capacity ?? 0,
    enrolled: 0,
    isFull: g.isFull ?? false,
    address: g.address,
    bio: richTextToPlain(g.description),
    lat: g.coordinates?.lat,
    lng: g.coordinates?.lng,
  }));

  const available = groups.filter((g) => !g.isFull).length;
  const districts = [...new Set(groups.map((g) => g.district))];
  const days = [...new Set(groups.map((g) => g.day))];

  return (
    <>
      {/* Page hero */}
      <section className="relative bg-bg-base overflow-hidden">
        <div
          className="absolute inset-0 opacity-20"
          style={{ background: "radial-gradient(ellipse 100% 60% at 50% 0%, rgba(255,204,77,0.15) 0%, transparent 70%)" }}
          aria-hidden
        />
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold/30 to-transparent" aria-hidden />

        <Container className="pt-32 pb-16 relative z-10">
          <AnimateIn variant="fadeUp">
            <SectionHeading
              label="Grupos Celulares"
              heading="La iglesia en tu barrio"
              subheading="Los grupos celulares son donde la comunidad se vuelve real. Nos reunimos en casas a lo largo de toda la ciudad. Encuentra el tuyo."
              align="center"
            />
          </AnimateIn>

          <AnimateIn variant="fadeUp" delay={0.15}>
            <div className="flex flex-wrap justify-center gap-8 mt-10">
              {[
                { value: groups.length, label: "grupos en total" },
                { value: available, label: "con espacio disponible" },
                { value: districts.length, label: "sectores cubiertos" },
              ].map(({ value, label }) => (
                <div key={label} className="flex flex-col items-center gap-1">
                  <span className="font-display font-900 text-gold text-[2.5rem] leading-none">{value}</span>
                  <span className="text-label text-text-muted text-[0.6875rem]">{label}</span>
                </div>
              ))}
            </div>
          </AnimateIn>
        </Container>
      </section>

      {/* Fé sin Fronteras — célula virtual global */}
      <section className="bg-bg-base">
        <Container className="pb-0 pt-2">
          <AnimateIn variant="fadeUp" delay={0.05}>
            <FeSinFronterasCard joinUrl={FE_SIN_FRONTERAS_JOIN_URL} />
          </AnimateIn>
        </Container>
      </section>

      {/* Explorador */}
      <section className="bg-bg-base">
        <Container section>
          <AnimateIn>
            <GroupsExplorer
              groups={groups}
              districts={districts}
              days={days}
            />
          </AnimateIn>
        </Container>
      </section>

      {/* CTA — no encuentras uno */}
      <section className="bg-bg-surface border-t border-border">
        <Container section size="narrow" className="flex flex-col items-center gap-5 text-center">
          <AnimateIn variant="fadeUp">
            <div className="w-10 h-10 rounded-full bg-bg-raised border border-border flex items-center justify-center mx-auto mb-2">
              <MapPin size={16} className="text-gold" aria-hidden />
            </div>
            <h2 className="text-h2 text-text-primary">¿No encuentras uno cerca?</h2>
            <p className="font-body text-[1rem] text-text-secondary mt-3 max-w-[44ch] mx-auto">
              Estamos expandiendo nuestra red de grupos. Contáctanos y trabajamos juntos para que tengas uno en tu área.
            </p>
          </AnimateIn>
          <AnimateIn variant="fadeUp" delay={0.1}>
            <a
              href="/contacto"
              className="inline-flex items-center gap-2 font-display font-700 text-gold hover:text-gold-muted transition-colors"
            >
              Solicitar un grupo nuevo <span aria-hidden>→</span>
            </a>
          </AnimateIn>
        </Container>
      </section>
    </>
  );
}
