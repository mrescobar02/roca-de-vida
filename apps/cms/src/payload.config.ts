import { buildConfig } from "payload";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "path";
import { fileURLToPath } from "url";

// Collections
import { Pages } from "./collections/Pages";
import { Ministries } from "./collections/Ministries";
import { Sermons } from "./collections/Sermons";
import { Events } from "./collections/Events";
import { Staff } from "./collections/Staff";
import { CellGroups } from "./collections/CellGroups";
import { Testimonials } from "./collections/Testimonials";
import { Galleries } from "./collections/Galleries";
import { Media } from "./collections/Media";
import { Users } from "./collections/Users";

// Form collections
import { ContactSubmissions } from "./collections/forms/ContactSubmissions";
import { PrayerRequests } from "./collections/forms/PrayerRequests";
import { BaptismRequests } from "./collections/forms/BaptismRequests";
import { MinistryInterests } from "./collections/forms/MinistryInterests";
import { CellGroupRequests } from "./collections/forms/CellGroupRequests";
import { CounselingRequests } from "./collections/forms/CounselingRequests";

// Globals
import { SiteSettings } from "./globals/SiteSettings";
import { Navigation } from "./globals/Navigation";
import { DonationSettings } from "./globals/DonationSettings";
import { LiveStreamSettings } from "./globals/LiveStreamSettings";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: "users",
    meta: {
      titleSuffix: "— Roca de Vida Admin",
    },
  },

  collections: [
    Users,
    Pages,
    Ministries,
    Sermons,
    Events,
    Staff,
    CellGroups,
    Testimonials,
    Galleries,
    Media,
    // Formularios
    ContactSubmissions,
    PrayerRequests,
    BaptismRequests,
    MinistryInterests,
    CellGroupRequests,
    CounselingRequests,
  ],

  globals: [SiteSettings, Navigation, DonationSettings, LiveStreamSettings],

  editor: lexicalEditor(),

  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || "",
    },
  }),

  secret: process.env.PAYLOAD_SECRET || "",

  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },

  cors: [
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
    "http://localhost:3000",
  ],

  csrf: [
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
    "http://localhost:3000",
  ],

  upload: {
    limits: {
      fileSize: 20_000_000, // 20MB
    },
  },
});
