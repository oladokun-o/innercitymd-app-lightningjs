const C = {
  cardiology: { top: 0xff0d47a1, bottom: 0xff051b3f },
  neurology:  { top: 0xff4a148c, bottom: 0xff1a0038 },
  pediatrics: { top: 0xff1b5e20, bottom: 0xff071a09 },
  oncology:   { top: 0xff880e4f, bottom: 0xff3d0020 },
  mental:     { top: 0xff006064, bottom: 0xff002225 },
  nutrition:  { top: 0xffe65100, bottom: 0xff5c2100 },
  fitness:    { top: 0xff37474f, bottom: 0xff102027 },
  general:    { top: 0xff1a73e8, bottom: 0xff0a2e6e },
};

export const FEATURED = {
  title: 'The Heart of It All',
  subtitle: 'Season 3 · Episode 1 · New',
  description:
    'World-renowned cardiologist Dr. Sarah Johnson reveals groundbreaking research on reversing heart disease through precision medicine and lifestyle intervention.',
  category: 'Cardiology',
  duration: '52 min',
  year: '2024',
  rating: 'TV-14',
  colorTop: 0xff0d3b7a,
  colorBottom: 0xff040f22,
};

export const HOME_ROWS = [
  {
    id: 'continue',
    label: 'Continue Watching',
    showProgress: true,
    items: [
      { id: 'cw1', title: 'Understanding Hypertension', duration: '38 min', progress: 0.65, colors: C.cardiology, badge: 'Cardiology' },
      { id: 'cw2', title: 'The Mind-Gut Connection',    duration: '44 min', progress: 0.32, colors: C.mental,     badge: 'Mental Health' },
      { id: 'cw3', title: 'Pediatric Nutrition 101',   duration: '29 min', progress: 0.81, colors: C.pediatrics, badge: 'Pediatrics' },
      { id: 'cw4', title: 'Stress & the Heart',        duration: '41 min', progress: 0.15, colors: C.cardiology, badge: 'Cardiology' },
      { id: 'cw5', title: 'Sleep Science Explained',   duration: '36 min', progress: 0.54, colors: C.neurology,  badge: 'Neurology' },
      { id: 'cw6', title: 'Diabetes Prevention',       duration: '33 min', progress: 0.72, colors: C.nutrition,  badge: 'Nutrition' },
    ],
  },
  {
    id: 'trending',
    label: 'Trending Now',
    items: [
      { id: 't1', title: 'Brain Health & Memory',     duration: '47 min', colors: C.neurology,  badge: 'Neurology' },
      { id: 't2', title: 'Cancer Immunotherapy',      duration: '55 min', colors: C.oncology,   badge: 'Oncology' },
      { id: 't3', title: 'Heart Healthy Cooking',     duration: '28 min', colors: C.nutrition,  badge: 'Nutrition' },
      { id: 't4', title: 'Mindfulness for Anxiety',   duration: '32 min', colors: C.mental,     badge: 'Mental Health' },
      { id: 't5', title: 'HIIT for Beginners',        duration: '22 min', colors: C.fitness,    badge: 'Fitness' },
      { id: 't6', title: 'Understanding Blood Tests', duration: '40 min', colors: C.general,    badge: 'General' },
    ],
  },
  {
    id: 'docs',
    label: 'Featured Documentaries',
    items: [
      { id: 'fd1', title: 'The Longevity Code',    duration: '1h 24min', colors: C.general,    badge: 'Documentary' },
      { id: 'fd2', title: 'Inside the ER',         duration: '58 min',   colors: C.cardiology, badge: 'Documentary' },
      { id: 'fd3', title: 'Mind Over Medicine',    duration: '1h 12min', colors: C.mental,     badge: 'Documentary' },
      { id: 'fd4', title: 'The Sugar Conspiracy',  duration: '1h 08min', colors: C.nutrition,  badge: 'Documentary' },
      { id: 'fd5', title: 'Future of Surgery',     duration: '46 min',   colors: C.general,    badge: 'Documentary' },
      { id: 'fd6', title: 'Healing Without Drugs', duration: '52 min',   colors: C.fitness,    badge: 'Documentary' },
    ],
  },
];

