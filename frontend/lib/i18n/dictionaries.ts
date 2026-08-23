import type { Locale } from "./index";

export const pageKeys = [
  "home",
  "vision",
  "learningPath",
  "login",
  "register",
  "contact",
  "privacy",
  "terms",
] as const;

export type PageKey = (typeof pageKeys)[number];

export interface PagePlaceholderCopy {
  title: string;
  description: string;
}

export type StageStatus = "free" | "demo" | "paid" | "comingSoon";

export interface HomeStageCopy {
  title: string;
  description: string;
  statuses: StageStatus[];
}

export interface HomeStoryStepCopy {
  title: string;
  description: string;
}

export interface HomeCopy {
  prototypeNotice: {
    title: string;
    description: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    description: string;
    primaryCta: string;
    secondaryCta: string;
    prototypeNote: string;
  };
  heroVisual: {
    windowTitle: string;
    courseLabel: string;
    courseTitle: string;
    courseSubtitle: string;
    progressLabel: string;
    progressTemplate: string;
    assessmentLabel: string;
    assessmentValue: string;
    verifiedBadge: string;
    careerLabel: string;
    careerValue: string;
    codeLabel: string;
    codeLine: string;
    stage0Name: string;
    lockedStage: string;
  };
  principles: {
    title: string;
    description: string;
    items: {
      title: string;
      description: string;
    }[];
  };
  stages: {
    title: string;
    description: string;
    statusLabels: Record<StageStatus, string>;
    items: HomeStageCopy[];
  };
  journey: {
    title: string;
    description: string;
    steps: HomeStoryStepCopy[];
  };
  capabilities: {
    title: string;
    description: string;
    items: {
      title: string;
      description: string;
    }[];
  };
  scope: {
    title: string;
    description: string;
    prototypeTitle: string;
    prototypeItems: string[];
    futureTitle: string;
    futureItems: string[];
  };
  cta: {
    title: string;
    description: string;
    primaryCta: string;
    secondaryCta: string;
  };
  vision: {
    title: string;
    description: string;
    cta: string;
  };
}

export interface VisionFuturePillar {
  title: string;
  description: string;
}

export interface VisionCopy {
  prototypeNotice: {
    title: string;
    description: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    description: string;
    primaryCta: string;
    secondaryCta: string;
  };
  purpose: {
    title: string;
    description: string;
    items: string[];
  };
  finalVision: {
    title: string;
    description: string;
    futureLabel: string;
    pillars: VisionFuturePillar[];
  };
  stages: {
    title: string;
    description: string;
    intro: string;
    demoNoteTitle: string;
    demoNote: string;
  };
  certification: {
    title: string;
    description: string;
    todayTitle: string;
    todayDescription: string;
    todayItems: string[];
    futureTitle: string;
    futureDescription: string;
    futureItems: string[];
    noticeTitle: string;
    noticeDescription: string;
  };
  employmentLoop: {
    title: string;
    description: string;
    loopNote: string;
  };
  cta: {
    title: string;
    description: string;
    primaryCta: string;
    secondaryCta: string;
  };
}

export interface LearningPathStageCopy {
  title: string;
  description: string;
  statuses: StageStatus[];
  locked: boolean;
  cta?: {
    label: string;
    href: string;
  };
}

export interface LearningPathCopy {
  prototypeNotice: {
    title: string;
    description: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    description: string;
    primaryCta: string;
    secondaryCta: string;
  };
  stages: {
    title: string;
    description: string;
    items: LearningPathStageCopy[];
  };
  lockedLabel: string;
  availability: {
    title: string;
    description: string;
    freeLabel: string;
    freeItems: string[];
    futureLabel: string;
    futureItems: string[];
  };
  demoNote: {
    title: string;
    description: string;
  };
  cta: {
    title: string;
    description: string;
    primaryCta: string;
    secondaryCta: string;
  };
}

export type LessonOptionality = "core" | "optional";

export interface Stage0LessonCopy {
  title: string;
  description: string;
  optionality: LessonOptionality;
}

export interface Stage0LessonExample {
  title: string;
  code: string;
  explanation: string;
}

export interface Stage0LessonExercise {
  title: string;
  description: string;
  hint: string;
}

export interface Stage0LessonContent {
  objective: string;
  explanation: string[];
  example: Stage0LessonExample;
  mistakes: string[];
  exercise: Stage0LessonExercise;
}

export interface PythonStage0Copy {
  prototypeNotice: {
    title: string;
    description: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    description: string;
    primaryCta: string;
    secondaryCta: string;
  };
  overview: {
    title: string;
    description: string;
    items: string[];
  };
  lessons: {
    title: string;
    description: string;
    freeLabel: string;
    optionalLabel: string;
    items: Stage0LessonCopy[];
  };
  seedLessons: {
    demoNote: {
      title: string;
      description: string;
    };
    items: Stage0LessonContent[];
  };
  lessonDetail: {
    prototypeNotice: {
      title: string;
      description: string;
    };
    backToStage0: string;
    openLabel: string;
    labels: {
      lesson: string;
      objective: string;
      explanation: string;
      example: string;
      commonMistakes: string;
      exercise: string;
      hint: string;
      navigation: string;
    };
    empty: {
      title: string;
      description: string;
    };
    navigation: {
      previous: string;
      next: string;
      allLessons: string;
    };
    exerciseCta: string;
    exerciseNote: string;
    progress: {
      markComplete: string;
      completed: string;
      completedNote: string;
      undo: string;
    };
  };
  demoNote: {
    title: string;
    description: string;
  };
  cta: {
    title: string;
    description: string;
    primaryCta: string;
    secondaryCta: string;
  };
}

export interface DemoAssessmentOptionCopy {
  id: string;
  en: string;
}

export interface DemoAssessmentQuestionCopy {
  id: string;
  en: string;
  options: DemoAssessmentOptionCopy[];
  correct: number;
}

export interface DemoAssessmentStageCopy {
  stage: number;
  title: string;
  description: string;
  questions: DemoAssessmentQuestionCopy[];
}

export interface DemoAssessmentsCopy {
  learningPathSection: {
    title: string;
    description: string;
    openLabel: string;
  };
  prototypeNotice: {
    title: string;
    description: string;
  };
  demoLabel: string;
  backLabel: string;
  questionProgress: string;
  previous: string;
  next: string;
  submit: string;
  unanswered: {
    title: string;
    message: string;
  };
  result: {
    title: string;
    scoreLabel: string;
    scoreOutOf: string;
    demoNote: string;
    retry: string;
    backToLearningPath: string;
  };
  stages: DemoAssessmentStageCopy[];
}

export interface RegisterFormErrorCopy {
  emailRequired: string;
  emailInvalid: string;
  passwordRequired: string;
  passwordMinLength: string;
  confirmPasswordRequired: string;
  passwordsMustMatch: string;
}

export interface RegisterCopy {
  prototypeNotice: {
    title: string;
    description: string;
  };
  hero: {
    title: string;
    description: string;
  };
  form: {
    email: {
      label: string;
      placeholder: string;
    };
    password: {
      label: string;
      placeholder: string;
      hint: string;
    };
    confirmPassword: {
      label: string;
      placeholder: string;
    };
    submit: string;
    submitting: string;
    serverError: string;
    unavailable: string;
    successTitle: string;
    successDescription: string;
    errors: RegisterFormErrorCopy;
  };
  login: {
    prompt: string;
    label: string;
  };
}

export interface LoginFormErrorCopy {
  emailRequired: string;
  emailInvalid: string;
  passwordRequired: string;
}

export interface LoginCopy {
  prototypeNotice: {
    title: string;
    description: string;
  };
  hero: {
    title: string;
    description: string;
  };
  form: {
    email: {
      label: string;
      placeholder: string;
    };
    password: {
      label: string;
      placeholder: string;
    };
    submit: string;
    submitting: string;
    serverError: string;
    unavailable: string;
    invalidCredentials: string;
    errors: LoginFormErrorCopy;
  };
  register: {
    prompt: string;
    label: string;
  };
}

export interface DashboardCopy {
  prototypeNotice: {
    title: string;
    description: string;
  };
  hero: {
    eyebrow: string;
    welcomeTitle: string;
    guestTitle: string;
    description: string;
  };
  currentCourse: {
    title: string;
    description: string;
    courseTitle: string;
    courseDescription: string;
    freeBadge: string;
    openLabel: string;
  };
  progress: {
    title: string;
    description: string;
    lessonsCompleted: string;
    completedNote: string;
    emptyTitle: string;
    emptyDescription: string;
    startLabel: string;
    continueLabel: string;
  };
  stages: {
    title: string;
    description: string;
  };
  cta: {
    title: string;
    description: string;
    primaryCta: string;
    secondaryCta: string;
  };
  auth: {
    loading: string;
    unauthenticatedTitle: string;
    unauthenticatedDescription: string;
    loginLabel: string;
    registerLabel: string;
    errorTitle: string;
    errorDescription: string;
    logoutLabel: string;
    studentRole: string;
  };
}

export interface AdminDashboardStatCopy {
  label: string;
  description: string;
}

export interface AdminDashboardSectionCopy {
  title: string;
  description: string;
  openLabel: string;
}

export interface AdminDashboardCopy {
  prototypeNotice: {
    title: string;
    description: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    description: string;
    adminRole: string;
    logoutLabel: string;
  };
  stats: {
    title: string;
    description: string;
    emptyValue: string;
    users: AdminDashboardStatCopy;
    stage0Participants: AdminDashboardStatCopy;
    assessmentAttempts: AdminDashboardStatCopy;
  };
  sections: {
    title: string;
    description: string;
    users: AdminDashboardSectionCopy;
    courses: AdminDashboardSectionCopy;
    assessments: AdminDashboardSectionCopy;
  };
  auth: {
    loading: string;
    unauthorizedTitle: string;
    unauthorizedDescription: string;
    loginLabel: string;
    errorTitle: string;
    errorDescription: string;
  };
}

export interface AdminUsersCopy {
  prototypeNotice: { title: string; description: string };
  hero: { eyebrow: string; title: string; description: string };
  table: { email: string; role: string; status: string; joined: string };
  searchAriaLabel: string;
  searchPlaceholder: string;
  emptyTitle: string;
  emptyDescription: string;
  loading: string;
  errorTitle: string;
  errorDescription: string;
  unauthorizedTitle: string;
  unauthorizedDescription: string;
  loginLabel: string;
  statusLabels: { active: string; inactive: string };
}

export interface AdminCourseFieldsCopy {
  title: string;
  description: string;
  objective: string;
  explanation: string;
  exampleTitle: string;
  exampleCode: string;
  exampleExplanation: string;
  mistakes: string;
  exerciseTitle: string;
  exerciseDescription: string;
  exerciseHint: string;
}

export interface AdminCoursesCopy {
  prototypeNotice: { title: string; description: string };
  hero: { eyebrow: string; title: string; description: string };
  create: {
    title: string;
    description: string;
    labels: {
      slug: string;
      stage: string;
      titleId: string;
      titleEn: string;
      descriptionId: string;
      descriptionEn: string;
    };
    submit: string;
    creating: string;
    serverError: string;
    slugExists: string;
    validationError: string;
  };
  list: {
    title: string;
    description: string;
    emptyTitle: string;
    emptyDescription: string;
  };
  table: { course: string; stage: string; lessons: string; updated: string };
  loading: string;
  errorTitle: string;
  errorDescription: string;
  unauthorizedTitle: string;
  unauthorizedDescription: string;
  loginLabel: string;
  fieldLabels: AdminCourseFieldsCopy;
  languageLabels: { id: string; en: string };
  save: string;
  saving: string;
  saved: string;
  saveError: string;
  editLesson: string;
  cancel: string;
  courseMetaTitle: string;
  courseMetaDescription: string;
  lessonsTitle: string;
  lessonsDescription: string;
  backLabel: string;
  lessonLabel: string;
}

export interface AdminAssessmentsCopy {
  prototypeNotice: { title: string; description: string };
  hero: { eyebrow: string; title: string; description: string };
  list: {
    title: string;
    description: string;
    emptyTitle: string;
    emptyDescription: string;
  };
  table: { stage: string; questions: string; openLabel: string };
  loading: string;
  errorTitle: string;
  errorDescription: string;
  unauthorizedTitle: string;
  unauthorizedDescription: string;
  loginLabel: string;
  detail: {
    questionsTitle: string;
    questionsDescription: string;
    backLabel: string;
    demoLabel: string;
    questionLabel: string;
    editQuestion: string;
    cancel: string;
    createTitle: string;
    createDescription: string;
    createSubmit: string;
    creating: string;
    save: string;
    saving: string;
    saved: string;
    saveError: string;
    labels: {
      questionId: string;
      questionEn: string;
      optionTemplate: string;
      optionId: string;
      optionEn: string;
      correctOption: string;
    };
  };
}

export interface ContactCopy {
  prototypeNotice: { title: string; description: string };
  hero: { eyebrow: string; title: string; description: string };
  info: { title: string; description: string; emailLabel: string; emailValue: string; responseNote: string };
  form: {
    title: string;
    description: string;
    name: { label: string; placeholder: string };
    email: { label: string; placeholder: string };
    message: { label: string; placeholder: string };
    submit: string;
    submitting: string;
    successTitle: string;
    successDescription: string;
    sendAnother: string;
    errors: {
      nameRequired: string;
      emailRequired: string;
      emailInvalid: string;
      messageRequired: string;
      messageMinLength: string;
    };
  };
}

export interface Dictionary {
  meta: {
    title: string;
    description: string;
  };
  brand: {
    name: string;
  };
  skipLink: string;
  nav: Record<
    "home" | "learningPath" | "vision" | "login" | "register",
    string
  >;
  navAccessibility: {
    primaryLabel: string;
    mobileLabel: string;
    openMenu: string;
    closeMenu: string;
  };
  languageSwitcher: {
    label: string;
  };
  footer: {
    tagline: string;
    platformTitle: string;
    learningTitle: string;
    projectTitle: string;
    legalTitle: string;
    platform: Record<"home" | "learningPath" | "vision", string>;
    learning: Record<"stage0" | "demoAssessment", string>;
    project: Record<"contact", string>;
    legal: Record<"privacy" | "terms", string>;
    prototypeNote: string;
    rights: string;
  };
  placeholder: {
    comingSoon: string;
    description: string;
    pages: Record<PageKey, PagePlaceholderCopy>;
  };
  home: HomeCopy;
  vision: VisionCopy;
  learningPath: LearningPathCopy;
  pythonStage0: PythonStage0Copy;
  demoAssessments: DemoAssessmentsCopy;
  register: RegisterCopy;
  login: LoginCopy;
  dashboard: DashboardCopy;
  adminDashboard: AdminDashboardCopy;
  adminUsers: AdminUsersCopy;
  adminCourses: AdminCoursesCopy;
  adminAssessments: AdminAssessmentsCopy;
  contact: ContactCopy;
  privacy: {
    prototypeNotice: { title: string; description: string };
    hero: { eyebrow: string; title: string; description: string };
    sections: { heading: string; content: string }[];
    legalReview: { title: string; description: string };
  };
  terms: {
    prototypeNotice: { title: string; description: string };
    hero: { eyebrow: string; title: string; description: string };
    sections: { heading: string; content: string }[];
    legalReview: { title: string; description: string };
  };
}

