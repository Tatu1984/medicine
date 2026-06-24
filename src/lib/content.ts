/**
 * Central content for the Rational Medicine platform.
 * Sourced from Dr Rahul Mukherjee's "Notes on Rational Medicine".
 */

export const site = {
  name: "Rational Medicine",
  tagline: "Better care. Lower cost. Honest evidence.",
  description:
    "A platform for the theory and practice of Rational Medicine — improving the quality of healthcare while driving down its cost by preventing overdiagnosis and overtreatment.",
  author: "Dr Rahul Mukherjee",
  twitter: "@rationalmed",
  orcid: "0000-0003-4466-0660",
};

export const nav = [
  { label: "The Idea", href: "/#idea" },
  { label: "Pillars", href: "/pillars" },
  { label: "Research", href: "/research" },
  { label: "Network", href: "/network" },
  { label: "Resources", href: "/resources" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

/** The headline definition, used in the hero. */
export const definition =
  "Rational Medicine is the practice of medicine which maintains and improves the quality of healthcare whilst controlling and driving down its cost — by preventing overdiagnosis through unnecessary tests, and preventing overtreatment.";

export const movements = [
  {
    title: "Rational use of medicines",
    plain: "The best available evidence, free of industry influence.",
    body: "Born of postwar consumer awareness in the Global North and public-sector drug policy in the Global South — converging in the 1977 WHO Model List of Essential Medicines, and now urgent again in the face of antibiotic resistance.",
  },
  {
    title: "Judicious use of evidence for value",
    plain: "Less low-value care that wastes money and harms patients.",
    body: "Recognising that unnecessary care causes patient harm and drives unsustainable cost. Value integrates patient outcomes, resource efficiency and the human qualities of care — prized most where healthcare is treated as a universal right.",
  },
];

export type Pillar = {
  id: string;
  index: string;
  title: string;
  plain: string;
  summary: string;
  detail: string[];
  highlights: { label: string; source: string }[];
};

export const pillars: Pillar[] = [
  {
    id: "universal-healthcare",
    index: "a",
    title: "Universal healthcare & rational treatment",
    plain: "Healthcare as a community right, built around prevention.",
    summary:
      "In line with the WHO Alma-Ata declaration — equity, community participation, an intersectoral approach, appropriate technology and a focus on prevention.",
    detail: [
      "Cuba sustains a world-leading health system — ~7.59 physicians per 1,000 — by centring care in the community and the family, with doctors living among the patients they serve.",
      "The Indian subcontinent has decades of community-based rational healthcare: from Gonoshasthaya Kendra in Bangladesh (1972) to Shaheed Hospital in Dalli Rajhara (1983), spreading to West Bengal through the 1990s.",
    ],
    highlights: [
      { label: "Declaration of Alma-Ata, 1978", source: "WHO" },
      { label: "Gonoshasthaya Kendra", source: "Bangladesh, 1972" },
      { label: "Shaheed Hospital", source: "Chhattisgarh, 1983" },
    ],
  },
  {
    id: "overdiagnosis",
    index: "b",
    title: "Preventing overdiagnosis & overtreatment",
    plain: "Not every finding needs a label or a pill — 'Too Much Medicine'.",
    summary:
      "Overdiagnosis is diagnosing a condition that would never have caused symptoms or harm. Driven by fear, defensive practice and disease-mongering, it is among the most harmful and costly problems in modern medicine.",
    detail: [
      "The 2018 Preventing Overdiagnosis conference in Copenhagen (30+ countries) warned that sustainable systems must manage the twin problems of underuse and overuse.",
      "Australia's Wiser Healthcare collaboration targets overuse in mammography, thyroid imaging, back-pain scanning, PSA testing and genetic risk tests — for equity, sustainability and reduced harm.",
    ],
    highlights: [
      { label: "Preventing Overdiagnosis, Copenhagen 2018", source: "Conference statement" },
      { label: "Wiser Healthcare", source: "Australia" },
      { label: "Centre for Evidence-Based Medicine", source: "Oxford CEBM" },
    ],
  },
  {
    id: "stewardship",
    index: "c",
    title: "A culture of stewardship",
    plain: "Spending limited health resources wisely and fairly.",
    summary:
      "The NHS Confederation's 'triple value': allocative value (equity across populations), technical value (quality and safety per resource), and personalised value (decisions aligned to individuals).",
    detail: [
      "As high-cost 'precision' drugs flood the market, Ferkol and Quinton (2015) argued society must become outraged enough to insist medicines are sold at a cost it can sustain.",
      "A value-based culture of stewardship is essential for any socially just health system — grounded in social accountability and equity.",
    ],
    highlights: [
      { label: "A culture of stewardship", source: "NHS Confederation, 2015" },
      { label: "Precision Medicine: At What Price?", source: "Ferkol & Quinton, 2015" },
    ],
  },
  {
    id: "bedside",
    index: "d",
    title: "Rational clinical examination",
    plain: "Good history-taking and bedside skills over reflex testing.",
    summary:
      "The bedside encounter is central to medicine — the basis of trust, accurate diagnosis and high-value, patient-centred care, and a path to low-cost, high-quality healthcare worldwide.",
    detail: [
      "Stanford Medicine 25, led by Dr Abraham Verghese, revives hands-on physical examination as the essence of diagnosis and healing.",
      "JAMA's Rational Clinical Examination series builds the evidence base for which elements of history and examination actually help reach a diagnosis — reducing unnecessary testing.",
    ],
    highlights: [
      { label: "Stanford Medicine 25", source: "Stanford" },
      { label: "The Rational Clinical Examination", source: "JAMA, since 1992" },
      { label: "Society of Bedside Medicine", source: "bedsidemedicine.org" },
    ],
  },
  {
    id: "evidence-creating",
    index: "e",
    title: "Evidence-Creating Medicine",
    plain: "Honest evidence, free from Big Pharma's influence.",
    summary:
      "A wider understanding of the rules of evidence — confronting non-disclosure of trial data, marketing dressed as science, and the limits of narrow corporate-funded RCTs.",
    detail: [
      "Ben Goldacre's Bad Pharma documents how negative trials go unpublished and marketing distorts prescribing; AllTrials (2013) campaigns for every trial result to be reported.",
      "Evidence-Creating Medicine (Richard Bohmer) treats everyday clinical practice as an iterative scientific process. The Rational Medicine Network has already produced two PubMed-indexed papers, free of conflicts of interest.",
    ],
    highlights: [
      { label: "Bad Pharma — Ben Goldacre", source: "2012" },
      { label: "AllTrials campaign", source: "Cochrane / BMJ, 2013" },
      { label: "STROBE initiative", source: "Observational studies" },
    ],
  },
  {
    id: "education",
    index: "f",
    title: "Rational medical education in the AI era",
    plain: "Teaching judgement — and defining the doctor's role beside AI.",
    summary:
      "Teaching the rationale and evidence base for history and examination, the limits of applying many single-organ guidelines to one real patient, and the irreplaceable role of clinical judgement.",
    detail: [
      "Evidence-based clinical teaching is practical: examination signs can be ranked by reliability (kappa) — wheeze and dullness to percussion (0.52) far outperform whispering pectoriloquy (0.11).",
      "AI tools don't currently save radiologists time and risk overdiagnosis and cost escalation. Technical, allocative and personal value are practically undeliverable without human clinical judgement.",
    ],
    highlights: [
      { label: "Teaching to address overdiagnosis", source: "BMJ EBM, 2024" },
      { label: "Evidence-based clinical teaching", source: "Respiratory medicine" },
      { label: "Cost-effectiveness of AI in care", source: "Lancet Digital Health" },
    ],
  },
];

export const stats = [
  { value: 6, suffix: "", label: "Pillars of Rational Medicine" },
  { value: 1977, suffix: "", label: "WHO Essential Medicines List" },
  { value: 2, suffix: "", label: "PubMed-indexed Network papers" },
  { value: 30, suffix: "+", label: "Countries at Preventing Overdiagnosis" },
];

export type Publication = {
  title: string;
  authors: string;
  journal: string;
  year: string;
  doi?: string;
  tag: string;
};

export const publications: Publication[] = [
  {
    title:
      "Comorbidity Profiling in Rural and Urban Population of West Bengal, India: Report from a Community-Based Primary Healthcare System",
    authors: "Mukherjee D, Moitra S, Gun P, Bera M, Dey-Biswas P, Mukherjee R.",
    journal: "Cureus",
    year: "2024",
    doi: "10.7759/cureus.51436",
    tag: "Evidence-Creating Medicine",
  },
  {
    title:
      "Chronic Airflow Limitation in a rural Indian population: Aetiology and relationship to Body Mass Index",
    authors:
      "Chakrabarti B, Purkait S, Gun P, Moore VC, Choudhuri S, Zaman MJ, Warburton C, Calverley PMA, Mukherjee R.",
    journal: "Int. Journal of COPD",
    year: "2011",
    doi: "10.2147/copd.s24113",
    tag: "Community epidemiology",
  },
  {
    title: "Rationalising the Clinical Examination",
    authors: "Mukherjee R.",
    journal: "BMJ",
    year: "2008",
    doi: "10.1136/bmj.39580.437593.59",
    tag: "Rational clinical examination",
  },
  {
    title: "Evidence based clinical teaching in respiratory medicine",
    authors: "Stone H, Mukherjee R.",
    journal: "Proc. AMEE",
    year: "2007",
    tag: "Medical education",
  },
];

export const network = {
  intro:
    "The Rational Medicine Network upholds and supports the theory and practice of Universal Health Care — a movement arising from the 1970s campaigns for the rational use of drugs and pharmaceutical products.",
  groups: [
    {
      name: "Rational Medicine Network",
      body: "Community-based colleagues working on the ground in West Bengal, India — without corporate or large international NGO funding — contributing to Evidence-Creating Medicine within real resource limits.",
    },
    {
      name: "Evidence-Creating Medicine (ECM) Group",
      body: "A voluntary, informal multidisciplinary network of physiologists, physiotherapists, nurses, health workers and physicians who treat day-to-day practice as an iterative scientific process and capture real-life data for continuous improvement.",
    },
  ],
  principles: [
    "Equity",
    "Community participation",
    "Appropriate technology",
    "Focus on prevention",
    "Free from conflicts of interest",
  ],
};

export type Resource = {
  title: string;
  source: string;
  href: string;
  category: "Foundations" | "Overdiagnosis" | "Evidence" | "Bedside" | "Education";
  note: string;
};

export const resources: Resource[] = [
  {
    title: "Drug and Therapeutics Bulletin",
    source: "BMJ — since 1962",
    href: "https://dtb.bmj.com/",
    category: "Foundations",
    note: "Independent, advertising-free advice on medicines for clinicians.",
  },
  {
    title: "WHO Model List of Essential Medicines",
    source: "WHO — 24th edition",
    href: "https://list.essentialmeds.org/",
    category: "Foundations",
    note: "The evidence-based core list, first published 1977.",
  },
  {
    title: "Preventing Overdiagnosis",
    source: "Oxford CEBM",
    href: "https://www.cebm.ox.ac.uk/preventing-overdiagnosis",
    category: "Overdiagnosis",
    note: "Research and teaching on 'Too Much Medicine'.",
  },
  {
    title: "Wiser Healthcare",
    source: "Australia",
    href: "https://www.wiserhealthcare.org.au/about",
    category: "Overdiagnosis",
    note: "Research collaboration reducing overdiagnosis and overtreatment.",
  },
  {
    title: "A culture of stewardship",
    source: "NHS Confederation, 2015",
    href: "https://www.nhsconfed.org/publications/culture-stewardship",
    category: "Foundations",
    note: "The 'triple value' framework for better-value healthcare.",
  },
  {
    title: "The Rational Clinical Examination",
    source: "JAMA / AMA Ed Hub",
    href: "https://edhub.ama-assn.org/collections/6257/the-rational-clinical-examination",
    category: "Bedside",
    note: "Evidence behind the diagnostic value of history and examination.",
  },
  {
    title: "Stanford Medicine 25",
    source: "Stanford",
    href: "https://stanfordmedicine25.stanford.edu/",
    category: "Bedside",
    note: "Reviving 25 bedside physical examination techniques.",
  },
  {
    title: "Society of Bedside Medicine",
    source: "bedsidemedicine.org",
    href: "https://bedsidemedicine.org/about-us-1",
    category: "Bedside",
    note: "Global community of physician educators for bedside teaching.",
  },
  {
    title: "Bad Pharma — Ben Goldacre",
    source: "Fourth Estate, 2012",
    href: "https://en.wikipedia.org/wiki/Bad_Pharma",
    category: "Evidence",
    note: "How drug companies can mislead doctors and harm patients.",
  },
  {
    title: "STROBE Statement",
    source: "strobe-statement.org",
    href: "https://www.strobe-statement.org/",
    category: "Evidence",
    note: "Strengthening the reporting of observational studies.",
  },
  {
    title: "Pragmatic trials using routine EHRs",
    source: "BMJ, 2012",
    href: "https://www.bmj.com/content/344/bmj.e55",
    category: "Evidence",
    note: "Routine records as a route to honest, low-cost trials.",
  },
  {
    title: "Teaching to address overdiagnosis",
    source: "BMJ EBM, 2024",
    href: "https://ebm.bmj.com/content/29/4/275",
    category: "Education",
    note: "Edmiston & Hegazi on the doctor's role in the AI era.",
  },
];

export const about = {
  name: "Dr Rahul Mukherjee",
  creds: "MBBS (Cal.), DTM&H (Cal.), MRCP (UK), FRCP (Edin.), FRCP (London), FCCP (USA)",
  role: "Consultant Physician, Heartlands Hospital · Hon. Associate Clinical Professor, University of Birmingham, UK",
  bio: [
    "Dr Rahul Mukherjee is a physician and founder-member of the Rational Medicine Network, and a UK National Health Service Consultant since 2007. He takes a keen interest in undergraduate and postgraduate medical education, lecturing widely.",
    "His clinical and research interests are in the multidisciplinary management of complex respiratory failure, non-invasive ventilation, oxygen therapy, sleep-disordered breathing and complex multimorbidity. He has long pursued epidemiology and quality improvement — previously co-chairing the English Department of Health's Lung Improvement Programme Board in Birmingham, and serving on the British Thoracic Society's Standards of Care Committee.",
    "He co-founded the Rational Medicine Network to uphold the theory and practice of Universal Health Care, and currently heads the Evidence-Creating Medicine (ECM) Multidisciplinary Group. As a Visiting Professor at the Centre for Occupational & Environmental Health, Maulana Azad Medical College, New Delhi (2006–2014), he helped organise international meetings and has built capacity at community-based health initiatives across India for over two decades.",
  ],
  links: [
    { label: "ORCID 0000-0003-4466-0660", href: "https://orcid.org/0000-0003-4466-0660" },
    { label: "@rationalmed", href: "https://twitter.com/rationalmed" },
    { label: "ECM Group on ResearchGate", href: "https://www.researchgate.net/lab/Evidence-Creating-Medicine-ECM-Multidisciplinary-Group-Rahul-Mukherjee" },
  ],
};