export const ONDEMAND_ROWS = [
  {
    id: 'cardiology-row',
    label: 'Cardiology',
    items: [
      { id: 'od1', title: 'Heart Anatomy Deep Dive',   duration: '45 min',   colors: C.cardiology, badge: 'Cardiology' },
      { id: 'od2', title: 'Arrhythmia Explained',      duration: '38 min',   colors: C.cardiology, badge: 'Cardiology' },
      { id: 'od3', title: 'CABG Surgery Live',         duration: '1h 20min', colors: C.cardiology, badge: 'Cardiology' },
      { id: 'od4', title: 'Preventing Heart Attack',   duration: '42 min',   colors: C.cardiology, badge: 'Cardiology' },
      { id: 'od5', title: 'Cholesterol & Diet',        duration: '34 min',   colors: C.nutrition,  badge: 'Nutrition' },
      { id: 'od6', title: 'Cardiac Rehab Program',     duration: '52 min',   colors: C.fitness,    badge: 'Fitness' },
    ],
  },
  {
    id: 'mental-row',
    label: 'Mental Health & Wellness',
    items: [
      { id: 'mh1', title: 'Managing Depression',          duration: '48 min', colors: C.mental,    badge: 'Mental Health' },
      { id: 'mh2', title: 'Cognitive Behavioral Therapy', duration: '55 min', colors: C.mental,    badge: 'Mental Health' },
      { id: 'mh3', title: 'Overcoming Panic Attacks',     duration: '31 min', colors: C.mental,    badge: 'Mental Health' },
      { id: 'mh4', title: 'Grief & Healing',              duration: '43 min', colors: C.mental,    badge: 'Mental Health' },
      { id: 'mh5', title: 'Meditation Fundamentals',      duration: '24 min', colors: C.fitness,   badge: 'Wellness' },
      { id: 'mh6', title: 'Sleep Disorders',              duration: '37 min', colors: C.neurology, badge: 'Neurology' },
    ],
  },
  {
    id: 'nutrition-row',
    label: 'Nutrition & Lifestyle',
    items: [
      { id: 'nl1', title: 'Anti-Inflammatory Diet',        duration: '36 min', colors: C.nutrition, badge: 'Nutrition' },
      { id: 'nl2', title: 'Mediterranean Eating',          duration: '28 min', colors: C.nutrition, badge: 'Nutrition' },
      { id: 'nl3', title: 'Gut Microbiome Guide',          duration: '51 min', colors: C.nutrition, badge: 'Nutrition' },
      { id: 'nl4', title: 'Intermittent Fasting Science',  duration: '41 min', colors: C.nutrition, badge: 'Nutrition' },
      { id: 'nl5', title: '30-Day Fitness Reset',          duration: '44 min', colors: C.fitness,   badge: 'Fitness' },
      { id: 'nl6', title: 'Hydration & Performance',       duration: '22 min', colors: C.fitness,   badge: 'Fitness' },
    ],
  },
  {
    id: 'pediatrics-row',
    label: 'Pediatric Health',
    items: [
      { id: 'pk1', title: 'Child Development Milestones', duration: '39 min', colors: C.pediatrics, badge: 'Pediatrics' },
      { id: 'pk2', title: 'Childhood Vaccinations',       duration: '27 min', colors: C.pediatrics, badge: 'Pediatrics' },
      { id: 'pk3', title: 'Teen Mental Health',           duration: '46 min', colors: C.mental,     badge: 'Mental Health' },
      { id: 'pk4', title: 'Pediatric Asthma Care',        duration: '33 min', colors: C.pediatrics, badge: 'Pediatrics' },
      { id: 'pk5', title: 'Healthy Lunches for Kids',     duration: '18 min', colors: C.nutrition,  badge: 'Nutrition' },
      { id: 'pk6', title: 'Sports Safety for Kids',       duration: '29 min', colors: C.fitness,    badge: 'Fitness' },
    ],
  },
];

export const DOCTORS = [
  { id: 'dr1', name: 'Dr. Sarah Johnson',   specialty: 'Cardiologist',       rating: '4.9', years: '18 yrs',  available: true,  initials: 'SJ', avatarColor: 0xff1565c0 },
  { id: 'dr2', name: 'Dr. Marcus Williams', specialty: 'Neurologist',         rating: '4.8', years: '22 yrs',  available: true,  initials: 'MW', avatarColor: 0xff6a1b9a },
  { id: 'dr3', name: 'Dr. Elena Rodriguez', specialty: 'Pediatrician',        rating: '4.9', years: '14 yrs',  available: false, nextAvail: 'Tomorrow 10am', initials: 'ER', avatarColor: 0xff2e7d32 },
  { id: 'dr4', name: 'Dr. James Carter',    specialty: 'Oncologist',          rating: '4.7', years: '25 yrs',  available: false, nextAvail: 'Today 3pm',     initials: 'JC', avatarColor: 0xffad1457 },
  { id: 'dr5', name: 'Dr. Aisha Patel',     specialty: 'Psychiatrist',        rating: '5.0', years: '11 yrs',  available: true,  initials: 'AP', avatarColor: 0xff00838f },
  { id: 'dr6', name: 'Dr. Thomas Lee',      specialty: 'Orthopedist',         rating: '4.8', years: '19 yrs',  available: true,  initials: 'TL', avatarColor: 0xffef6c00 },
  { id: 'dr7', name: 'Dr. Fatima Hassan',   specialty: 'Dermatologist',       rating: '4.6', years: '10 yrs',  available: false, nextAvail: 'Tomorrow 2pm',  initials: 'FH', avatarColor: 0xff455a64 },
  { id: 'dr8', name: 'Dr. Robert Kim',      specialty: 'Gastroenterologist',  rating: '4.9', years: '16 yrs',  available: true,  initials: 'RK', avatarColor: 0xff6d4c41 },
];

export const LIVE_STREAM_URL = 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8';
