// Tipos compartidos entre apps/web y apps/cms
// Expandir a medida que Payload genera los tipos automáticamente

export type MinistrySlug =
  | "hombres"
  | "mujeres"
  | "roca-kids"
  | "prejuvenil"
  | "jovenes"
  | "jovenes-adultos"
  | "bendecidos"
  | "metanoia";

export type FormType =
  | "contact"
  | "prayer"
  | "baptism"
  | "ministry-interest"
  | "cell-group"
  | "counseling";

export type PublishStatus = "published" | "draft" | "archived";

export type StaffRole =
  | "lead-pastor"
  | "pastor"
  | "elder"
  | "deacon"
  | "ministry-leader"
  | "staff";

export interface ApiResponse<T> {
  docs: T[];
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface PayloadMedia {
  id: string;
  url: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
  mimeType?: string;
  sizes?: {
    thumbnail?: { url: string; width: number; height: number };
    card?: { url: string; width: number; height: number };
    hero?: { url: string; width: number; height: number };
  };
}
