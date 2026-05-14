import Link from "next/link";
import { Container } from "@/components/common/Container";
import { SectionHeading } from "@/components/common/SectionHeading";
import { MinistryCard } from "@/components/cards";
import { AnimateIn, StaggerContainer, AnimateInItem } from "@/components/common/AnimateIn";
import { ButtonArrow } from "@/components/ui/button";

interface Ministry {
  name: string;
  slug: string;
  tagline?: string;
  category?: string;
  heroImage: { url: string; alt: string };
}

export interface MinistriesPreviewProps {
  ministries: Ministry[];
}

export function MinistriesPreview({ ministries }: MinistriesPreviewProps) {
  if (!ministries.length) return null;

  const visible = ministries.slice(0, 6);

  return (
    <section className="bg-bg-surface overflow-hidden">
      <Container section className="flex flex-col gap-10">

        <AnimateIn>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <SectionHeading
              label="Ministerios"
              heading="Encuentra tu lugar"
              subheading="Tenemos un espacio para cada etapa de vida."
            />
            <Link
              href="/ministerios"
              className="flex items-center gap-1.5 text-label text-gold hover:text-gold-muted transition-colors shrink-0 pb-1"
            >
              Ver todos <ButtonArrow className="inline-block" />
            </Link>
          </div>
        </AnimateIn>

        <StaggerContainer
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4"
          staggerDelay={0.07}
        >
          {visible.map((ministry) => (
            <AnimateInItem key={ministry.slug}>
              <MinistryCard
                name={ministry.name}
                slug={ministry.slug}
                tagline={ministry.tagline}
                category={ministry.category}
                heroImage={ministry.heroImage}
                aspect="portrait"
              />
            </AnimateInItem>
          ))}
        </StaggerContainer>

      </Container>
    </section>
  );
}