export const dictionaries: Record<Locale, Dictionary> = {
  id: {
    meta: {
      title: "Bilingual Edu Platform",
      description:
        "Platform pendidikan, sertifikasi, dan talenta pemrograman dwibahasa.",
    },
    brand: {
      name: "Bilingual Edu Platform",
    },
    skipLink: "Langsung ke konten utama",
    nav: {
      home: "Beranda",
      learningPath: "Jalur Belajar",
      vision: "Visi",
      login: "Masuk",
      register: "Daftar",
    },
    navAccessibility: {
      primaryLabel: "Navigasi utama",
      mobileLabel: "Navigasi seluler",
      openMenu: "Buka menu",
      closeMenu: "Tutup menu",
    },
    languageSwitcher: {
      label: "Ganti bahasa",
    },
    footer: {
      tagline:
        "Platform pendidikan, sertifikasi, dan talenta pemrograman dwibahasa.",
      platformTitle: "Platform",
      learningTitle: "Belajar",
      projectTitle: "Proyek",
      legalTitle: "Legal",
      platform: {
        home: "Beranda",
        learningPath: "Jalur Belajar",
        vision: "Visi",
      },
      learning: {
        stage0: "Stage 0 — Python",
        demoAssessment: "Demo Penilaian",
      },
      project: {
        contact: "Kontak",
      },
      legal: {
        privacy: "Kebijakan Privasi",
        terms: "Syarat & Ketentuan",
      },
      prototypeNote:
        "Prototipe v0.0.1 — hanya untuk validasi konsep, bukan produk final.",
      rights: "Semua hak dilindungi.",
    },
    placeholder: {
      comingSoon: "Segera Hadir",
      description: "Halaman ini sedang disiapkan.",
      pages: {
        home: {
          title: "Beranda",
          description:
            "Halaman utama platform akan hadir di milestone berikutnya.",
        },
        vision: {
          title: "Visi Proyek",
          description:
            "Penjelasan prototipe dan visi jangka panjang platform akan hadir di milestone berikutnya.",
        },
        learningPath: {
          title: "Jalur Belajar",
          description:
            "Gambaran umum jalur belajar Stage 0–4 akan hadir di milestone berikutnya.",
        },
        login: {
          title: "Masuk",
          description:
            "Halaman masuk pengguna akan hadir di milestone berikutnya.",
        },
        register: {
          title: "Daftar",
          description:
            "Halaman pendaftaran pengguna akan hadir di milestone berikutnya.",
        },
        contact: {
          title: "Kontak",
          description:
            "Informasi kontak proyek akan hadir di milestone berikutnya.",
        },
        privacy: {
          title: "Kebijakan Privasi",
          description:
            "Kebijakan privasi prototipe akan hadir di milestone berikutnya.",
        },
        terms: {
          title: "Syarat & Ketentuan",
          description:
            "Syarat dan ketentuan prototipe akan hadir di milestone berikutnya.",
        },
      },
    },
    home: {
      prototypeNotice: {
        title: "Prototipe v0.0.1",
        description:
          "Halaman ini adalah prototipe untuk validasi konsep, bukan produk final.",
      },
      hero: {
        eyebrow: "Platform Pendidikan Teknologi",
        title: "Belajar pemrograman. Bangun keterampilan. Menuju karier.",
        description:
          "Platform dwibahasa (Indonesia & Inggris) dengan jalur belajar terpandu, demo penilaian, dan pelacakan progres — dari pelajaran pertama hingga kesiapan karier.",
        primaryCta: "Mulai Belajar",
        secondaryCta: "Daftar Gratis",
        prototypeNote: "Prototipe v0.0.1 — validasi konsep, bukan produk final.",
      },
      heroVisual: {
        windowTitle: "Pratinjau Platform",
        courseLabel: "Kursus Saat Ini",
        courseTitle: "Python Stage 0 — Dasar Pemrograman",
        courseSubtitle: "Apa itu Pemrograman?",
        progressLabel: "Progres",
        progressTemplate: "{completed} dari {total} pelajaran",
        assessmentLabel: "Demo Penilaian",
        assessmentValue: "Tersedia",
        verifiedBadge: "Demo — bukan sertifikasi",
        careerLabel: "Kesiapan Karier",
        careerValue: "Mulai dari Stage 0",
        codeLabel: "Kode Pertama Anda",
        codeLine: 'print("Halo, dunia!")',
        stage0Name: "Stage 0",
        lockedStage: "Terkunci",
      },
      principles: {
        title: "Fondasi yang jujur dan terukur",
        description:
          "Fitur prototipe dirancang untuk validasi — tidak ada klaim palsu.",
        items: [
          {
            title: "Dwibahasa ID/EN",
            description:
              "Semua konten pembelajaran tersedia dalam bahasa Indonesia dan Inggris.",
          },
          {
            title: "Jalur terpandu",
            description:
              "Struktur lima tahap dari dasar pemrograman hingga kesiapan karier.",
          },
          {
            title: "Demo penilaian",
            description:
              "Ukur pemahaman Anda dengan latihan bertanda demo — jelas, tanpa klaim sertifikasi.",
          },
          {
            title: "Progres tersimpan",
            description:
              "Pelajaran yang selesai tercatat otomatis di perangkat Anda.",
          },
        ],
      },
      stages: {
        title: "Lima Tahap Menuju Karier",
        description:
          "Jalur terstruktur dari dasar pemrograman hingga kesiapan karier. Semua konten masih berupa prototipe dan demo.",
        statusLabels: {
          free: "Gratis",
          demo: "Demo",
          paid: "Berbayar",
          comingSoon: "Segera Hadir",
        },
        items: [
          {
            title: "Stage 0 — Dasar Pemrograman",
            description:
              "Mulai dari nol: variabel, tipe data, dan program Python pertama Anda.",
            statuses: ["free"],
          },
          {
            title: "Stage 1 — Latihan & Proyek",
            description:
              "Terapkan keterampilan Anda melalui latihan dan proyek kecil.",
            statuses: ["demo"],
          },
          {
            title: "Stage 2 — Demo Penilaian",
            description:
              "Ukur pemahaman Anda melalui demo penilaian per tahap.",
            statuses: ["paid", "comingSoon"],
          },
          {
            title: "Stage 3 — Sertifikasi",
            description:
              "Jalur sertifikasi terverifikasi di masa depan—bukan ujian resmi di prototipe.",
            statuses: ["paid", "comingSoon"],
          },
          {
            title: "Stage 4 — Profesional & Talenta",
            description:
              "Hubungkan talenta terverifikasi dengan peluang karier.",
            statuses: ["paid", "comingSoon"],
          },
        ],
      },
      journey: {
        title: "Dari Pendidikan ke Pekerjaan",
        description:
          "Perjalanan tujuh langkah dari pelajaran pertama hingga peluang karier.",
        steps: [
          {
            title: "Belajar",
            description:
              "Kuasai dasar pemrograman dengan pelajaran terpandu langkah demi langkah.",
          },
          {
            title: "Berlatih",
            description:
              "Perkuat keterampilan Anda dengan latihan dan proyek kecil.",
          },
          {
            title: "Membangun",
            description:
              "Bangun proyek nyata untuk menerapkan apa yang Anda pelajari.",
          },
          {
            title: "Uji",
            description:
              "Ukur pemahaman Anda melalui demo penilaian per tahap.",
          },
          {
            title: "Sertifikasi",
            description:
              "Jalur menuju sertifikasi terverifikasi (demo di prototipe).",
          },
          {
            title: "Portofolio",
            description:
              "Tampilkan hasil kerja Anda sebagai portofolio.",
          },
          {
            title: "Bekerja",
            description:
              "Terhubung dengan pemberi kerja yang mencari talenta terverifikasi.",
          },
        ],
      },
      capabilities: {
        title: "Kapabilitas Platform",
        description:
          "Apa yang tersedia di prototipe hari ini — dibangun dengan arsitektur yang aman dan siap produksi.",
        items: [
          {
            title: "Belajar Terpandu",
            description:
              "Pelajaran langkah demi langkah dengan tujuan, penjelasan, contoh, dan latihan.",
          },
          {
            title: "Praktik Kode",
            description:
              "Blok kode Python yang mudah disalin untuk latihan langsung di editor Anda.",
          },
          {
            title: "Demo Penilaian",
            description:
              "Kuis pilihan ganda dwibahasa per tahap — jelas demo, bukan ujian resmi.",
          },
          {
            title: "Pelacakan Progres",
            description:
              "Progres Stage 0 tersimpan otomatis di perangkat Anda.",
          },
          {
            title: "Dasbor Siswa",
            description:
              "Ringkasan kursus, progres, dan lanjutan belajar dalam satu halaman.",
          },
          {
            title: "Arsitektur Aman",
            description:
              "Kata sandi di-hash, token bertanda tangan, dan header keamanan standar.",
          },
        ],
      },
      scope: {
        title: "Prototipe Sekarang vs Produk Masa Depan",
        description:
          "Jelas mana yang tersedia hari ini dan mana yang merupakan arah produk ke depan.",
        prototypeTitle: "Hari Ini (Prototipe)",
        prototypeItems: [
          "Fondasi platform dwibahasa (Indonesia & Inggris).",
          "Halaman beranda dan kerangka situs yang responsif.",
          "Jalur belajar 5 tahap sebagai pratinjau.",
          "Stage 0 gratis sebagai pintu masuk belajar.",
          "Demo penilaian (bukan ujian sertifikasi resmi).",
        ],
        futureTitle: "Masa Depan (Produk Final)",
        futureItems: [
          "Perpustakaan kursus lengkap.",
          "Program sertifikasi terverifikasi.",
          "Portofolio pembelajar.",
          "Pasar talenta dan rekrutmen pemberi kerja.",
        ],
      },
      cta: {
        title: "Siap mulai belajar?",
        description: "Mulai dengan Python Stage 0 — gratis dan langsung dari nol.",
        primaryCta: "Mulai Belajar",
        secondaryCta: "Jelajahi Jalur Belajar",
      },
      vision: {
        title: "Visi Masa Depan",
        description:
          "Prototipe ini memvalidasi fondasi platform. Ke depannya, platform akan mencakup kursus lengkap, sertifikasi, dan pasar talenta—saat ini semua masih berupa demo dan rencana.",
        cta: "Lihat Visi Proyek",
      },
    },
    vision: {
      prototypeNotice: {
        title: "Prototipe v0.0.1",
        description:
          "Halaman ini menjelaskan tujuan prototipe dan visi jangka panjang platform. Fitur yang belum tersedia ditandai dengan jelas sebagai rencana masa depan.",
      },
      hero: {
        eyebrow: "Visi Proyek",
        title: "Dari prototipe menuju platform karier pemrograman.",
        description:
          "Platform dwibahasa (Indonesia & Inggris) yang membawa pembelajar dari pelajaran terpandu menuju sertifikasi terverifikasi, lalu menghubungkan talenta terverifikasi dengan pemberi kerja.",
        primaryCta: "Lihat Jalur Belajar",
        secondaryCta: "Kembali ke Beranda",
      },
      purpose: {
        title: "Tujuan Prototipe",
        description:
          "Prototipe v0.0.1 memvalidasi fondasi platform sebelum membangun produk lengkap. Yang diuji hari ini adalah fondasi teknis dan arah produk — bukan produk akhir.",
        items: [
          "Fondasi platform dwibahasa (Indonesia & Inggris).",
          "Kerangka situs responsif: beranda, jalur belajar, visi, dan halaman pendukung.",
          "Pratinjau jalur belajar 5 tahap (Stage 0–4).",
          "Stage 0 gratis sebagai pintu masuk belajar.",
          "Demo penilaian untuk menguji pemahaman — bukan ujian sertifikasi resmi.",
          "Umpan balik pembelajar untuk memandu produk final.",
        ],
      },
      finalVision: {
        title: "Visi Produk Final",
        description:
          "Produk final bertujuan menjadi jalur lengkap dari pendidikan menuju pekerjaan dalam satu ekosistem dwibahasa: kursus, sertifikasi terverifikasi, portofolio, dan pasar talenta.",
        futureLabel: "Masa Depan",
        pillars: [
          {
            title: "Perpustakaan Kursus Lengkap",
            description:
              "Kursus terstruktur dan dwibahasa dari dasar hingga tingkat mahir.",
          },
          {
            title: "Sertifikasi Terverifikasi",
            description:
              "Program sertifikasi yang dapat diverifikasi oleh pemberi kerja.",
          },
          {
            title: "Portofolio Pembelajar",
            description:
              "Ruang untuk menampilkan hasil kerja dan proyek pembelajar.",
          },
          {
            title: "Pasar Talenta & Rekrutmen",
            description:
              "Menghubungkan talenta terverifikasi dengan peluang karier nyata.",
          },
        ],
      },
      stages: {
        title: "Memahami Stage 0–4",
        description:
          "Jalur belajar dirancang dalam lima tahap, dari dasar pemrograman hingga kesiapan karier.",
        intro:
          "Setiap tahap membangun keterampilan menuju tahap berikutnya. Status pada setiap kartu menunjukkan ketersediaan saat ini.",
        demoNoteTitle: "Catatan Demo",
        demoNote:
          "Semua konten di prototipe masih berupa pratinjau dan demo. Penilaian di sini bukan ujian sertifikasi resmi.",
      },
      certification: {
        title: "Jalur Sertifikasi",
        description:
          "Sertifikasi adalah bagian penting dari visi jangka panjang. Di prototipe ini, jalur tersebut masih berupa rencana dan demo — bukan ujian resmi.",
        todayTitle: "Hari Ini (Prototipe)",
        todayDescription: "Yang tersedia sekarang:",
        todayItems: [
          "Demo penilaian per tahap untuk mengukur pemahaman.",
          "Umpan balik belajar, bukan hasil sertifikasi resmi.",
          "Tanpa biaya dan tanpa sertifikat resmi.",
        ],
        futureTitle: "Masa Depan (Produk Final)",
        futureDescription: "Yang akan kami bangun:",
        futureItems: [
          "Ujian sertifikasi yang dirancang secara profesional.",
          "Sertifikat terverifikasi yang dapat dicek oleh pemberi kerja.",
          "Proses yang adil, transparan, dan sesuai standar industri.",
        ],
        noticeTitle: "Perlu Diperjelas",
        noticeDescription:
          "Demo penilaian di prototipe tidak pernah dipresentasikan sebagai ujian sertifikasi resmi.",
      },
      employmentLoop: {
        title: "Lingkaran Pendidikan ke Pekerjaan",
        description:
          "Visi akhir: lingkaran berkelanjutan di mana pembelajar terus mengasah keterampilan, memverifikasi kemampuan, dan terhubung dengan peluang kerja.",
        loopNote:
          "Langkah-langkah ini menggambarkan visi produk final. Di prototipe, sebagian besar langkah masih berupa demo dan rencana.",
      },
      cta: {
        title: "Lihat jalur belajar hari ini.",
        description:
          "Mulai dari Stage 0 yang gratis dan jelajahi struktur lima tahap.",
        primaryCta: "Mulai Belajar",
        secondaryCta: "Daftar Gratis",
      },
    },
    learningPath: {
      prototypeNotice: {
        title: "Prototipe v0.0.1",
        description:
          "Halaman ini adalah gambaran umum jalur belajar Stage 0–4. Kurikulum lengkap belum dibangun.",
      },
      hero: {
        eyebrow: "Jalur Belajar",
        title: "Lima tahap menuju karier pemrograman.",
        description:
          "Jalur terstruktur dari dasar pemrograman hingga kesiapan karier. Stage 0–1 gratis; Stage 2–4 berbayar dan segera hadir.",
        primaryCta: "Daftar Gratis",
        secondaryCta: "Kembali ke Beranda",
      },
      stages: {
        title: "Ringkasan Stage 0–4",
        description:
          "Setiap tahap membangun keterampilan menuju tahap berikutnya. Status pada kartu menunjukkan ketersediaan saat ini.",
        items: [
          {
            title: "Stage 0 — Dasar Pemrograman",
            description:
              "Mulai dari nol: variabel, tipe data, dan program Python pertama Anda.",
            statuses: ["free"],
            locked: false,
            cta: {
              label: "Mulai dengan Python",
              href: "/learning-path/stage-0",
            },
          },
          {
            title: "Stage 1 — Latihan & Proyek",
            description:
              "Terapkan keterampilan Anda melalui latihan dan proyek kecil.",
            statuses: ["free"],
            locked: false,
          },
          {
            title: "Stage 2 — Demo Penilaian",
            description:
              "Ukur pemahaman Anda melalui demo penilaian per tahap.",
            statuses: ["paid", "comingSoon"],
            locked: true,
          },
          {
            title: "Stage 3 — Sertifikasi",
            description:
              "Jalur sertifikasi terverifikasi di masa depan—bukan ujian resmi di prototipe.",
            statuses: ["paid", "comingSoon"],
            locked: true,
          },
          {
            title: "Stage 4 — Profesional & Talenta",
            description:
              "Hubungkan talenta terverifikasi dengan peluang karier.",
            statuses: ["paid", "comingSoon"],
            locked: true,
          },
        ],
      },
      lockedLabel: "Terkunci",
      availability: {
        title: "Ketersediaan Hari Ini",
        description:
          "Stage 0–1 gratis, dan demo penilaian Stage 1–4 dapat dicoba tanpa biaya. Kursus Stage 2–4 berbayar masih dalam pengembangan.",
        freeLabel: "Gratis Hari Ini",
        freeItems: [
          "Stage 0 — Dasar Pemrograman (Python).",
          "Stage 1 — Latihan & Proyek.",
          "Demo penilaian Stage 1–4 (gratis, bukan ujian sertifikasi resmi).",
        ],
        futureLabel: "Segera Hadir (Berbayar)",
        futureItems: [
          "Stage 2 — Kursus berbayar.",
          "Stage 3 — Sertifikasi.",
          "Stage 4 — Profesional & Talenta.",
        ],
      },
      demoNote: {
        title: "Catatan Demo",
        description:
          "Semua konten di prototipe masih berupa pratinjau dan demo. Penilaian di sini bukan ujian sertifikasi resmi.",
      },
      cta: {
        title: "Mulai dari Stage 0 yang gratis.",
        description:
          "Daftar gratis dan pelajari Python dari nol melalui jalur belajar.",
        primaryCta: "Daftar Sekarang",
        secondaryCta: "Lihat Visi Proyek",
      },
    },
    pythonStage0: {
      prototypeNotice: {
        title: "Prototipe v0.0.1",
        description:
          "Ini adalah gambaran awal kursus Python Stage 0. Kurikulum lengkap dan halaman pelajaran belum dibangun.",
      },
      hero: {
        eyebrow: "Python · Stage 0",
        title: "Dasar pemrograman dengan Python.",
        description:
          "Mulai dari nol: pelajari apa itu pemrograman, kenali Python, dan tulis program pertama Anda. Kursus ini gratis dan tersedia dalam bahasa Indonesia.",
        primaryCta: "Daftar Gratis",
        secondaryCta: "Kembali ke Jalur Belajar",
      },
      overview: {
        title: "Apa yang akan Anda pelajari",
        description:
          "Stage 0 membangun fondasi pemrograman Anda langkah demi langkah, tanpa mengasumsikan pengetahuan sebelumnya.",
        items: [
          "Apa itu pemrograman dan mengapa mempelajarinya.",
          "Mengenal Python dan kelebihannya untuk pemula.",
          "Memasang dan menjalankan Python di komputer Anda.",
          "Menulis dan menjalankan program 'Hello World'.",
          "Menggunakan variabel untuk menyimpan data.",
          "Memahami tipe data dasar.",
          "Mengenal kondisi dan perulangan (opsional).",
        ],
      },
      lessons: {
        title: "Daftar Pelajaran",
        description:
          "Delapan pelajaran awal untuk membangun pemahaman pertama Anda tentang Python.",
        freeLabel: "Gratis",
        optionalLabel: "Opsional",
        items: [
          {
            title: "Apa itu Pemrograman?",
            description:
              "Pahami konsep dasar pemrograman dan bagaimana komputer menjalankan instruksi.",
            optionality: "core",
          },
          {
            title: "Apa itu Python?",
            description:
              "Kenali Python, bahasa pemrograman populer yang ramah bagi pemula.",
            optionality: "core",
          },
          {
            title: "Memasang & Menjalankan Python",
            description:
              "Pasang Python di komputer Anda dan pelajari cara menjalankan kode.",
            optionality: "core",
          },
          {
            title: "Hello World",
            description:
              "Tulis program Python pertama Anda dan lihat hasilnya di layar.",
            optionality: "core",
          },
          {
            title: "Variabel",
            description:
              "Simpan dan gunakan data dalam program Anda menggunakan variabel.",
            optionality: "core",
          },
          {
            title: "Tipe Data",
            description:
              "Kenali tipe data dasar seperti angka dan teks, serta kapan menggunakannya.",
            optionality: "core",
          },
          {
            title: "Kondisi",
            description:
              "Buat program yang mengambil keputusan menggunakan if dan else.",
            optionality: "optional",
          },
          {
            title: "Perulangan",
            description:
              "Ulangi tugas secara otomatis menggunakan perulangan seperti for dan while.",
            optionality: "optional",
          },
        ],
      },
      seedLessons: {
        demoNote: {
          title: "Materi Awal (Seed)",
          description:
            "Materi pelajaran ini adalah konten awal untuk validasi prototipe. Ini bukan bagian dari program sertifikasi resmi.",
        },
        items: [
          {
            objective:
              "Pahami apa itu pemrograman dan bagaimana komputer menjalankan instruksi.",
            explanation: [
              "Pemrograman adalah cara kita memberikan instruksi kepada komputer agar komputer melakukan tugas tertentu. Sama seperti resep masakan yang berisi langkah-langkah, sebuah program berisi langkah-langkah yang diikuti komputer satu per satu.",
              "Komputer tidak berpikir seperti manusia. Ia hanya menjalankan instruksi yang jelas dan tidak ambigu. Karena itu, kita menulis instruksi dalam bahasa pemrograman — bahasa yang dirancang agar mudah dipahami manusia sekaligus dapat dijalankan komputer.",
              "Hasilnya, dengan belajar memprogram Anda bisa menyuruh komputer menyelesaikan masalah nyata, seperti mengolah data, membuat aplikasi, atau mengotomatiskan tugas yang berulang.",
            ],
            example: {
              title: "Contoh analogi: membuat teh",
              code: "1. Didihkan air\n2. Masukkan kantong teh ke cangkir\n3. Tuang air panas ke cangkir\n4. Tunggu 3 menit\n5. Angkat kantong teh\n6. Nikmati teh Anda",
              explanation:
                "Program bekerja seperti daftar langkah ini: komputer membaca instruksi dari atas ke bawah dan mengerjakannya sesuai urutan.",
            },
            mistakes: [
              "Membayangkan komputer bisa 'mengerti maksud kita'. Faktanya, komputer hanya menjalankan instruksi persis seperti yang ditulis.",
              "Menulis instruksi yang terlalu samar, misalnya 'buatkan aplikasi yang bagus', tanpa langkah yang jelas.",
              "Menyerah terlalu cepat karena mengira pemrograman hanya untuk orang yang pandai matematika. Pemrograman adalah keterampilan yang bisa dipelajari siapa saja.",
            ],
            exercise: {
              title: "Latihan: instruksi membuat sandwich",
              description:
                "Tuliskan langkah-langkah membuat sandwich dalam 5–7 instruksi singkat, dalam urutan yang benar. Pastikan setiap langkah cukup jelas untuk diikuti orang yang belum pernah membuat sandwich.",
              hint: "Bayangkan pembaca tidak tahu apa pun. Langkah seperti 'letakkan selembar roti' lebih baik daripada 'siapkan bahan makanan'.",
            },
          },
          {
            objective:
              "Kenali Python, mengapa ia populer, dan apa saja yang bisa Anda bangun dengannya.",
            explanation: [
              "Python adalah bahasa pemrograman tingkat tinggi yang populer di seluruh dunia. Python dirancang agar mudah dibaca, sehingga cocok untuk pemula sekaligus untuk proyek profesional.",
              "Python digunakan di berbagai bidang: pengembangan web, analisis data, kecerdasan buatan, dan otomasi. Karena peminatnya besar, dokumentasi dan komunitasnya pun sangat luas.",
              "Kelebihan utamanya untuk pemula: sintaksnya mirip bahasa Inggris, tidak terlalu 'berisik', dan hasilnya cepat terlihat.",
            ],
            example: {
              title: "Contoh: sekilas sintaks Python",
              code: 'name = "Alex"\nprint("Hello, " + name)',
              explanation:
                "Di sini kita menyimpan teks ke dalam variabel `name`, lalu menampilkannya dengan `print`. Anda akan mempelajari variabel dan `print` pada pelajaran berikutnya.",
            },
            mistakes: [
              "Mengira Python hanya bisa digunakan di satu bidang. Faktanya, Python dipakai di banyak industri.",
              "Membandingkan diri dengan programmer lain yang sudah mahir; fokuslah pada kemajuan Anda sendiri.",
              "Mengabaikan dokumentasi resmi dan komunitas — keduanya adalah sumber belajar terbaik.",
            ],
            exercise: {
              title: "Latihan: jelaskan Python",
              description:
                "Tuliskan tiga kalimat tentang Python dengan kata-kata Anda sendiri: apa itu Python, mengapa populer, dan satu hal yang ingin Anda buat dengannya.",
              hint: "Jika bingung, baca kembali bagian penjelasan dan contoh di atas.",
            },
          },
          {
            objective:
              "Pasang Python di komputer Anda dan jalankan program Python pertama dari terminal.",
            explanation: [
              "Sebelum menulis program, kita perlu memasang Python. Kunjungi situs resmi python.org, unduh versi terbaru untuk sistem operasi Anda, lalu ikuti petunjuk pemasangannya. Di Windows, pastikan Anda mencentang opsi 'Add Python to PATH'.",
              "Setelah terpasang, buka terminal (Command Prompt di Windows, Terminal di macOS/Linux) dan ketik `python --version`. Jika muncul nomor versi, Python siap digunakan.",
              "Untuk menjalankan program, simpan kode Anda dalam file berekstensi `.py`, lalu jalankan dengan perintah `python nama-file.py`.",
            ],
            example: {
              title: "Contoh: memeriksa versi dan menjalankan file",
              code: "python --version\npython program.py",
              explanation:
                "Baris pertama memeriksa versi Python yang terpasang. Baris kedua menjalankan file `program.py`; file tersebut harus berada di folder tempat Anda membuka terminal.",
            },
            mistakes: [
              "Melewatkan opsi 'Add Python to PATH' di Windows sehingga perintah `python` tidak dikenali.",
              "Membuka terminal di folder yang salah sehingga Python tidak menemukan file Anda.",
              "Mencampur perintah terminal dengan kode Python, atau lupa menekan Enter setelah mengetik perintah.",
            ],
            exercise: {
              title: "Latihan: cek instalasi",
              description:
                "Buka terminal Anda dan jalankan `python --version`. Catat versi yang muncul, lalu buat file `pertama.py` berisi `print(\"Halo!\")` dan jalankan dengan `python pertama.py`.",
              hint: "Jika muncul pesan 'command not found' atau 'tidak dikenali', periksa kembali langkah 'Add to PATH' atau minta bantuan komunitas.",
            },
          },
        ],
      },
      lessonDetail: {
        prototypeNotice: {
          title: "Prototipe v0.0.1",
          description:
            "Ini adalah halaman pelajaran awal dari kursus Python Stage 0. Kontennya masih berupa materi seed dan bukan bagian dari program sertifikasi resmi.",
        },
        backToStage0: "Kembali ke Gambaran Stage 0",
        openLabel: "Buka Pelajaran",
        labels: {
          lesson: "Pelajaran",
          objective: "Tujuan Pembelajaran",
          explanation: "Penjelasan",
          example: "Contoh",
          commonMistakes: "Kesalahan Umum",
          exercise: "Latihan",
          hint: "Petunjuk",
          navigation: "Navigasi Pelajaran",
        },
        empty: {
          title: "Konten belum tersedia",
          description:
            "Pelajaran ini sudah direncanakan, tetapi kontennya belum ditulis. Silakan kembali lagi nanti atau lanjutkan dengan pelajaran lain.",
        },
        navigation: {
          previous: "Pelajaran Sebelumnya",
          next: "Pelajaran Berikutnya",
          allLessons: "Semua Pelajaran",
        },
        exerciseCta: "Lanjut ke Pelajaran Berikutnya",
        exerciseNote:
          "Kerjakan latihan ini di komputer Anda. Mode latihan interaktif akan hadir pada pengembangan berikutnya.",
        progress: {
          markComplete: "Tandai Selesai",
          completed: "Pelajaran Selesai",
          completedNote: "Progres Anda tersimpan di perangkat ini.",
          undo: "Batalkan Selesai",
        },
      },
      demoNote: {
        title: "Konten Awal (Seed)",
        description:
          "Daftar pelajaran ini adalah konten awal. Isi lengkap setiap pelajaran akan menyusul pada pengembangan berikutnya. Konten di sini bukan ujian sertifikasi resmi.",
      },
      cta: {
        title: "Mulai dari Stage 0 yang gratis.",
        description:
          "Daftar gratis dan mulailah perjalanan pemrograman Anda dengan Python.",
        primaryCta: "Daftar Sekarang",
        secondaryCta: "Lihat Jalur Belajar",
      },
    },
    demoAssessments: {
      learningPathSection: {
        title: "Demo Penilaian",
        description:
          "Coba demo penilaian untuk setiap tahap. Semua demo ditandai jelas: ini bukan ujian sertifikasi resmi.",
        openLabel: "Buka Demo",
      },
      prototypeNotice: {
        title: "Prototipe v0.0.1",
        description:
          "Halaman ini adalah demo penilaian untuk validasi prototipe. Ini bukan ujian sertifikasi resmi dan tidak menerbitkan sertifikat apa pun.",
      },
      demoLabel: "Demo Assessment - Not a Certification Examination",
      backLabel: "Kembali ke Jalur Belajar",
      questionProgress: "Pertanyaan {current} dari {total}",
      previous: "Sebelumnya",
      next: "Berikutnya",
      submit: "Kumpulkan Jawaban",
      unanswered: {
        title: "Belum semua pertanyaan terjawab",
        message: "Jawab semua pertanyaan sebelum mengumpulkan jawaban.",
      },
      result: {
        title: "Hasil Demo",
        scoreLabel: "Skor Anda",
        scoreOutOf: "dari {total} pertanyaan",
        demoNote:
          "Ini adalah hasil demo latihan untuk validasi prototipe — bukan hasil kompetensi resmi dan bukan sertifikat.",
        retry: "Coba Lagi",
        backToLearningPath: "Kembali ke Jalur Belajar",
      },
      stages: [
        {
          stage: 1,
          title: "Demo Penilaian Stage 1",
          description:
            "Uji pemahaman Anda tentang dasar pemrograman dengan 10 pertanyaan pilihan ganda.",
          questions: [
            {
              id: "Apa itu program?",
              en: "What is a program?",
              options: [
                {
                  id: "Sekumpulan instruksi yang dijalankan komputer untuk menyelesaikan tugas.",
                  en: "A set of instructions that a computer follows to perform a task.",
                },
                { id: "Komponen fisik komputer.", en: "A physical component of a computer." },
                { id: "Jenis monitor komputer.", en: "A type of computer monitor." },
                { id: "Berkas untuk menyimpan foto.", en: "A file for storing photos." },
              ],
              correct: 0,
            },
            {
              id: "Pernyataan mana yang paling tepat tentang Python?",
              en: "Which statement best describes Python?",
              options: [
                { id: "Salah satu perangkat keras komputer.", en: "A type of computer hardware." },
                { id: "Editor teks untuk dokumen.", en: "A text editor for documents." },
                {
                  id: "Bahasa pemrograman tingkat tinggi yang ramah bagi pemula.",
                  en: "A beginner-friendly, high-level programming language.",
                },
                { id: "Sistem operasi.", en: "An operating system." },
              ],
              correct: 2,
            },
            {
              id: "Perintah mana yang memeriksa versi Python yang terpasang?",
              en: "Which command checks the installed Python version?",
              options: [
                { id: "python run", en: "python run" },
                { id: "python --version", en: "python --version" },
                { id: "python check", en: "python check" },
                { id: "python start", en: "python start" },
              ],
              correct: 1,
            },
            {
              id: "Apa yang dicetak oleh kode berikut? print(\"Hello, World!\")",
              en: "What does this code print? print(\"Hello, World!\")",
              options: [
                { id: "World!", en: "World!" },
                { id: "Hello", en: "Hello" },
                { id: "Tidak ada", en: "Nothing" },
                { id: "Hello, World!", en: "Hello, World!" },
              ],
              correct: 3,
            },
            {
              id: "Manakah yang benar dalam membuat variabel?",
              en: "Which option correctly creates a variable?",
              options: [
                { id: "name = \"Budi\"", en: "name = \"Budi\"" },
                { id: "name == \"Budi\"", en: "name == \"Budi\"" },
                { id: "\"Budi\" = name", en: "\"Budi\" = name" },
                { id: "print name = \"Budi\"", en: "print name = \"Budi\"" },
              ],
              correct: 0,
            },
            {
              id: "Manakah yang merupakan string (teks)?",
              en: "Which of the following is a string?",
              options: [
                { id: "42", en: "42" },
                { id: "3.14", en: "3.14" },
                { id: "\"Python\"", en: "\"Python\"" },
                { id: "True", en: "True" },
              ],
              correct: 2,
            },
            {
              id: "Tipe data apa yang digunakan untuk bilangan bulat?",
              en: "Which data type is used for whole numbers?",
              options: [
                { id: "str", en: "str" },
                { id: "int", en: "int" },
                { id: "bool", en: "bool" },
                { id: "dict", en: "dict" },
              ],
              correct: 1,
            },
            {
              id: "Kata kunci apa yang memulai kondisi di Python?",
              en: "Which keyword starts a condition in Python?",
              options: [
                { id: "for", en: "for" },
                { id: "while", en: "while" },
                { id: "def", en: "def" },
                { id: "if", en: "if" },
              ],
              correct: 3,
            },
            {
              id: "Perulangan mana yang berjalan selama kondisi bernilai benar?",
              en: "Which loop repeats while a condition is true?",
              options: [
                { id: "while", en: "while" },
                { id: "if", en: "if" },
                { id: "import", en: "import" },
                { id: "print", en: "print" },
              ],
              correct: 0,
            },
            {
              id: "Ekstensi file apa yang digunakan untuk file sumber Python?",
              en: "Which file extension is used for Python source files?",
              options: [
                { id: ".txt", en: ".txt" },
                { id: ".py", en: ".py" },
                { id: ".doc", en: ".doc" },
                { id: ".exe", en: ".exe" },
              ],
              correct: 1,
            },
          ],
        },
        {
          stage: 2,
          title: "Demo Penilaian Stage 2",
          description:
            "Uji pemahaman Anda tentang latihan dan proyek dengan 5 pertanyaan pilihan ganda.",
          questions: [
            {
              id: "Apa tujuan latihan?",
              en: "What is the purpose of practice exercises?",
              options: [
                { id: "Menggantikan membaca pelajaran.", en: "To replace reading the lessons." },
                { id: "Memasang perangkat lunak baru.", en: "To install new software." },
                {
                  id: "Memperkuat keterampilan dengan menerapkan apa yang Anda pelajari.",
                  en: "To strengthen skills by applying what you learned.",
                },
                { id: "Menerbitkan sertifikat.", en: "To issue certificates." },
              ],
              correct: 2,
            },
            {
              id: "Pendekatan terbaik saat memulai proyek kecil?",
              en: "What is the best approach when starting a small project?",
              options: [
                { id: "Memecah masalah menjadi langkah-langkah kecil.", en: "Break the problem into small steps." },
                {
                  id: "Menulis semua kode sekaligus tanpa perencanaan.",
                  en: "Write all the code at once without planning.",
                },
                { id: "Menghindari pengujian kode.", en: "Avoid testing your code." },
                { id: "Menyalin kode tanpa memahaminya.", en: "Copy code without understanding it." },
              ],
              correct: 0,
            },
            {
              id: "Manfaat utama menguji kode Anda?",
              en: "What is the main benefit of testing your code?",
              options: [
                { id: "Membuat program lebih panjang.", en: "Making the program longer." },
                {
                  id: "Menemukan dan memperbaiki kesalahan lebih awal.",
                  en: "Finding and fixing mistakes early.",
                },
                { id: "Menghapus semua komentar.", en: "Removing all comments." },
                { id: "Mengganti nama semua variabel.", en: "Renaming every variable." },
              ],
              correct: 1,
            },
            {
              id: "Fungsi di Python adalah...",
              en: "A function in Python is...",
              options: [
                { id: "Jenis variabel.", en: "A type of variable." },
                { id: "Tipe data.", en: "A data type." },
                { id: "Pesan kesalahan.", en: "An error message." },
                { id: "Blok kode yang dapat digunakan kembali.", en: "A reusable block of code." },
              ],
              correct: 3,
            },
            {
              id: "Apa itu proyek dalam jalur belajar ini?",
              en: "What is a project in this learning path?",
              options: [
                { id: "Sertifikat kelulusan.", en: "A certificate of completion." },
                {
                  id: "Aplikasi nyata kecil yang dibangun dengan keterampilan Anda.",
                  en: "A small real-world application built with your skills.",
                },
                { id: "Ujian pilihan ganda.", en: "A multiple-choice exam." },
                { id: "Tabel basis data.", en: "A database table." },
              ],
              correct: 1,
            },
          ],
        },
        {
          stage: 3,
          title: "Demo Penilaian Stage 3",
          description:
            "Uji pemahaman Anda tentang konsep sertifikasi dengan 5 pertanyaan pilihan ganda.",
          questions: [
            {
              id: "Dalam prototipe ini, demo penilaian adalah...",
              en: "In this prototype, demo assessments are...",
              options: [
                { id: "Ujian resmi pemerintah.", en: "Official government exams." },
                { id: "Ujian akhir berbayar.", en: "Paid final exams." },
                { id: "Layanan penerbitan sertifikat.", en: "Certificate issuance services." },
                {
                  id: "Alat latihan, bukan ujian sertifikasi resmi.",
                  en: "Practice tools, not official certification exams.",
                },
              ],
              correct: 3,
            },
            {
              id: "Apa tujuan jalur sertifikasi?",
              en: "What is the purpose of a certification pathway?",
              options: [
                { id: "Menggantikan seluruh proses belajar.", en: "Replacing the learning process entirely." },
                {
                  id: "Memverifikasi keterampilan secara terstruktur.",
                  en: "Verifying skills in a structured way.",
                },
                { id: "Menjamin pekerjaan.", en: "Guaranteeing employment." },
                {
                  id: "Mengenakan biaya kepada pembelajar secara otomatis.",
                  en: "Charging learners automatically.",
                },
              ],
              correct: 1,
            },
            {
              id: "Pernyataan mana yang benar tentang prototipe?",
              en: "Which statement is true about the prototype?",
              options: [
                { id: "Sertifikat tidak diterbitkan di prototipe.", en: "Certificates are not issued in the prototype." },
                { id: "Sertifikat diterbitkan secara otomatis.", en: "Certificates are issued automatically." },
                { id: "Hasil demo adalah hasil kompetensi resmi.", en: "Demo results are official competency results." },
                { id: "Sertifikasi telah diimplementasikan sepenuhnya.", en: "Certification is fully implemented." },
              ],
              correct: 0,
            },
            {
              id: "Apa yang harus dimiliki penilaian yang adil?",
              en: "What should a fair assessment include?",
              options: [
                { id: "Pertanyaan tersembunyi.", en: "Hidden questions." },
                { id: "Penilaian acak.", en: "Random scoring." },
                {
                  id: "Pertanyaan yang jelas dan penilaian yang konsisten.",
                  en: "Clear questions and consistent scoring.",
                },
                { id: "Tanpa umpan balik.", en: "No feedback." },
              ],
              correct: 2,
            },
            {
              id: "Memverifikasi sertifikat berarti...",
              en: "Verifying a certificate means...",
              options: [
                { id: "Sertifikat dicetak.", en: "The certificate is printed." },
                { id: "Pemberi kerja dapat memeriksa keasliannya.", en: "Employers can check its authenticity." },
                { id: "Sertifikat tidak pernah kedaluwarsa.", en: "The certificate never expires." },
                { id: "Hanya pembelajar yang melihatnya.", en: "Only the learner sees it." },
              ],
              correct: 1,
            },
          ],
        },
        {
          stage: 4,
          title: "Demo Penilaian Stage 4",
          description:
            "Uji pemahaman Anda tentang konsep profesional dan talenta dengan 5 pertanyaan pilihan ganda.",
          questions: [
            {
              id: "Apa itu portofolio dalam konteks ini?",
              en: "What is a portfolio in this context?",
              options: [
                { id: "Jenis sertifikat.", en: "A type of certificate." },
                { id: "Kumpulan hasil kerja dan proyek Anda.", en: "A collection of your work and projects." },
                { id: "Bahasa pemrograman.", en: "A programming language." },
                { id: "Agen rekrutmen.", en: "A recruitment agency." },
              ],
              correct: 1,
            },
            {
              id: "Bagaimana talenta terverifikasi dapat ditampilkan kepada pemberi kerja?",
              en: "How can verified talent be presented to employers?",
              options: [
                { id: "Dengan membagikan kata sandi.", en: "By sharing passwords." },
                { id: "Melalui klaim tanpa verifikasi.", en: "Through unverified claims." },
                {
                  id: "Melalui profil talenta dengan keterampilan terverifikasi.",
                  en: "Through a talent profile with verified skills.",
                },
                { id: "Dengan menyembunyikan semua hasil.", en: "By hiding all results." },
              ],
              correct: 2,
            },
            {
              id: "Apa konsep pasar talenta?",
              en: "What is the talent marketplace concept?",
              options: [
                { id: "Menjual sertifikat.", en: "Selling certificates." },
                { id: "Layanan pengganti pekerjaan.", en: "A job replacement service." },
                { id: "Toko daring.", en: "An online store." },
                {
                  id: "Menghubungkan talenta terverifikasi dengan peluang karier.",
                  en: "Connecting verified talent with career opportunities.",
                },
              ],
              correct: 3,
            },
            {
              id: "Cara terbaik untuk berkembang secara profesional?",
              en: "Which is the best way to grow professionally?",
              options: [
                { id: "Terus belajar dan membangun proyek.", en: "Keep learning and building projects." },
                { id: "Berhenti belajar setelah satu kursus.", en: "Stop learning after one course." },
                { id: "Menghindari umpan balik.", en: "Avoid feedback." },
                { id: "Mengabaikan komunitas.", en: "Ignore the community." },
              ],
              correct: 0,
            },
            {
              id: "Dalam prototipe, fitur rekrutmen adalah...",
              en: "In the prototype, recruitment features are...",
              options: [
                { id: "Sepenuhnya beroperasi.", en: "Fully operational." },
                { id: "Diperlukan untuk Stage 0.", en: "Required for Stage 0." },
                {
                  id: "Rencana masa depan, belum diimplementasikan.",
                  en: "Future plans, not yet implemented.",
                },
                { id: "Bagian dari penilaian demo.", en: "Part of demo scoring." },
              ],
              correct: 2,
            },
          ],
        },
      ],
    },
    register: {
      prototypeNotice: {
        title: "Prototipe v0.0.1",
        description:
          "Pendaftaran adalah bagian dari prototipe. Layanan pendaftaran aktif akan tersedia pada milestone autentikasi.",
      },
      hero: {
        title: "Buat akun baru",
        description:
          "Daftar gratis dan mulailah perjalanan pemrograman Anda dengan Python.",
      },
      form: {
        email: {
          label: "Email",
          placeholder: "nama@contoh.com",
        },
        password: {
          label: "Kata Sandi",
          placeholder: "••••••••",
          hint: "Minimal 10 karakter.",
        },
        confirmPassword: {
          label: "Konfirmasi Kata Sandi",
          placeholder: "••••••••",
        },
        submit: "Daftar",
        submitting: "Mendaftar...",
        serverError:
          "Terjadi kesalahan pada server. Silakan coba lagi nanti.",
        unavailable:
          "Layanan pendaftaran belum tersedia. Silakan coba lagi nanti.",
        successTitle: "Pendaftaran berhasil",
        successDescription:
          "Akun Anda berhasil dibuat. Silakan masuk untuk melanjutkan.",
        errors: {
          emailRequired: "Email wajib diisi.",
          emailInvalid: "Format email tidak valid.",
          passwordRequired: "Kata sandi wajib diisi.",
          passwordMinLength: "Kata sandi minimal 10 karakter.",
          confirmPasswordRequired: "Konfirmasi kata sandi wajib diisi.",
          passwordsMustMatch: "Kata sandi tidak cocok.",
        },
      },
      login: {
        prompt: "Sudah punya akun?",
        label: "Masuk",
      },
    },
    login: {
      prototypeNotice: {
        title: "Prototipe v0.0.1",
        description:
          "Halaman masuk adalah bagian dari prototipe. Layanan autentikasi aktif akan tersedia pada milestone autentikasi.",
      },
      hero: {
        title: "Masuk ke akun Anda",
        description: "Masuk untuk melanjutkan belajar Python Anda.",
      },
      form: {
        email: {
          label: "Email",
          placeholder: "nama@contoh.com",
        },
        password: {
          label: "Kata Sandi",
          placeholder: "••••••••",
        },
        submit: "Masuk",
        submitting: "Memproses...",
        serverError: "Terjadi kesalahan pada server. Silakan coba lagi nanti.",
        unavailable:
          "Layanan autentikasi belum tersedia. Silakan coba lagi nanti.",
        invalidCredentials: "Email atau kata sandi salah.",
        errors: {
          emailRequired: "Email wajib diisi.",
          emailInvalid: "Format email tidak valid.",
          passwordRequired: "Kata sandi wajib diisi.",
        },
      },
      register: {
        prompt: "Belum punya akun?",
        label: "Daftar",
      },
    },
    dashboard: {
      prototypeNotice: {
        title: "Prototipe v0.0.1",
        description:
          "Ini adalah dasbor siswa untuk validasi prototipe. Ringkasan belajar ditampilkan berdasarkan akun Anda dan progres yang tersimpan di perangkat ini.",
      },
      hero: {
        eyebrow: "Dasbor Siswa",
        welcomeTitle: "Selamat datang kembali",
        guestTitle: "Dasbor Belajar Anda",
        description:
          "Lanjutkan perjalanan belajar pemrograman Anda: kursus saat ini, progres, dan jalur belajar lima tahap.",
      },
      currentCourse: {
        title: "Kursus Saat Ini",
        description: "Kursus aktif yang sedang Anda pelajari.",
        courseTitle: "Python Stage 0 — Dasar Pemrograman",
        courseDescription:
          "Mulai dari nol: variabel, tipe data, dan program Python pertama Anda.",
        freeBadge: "Gratis",
        openLabel: "Buka Kursus",
      },
      progress: {
        title: "Ringkasan Progres",
        description: "Kemajuan Anda di Stage 0 — Dasar Pemrograman.",
        lessonsCompleted: "Pelajaran selesai: {completed} dari {total}",
        completedNote: "Semua pelajaran Stage 0 selesai. Bagus!",
        emptyTitle: "Belum ada progres",
        emptyDescription:
          "Mulai pelajaran pertama Anda untuk memulai Stage 0.",
        startLabel: "Mulai Belajar",
        continueLabel: "Lanjutkan Belajar",
      },
      stages: {
        title: "Jalur Belajar Anda",
        description:
          "Lima tahap menuju karier pemrograman. Stage 2–4 masih terkunci di prototipe ini.",
      },
      cta: {
        title: "Lanjutkan perjalanan belajar Anda.",
        description:
          "Kembali ke pelajaran Anda dan lanjutkan dari posisi terakhir.",
        primaryCta: "Lanjutkan Belajar",
        secondaryCta: "Lihat Jalur Belajar",
      },
      auth: {
        loading: "Memuat dasbor...",
        unauthenticatedTitle: "Masuk untuk melihat dasbor",
        unauthenticatedDescription:
          "Dasbor menampilkan kursus saat ini, progres belajar, dan pelajaran lanjutan Anda.",
        loginLabel: "Masuk",
        registerLabel: "Daftar",
        errorTitle: "Gagal memuat data",
        errorDescription:
          "Terjadi kesalahan saat memuat dasbor. Silakan coba lagi nanti.",
        logoutLabel: "Keluar",
        studentRole: "Siswa",
      },
    },
    adminDashboard: {
      prototypeNotice: {
        title: "Prototipe v0.0.1",
        description:
          "Dasbor admin ini adalah prototipe untuk validasi. Statistik menampilkan data dasar platform — bukan analitik tingkat lanjut.",
      },
      hero: {
        eyebrow: "Dasbor Admin",
        title: "Ringkasan Platform",
        description:
          "Tinjau statistik dasar dan kelola konten prototipe dari satu tempat.",
        adminRole: "Administrator",
        logoutLabel: "Keluar",
      },
      stats: {
        title: "Statistik Prototipe",
        description: "Angka dasar aktivitas platform saat ini.",
        emptyValue: "—",
        users: {
          label: "Pengguna Terdaftar",
          description: "Jumlah akun pengguna di platform.",
        },
        stage0Participants: {
          label: "Partisipasi Stage 0",
          description:
            "Pengguna yang telah menyelesaikan setidaknya satu pelajaran Stage 0.",
        },
        assessmentAttempts: {
          label: "Percobaan Penilaian",
          description: "Jumlah percobaan demo penilaian yang dikumpulkan.",
        },
      },
      sections: {
        title: "Manajemen Konten",
        description: "Navigasi cepat ke area pengelolaan prototipe.",
        users: {
          title: "Pengguna",
          description: "Kelola akun pengguna.",
          openLabel: "Buka",
        },
        courses: {
          title: "Kursus",
          description: "Kelola kursus dan pelajaran.",
          openLabel: "Buka",
        },
        assessments: {
          title: "Penilaian",
          description: "Kelola demo penilaian dan pertanyaan.",
          openLabel: "Buka",
        },
      },
      auth: {
        loading: "Memuat dasbor admin...",
        unauthorizedTitle: "Akses Ditolak",
        unauthorizedDescription:
          "Halaman ini khusus administrator. Masuk dengan akun admin untuk melanjutkan.",
        loginLabel: "Masuk",
        errorTitle: "Gagal Memuat Data",
        errorDescription:
          "Terjadi kesalahan saat memuat dasbor admin. Silakan coba lagi nanti.",
      },
    },
    adminUsers: {
      prototypeNotice: {
        title: "Prototipe v0.0.1",
        description:
          "Halaman ini menampilkan daftar akun pengguna prototipe. Data pengguna hanya untuk keperluan validasi.",
      },
      hero: {
        eyebrow: "Administrasi",
        title: "Pengguna",
        description: "Daftar akun pengguna terdaftar di platform.",
      },
      table: {
        email: "Email",
        role: "Peran",
        status: "Status",
        joined: "Bergabung",
      },
      searchAriaLabel: "Cari pengguna berdasarkan email",
      searchPlaceholder: "Cari email...",
      emptyTitle: "Tidak ada pengguna",
      emptyDescription: "Tidak ada akun yang cocok dengan pencarian Anda.",
      loading: "Memuat daftar pengguna...",
      errorTitle: "Gagal Memuat Data",
      errorDescription:
        "Terjadi kesalahan saat memuat daftar pengguna. Silakan coba lagi nanti.",
      unauthorizedTitle: "Akses Ditolak",
      unauthorizedDescription:
        "Halaman ini khusus administrator. Masuk dengan akun admin untuk melanjutkan.",
      loginLabel: "Masuk",
      statusLabels: {
        active: "Aktif",
        inactive: "Nonaktif",
      },
    },
    adminCourses: {
      prototypeNotice: {
        title: "Prototipe v0.0.1",
        description:
          "Halaman ini adalah pengelolaan kursus minimal untuk validasi prototipe — bukan CMS lengkap.",
      },
      hero: {
        eyebrow: "Administrasi",
        title: "Kursus",
        description: "Kelola kursus dan konten pelajaran Stage 0.",
      },
      create: {
        title: "Buat Kursus",
        description:
          "Buat kursus baru dengan metadata dwibahasa (Indonesia & Inggris).",
        labels: {
          slug: "Slug",
          stage: "Tahap",
          titleId: "Judul (Indonesia)",
          titleEn: "Judul (Inggris)",
          descriptionId: "Deskripsi (Indonesia)",
          descriptionEn: "Deskripsi (Inggris)",
        },
        submit: "Buat Kursus",
        creating: "Membuat...",
        serverError: "Terjadi kesalahan pada server. Silakan coba lagi.",
        slugExists: "Slug sudah digunakan. Pilih slug lain.",
        validationError: "Periksa kembali isian formulir.",
      },
      list: {
        title: "Daftar Kursus",
        description: "Kursus yang tersedia di platform prototipe.",
        emptyTitle: "Belum ada kursus",
        emptyDescription: "Buat kursus pertama Anda.",
      },
      table: {
        course: "Kursus",
        stage: "Tahap",
        lessons: "Pelajaran",
        updated: "Diperbarui",
      },
      loading: "Memuat kursus...",
      errorTitle: "Gagal Memuat Data",
      errorDescription:
        "Terjadi kesalahan saat memuat daftar kursus. Silakan coba lagi nanti.",
      unauthorizedTitle: "Akses Ditolak",
      unauthorizedDescription:
        "Halaman ini khusus administrator. Masuk dengan akun admin untuk melanjutkan.",
      loginLabel: "Masuk",
      fieldLabels: {
        title: "Judul",
        description: "Deskripsi",
        objective: "Tujuan Pembelajaran",
        explanation: "Penjelasan",
        exampleTitle: "Judul Contoh",
        exampleCode: "Kode Contoh",
        exampleExplanation: "Penjelasan Contoh",
        mistakes: "Kesalahan Umum",
        exerciseTitle: "Judul Latihan",
        exerciseDescription: "Deskripsi Latihan",
        exerciseHint: "Petunjuk Latihan",
      },
      languageLabels: {
        id: "Indonesia (ID)",
        en: "English (EN)",
      },
      save: "Simpan",
      saving: "Menyimpan...",
      saved: "Tersimpan",
      saveError: "Gagal menyimpan. Silakan coba lagi.",
      editLesson: "Edit",
      cancel: "Batal",
      courseMetaTitle: "Metadata Kursus",
      courseMetaDescription:
        "Perbarui judul dan deskripsi kursus dalam dua bahasa.",
      lessonsTitle: "Pelajaran",
      lessonsDescription: "Pilih pelajaran untuk mengedit konten dwibahasanya.",
      backLabel: "Kembali ke Kursus",
      lessonLabel: "Pelajaran",
    },
    adminAssessments: {
      prototypeNotice: {
        title: "Prototipe v0.0.1",
        description:
          "Pengelolaan demo penilaian ini hanya untuk validasi prototipe. Semua penilaian tetap ditandai sebagai demo, bukan ujian sertifikasi resmi.",
      },
      hero: {
        eyebrow: "Administrasi",
        title: "Penilaian",
        description: "Kelola demo penilaian dan pertanyaan per tahap.",
      },
      list: {
        title: "Daftar Demo Penilaian",
        description:
          "Empat demo penilaian, satu untuk setiap tahap (Stage 1–4).",
        emptyTitle: "Belum ada penilaian",
        emptyDescription: "Demo penilaian belum tersedia.",
      },
      table: {
        stage: "Tahap",
        questions: "Pertanyaan",
        openLabel: "Buka",
      },
      loading: "Memuat penilaian...",
      errorTitle: "Gagal Memuat Data",
      errorDescription:
        "Terjadi kesalahan saat memuat daftar penilaian. Silakan coba lagi nanti.",
      unauthorizedTitle: "Akses Ditolak",
      unauthorizedDescription:
        "Halaman ini khusus administrator. Masuk dengan akun admin untuk melanjutkan.",
      loginLabel: "Masuk",
      detail: {
        questionsTitle: "Pertanyaan",
        questionsDescription:
          "Periksa dan edit pertanyaan demo penilaian. Semua konten bersifat demo.",
        backLabel: "Kembali ke Penilaian",
        demoLabel: "Demo Assessment - Not a Certification Examination",
        questionLabel: "Pertanyaan",
        editQuestion: "Edit",
        cancel: "Batal",
        createTitle: "Tambah Pertanyaan",
        createDescription:
          "Tambah pertanyaan pilihan ganda baru untuk penilaian ini.",
        createSubmit: "Tambah Pertanyaan",
        creating: "Menambahkan...",
        save: "Simpan",
        saving: "Menyimpan...",
        saved: "Tersimpan",
        saveError: "Gagal menyimpan. Silakan coba lagi.",
        labels: {
          questionId: "Pertanyaan (Indonesia)",
          questionEn: "Pertanyaan (Inggris)",
          optionTemplate: "Opsi {n}",
          optionId: "Teks (Indonesia)",
          optionEn: "Teks (Inggris)",
          correctOption: "Jawaban Benar",
        },
      },
    },
    contact: {
      prototypeNotice: {
        title: "Prototipe v0.0.1",
        description:
          "Formulir kontak ini adalah demo validasi — pesan tidak dikirim ke server.",
      },
      hero: {
        eyebrow: "Kontak",
        title: "Hubungi kami.",
        description:
          "Punya pertanyaan tentang platform ini? Kirim pesan melalui formulir di bawah.",
      },
      info: {
        title: "Informasi Kontak",
        description:
          "Email proyek untuk pertanyaan umum selama fase prototipe.",
        emailLabel: "Email",
        emailValue: "hello@bilingualedu.example",
        responseNote:
          "Email di atas adalah placeholder prototipe dan belum aktif.",
      },
      form: {
        title: "Kirim Pesan",
        description:
          "Isi formulir berikut. Di prototipe ini, pesan hanya disimulasikan.",
        name: {
          label: "Nama",
          placeholder: "Nama Anda",
        },
        email: {
          label: "Email",
          placeholder: "nama@contoh.com",
        },
        message: {
          label: "Pesan",
          placeholder: "Tulis pesan Anda...",
        },
        submit: "Kirim Pesan",
        submitting: "Mengirim...",
        successTitle: "Pesan Terkirim (Demo)",
        successDescription:
          "Terima kasih! Di prototipe ini pesan tidak benar-benar dikirim, tetapi kami menghargai umpan balik Anda.",
        sendAnother: "Kirim Pesan Lain",
        errors: {
          nameRequired: "Nama wajib diisi.",
          emailRequired: "Email wajib diisi.",
          emailInvalid: "Format email tidak valid.",
          messageRequired: "Pesan wajib diisi.",
          messageMinLength: "Pesan minimal 10 karakter.",
        },
      },
    },
    privacy: {
      prototypeNotice: {
        title: "Prototipe v0.0.1",
        description:
          "Kebijakan privasi ini adalah draf prototipe dan belum ditinjau secara hukum.",
      },
      hero: {
        eyebrow: "Legal",
        title: "Kebijakan Privasi",
        description:
          "Draf kebijakan privasi untuk prototipe. Dokumen ini belum final dan memerlukan tinjauan hukum sebelum produksi.",
      },
      sections: [
        {
          heading: "Pengumpulan Data",
          content:
            "Prototipe ini mengumpulkan data akun dasar (email dan kata sandi ter-hash) serta progres belajar untuk memvalidasi konsep. Data dikumpulkan secara minimal dan hanya untuk keperluan prototipe.",
        },
        {
          heading: "Akun",
          content:
            "Saat mendaftar, Anda membuat akun dengan email dan kata sandi. Kata sandi disimpan dalam bentuk ter-hash dan tidak pernah disimpan sebagai teks biasa.",
        },
        {
          heading: "Keamanan",
          content:
            "Prototipe menerapkan praktik keamanan dasar seperti hashing kata sandi dan token sesi bertanda tangan. Namun, prototipe ini tidak dirancang untuk menangani data produksi dan belum melalui tinjauan keamanan penuh.",
        },
        {
          heading: "Cookie & Penyimpanan Lokal",
          content:
            "Prototipe ini menggunakan penyimpanan lokal peramban (localStorage) untuk menyimpan token sesi dan progres belajar di perangkat Anda.",
        },
        {
          heading: "Kontak",
          content:
            "Untuk pertanyaan tentang privasi selama fase prototipe, hubungi kami melalui halaman Kontak.",
        },
      ],
      legalReview: {
        title: "Tinjauan Hukum Diperlukan",
        description:
          "Kebijakan ini adalah draf prototipe. Tinjauan hukum oleh profesional yang berwenang WAJIB dilakukan sebelum penggunaan produksi.",
      },
    },
    terms: {
      prototypeNotice: {
        title: "Prototipe v0.0.1",
        description:
          "Syarat & ketentuan ini adalah draf prototipe dan belum ditinjau secara hukum.",
      },
      hero: {
        eyebrow: "Legal",
        title: "Syarat & Ketentuan",
        description:
          "Draf syarat dan ketentuan untuk prototipe. Dokumen ini belum final dan memerlukan tinjauan hukum sebelum produksi.",
      },
      sections: [
        {
          heading: "Penggunaan Akun",
          content:
            "Anda bertanggung jawab menjaga kerahasiaan kata sandi akun Anda. Akun prototipe dibuat untuk tujuan validasi dan tidak memberikan hak apa pun di luar platform.",
        },
        {
          heading: "Konten Pembelajaran",
          content:
            "Konten pembelajaran Stage 0 adalah materi awal (seed) untuk validasi prototipe dan dapat berubah sewaktu-waktu tanpa pemberitahuan.",
        },
        {
          heading: "Demo Penilaian",
          content:
            "Semua penilaian di prototipe adalah demo latihan dan BUKAN ujian sertifikasi resmi. Hasil demo tidak menerbitkan sertifikat apa pun.",
        },
        {
          heading: "Penggunaan yang Dilarang",
          content:
            "Dilarang menyalahgunakan layanan, termasuk mencoba mengakses data pengguna lain, mengganggu layanan, atau menggunakan platform untuk aktivitas ilegal.",
        },
        {
          heading: "Kekayaan Intelektual",
          content:
            "Konten platform dilindungi hak cipta. Penggunaan untuk pembelajaran pribadi diperbolehkan; reproduksi komersial tanpa izin dilarang.",
        },
        {
          heading: "Layanan Masa Depan",
          content:
            "Fitur seperti kursus berbayar, sertifikasi resmi, dan pasar talenta adalah rencana masa depan dan tidak dijamin oleh prototipe ini.",
        },
      ],
      legalReview: {
        title: "Tinjauan Hukum Diperlukan",
        description:
          "Syarat & ketentuan ini adalah draf prototipe. Tinjauan hukum oleh profesional yang berwenang WAJIB dilakukan sebelum penggunaan produksi.",
      },
    },
  },
  en: {
    meta: {
      title: "Bilingual Edu Platform",
      description:
        "Bilingual programming education, certification, and talent platform.",
    },
    brand: {
      name: "Bilingual Edu Platform",
    },
    skipLink: "Skip to main content",
    nav: {
      home: "Home",
      learningPath: "Learning Path",
      vision: "Vision",
      login: "Login",
      register: "Register",
    },
    navAccessibility: {
      primaryLabel: "Primary navigation",
      mobileLabel: "Mobile navigation",
      openMenu: "Open menu",
      closeMenu: "Close menu",
    },
    languageSwitcher: {
      label: "Change language",
    },
    footer: {
      tagline:
        "Bilingual programming education, certification, and talent platform.",
      platformTitle: "Platform",
      learningTitle: "Learning",
      projectTitle: "Project",
      legalTitle: "Legal",
      platform: {
        home: "Home",
        learningPath: "Learning Path",
        vision: "Vision",
      },
      learning: {
        stage0: "Stage 0 — Python",
        demoAssessment: "Demo Assessment",
      },
      project: {
        contact: "Contact",
      },
      legal: {
        privacy: "Privacy Policy",
        terms: "Terms & Conditions",
      },
      prototypeNote:
        "Prototype v0.0.1 — for concept validation only, not a final product.",
      rights: "All rights reserved.",
    },
    placeholder: {
      comingSoon: "Coming Soon",
      description: "This page is being prepared.",
      pages: {
        home: {
          title: "Home",
          description:
            "The platform landing page will be built in the next milestone.",
        },
        vision: {
          title: "Project Vision",
          description:
            "The prototype explanation and long-term vision will be built in the next milestone.",
        },
        learningPath: {
          title: "Learning Path",
          description:
            "The Stage 0–4 learning path overview will be built in the next milestone.",
        },
        login: {
          title: "Login",
          description:
            "The user login page will be built in the next milestone.",
        },
        register: {
          title: "Register",
          description:
            "The user registration page will be built in the next milestone.",
        },
        contact: {
          title: "Contact",
          description:
            "The project contact information will be built in the next milestone.",
        },
        privacy: {
          title: "Privacy Policy",
          description:
            "The prototype privacy policy will be built in the next milestone.",
        },
        terms: {
          title: "Terms & Conditions",
          description:
            "The prototype terms and conditions will be built in the next milestone.",
        },
      },
    },
    home: {
      prototypeNotice: {
        title: "Prototype v0.0.1",
        description:
          "This page is a prototype for concept validation, not a final product.",
      },
      hero: {
        eyebrow: "Technology Education Platform",
        title: "Learn programming. Build skills. Become career-ready.",
        description:
          "A bilingual (Indonesian & English) platform with a guided learning path, demo assessments, and progress tracking — from your first lesson to career readiness.",
        primaryCta: "Start Learning",
        secondaryCta: "Register Free",
        prototypeNote: "Prototype v0.0.1 — concept validation, not a final product.",
      },
      heroVisual: {
        windowTitle: "Platform Preview",
        courseLabel: "Current Course",
        courseTitle: "Python Stage 0 — Programming Fundamentals",
        courseSubtitle: "What is Programming?",
        progressLabel: "Progress",
        progressTemplate: "{completed} of {total} lessons",
        assessmentLabel: "Demo Assessment",
        assessmentValue: "Available",
        verifiedBadge: "Demo — not certification",
        careerLabel: "Career Readiness",
        careerValue: "Start at Stage 0",
        codeLabel: "Your First Code",
        codeLine: 'print("Hello, world!")',
        stage0Name: "Stage 0",
        lockedStage: "Locked",
      },
      principles: {
        title: "An honest, measurable foundation",
        description:
          "Prototype features are built for validation — no false claims.",
        items: [
          {
            title: "Bilingual ID/EN",
            description:
              "All learning content is available in both Indonesian and English.",
          },
          {
            title: "Guided path",
            description:
              "A five-stage structure from programming basics to career readiness.",
          },
          {
            title: "Demo assessments",
            description:
              "Measure your understanding with demo-marked practice — no certification claims.",
          },
          {
            title: "Saved progress",
            description:
              "Completed lessons are tracked automatically on your device.",
          },
        ],
      },
      stages: {
        title: "Five Stages to Your Career",
        description:
          "A structured path from programming basics to career readiness. All content is still a prototype and demo.",
        statusLabels: {
          free: "Free",
          demo: "Demo",
          paid: "Paid",
          comingSoon: "Coming Soon",
        },
        items: [
          {
            title: "Stage 0 — Programming Fundamentals",
            description:
              "Start from zero: variables, data types, and your first Python program.",
            statuses: ["free"],
          },
          {
            title: "Stage 1 — Practice & Projects",
            description:
              "Apply your skills through exercises and small projects.",
            statuses: ["demo"],
          },
          {
            title: "Stage 2 — Demo Assessment",
            description:
              "Measure your understanding through per-stage demo assessments.",
            statuses: ["paid", "comingSoon"],
          },
          {
            title: "Stage 3 — Certification",
            description:
              "A verified certification path in the future — not an official exam in the prototype.",
            statuses: ["paid", "comingSoon"],
          },
          {
            title: "Stage 4 — Professional & Talent",
            description:
              "Connect verified talent with career opportunities.",
            statuses: ["paid", "comingSoon"],
          },
        ],
      },
      journey: {
        title: "From Education to Employment",
        description:
          "A seven-step journey from your first lesson to career opportunities.",
        steps: [
          {
            title: "Learn",
            description:
              "Master programming basics with guided, step-by-step lessons.",
          },
          {
            title: "Practice",
            description:
              "Strengthen your skills with exercises and small projects.",
          },
          {
            title: "Build",
            description:
              "Build real projects to apply what you have learned.",
          },
          {
            title: "Assess",
            description:
              "Measure your understanding through per-stage demo assessments.",
          },
          {
            title: "Certify",
            description:
              "A path toward verified certification (demo in the prototype).",
          },
          {
            title: "Portfolio",
            description:
              "Showcase your work as a portfolio.",
          },
          {
            title: "Employment",
            description:
              "Connect with employers looking for verified talent.",
          },
        ],
      },
      capabilities: {
        title: "Platform Capabilities",
        description:
          "What is available in the prototype today — built on a secure, production-ready architecture.",
        items: [
          {
            title: "Guided Learning",
            description:
              "Step-by-step lessons with objectives, explanations, examples, and exercises.",
          },
          {
            title: "Code Practice",
            description:
              "Easy-to-copy Python code blocks for hands-on practice in your editor.",
          },
          {
            title: "Demo Assessments",
            description:
              "Bilingual multiple-choice quizzes per stage — clearly demo, not official exams.",
          },
          {
            title: "Progress Tracking",
            description:
              "Stage 0 progress is saved automatically on your device.",
          },
          {
            title: "Student Dashboard",
            description:
              "A one-page summary of your course, progress, and what to continue.",
          },
          {
            title: "Secure Architecture",
            description:
              "Hashed passwords, signed tokens, and standard security headers.",
          },
        ],
      },
      scope: {
        title: "Prototype Now vs Future Product",
        description:
          "Clear about what is available today and what is the future product direction.",
        prototypeTitle: "Today (Prototype)",
        prototypeItems: [
          "Bilingual platform foundation (Indonesian & English).",
          "Responsive homepage and site framework.",
          "Five-stage learning path as a preview.",
          "Free Stage 0 as the entry point to learning.",
          "Demo assessments (not official certification exams).",
        ],
        futureTitle: "Future (Final Product)",
        futureItems: [
          "A full course library.",
          "Verified certification program.",
          "Learner portfolios.",
          "Talent marketplace and employer recruitment.",
        ],
      },
      cta: {
        title: "Ready to start learning?",
        description: "Start with Python Stage 0 — free and from zero.",
        primaryCta: "Start Learning",
        secondaryCta: "Explore Learning Path",
      },
      vision: {
        title: "Future Vision",
        description:
          "This prototype validates the platform foundation. Later, the platform will include full courses, certification, and a talent marketplace — all currently still demos and plans.",
        cta: "View Project Vision",
      },
    },
    vision: {
      prototypeNotice: {
        title: "Prototype v0.0.1",
        description:
          "This page explains the prototype's purpose and the platform's long-term vision. Features that are not yet available are clearly marked as future plans.",
      },
      hero: {
        eyebrow: "Project Vision",
        title: "From a prototype to a programming career platform.",
        description:
          "A bilingual (Indonesian & English) platform that takes learners from guided lessons to verifiable certification, then connects verified talent to employers.",
        primaryCta: "View Learning Path",
        secondaryCta: "Back to Home",
      },
      purpose: {
        title: "Prototype Purpose",
        description:
          "Prototype v0.0.1 validates the platform foundation before building the full product. What is tested today is the technical foundation and product direction — not the final product.",
        items: [
          "Bilingual platform foundation (Indonesian & English).",
          "Responsive site shell: home, learning path, vision, and support pages.",
          "A 5-stage learning path preview (Stage 0–4).",
          "Free Stage 0 as the learning entry point.",
          "Demo assessments to test understanding — not official certification exams.",
          "Learner feedback to guide the final product.",
        ],
      },
      finalVision: {
        title: "Final Product Vision",
        description:
          "The final product aims to be a complete path from education to employment in one bilingual ecosystem: courses, verifiable certification, portfolios, and a talent marketplace.",
        futureLabel: "Future",
        pillars: [
          {
            title: "Full Course Library",
            description:
              "Structured, bilingual courses from beginner to advanced.",
          },
          {
            title: "Verifiable Certification",
            description:
              "A certification program employers can verify.",
          },
          {
            title: "Learner Portfolio",
            description:
              "A space to showcase learners' work and projects.",
          },
          {
            title: "Talent Marketplace & Recruitment",
            description:
              "Connecting verified talent with real career opportunities.",
          },
        ],
      },
      stages: {
        title: "Understanding Stage 0–4",
        description:
          "The learning path is designed in five stages, from programming basics to career readiness.",
        intro:
          "Each stage builds skills toward the next. The status on each card shows current availability.",
        demoNoteTitle: "Demo Note",
        demoNote:
          "All content in this prototype is still a preview and demo. Assessments here are not official certification exams.",
      },
      certification: {
        title: "The Certification Pathway",
        description:
          "Certification is an important part of the long-term vision. In this prototype, the pathway is still a plan and a demo — not an official exam.",
        todayTitle: "Today (Prototype)",
        todayDescription: "What is available now:",
        todayItems: [
          "Stage-based demo assessments to measure understanding.",
          "Learning feedback, not official certification results.",
          "No fees and no official certificates.",
        ],
        futureTitle: "Future (Final Product)",
        futureDescription: "What we will build:",
        futureItems: [
          "Professionally designed certification exams.",
          "Verifiable certificates employers can check.",
          "A fair, transparent process aligned with industry standards.",
        ],
        noticeTitle: "To Be Clear",
        noticeDescription:
          "Demo assessments in the prototype are never presented as official certification exams.",
      },
      employmentLoop: {
        title: "The Education-to-Employment Loop",
        description:
          "The end vision: a continuous loop where learners keep sharpening skills, verifying ability, and connecting with job opportunities.",
        loopNote:
          "These steps describe the final product vision. In the prototype, most steps are still demos and plans.",
      },
      cta: {
        title: "Explore the learning path today.",
        description:
          "Start with free Stage 0 and explore the five-stage structure.",
        primaryCta: "Start Learning",
        secondaryCta: "Register Free",
      },
    },
    learningPath: {
      prototypeNotice: {
        title: "Prototype v0.0.1",
        description:
          "This page is an overview of the Stage 0–4 learning path. The full curriculum is not built yet.",
      },
      hero: {
        eyebrow: "Learning Path",
        title: "Five stages toward a programming career.",
        description:
          "A structured path from programming basics to career readiness. Stage 0–1 are free; Stage 2–4 are paid and coming soon.",
        primaryCta: "Register Free",
        secondaryCta: "Back to Home",
      },
      stages: {
        title: "Stage 0–4 Overview",
        description:
          "Each stage builds skills toward the next. The status on each card shows current availability.",
        items: [
          {
            title: "Stage 0 — Programming Basics",
            description:
              "Start from zero: variables, data types, and your first Python programs.",
            statuses: ["free"],
            locked: false,
            cta: {
              label: "Start with Python",
              href: "/learning-path/stage-0",
            },
          },
          {
            title: "Stage 1 — Practice & Projects",
            description:
              "Apply your skills through exercises and small projects.",
            statuses: ["free"],
            locked: false,
          },
          {
            title: "Stage 2 — Demo Assessment",
            description:
              "Measure your understanding through a stage-based demo assessment.",
            statuses: ["paid", "comingSoon"],
            locked: true,
          },
          {
            title: "Stage 3 — Certification",
            description:
              "A future path to verifiable certification—not an official exam in the prototype.",
            statuses: ["paid", "comingSoon"],
            locked: true,
          },
          {
            title: "Stage 4 — Professional & Talent",
            description:
              "Connect verified talent with career opportunities.",
            statuses: ["paid", "comingSoon"],
            locked: true,
          },
        ],
      },
      lockedLabel: "Locked",
      availability: {
        title: "Availability Today",
        description:
          "Stage 0–1 are free, and demo assessments for Stage 1–4 can be tried at no cost. The paid Stage 2–4 courses are still in development.",
        freeLabel: "Free Today",
        freeItems: [
          "Stage 0 — Programming Basics (Python).",
          "Stage 1 — Practice & Projects.",
          "Demo assessments Stage 1–4 (free, not official certification exams).",
        ],
        futureLabel: "Coming Soon (Paid)",
        futureItems: [
          "Stage 2 — Paid course.",
          "Stage 3 — Certification.",
          "Stage 4 — Professional & Talent.",
        ],
      },
      demoNote: {
        title: "Demo Note",
        description:
          "All content in this prototype is still a preview and demo. Assessments here are not official certification exams.",
      },
      cta: {
        title: "Start with free Stage 0.",
        description:
          "Register for free and learn Python from zero through the learning path.",
        primaryCta: "Register Now",
        secondaryCta: "View Project Vision",
      },
    },
    pythonStage0: {
      prototypeNotice: {
        title: "Prototype v0.0.1",
        description:
          "This is an early overview of the Python Stage 0 course. The full curriculum and lesson pages are not built yet.",
      },
      hero: {
        eyebrow: "Python · Stage 0",
        title: "Programming basics with Python.",
        description:
          "Start from zero: learn what programming is, get to know Python, and write your first program. This course is free and available in English.",
        primaryCta: "Register Free",
        secondaryCta: "Back to Learning Path",
      },
      overview: {
        title: "What you will learn",
        description:
          "Stage 0 builds your programming foundation step by step, with no prior knowledge assumed.",
        items: [
          "What programming is and why you should learn it.",
          "An introduction to Python and why it is beginner-friendly.",
          "Installing and running Python on your computer.",
          "Writing and running your first 'Hello World' program.",
          "Using variables to store data.",
          "Understanding basic data types.",
          "An introduction to conditions and loops (optional).",
        ],
      },
      lessons: {
        title: "Lessons",
        description:
          "Eight seed lessons to build your first understanding of Python.",
        freeLabel: "Free",
        optionalLabel: "Optional",
        items: [
          {
            title: "What is Programming?",
            description:
              "Understand the basics of programming and how computers follow instructions.",
            optionality: "core",
          },
          {
            title: "What is Python?",
            description:
              "Get to know Python, a popular and beginner-friendly programming language.",
            optionality: "core",
          },
          {
            title: "Installing & Running Python",
            description:
              "Install Python on your computer and learn how to run code.",
            optionality: "core",
          },
          {
            title: "Hello World",
            description:
              "Write your first Python program and see the result on screen.",
            optionality: "core",
          },
          {
            title: "Variables",
            description:
              "Store and use data in your programs with variables.",
            optionality: "core",
          },
          {
            title: "Data Types",
            description:
              "Learn basic data types such as numbers and text, and when to use them.",
            optionality: "core",
          },
          {
            title: "Conditions",
            description:
              "Make your program decide what to do using if and else.",
            optionality: "optional",
          },
          {
            title: "Loops",
            description:
              "Repeat tasks automatically with loops such as for and while.",
            optionality: "optional",
          },
        ],
      },
      seedLessons: {
        demoNote: {
          title: "Seed Content",
          description:
            "This lesson material is early content for prototype validation. It is not part of an official certification program.",
        },
        items: [
          {
            objective:
              "Understand what programming is and how computers follow instructions.",
            explanation: [
              "Programming is how we give instructions to a computer so it can perform a specific task. Just like a recipe contains steps, a program contains steps that the computer follows one by one.",
              "A computer does not think like a human. It only executes instructions that are clear and unambiguous. That is why we write instructions in a programming language — a language designed to be easy for humans to read and for computers to run.",
              "The payoff: by learning to program, you can instruct a computer to solve real problems, such as processing data, building apps, or automating repetitive tasks.",
            ],
            example: {
              title: "Example analogy: making tea",
              code: "1. Boil the water\n2. Put a tea bag in a cup\n3. Pour the hot water into the cup\n4. Wait 3 minutes\n5. Remove the tea bag\n6. Enjoy your tea",
              explanation:
                "A program works like this list of steps: the computer reads the instructions from top to bottom and carries them out in order.",
            },
            mistakes: [
              "Imagining the computer can 'understand what we mean'. In reality, a computer only runs instructions exactly as written.",
              "Writing instructions that are too vague, such as 'build a nice app', without clear steps.",
              "Giving up too early because you think programming is only for people who are good at math. Programming is a skill anyone can learn.",
            ],
            exercise: {
              title: "Exercise: instructions to make a sandwich",
              description:
                "Write the steps to make a sandwich in 5–7 short instructions, in the correct order. Make sure each step is clear enough for someone who has never made a sandwich.",
              hint: "Imagine your reader knows nothing. A step like 'place a slice of bread' is better than 'prepare the food'.",
            },
          },
          {
            objective:
              "Get to know Python, why it is popular, and what you can build with it.",
            explanation: [
              "Python is a high-level programming language that is popular all over the world. It is designed to be easy to read, which makes it great for beginners and professional projects alike.",
              "Python is used in many fields: web development, data analysis, artificial intelligence, and automation. Because its community is large, documentation and help are also easy to find.",
              "Its main advantage for beginners: the syntax reads like English, it is not too 'noisy', and you see results quickly.",
            ],
            example: {
              title: "Example: a first look at Python syntax",
              code: 'name = "Alex"\nprint("Hello, " + name)',
              explanation:
                "Here we store text in a variable called `name`, then display it with `print`. You will learn about variables and `print` in later lessons.",
            },
            mistakes: [
              "Thinking Python can only be used in one field. In reality, it is used across many industries.",
              "Comparing yourself to programmers who are already advanced; focus on your own progress.",
              "Ignoring the official documentation and the community — both are excellent learning resources.",
            ],
            exercise: {
              title: "Exercise: explain Python",
              description:
                "Write three sentences about Python in your own words: what it is, why it is popular, and one thing you want to build with it.",
              hint: "If you are stuck, re-read the explanation and the example above.",
            },
          },
          {
            objective:
              "Install Python on your computer and run your first Python program from the terminal.",
            explanation: [
              "Before writing programs, you need to install Python. Visit the official python.org website, download the latest version for your operating system, and follow the installer instructions. On Windows, make sure you check the 'Add Python to PATH' option.",
              "Once installed, open a terminal (Command Prompt on Windows, Terminal on macOS/Linux) and type `python --version`. If a version number appears, Python is ready to use.",
              "To run a program, save your code in a file with the `.py` extension, then run it with the command `python filename.py`.",
            ],
            example: {
              title: "Example: checking the version and running a file",
              code: "python --version\npython program.py",
              explanation:
                "The first line checks which Python version is installed. The second line runs the file `program.py`; that file must be in the folder where you opened the terminal.",
            },
            mistakes: [
              "Skipping the 'Add Python to PATH' option on Windows, so the `python` command is not recognized.",
              "Opening the terminal in the wrong folder, so Python cannot find your file.",
              "Mixing terminal commands with Python code, or forgetting to press Enter after typing a command.",
            ],
            exercise: {
              title: "Exercise: verify your installation",
              description:
                "Open your terminal and run `python --version`. Write down the version you see, then create a file named `first.py` containing `print(\"Hello!\")` and run it with `python first.py`.",
              hint: "If you see a 'command not found' error, double-check the 'Add to PATH' step or ask the community for help.",
            },
          },
        ],
      },
      lessonDetail: {
        prototypeNotice: {
          title: "Prototype v0.0.1",
          description:
            "This is an early lesson page from the Python Stage 0 course. Its content is seed material and is not part of an official certification program.",
        },
        backToStage0: "Back to Stage 0 Overview",
        openLabel: "Open Lesson",
        labels: {
          lesson: "Lesson",
          objective: "Learning Objective",
          explanation: "Explanation",
          example: "Example",
          commonMistakes: "Common Mistakes",
          exercise: "Exercise",
          hint: "Hint",
          navigation: "Lesson Navigation",
        },
        empty: {
          title: "Content not available yet",
          description:
            "This lesson is planned, but its content has not been written yet. Please check back later or continue with another lesson.",
        },
        navigation: {
          previous: "Previous Lesson",
          next: "Next Lesson",
          allLessons: "All Lessons",
        },
        exerciseCta: "Continue to Next Lesson",
        exerciseNote:
          "Do this exercise on your computer. Interactive practice mode is coming in a future update.",
        progress: {
          markComplete: "Mark as Complete",
          completed: "Lesson Completed",
          completedNote: "Your progress is saved on this device.",
          undo: "Undo Complete",
        },
      },
      demoNote: {
        title: "Seed Content",
        description:
          "This lesson list is seed content. Full lesson pages will follow in the next development round. Content here is not an official certification exam.",
      },
      cta: {
        title: "Start with free Stage 0.",
        description:
          "Register for free and learn Python from zero through the learning path.",
        primaryCta: "Register Now",
        secondaryCta: "View Project Vision",
      },
    },
    demoAssessments: {
      learningPathSection: {
        title: "Demo Assessments",
        description:
          "Try the demo assessment for each stage. Every demo is clearly labeled: this is not an official certification examination.",
        openLabel: "Open Demo",
      },
      prototypeNotice: {
        title: "Prototype v0.0.1",
        description:
          "This page is a demo assessment for prototype validation. It is not an official certification exam and does not issue any certificate.",
      },
      demoLabel: "Demo Assessment - Not a Certification Examination",
      backLabel: "Back to Learning Path",
      questionProgress: "Question {current} of {total}",
      previous: "Previous",
      next: "Next",
      submit: "Submit Answers",
      unanswered: {
        title: "Not all questions are answered",
        message: "Answer all questions before submitting.",
      },
      result: {
        title: "Demo Result",
        scoreLabel: "Your Score",
        scoreOutOf: "out of {total} questions",
        demoNote:
          "This is a demo practice result for prototype validation — not an official competency result and not a certificate.",
        retry: "Try Again",
        backToLearningPath: "Back to Learning Path",
      },
      stages: [
        {
          stage: 1,
          title: "Demo Assessment Stage 1",
          description:
            "Test your understanding of programming basics with 10 multiple-choice questions.",
          questions: [
            {
              id: "Apa itu program?",
              en: "What is a program?",
              options: [
                {
                  id: "Sekumpulan instruksi yang dijalankan komputer untuk menyelesaikan tugas.",
                  en: "A set of instructions that a computer follows to perform a task.",
                },
                { id: "Komponen fisik komputer.", en: "A physical component of a computer." },
                { id: "Jenis monitor komputer.", en: "A type of computer monitor." },
                { id: "Berkas untuk menyimpan foto.", en: "A file for storing photos." },
              ],
              correct: 0,
            },
            {
              id: "Pernyataan mana yang paling tepat tentang Python?",
              en: "Which statement best describes Python?",
              options: [
                { id: "Salah satu perangkat keras komputer.", en: "A type of computer hardware." },
                { id: "Editor teks untuk dokumen.", en: "A text editor for documents." },
                {
                  id: "Bahasa pemrograman tingkat tinggi yang ramah bagi pemula.",
                  en: "A beginner-friendly, high-level programming language.",
                },
                { id: "Sistem operasi.", en: "An operating system." },
              ],
              correct: 2,
            },
            {
              id: "Perintah mana yang memeriksa versi Python yang terpasang?",
              en: "Which command checks the installed Python version?",
              options: [
                { id: "python run", en: "python run" },
                { id: "python --version", en: "python --version" },
                { id: "python check", en: "python check" },
                { id: "python start", en: "python start" },
              ],
              correct: 1,
            },
            {
              id: "Apa yang dicetak oleh kode berikut? print(\"Hello, World!\")",
              en: "What does this code print? print(\"Hello, World!\")",
              options: [
                { id: "World!", en: "World!" },
                { id: "Hello", en: "Hello" },
                { id: "Tidak ada", en: "Nothing" },
                { id: "Hello, World!", en: "Hello, World!" },
              ],
              correct: 3,
            },
            {
              id: "Manakah yang benar dalam membuat variabel?",
              en: "Which option correctly creates a variable?",
              options: [
                { id: "name = \"Budi\"", en: "name = \"Budi\"" },
                { id: "name == \"Budi\"", en: "name == \"Budi\"" },
                { id: "\"Budi\" = name", en: "\"Budi\" = name" },
                { id: "print name = \"Budi\"", en: "print name = \"Budi\"" },
              ],
              correct: 0,
            },
            {
              id: "Manakah yang merupakan string (teks)?",
              en: "Which of the following is a string?",
              options: [
                { id: "42", en: "42" },
                { id: "3.14", en: "3.14" },
                { id: "\"Python\"", en: "\"Python\"" },
                { id: "True", en: "True" },
              ],
              correct: 2,
            },
            {
              id: "Tipe data apa yang digunakan untuk bilangan bulat?",
              en: "Which data type is used for whole numbers?",
              options: [
                { id: "str", en: "str" },
                { id: "int", en: "int" },
                { id: "bool", en: "bool" },
                { id: "dict", en: "dict" },
              ],
              correct: 1,
            },
            {
              id: "Kata kunci apa yang memulai kondisi di Python?",
              en: "Which keyword starts a condition in Python?",
              options: [
                { id: "for", en: "for" },
                { id: "while", en: "while" },
                { id: "def", en: "def" },
                { id: "if", en: "if" },
              ],
              correct: 3,
            },
            {
              id: "Perulangan mana yang berjalan selama kondisi bernilai benar?",
              en: "Which loop repeats while a condition is true?",
              options: [
                { id: "while", en: "while" },
                { id: "if", en: "if" },
                { id: "import", en: "import" },
                { id: "print", en: "print" },
              ],
              correct: 0,
            },
            {
              id: "Ekstensi file apa yang digunakan untuk file sumber Python?",
              en: "Which file extension is used for Python source files?",
              options: [
                { id: ".txt", en: ".txt" },
                { id: ".py", en: ".py" },
                { id: ".doc", en: ".doc" },
                { id: ".exe", en: ".exe" },
              ],
              correct: 1,
            },
          ],
        },
        {
          stage: 2,
          title: "Demo Assessment Stage 2",
          description:
            "Test your understanding of practice and projects with 5 multiple-choice questions.",
          questions: [
            {
              id: "Apa tujuan latihan?",
              en: "What is the purpose of practice exercises?",
              options: [
                { id: "Menggantikan membaca pelajaran.", en: "To replace reading the lessons." },
                { id: "Memasang perangkat lunak baru.", en: "To install new software." },
                {
                  id: "Memperkuat keterampilan dengan menerapkan apa yang Anda pelajari.",
                  en: "To strengthen skills by applying what you learned.",
                },
                { id: "Menerbitkan sertifikat.", en: "To issue certificates." },
              ],
              correct: 2,
            },
            {
              id: "Pendekatan terbaik saat memulai proyek kecil?",
              en: "What is the best approach when starting a small project?",
              options: [
                { id: "Memecah masalah menjadi langkah-langkah kecil.", en: "Break the problem into small steps." },
                {
                  id: "Menulis semua kode sekaligus tanpa perencanaan.",
                  en: "Write all the code at once without planning.",
                },
                { id: "Menghindari pengujian kode.", en: "Avoid testing your code." },
                { id: "Menyalin kode tanpa memahaminya.", en: "Copy code without understanding it." },
              ],
              correct: 0,
            },
            {
              id: "Manfaat utama menguji kode Anda?",
              en: "What is the main benefit of testing your code?",
              options: [
                { id: "Membuat program lebih panjang.", en: "Making the program longer." },
                {
                  id: "Menemukan dan memperbaiki kesalahan lebih awal.",
                  en: "Finding and fixing mistakes early.",
                },
                { id: "Menghapus semua komentar.", en: "Removing all comments." },
                { id: "Mengganti nama semua variabel.", en: "Renaming every variable." },
              ],
              correct: 1,
            },
            {
              id: "Fungsi di Python adalah...",
              en: "A function in Python is...",
              options: [
                { id: "Jenis variabel.", en: "A type of variable." },
                { id: "Tipe data.", en: "A data type." },
                { id: "Pesan kesalahan.", en: "An error message." },
                { id: "Blok kode yang dapat digunakan kembali.", en: "A reusable block of code." },
              ],
              correct: 3,
            },
            {
              id: "Apa itu proyek dalam jalur belajar ini?",
              en: "What is a project in this learning path?",
              options: [
                { id: "Sertifikat kelulusan.", en: "A certificate of completion." },
                {
                  id: "Aplikasi nyata kecil yang dibangun dengan keterampilan Anda.",
                  en: "A small real-world application built with your skills.",
                },
                { id: "Ujian pilihan ganda.", en: "A multiple-choice exam." },
                { id: "Tabel basis data.", en: "A database table." },
              ],
              correct: 1,
            },
          ],
        },
        {
          stage: 3,
          title: "Demo Assessment Stage 3",
          description:
            "Test your understanding of certification concepts with 5 multiple-choice questions.",
          questions: [
            {
              id: "Dalam prototipe ini, demo penilaian adalah...",
              en: "In this prototype, demo assessments are...",
              options: [
                { id: "Ujian resmi pemerintah.", en: "Official government exams." },
                { id: "Ujian akhir berbayar.", en: "Paid final exams." },
                { id: "Layanan penerbitan sertifikat.", en: "Certificate issuance services." },
                {
                  id: "Alat latihan, bukan ujian sertifikasi resmi.",
                  en: "Practice tools, not official certification exams.",
                },
              ],
              correct: 3,
            },
            {
              id: "Apa tujuan jalur sertifikasi?",
              en: "What is the purpose of a certification pathway?",
              options: [
                { id: "Menggantikan seluruh proses belajar.", en: "Replacing the learning process entirely." },
                {
                  id: "Memverifikasi keterampilan secara terstruktur.",
                  en: "Verifying skills in a structured way.",
                },
                { id: "Menjamin pekerjaan.", en: "Guaranteeing employment." },
                {
                  id: "Mengenakan biaya kepada pembelajar secara otomatis.",
                  en: "Charging learners automatically.",
                },
              ],
              correct: 1,
            },
            {
              id: "Pernyataan mana yang benar tentang prototipe?",
              en: "Which statement is true about the prototype?",
              options: [
                { id: "Sertifikat tidak diterbitkan di prototipe.", en: "Certificates are not issued in the prototype." },
                { id: "Sertifikat diterbitkan secara otomatis.", en: "Certificates are issued automatically." },
                { id: "Hasil demo adalah hasil kompetensi resmi.", en: "Demo results are official competency results." },
                { id: "Sertifikasi telah diimplementasikan sepenuhnya.", en: "Certification is fully implemented." },
              ],
              correct: 0,
            },
            {
              id: "Apa yang harus dimiliki penilaian yang adil?",
              en: "What should a fair assessment include?",
              options: [
                { id: "Pertanyaan tersembunyi.", en: "Hidden questions." },
                { id: "Penilaian acak.", en: "Random scoring." },
                {
                  id: "Pertanyaan yang jelas dan penilaian yang konsisten.",
                  en: "Clear questions and consistent scoring.",
                },
                { id: "Tanpa umpan balik.", en: "No feedback." },
              ],
              correct: 2,
            },
            {
              id: "Memverifikasi sertifikat berarti...",
              en: "Verifying a certificate means...",
              options: [
                { id: "Sertifikat dicetak.", en: "The certificate is printed." },
                { id: "Pemberi kerja dapat memeriksa keasliannya.", en: "Employers can check its authenticity." },
                { id: "Sertifikat tidak pernah kedaluwarsa.", en: "The certificate never expires." },
                { id: "Hanya pembelajar yang melihatnya.", en: "Only the learner sees it." },
              ],
              correct: 1,
            },
          ],
        },
        {
          stage: 4,
          title: "Demo Assessment Stage 4",
          description:
            "Test your understanding of professional and talent concepts with 5 multiple-choice questions.",
          questions: [
            {
              id: "Apa itu portofolio dalam konteks ini?",
              en: "What is a portfolio in this context?",
              options: [
                { id: "Jenis sertifikat.", en: "A type of certificate." },
                { id: "Kumpulan hasil kerja dan proyek Anda.", en: "A collection of your work and projects." },
                { id: "Bahasa pemrograman.", en: "A programming language." },
                { id: "Agen rekrutmen.", en: "A recruitment agency." },
              ],
              correct: 1,
            },
            {
              id: "Bagaimana talenta terverifikasi dapat ditampilkan kepada pemberi kerja?",
              en: "How can verified talent be presented to employers?",
              options: [
                { id: "Dengan membagikan kata sandi.", en: "By sharing passwords." },
                { id: "Melalui klaim tanpa verifikasi.", en: "Through unverified claims." },
                {
                  id: "Melalui profil talenta dengan keterampilan terverifikasi.",
                  en: "Through a talent profile with verified skills.",
                },
                { id: "Dengan menyembunyikan semua hasil.", en: "By hiding all results." },
              ],
              correct: 2,
            },
            {
              id: "Apa konsep pasar talenta?",
              en: "What is the talent marketplace concept?",
              options: [
                { id: "Menjual sertifikat.", en: "Selling certificates." },
                { id: "Layanan pengganti pekerjaan.", en: "A job replacement service." },
                { id: "Toko daring.", en: "An online store." },
                {
                  id: "Menghubungkan talenta terverifikasi dengan peluang karier.",
                  en: "Connecting verified talent with career opportunities.",
                },
              ],
              correct: 3,
            },
            {
              id: "Cara terbaik untuk berkembang secara profesional?",
              en: "Which is the best way to grow professionally?",
              options: [
                { id: "Terus belajar dan membangun proyek.", en: "Keep learning and building projects." },
                { id: "Berhenti belajar setelah satu kursus.", en: "Stop learning after one course." },
                { id: "Menghindari umpan balik.", en: "Avoid feedback." },
                { id: "Mengabaikan komunitas.", en: "Ignore the community." },
              ],
              correct: 0,
            },
            {
              id: "Dalam prototipe, fitur rekrutmen adalah...",
              en: "In the prototype, recruitment features are...",
              options: [
                { id: "Sepenuhnya beroperasi.", en: "Fully operational." },
                { id: "Diperlukan untuk Stage 0.", en: "Required for Stage 0." },
                {
                  id: "Rencana masa depan, belum diimplementasikan.",
                  en: "Future plans, not yet implemented.",
                },
                { id: "Bagian dari penilaian demo.", en: "Part of demo scoring." },
              ],
              correct: 2,
            },
          ],
        },
      ],
    },
    register: {
      prototypeNotice: {
        title: "Prototype v0.0.1",
        description:
          "Registration is part of the prototype. The live registration service will be available in the authentication milestone.",
      },
      hero: {
        title: "Create a new account",
        description:
          "Register for free and start your programming journey with Python.",
      },
      form: {
        email: {
          label: "Email",
          placeholder: "name@example.com",
        },
        password: {
          label: "Password",
          placeholder: "••••••••",
          hint: "At least 10 characters.",
        },
        confirmPassword: {
          label: "Confirm Password",
          placeholder: "••••••••",
        },
        submit: "Register",
        submitting: "Registering...",
        serverError:
          "A server error occurred. Please try again later.",
        unavailable:
          "The registration service is not available yet. Please try again later.",
        successTitle: "Registration successful",
        successDescription:
          "Your account has been created. Please log in to continue.",
        errors: {
          emailRequired: "Email is required.",
          emailInvalid: "Email format is invalid.",
          passwordRequired: "Password is required.",
          passwordMinLength: "Password must be at least 10 characters.",
          confirmPasswordRequired: "Password confirmation is required.",
          passwordsMustMatch: "Passwords do not match.",
        },
      },
      login: {
        prompt: "Already have an account?",
        label: "Login",
      },
    },
    login: {
      prototypeNotice: {
        title: "Prototype v0.0.1",
        description:
          "The login page is part of the prototype. The live authentication service will be available in the authentication milestone.",
      },
      hero: {
        title: "Log in to your account",
        description: "Log in to continue learning Python.",
      },
      form: {
        email: {
          label: "Email",
          placeholder: "name@example.com",
        },
        password: {
          label: "Password",
          placeholder: "••••••••",
        },
        submit: "Login",
        submitting: "Processing...",
        serverError: "A server error occurred. Please try again later.",
        unavailable:
          "The authentication service is not available yet. Please try again later.",
        invalidCredentials: "Email or password is incorrect.",
        errors: {
          emailRequired: "Email is required.",
          emailInvalid: "Email format is invalid.",
          passwordRequired: "Password is required.",
        },
      },
      register: {
        prompt: "Don't have an account?",
        label: "Register",
      },
    },
    dashboard: {
      prototypeNotice: {
        title: "Prototype v0.0.1",
        description:
          "This is the student dashboard for prototype validation. The learning summary is based on your account and progress stored on this device.",
      },
      hero: {
        eyebrow: "Student Dashboard",
        welcomeTitle: "Welcome back",
        guestTitle: "Your Learning Dashboard",
        description:
          "Continue your programming journey: your current course, progress, and the five-stage learning path.",
      },
      currentCourse: {
        title: "Current Course",
        description: "The active course you are taking.",
        courseTitle: "Python Stage 0 — Programming Fundamentals",
        courseDescription:
          "Start from zero: variables, data types, and your first Python program.",
        freeBadge: "Free",
        openLabel: "Open Course",
      },
      progress: {
        title: "Progress Summary",
        description: "Your progress in Stage 0 — Programming Fundamentals.",
        lessonsCompleted: "Lessons completed: {completed} of {total}",
        completedNote: "All Stage 0 lessons completed. Great job!",
        emptyTitle: "No progress yet",
        emptyDescription: "Start your first lesson to begin Stage 0.",
        startLabel: "Start Learning",
        continueLabel: "Continue Learning",
      },
      stages: {
        title: "Your Learning Path",
        description:
          "Five stages toward a programming career. Stages 2–4 remain locked in this prototype.",
      },
      cta: {
        title: "Continue your learning journey.",
        description: "Return to your lessons and pick up where you left off.",
        primaryCta: "Continue Learning",
        secondaryCta: "View Learning Path",
      },
      auth: {
        loading: "Loading dashboard...",
        unauthenticatedTitle: "Log in to view your dashboard",
        unauthenticatedDescription:
          "Your dashboard shows your current course, learning progress, and next lessons.",
        loginLabel: "Log in",
        registerLabel: "Register",
        errorTitle: "Failed to load data",
        errorDescription:
          "Something went wrong while loading your dashboard. Please try again later.",
        logoutLabel: "Log out",
        studentRole: "Student",
      },
    },
    adminDashboard: {
      prototypeNotice: {
        title: "Prototype v0.0.1",
        description:
          "This admin dashboard is a prototype for validation. Statistics show basic platform data — not advanced analytics.",
      },
      hero: {
        eyebrow: "Admin Dashboard",
        title: "Platform Overview",
        description:
          "Review basic statistics and manage prototype content from one place.",
        adminRole: "Administrator",
        logoutLabel: "Log out",
      },
      stats: {
        title: "Prototype Statistics",
        description: "Current basic platform activity numbers.",
        emptyValue: "—",
        users: {
          label: "Registered Users",
          description: "Number of user accounts on the platform.",
        },
        stage0Participants: {
          label: "Stage 0 Participation",
          description:
            "Users who have completed at least one Stage 0 lesson.",
        },
        assessmentAttempts: {
          label: "Assessment Attempts",
          description: "Number of submitted demo assessment attempts.",
        },
      },
      sections: {
        title: "Content Management",
        description: "Quick navigation to prototype management areas.",
        users: {
          title: "Users",
          description: "Manage user accounts.",
          openLabel: "Open",
        },
        courses: {
          title: "Courses",
          description: "Manage courses and lessons.",
          openLabel: "Open",
        },
        assessments: {
          title: "Assessments",
          description: "Manage demo assessments and questions.",
          openLabel: "Open",
        },
      },
      auth: {
        loading: "Loading admin dashboard...",
        unauthorizedTitle: "Access Denied",
        unauthorizedDescription:
          "This page is restricted to administrators. Log in with an admin account to continue.",
        loginLabel: "Log in",
        errorTitle: "Failed to Load Data",
        errorDescription:
          "Something went wrong while loading the admin dashboard. Please try again later.",
      },
    },
    adminUsers: {
      prototypeNotice: {
        title: "Prototype v0.0.1",
        description:
          "This page lists prototype user accounts. User data is for validation purposes only.",
      },
      hero: {
        eyebrow: "Administration",
        title: "Users",
        description: "List of registered user accounts on the platform.",
      },
      table: {
        email: "Email",
        role: "Role",
        status: "Status",
        joined: "Joined",
      },
      searchAriaLabel: "Search users by email",
      searchPlaceholder: "Search email...",
      emptyTitle: "No users found",
      emptyDescription: "No accounts match your search.",
      loading: "Loading user list...",
      errorTitle: "Failed to Load Data",
      errorDescription:
        "Something went wrong while loading the user list. Please try again later.",
      unauthorizedTitle: "Access Denied",
      unauthorizedDescription:
        "This page is restricted to administrators. Log in with an admin account to continue.",
      loginLabel: "Log in",
      statusLabels: {
        active: "Active",
        inactive: "Inactive",
      },
    },
    adminCourses: {
      prototypeNotice: {
        title: "Prototype v0.0.1",
        description:
          "This page is minimal course management for prototype validation — not a full CMS.",
      },
      hero: {
        eyebrow: "Administration",
        title: "Courses",
        description: "Manage courses and Stage 0 lesson content.",
      },
      create: {
        title: "Create Course",
        description:
          "Create a new course with bilingual metadata (Indonesian & English).",
        labels: {
          slug: "Slug",
          stage: "Stage",
          titleId: "Title (Indonesian)",
          titleEn: "Title (English)",
          descriptionId: "Description (Indonesian)",
          descriptionEn: "Description (English)",
        },
        submit: "Create Course",
        creating: "Creating...",
        serverError: "A server error occurred. Please try again.",
        slugExists: "Slug already exists. Choose a different slug.",
        validationError: "Please review the form fields.",
      },
      list: {
        title: "Course List",
        description: "Courses available on the prototype platform.",
        emptyTitle: "No courses yet",
        emptyDescription: "Create your first course.",
      },
      table: {
        course: "Course",
        stage: "Stage",
        lessons: "Lessons",
        updated: "Updated",
      },
      loading: "Loading courses...",
      errorTitle: "Failed to Load Data",
      errorDescription:
        "Something went wrong while loading the course list. Please try again later.",
      unauthorizedTitle: "Access Denied",
      unauthorizedDescription:
        "This page is restricted to administrators. Log in with an admin account to continue.",
      loginLabel: "Log in",
      fieldLabels: {
        title: "Title",
        description: "Description",
        objective: "Learning Objective",
        explanation: "Explanation",
        exampleTitle: "Example Title",
        exampleCode: "Example Code",
        exampleExplanation: "Example Explanation",
        mistakes: "Common Mistakes",
        exerciseTitle: "Exercise Title",
        exerciseDescription: "Exercise Description",
        exerciseHint: "Exercise Hint",
      },
      languageLabels: {
        id: "Indonesian (ID)",
        en: "English (EN)",
      },
      save: "Save",
      saving: "Saving...",
      saved: "Saved",
      saveError: "Failed to save. Please try again.",
      editLesson: "Edit",
      cancel: "Cancel",
      courseMetaTitle: "Course Metadata",
      courseMetaDescription:
        "Update the course title and description in both languages.",
      lessonsTitle: "Lessons",
      lessonsDescription: "Select a lesson to edit its bilingual content.",
      backLabel: "Back to Courses",
      lessonLabel: "Lesson",
    },
    adminAssessments: {
      prototypeNotice: {
        title: "Prototype v0.0.1",
        description:
          "This demo assessment management is for prototype validation only. All assessments remain clearly marked as demos, not official certification examinations.",
      },
      hero: {
        eyebrow: "Administration",
        title: "Assessments",
        description: "Manage demo assessments and questions per stage.",
      },
      list: {
        title: "Demo Assessment List",
        description:
          "Four demo assessments, one for each stage (Stage 1–4).",
        emptyTitle: "No assessments yet",
        emptyDescription: "Demo assessments are not available.",
      },
      table: {
        stage: "Stage",
        questions: "Questions",
        openLabel: "Open",
      },
      loading: "Loading assessments...",
      errorTitle: "Failed to Load Data",
      errorDescription:
        "Something went wrong while loading the assessment list. Please try again later.",
      unauthorizedTitle: "Access Denied",
      unauthorizedDescription:
        "This page is restricted to administrators. Log in with an admin account to continue.",
      loginLabel: "Log in",
      detail: {
        questionsTitle: "Questions",
        questionsDescription:
          "Review and edit demo assessment questions. All content is demo.",
        backLabel: "Back to Assessments",
        demoLabel: "Demo Assessment - Not a Certification Examination",
        questionLabel: "Question",
        editQuestion: "Edit",
        cancel: "Cancel",
        createTitle: "Add Question",
        createDescription:
          "Add a new multiple-choice question for this assessment.",
        createSubmit: "Add Question",
        creating: "Adding...",
        save: "Save",
        saving: "Saving...",
        saved: "Saved",
        saveError: "Failed to save. Please try again.",
        labels: {
          questionId: "Question (Indonesian)",
          questionEn: "Question (English)",
          optionTemplate: "Option {n}",
          optionId: "Text (Indonesian)",
          optionEn: "Text (English)",
          correctOption: "Correct Answer",
        },
      },
    },
    contact: {
      prototypeNotice: {
        title: "Prototype v0.0.1",
        description:
          "This contact form is a validation demo — messages are not sent to a server.",
      },
      hero: {
        eyebrow: "Contact",
        title: "Get in touch.",
        description:
          "Questions about this platform? Send us a message using the form below.",
      },
      info: {
        title: "Contact Information",
        description:
          "Project email for general questions during the prototype phase.",
        emailLabel: "Email",
        emailValue: "hello@bilingualedu.example",
        responseNote:
          "The email above is a prototype placeholder and is not active yet.",
      },
      form: {
        title: "Send a Message",
        description:
          "Fill in the form below. In this prototype, messages are only simulated.",
        name: {
          label: "Name",
          placeholder: "Your name",
        },
        email: {
          label: "Email",
          placeholder: "name@example.com",
        },
        message: {
          label: "Message",
          placeholder: "Write your message...",
        },
        submit: "Send Message",
        submitting: "Sending...",
        successTitle: "Message Sent (Demo)",
        successDescription:
          "Thank you! In this prototype the message is not actually sent, but we appreciate your feedback.",
        sendAnother: "Send Another Message",
        errors: {
          nameRequired: "Name is required.",
          emailRequired: "Email is required.",
          emailInvalid: "Email format is invalid.",
          messageRequired: "Message is required.",
          messageMinLength: "Message must be at least 10 characters.",
        },
      },
    },
    privacy: {
      prototypeNotice: {
        title: "Prototype v0.0.1",
        description:
          "This privacy policy is a prototype draft and has not been legally reviewed.",
      },
      hero: {
        eyebrow: "Legal",
        title: "Privacy Policy",
        description:
          "Draft privacy policy for the prototype. This document is not final and requires legal review before production.",
      },
      sections: [
        {
          heading: "Data Collection",
          content:
            "This prototype collects basic account data (email and hashed password) and learning progress to validate the concept. Data is collected minimally and only for prototype purposes.",
        },
        {
          heading: "Account",
          content:
            "When you register, you create an account with an email and password. Passwords are stored hashed and never stored as plain text.",
        },
        {
          heading: "Security",
          content:
            "The prototype applies basic security practices such as password hashing and signed session tokens. However, the prototype is not designed to handle production data and has not undergone a full security review.",
        },
        {
          heading: "Cookies & Local Storage",
          content:
            "The prototype uses browser local storage (localStorage) to keep your session token and learning progress on your device.",
        },
        {
          heading: "Contact",
          content:
            "For privacy questions during the prototype phase, contact us through the Contact page.",
        },
      ],
      legalReview: {
        title: "Legal Review Required",
        description:
          "This policy is a prototype draft. A legal review by a qualified professional MUST be completed before production use.",
      },
    },
    terms: {
      prototypeNotice: {
        title: "Prototype v0.0.1",
        description:
          "These terms & conditions are a prototype draft and have not been legally reviewed.",
      },
      hero: {
        eyebrow: "Legal",
        title: "Terms & Conditions",
        description:
          "Draft terms and conditions for the prototype. This document is not final and requires legal review before production.",
      },
      sections: [
        {
          heading: "Account Use",
          content:
            "You are responsible for keeping your account password confidential. Prototype accounts are created for validation purposes and grant no rights beyond the platform.",
        },
        {
          heading: "Learning Content",
          content:
            "Stage 0 learning content is early seed material for prototype validation and may change at any time without notice.",
        },
        {
          heading: "Demo Assessments",
          content:
            "All assessments in the prototype are practice demos and are NOT official certification examinations. Demo results do not issue any certificate.",
        },
        {
          heading: "Prohibited Use",
          content:
            "Misuse of the service is prohibited, including attempting to access other users' data, disrupting the service, or using the platform for illegal activity.",
        },
        {
          heading: "Intellectual Property",
          content:
            "Platform content is protected by copyright. Personal learning use is permitted; commercial reproduction without permission is prohibited.",
        },
        {
          heading: "Future Services",
          content:
            "Features such as paid courses, official certification, and a talent marketplace are future plans and are not guaranteed by this prototype.",
        },
      ],
      legalReview: {
        title: "Legal Review Required",
        description:
          "These terms & conditions are a prototype draft. A legal review by a qualified professional MUST be completed before production use.",
      },
    },
  },
};

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
