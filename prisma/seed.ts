import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

// Dr Mukherjee's existing publications, seeded as published articles so the
// Research page has real content out of the box. Body is a short markdown stub
// he can expand in the admin editor.
const seedArticles = [
  {
    slug: "comorbidity-profiling-rural-urban-west-bengal",
    title:
      "Comorbidity Profiling in Rural and Urban Population of West Bengal, India: Report from a Community-Based Primary Healthcare System",
    authors: "Mukherjee D, Moitra S, Gun P, Bera M, Dey-Biswas P, Mukherjee R.",
    journal: "Cureus",
    year: "2024",
    doi: "10.7759/cureus.51436",
    category: "Evidence-Creating Medicine",
    abstract:
      "A community-based study profiling the burden of comorbidities across rural and urban populations of West Bengal, produced within the Rational Medicine Network without corporate funding.",
    body: "## Background\n\nThis study reports comorbidity patterns from a community-based primary healthcare system in West Bengal, India.\n\n_Add the full text here in the admin editor._",
    published: true,
    featured: true,
  },
  {
    slug: "chronic-airflow-limitation-rural-indian-population",
    title:
      "Chronic Airflow Limitation in a rural Indian population: Aetiology and relationship to Body Mass Index",
    authors:
      "Chakrabarti B, Purkait S, Gun P, Moore VC, Choudhuri S, Zaman MJ, Warburton C, Calverley PMA, Mukherjee R.",
    journal: "International Journal of COPD",
    year: "2011",
    doi: "10.2147/copd.s24113",
    category: "Community epidemiology",
    abstract:
      "An examination of the aetiology of chronic airflow limitation in a rural Indian population and its relationship to body mass index.",
    body: "## Summary\n\n_Add the full text here in the admin editor._",
    published: true,
    featured: false,
  },
  {
    slug: "rationalising-the-clinical-examination",
    title: "Rationalising the Clinical Examination",
    authors: "Mukherjee R.",
    journal: "BMJ",
    year: "2008",
    doi: "10.1136/bmj.39580.437593.59",
    category: "Rational clinical examination",
    abstract:
      "A case for grounding the clinical examination in evidence — questioning ritualistic teaching in favour of techniques with demonstrated diagnostic value.",
    body: "## On rational clinical examination\n\n_Add the full text here in the admin editor._",
    published: true,
    featured: false,
  },
  {
    slug: "evidence-based-clinical-teaching-respiratory-medicine",
    title: "Evidence based clinical teaching in respiratory medicine",
    authors: "Stone H, Mukherjee R.",
    journal: "Proceedings of AMEE",
    year: "2007",
    doi: null,
    category: "Medical education",
    abstract:
      "Demonstrating that evidence-based clinical teaching can be effectively practised in respiratory medicine, ranking examination signs by reliability.",
    body: "## Evidence-based clinical teaching\n\n_Add the full text here in the admin editor._",
    published: true,
    featured: false,
  },
];

async function main() {
  for (const a of seedArticles) {
    await prisma.article.upsert({
      where: { slug: a.slug },
      update: {},
      create: a,
    });
    console.log(`✓ seeded: ${a.slug}`);
  }
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
