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
  displayNameRequired: string;
  displayNameMinLength: string;
  displayNameMaxLength: string;
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
    displayName: {
      label: string;
      placeholder: string;
    };
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
  welcome: {
    greeting: string;
    continuePrompt: string;
    studentLabel: string;
  };
  profileCard: {
    title: string;
    role: string;
    memberSince: string;
    accountStatus: string;
    active: string;
    editLabel: string;
  };
  continueLearning: {
    title: string;
    description: string;
    currentLesson: string;
    progress: string;
    startLabel: string;
    continueLabel: string;
    noProgressTitle: string;
    noProgressDescription: string;
  };
  progressOverview: {
    title: string;
    description: string;
    lessonsCompleted: string;
    currentStage: string;
    overallLabel: string;
    lastActivity: string;
    never: string;
  };
  pathSnapshot: {
    title: string;
    description: string;
    current: string;
    available: string;
    locked: string;
    viewPath: string;
  };
  recentActivity: {
    title: string;
    description: string;
    emptyTitle: string;
    emptyDescription: string;
  };
  assessmentSummary: {
    title: string;
    description: string;
    completed: string;
    demoWarning: string;
    viewLabel: string;
  };
  settingsSummary: {
    title: string;
    description: string;
    manageLabel: string;
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

export interface SettingsCopy {
  prototypeNotice: { title: string; description: string };
  hero: { eyebrow: string; title: string; description: string };
  tabs: { profile: string; security: string; preferences: string };
  profile: {
    title: string;
    description: string;
    displayName: { label: string; note: string };
    email: { label: string; note: string };
    notAvailable: string;
    saveLabel: string;
    saving: string;
    saveSuccess: string;
    saveError: string;
    displayNameRequired: string;
    displayNameMinLength: string;
    displayNameMaxLength: string;
  };
  security: {
    title: string;
    description: string;
    role: string;
    memberSince: string;
    sessionStatus: string;
    sessionActive: string;
  };
  password: {
    title: string;
    description: string;
    currentLabel: string;
    newLabel: string;
    confirmLabel: string;
    notAvailable: string;
  };
  preferences: {
    title: string;
    description: string;
    language: string;
    idLabel: string;
    enLabel: string;
  };
}

export interface AuthGuardCopy {
  checking: string;
  networkErrorTitle: string;
  networkErrorDescription: string;
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
    | "home"
    | "learningPath"
    | "vision"
    | "login"
    | "register"
    | "dashboard"
    | "settings"
    | "logout"
    | "accountMenu"
    | "greetingPrefix",
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
  settings: SettingsCopy;
  authGuard: AuthGuardCopy;
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
      title: "LearnCode",
      description:
        "Belajar pemrograman, membangun keterampilan, memantau perkembangan, dan siap berkarier.",
    },
    brand: {
      name: "LearnCode",
    },
    skipLink: "Langsung ke konten utama",
    nav: {
      home: "Beranda",
      learningPath: "Jalur Belajar",
      vision: "Visi",
      login: "Masuk",
      register: "Daftar",
      dashboard: "Dasbor",
      settings: "Pengaturan",
      logout: "Keluar",
      accountMenu: "Akun",
      greetingPrefix: "Halo",
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
        "Platform belajar pemrograman untuk membangun keterampilan dan siap berkarier.",
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
        eyebrow: "LearnCode",
        title: "Belajar pemrograman. Bangun keterampilan. Menuju karier.",
        description:
          "Platform belajar pemrograman dengan jalur belajar terpandu, demo penilaian, dan pelacakan progres — dari pelajaran pertama hingga kesiapan karier. Tersedia dalam bahasa Indonesia dan Inggris.",
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
          "Dukungan bahasa Indonesia & Inggris.",
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
          "Platform belajar pemrograman yang membawa pembelajar dari pelajaran terpandu menuju keterampilan nyata, lalu menghubungkan dengan peluang karier. Tersedia dalam bahasa Indonesia dan Inggris.",
        primaryCta: "Lihat Jalur Belajar",
        secondaryCta: "Kembali ke Beranda",
      },
      purpose: {
        title: "Tujuan Prototipe",
        description:
          "Prototipe v0.0.1 memvalidasi fondasi platform sebelum membangun produk lengkap. Yang diuji hari ini adalah fondasi teknis dan arah produk — bukan produk akhir.",
        items: [
          "Dukungan bahasa Indonesia & Inggris.",
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
          "Produk final bertujuan menjadi jalur lengkap dari pendidikan menuju pekerjaan dalam satu ekosistem: kursus, sertifikasi terverifikasi, portofolio, dan pasar talenta. Tersedia dalam bahasa Indonesia dan Inggris.",
        futureLabel: "Masa Depan",
        pillars: [
          {
            title: "Perpustakaan Kursus Lengkap",
            description:
              "Kursus terstruktur dalam dua bahasa (Indonesia & Inggris) dari dasar hingga tingkat mahir.",
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
          {
            objective:
              "Pahami fungsi `print()`, tulis string sederhana, dan jalankan program Python pertama Anda.",
            explanation: [
              "Program Python pertama yang paling terkenal adalah mencetak teks ke layar. Untuk itu Python menyediakan fungsi `print()`. Fungsi adalah perintah siap pakai yang melakukan tugas tertentu — dalam hal ini, menampilkan teks di layar.",
              "Teks yang ingin ditampilkan ditulis di antara tanda kutip, misalnya `\"Hello, World!\"`. Teks semacam ini disebut string. Tanda kutip memberi tahu Python: 'ini teks, bukan perintah'.",
              "Saat Anda menjalankan program, Python membaca kode dari atas ke bawah dan mengeksekusi setiap baris. Baris `print(\"Hello, World!\")` membuat Python menampilkan `Hello, World!` di layar. Source code adalah instruksinya; output adalah hasilnya.",
            ],
            example: {
              title: "Contoh: program Hello World",
              code: 'print("Hello, World!")',
              explanation:
                "Baris ini memanggil fungsi `print()` dengan satu argumen: string `\"Hello, World!\"`. Saat dijalankan, Python menampilkan teks di dalam tanda kutip tanpa tanda kutipnya.",
            },
            mistakes: [
              "Menulis `Print(\"Hello, World!\")` dengan huruf kapital. Python peka huruf besar/kecil — nama fungsi harus ditulis `print`.",
              "Melupakan tanda kutip, misalnya `print(Hello, World!)`. Python akan mengira `Hello` adalah nama variabel dan memunculkan error.",
              "Menulis `println` atau `echo` seperti bahasa lain. Di Python, fungsi untuk mencetak adalah `print()`.",
            ],
            exercise: {
              title: "Latihan: program Hello World Anda",
              description:
                "Buat file `hello.py`, tulis `print(\"Hello, World!\")`, lalu jalankan dengan perintah `python hello.py`. Setelah itu, ubah teksnya menjadi `print(\"Halo, dunia!\")` dan jalankan lagi. Catat kedua output yang muncul.",
              hint: "Output program adalah teks di dalam tanda kutip, tanpa tanda kutip. Bandingkan source code dan output untuk melihat hubungannya.",
            },
          },
          {
            objective:
              "Pahami apa itu variabel, cara menyimpan nilai ke dalamnya, dan aturan dasar penamaan variabel di Python.",
            explanation: [
              "Variabel adalah 'kotak' penyimpanan di memori komputer yang bisa Anda beri nama dan gunakan untuk menyimpan data. Bayangkan sebuah label yang ditempelkan pada sebuah nilai — nilai itu bisa berupa angka, teks, atau jenis data lainnya.",
              "Di Python, membuat variabel sangat sederhana: tulis nama variabel, tanda sama dengan (`=`), lalu nilai yang ingin disimpan. `name = \"Rifav\"` menyimpan string `\"Rifav\"` ke variabel `name`, dan `age = 20` menyimpan integer `20` ke variabel `age`. Tanda `=` di sini adalah assignment — menetapkan nilai ke sebuah variabel.",
              "Setelah nilai tersimpan, gunakan nama variabel di mana pun dalam program; Python akan menggantinya dengan nilai sebenarnya. Saat mencetak variabel dengan `print()`, yang tampil adalah nilainya — misalnya `print(name)` menampilkan `Rifav`, bukan kata `name`.",
              "Nama variabel mengikuti aturan penamaan Python: harus diawali huruf atau garis bawah, tidak boleh diawali angka, dan hanya boleh berisi huruf, angka, dan garis bawah. Python juga peka huruf besar/kecil: `Name` dan `name` adalah dua variabel yang berbeda.",
            ],
            example: {
              title: "Contoh: variabel sederhana",
              code: 'name = "Rifav"\nage = 20\n\nprint(name)\nprint(age)\n\ncourse = "Python"\nprogress = 25\n\nprint(course)\nprint(progress)',
              explanation:
                "Bagian pertama membuat variabel `name` (string) dan `age` (integer), lalu mencetaknya. `name` adalah nama variabel, `\"Rifav\"` adalah string, `20` adalah integer, dan `=` adalah assignment. Bagian kedua menambah variabel `course` dan `progress`. Output program: `Rifav`, `20`, `Python`, `25` — satu nilai per baris.",
            },
            mistakes: [
              "Menggunakan nama variabel yang diawali angka, misalnya `1student = \"Rifav\"`. Nama variabel harus diawali huruf atau garis bawah.",
              "Menggunakan tanda hubung seolah-olah garis bawah, misalnya `student-name = \"Rifav\"`. Python menganggap `-` sebagai operator pengurangan, bukan bagian dari nama. Gunakan garis bawah: `student_name`.",
              "Membedakan huruf besar/kecil secara tidak tepat: `Name = \"Rifav\"` lalu `name = \"Budi\"` membuat dua variabel yang berbeda. Python peka huruf besar/kecil.",
              "Lupa bahwa variabel punya tipe (string, integer, dll.) meskipun Python tidak mewajibkan deklarasi eksplisit.",
            ],
            exercise: {
              title: "Latihan: program data diri Anda",
              description:
                "Buat file `data_diri.py`, lalu simpan tiga nilai ke dalam variabel: `name` berisi nama Anda, `age` berisi umur Anda, dan `language` berisi bahasa pemrograman yang sedang Anda pelajari (misalnya \"Python\"). Cetak ketiganya dengan `print()`, lalu jalankan dan amati outputnya. Setelah itu, ganti nilainya dengan data Anda sendiri dan jalankan lagi.",
              hint: "String diapit tanda kutip (`\"...\"`), sedangkan integer ditulis langsung tanpa tanda kutip. Contoh output: `Rifav`, `20`, `Python` — satu nilai per baris.",
            },
          },
          {
            objective:
              "Kenali tipe data dasar Python: string, integer, float, dan boolean, serta cara memeriksa tipe dengan `type()`.",
            explanation: [
              "Setiap nilai di Python memiliki tipe data. Tipe menentukan jenis nilai tersebut dan operasi apa yang bisa dilakukan padanya. Empat tipe dasar yang paling sering dipakai: `string` (teks), `integer` (bilangan bulat), `float` (bilangan desimal), dan `boolean` (`True`/`False`).",
              "String ditulis di antara tanda kutip (`\"Rifav\"`), sedangkan angka tidak memakai tanda kutip. `20` adalah integer, `170.5` adalah float. Perbedaannya: float memiliki bagian desimal, integer tidak.",
              "Boolean hanya punya dua nilai: `True` dan `False` — dengan huruf kapital di awal. Python peka huruf besar/kecil: `true` akan memunculkan error, dan `\"True\"` (dengan tanda kutip) adalah string, bukan boolean.",
              "Untuk memeriksa tipe sebuah nilai, gunakan fungsi `type()`: `type(20)` mengembalikan `<class 'int'>`, sedangkan `type(\"20\")` mengembalikan `<class 'str'>`.",
            ],
            example: {
              title: "Contoh: tipe data dasar",
              code: 'name = "Rifav"\nage = 20\nheight = 170.5\nis_student = True\n\nprint(name)\nprint(age)\nprint(height)\nprint(is_student)',
              explanation:
                "`name` menyimpan string, `age` integer, `height` float, dan `is_student` boolean. Saat dicetak, setiap variabel menampilkan nilainya. Perhatikan bahwa boolean `True` dicetak tanpa tanda kutip, dan `170.5` mempertahankan bagian desimalnya.",
            },
            mistakes: [
              "Menulis angka dengan tanda kutip: `\"20\"` adalah string, bukan integer. `\"20\" + \"5\"` menghasilkan `\"205\"` (penggabungan teks), sedangkan `20 + 5` menghasilkan `25`.",
              "Mengira `95` dan `95.0` sama. Keduanya berbeda tipe: `95` adalah integer, `95.0` adalah float — meskipun nilainya setara.",
              "Menulis `\"True\"` dengan tanda kutip — itu string, bukan boolean. Boolean ditulis tanpa tanda kutip: `True`.",
              "Menulis `true` dengan huruf kecil. Python peka huruf besar/kecil: yang benar adalah `True` (dan `False`).",
            ],
            exercise: {
              title: "Latihan: memeriksa tipe data",
              description:
                "Buat file `data_tipe.py`. Simpan empat nilai ke dalam variabel: `nama` (string), `umur` (integer), `tinggi` (float), dan `pelajar` (boolean). Cetak setiap variabel dengan `print()`, lalu cetak juga hasil `type()`-nya, misalnya `print(type(nama))`. Jalankan file dan amati outputnya.",
              hint: "`type()` mengembalikan nilai seperti `<class 'str'>` atau `<class 'int'>`. Bandingkan output `print(type(umur))` dengan `print(type(\"umur\"))` untuk melihat perbedaan string dan integer.",
            },
          },
          {
            objective:
              "Pahami cara membuat keputusan dalam program menggunakan `if`, `elif`, dan `else`.",
            explanation: [
              "Program tidak selalu menjalankan baris yang sama setiap waktu. Dengan percabangan (conditionals), program bisa mengambil keputusan berdasarkan kondisi: jika suatu pernyataan benar, jalankan blok tertentu; jika tidak, jalankan blok lain.",
              "Struktur dasarnya: `if kondisi:` diikuti blok kode yang di-indent (menjorok ke dalam). Python menggunakan indentasi untuk menentukan bagian mana yang termasuk dalam blok. Contoh: `if usia >= 17: print(\"Boleh ikut\")`.",
              "Untuk kondisi tambahan gunakan `elif` (else if), dan untuk semua kasus lainnya gunakan `else`. Hanya satu blok yang akan dijalankan: `if` dicek pertama, lalu `elif` secara berurutan, dan `else` jika tidak ada yang cocok.",
              "Operator perbandingan umum: `==` (sama dengan), `!=` (tidak sama), `>`, `<`, `>=`, `<=`. Hati-hati: `==` membandingkan nilai, sedangkan `=` menetapkan nilai ke variabel.",
            ],
            example: {
              title: "Contoh: percabangan sederhana",
              code: 'nilai = 85\n\nif nilai >= 75:\n    print("Lulus")\nelse:\n    print("Belum lulus")',
              explanation:
                "Program memeriksa apakah `nilai` lebih besar atau sama dengan 75. Karena 85 >= 75 benar, blok `if` dijalankan dan program mencetak `Lulus`. Jika nilainya di bawah 75, blok `else` yang dijalankan. Perhatikan titik dua (`:`) setelah kondisi dan indentasi pada baris `print`.",
            },
            mistakes: [
              "Melupakan titik dua setelah kondisi: `if nilai > 5` tanpa `:` akan memunculkan SyntaxError.",
              "Menggunakan `=` untuk membandingkan: `if nilai = 85` adalah kesalahan. `=` untuk assignment; `==` untuk perbandingan.",
              "Lupa meng-indent blok kode di bawah `if` — Python mewajibkan indentasi dan akan error jika tidak ada.",
              "Menulis `else if` alih-alih `elif`. Python menggunakan `elif` untuk kondisi tambahan.",
            ],
            exercise: {
              title: "Latihan: penilaian sederhana",
              description:
                "Buat file `kondisi.py`. Simpan nilai ujian Anda dalam variabel `nilai`, lalu buat percabangan: jika `nilai >= 75` cetak `\"Lulus\"`, jika `nilai >= 60` cetak `\"Perlu perbaikan\"`, dan selain itu cetak `\"Belum lulus\"`. Ubah-ubah nilainya dan jalankan ulang untuk melihat hasil yang berbeda.",
              hint: "Urutan `elif` penting: cek kondisi paling ketat lebih dulu. Coba juga menukar urutan `>= 60` dengan `>= 75` untuk melihat perbedaannya.",
            },
          },

          {
            objective:
              "Pahami cara mengulang kode dengan `for` dan `while`, serta kapan menggunakan masing-masing.",
            explanation: [
              "Perulangan (loop) memungkinkan program menjalankan kode yang sama berkali-kali tanpa menuliskannya berulang-ulang. Python memiliki dua jenis utama: `for` dan `while`.",
              "`for` digunakan untuk mengulang sejumlah tertentu atau melewati koleksi. `for i in range(3):` menjalankan blok sebanyak tiga kali dengan `i` bernilai 0, 1, lalu 2.",
              "`while` digunakan selama sebuah kondisi masih benar. `while jumlah < 3:` menjalankan blok berulang kali selama `jumlah` masih kurang dari 3. Pastikan kondisi akhirnya menjadi salah — jika tidak, loop akan berjalan selamanya (infinite loop).",
              "Fungsi `range(n)` menghasilkan urutan 0 sampai n-1. `range(mulai, selesai)` menghasilkan urutan dari `mulai` hingga `selesai - 1`.",
            ],
            example: {
              title: "Contoh: perulangan for dan while",
              code: 'for i in range(3):\n    print("Iterasi", i)\n\njumlah = 0\nwhile jumlah < 3:\n    print("Jumlah:", jumlah)\n    jumlah = jumlah + 1',
              explanation:
                "Bagian `for` mencetak `Iterasi 0`, `Iterasi 1`, `Iterasi 2`. Bagian `while` melakukan hal serupa: selama `jumlah` kurang dari 3, cetak nilainya lalu tambah 1. Perhatikan bahwa di dalam `while` kita mengubah `jumlah` — tanpa baris itu, loop tidak akan pernah berhenti.",
            },
            mistakes: [
              "Melupakan titik dua dan indentasi di bawah `for` atau `while` — keduanya wajib.",
              "Membuat infinite loop: `while jumlah < 3:` tanpa mengubah `jumlah` di dalam blok akan berjalan selamanya.",
              "Mengira `range(3)` menghasilkan 1, 2, 3. Sebenarnya menghasilkan 0, 1, 2 — dimulai dari nol.",
              "Menulis `for i = 0` seperti bahasa lain. Di Python, gunakan `for i in range(...)`.",
            ],
            exercise: {
              title: "Latihan: perulangan Anda",
              description:
                "Buat file `perulangan.py`. Gunakan `for` untuk mencetak angka 1 sampai 5 (petunjuk: `range(1, 6)`). Lalu gunakan `while` untuk menghitung mundur dari 5 ke 1, dengan variabel yang dikurangi satu setiap iterasi.",
              hint: "`range(1, 6)` menghasilkan 1, 2, 3, 4, 5 — nilai akhir tidak ikut. Untuk `while`, jangan lupa mengubah variabel penghitung di dalam blok agar loop berakhir.",
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
        displayName: {
          label: "Nama Tampilan",
          placeholder: "Nama Anda",
        },
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
          displayNameRequired: "Nama tampilan wajib diisi.",
          displayNameMinLength: "Nama tampilan minimal 2 karakter.",
          displayNameMaxLength: "Nama tampilan maksimal 50 karakter.",
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
      welcome: {
        greeting: "Halo, {name}.",
        continuePrompt: "Lanjutkan dari posisi terakhir Anda.",
        studentLabel: "Siswa",
      },
      profileCard: {
        title: "Profil",
        role: "Peran",
        memberSince: "Bergabung sejak",
        accountStatus: "Status Akun",
        active: "Aktif",
        editLabel: "Edit Profil",
      },
      continueLearning: {
        title: "Lanjutkan Belajar",
        description: "Kembali ke pelajaran terakhir Anda di Stage 0.",
        currentLesson: "Pelajaran saat ini",
        progress: "Progres",
        startLabel: "Mulai Belajar",
        continueLabel: "Lanjutkan Belajar",
        noProgressTitle: "Belum ada progres",
        noProgressDescription: "Mulai pelajaran pertama Anda untuk memulai Stage 0.",
      },
      progressOverview: {
        title: "Ringkasan Progres",
        description: "Data progres nyata dari akun Anda.",
        lessonsCompleted: "Pelajaran selesai",
        currentStage: "Tahap saat ini",
        overallLabel: "Progres keseluruhan",
        lastActivity: "Aktivitas terakhir",
        never: "Belum ada",
      },
      pathSnapshot: {
        title: "Jalur Belajar Anda",
        description: "Status lima tahap menuju karier.",
        current: "Saat ini",
        available: "Tersedia",
        locked: "Terkunci",
        viewPath: "Lihat Jalur Belajar",
      },
      recentActivity: {
        title: "Aktivitas Terakhir",
        description: "Pelajaran yang baru saja Anda selesaikan.",
        emptyTitle: "Belum ada aktivitas",
        emptyDescription: "Selesaikan pelajaran pertama Anda — aktivitas akan muncul di sini.",
      },
      assessmentSummary: {
        title: "Demo Penilaian",
        description: "Uji pemahaman Anda dengan kuis demo per tahap.",
        completed: "Penilaian selesai",
        demoWarning: "Semua penilaian adalah demo latihan — bukan ujian sertifikasi resmi.",
        viewLabel: "Lihat Penilaian",
      },
      settingsSummary: {
        title: "Pengaturan Akun",
        description: "Kelola profil, keamanan, dan preferensi Anda.",
        manageLabel: "Kelola Akun",
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
        emailValue: "hello@learncode.example",
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
    settings: {
      prototypeNotice: {
        title: "Prototipe v0.0.1",
        description:
          "Halaman pengaturan ini adalah prototipe. Beberapa fitur (edit profil, ganti kata sandi) belum didukung backend dan ditandai secara jujur.",
      },
      hero: {
        eyebrow: "Akun",
        title: "Pengaturan Akun",
        description:
          "Kelola informasi profil, keamanan sesi, dan preferensi bahasa Anda.",
      },
      tabs: {
        profile: "Profil",
        security: "Keamanan",
        preferences: "Preferensi",
      },
      profile: {
        title: "Profil",
        description:
          "Informasi dasar akun Anda. Email bersifat read-only di prototipe ini.",
        displayName: {
          label: "Nama Tampilan",
          note: "Pengeditan nama tampilan belum didukung backend prototipe ini.",
        },
        email: {
          label: "Email",
          note: "Perubahan email memerlukan verifikasi backend dan belum tersedia di prototipe ini.",
        },
        notAvailable: "Tidak tersedia di prototipe ini",
        saveLabel: "Simpan Perubahan",
        saving: "Menyimpan...",
        saveSuccess: "Nama tampilan berhasil diperbarui.",
        saveError: "Gagal menyimpan. Silakan coba lagi.",
        displayNameRequired: "Nama tampilan wajib diisi.",
        displayNameMinLength: "Nama tampilan minimal 2 karakter.",
        displayNameMaxLength: "Nama tampilan maksimal 50 karakter.",
      },
      security: {
        title: "Keamanan",
        description:
          "Status keamanan akun Anda. Data ditampilkan hanya jika benar-benar tersedia.",
        role: "Peran",
        memberSince: "Bergabung sejak",
        sessionStatus: "Status Sesi",
        sessionActive: "Aktif",
      },
      password: {
        title: "Ganti Kata Sandi",
        description: "Ganti kata sandi akun Anda secara aman.",
        currentLabel: "Kata Sandi Saat Ini",
        newLabel: "Kata Sandi Baru",
        confirmLabel: "Konfirmasi Kata Sandi Baru",
        notAvailable:
          "Perubahan kata sandi belum didukung backend prototipe ini — akan tersedia pada rilis berikutnya.",
      },
      preferences: {
        title: "Preferensi",
        description: "Preferensi bahasa untuk antarmuka Anda.",
        language: "Bahasa",
        idLabel: "Indonesia",
        enLabel: "English",
      },
    },
    authGuard: {
      checking: "Memeriksa sesi...",
      networkErrorTitle: "Tidak dapat memverifikasi sesi",
      networkErrorDescription:
        "Kami tidak dapat memeriksa apakah sesi Anda masih valid karena masalah jaringan. Sesi Anda mungkin masih aktif — coba muat ulang atau masuk kembali.",
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
      title: "LearnCode",
      description:
        "Learn programming, build practical skills, track your progress, and become career-ready.",
    },
    brand: {
      name: "LearnCode",
    },
    skipLink: "Skip to main content",
    nav: {
      home: "Home",
      learningPath: "Learning Path",
      vision: "Vision",
      login: "Login",
      register: "Register",
      dashboard: "Dashboard",
      settings: "Settings",
      logout: "Log out",
      accountMenu: "Account",
      greetingPrefix: "Hi",
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
        "A programming learning platform to build skills and become career-ready.",
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
        eyebrow: "LearnCode",
        title: "Learn programming. Build skills. Become career-ready.",
        description:
          "A programming learning platform with a guided learning path, demo assessments, and progress tracking — from your first lesson to career readiness. Available in Indonesian and English.",
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
          "Indonesian & English language support.",
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
          "A programming learning platform that takes learners from guided lessons to verifiable skills, then connects them to career opportunities. Available in Indonesian and English.",
        primaryCta: "View Learning Path",
        secondaryCta: "Back to Home",
      },
      purpose: {
        title: "Prototype Purpose",
        description:
          "Prototype v0.0.1 validates the platform foundation before building the full product. What is tested today is the technical foundation and product direction — not the final product.",
        items: [
          "Indonesian & English language support.",
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
          "The final product aims to be a complete path from education to employment in one ecosystem: courses, verifiable certification, portfolios, and a talent marketplace. Available in Indonesian and English.",
        futureLabel: "Future",
        pillars: [
          {
            title: "Full Course Library",
            description:
              "Structured courses in two languages (Indonesian & English) from beginner to advanced.",
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
          {
            objective:
              "Understand the `print()` function, write a simple string, and run your first Python program.",
            explanation: [
              "The most famous first Python program prints text to the screen. Python provides the `print()` function for this. A function is a ready-made command that performs a specific task — here, showing text on screen.",
              "The text you want to display is written between quotes, for example `\"Hello, World!\"`. This kind of text is called a string. The quotes tell Python: 'this is text, not a command'.",
              "When you run a program, Python reads the code from top to bottom and executes each line. The line `print(\"Hello, World!\")` makes Python display `Hello, World!` on screen. Source code is the instruction; the output is the result.",
            ],
            example: {
              title: "Example: Hello World program",
              code: 'print("Hello, World!")',
              explanation:
                "This line calls the `print()` function with one argument: the string `\"Hello, World!\"`. When run, Python displays the text inside the quotes, without the quotes.",
            },
            mistakes: [
              "Writing `Print(\"Hello, World!\")` with a capital letter. Python is case-sensitive — the function name must be lowercase `print`.",
              "Forgetting the quotes, for example `print(Hello, World!)`. Python will think `Hello` is a variable name and raise an error.",
              "Using `println` or `echo` as in other languages. In Python, the print function is `print()`.",
            ],
            exercise: {
              title: "Exercise: your Hello World program",
              description:
                "Create a file `hello.py`, write `print(\"Hello, World!\")`, then run it with the command `python hello.py`. After that, change the text to `print(\"Halo, dunia!\")` and run it again. Note both outputs.",
              hint: "The output is the text inside the quotes, without the quotes. Compare the source code with the output to see how they relate.",
            },
          },
          {
            objective:
              "Understand what variables are, how to store values in them, and the basic rules for naming variables in Python.",
            explanation: [
              "A variable is a storage \"box\" in the computer's memory that you can name and use to hold data. Think of it as a label attached to a value — that value could be a number, text, or another data type.",
              "In Python, creating a variable is straightforward: write the variable name, an equals sign (`=`), and then the value you want to store. `name = \"Rifav\"` stores the string `\"Rifav\"` in the variable `name`, and `age = 20` stores the integer `20` in the variable `age`. The `=` sign here is an assignment — it assigns a value to a variable.",
              "Once stored, you can use the variable name anywhere in your program; Python replaces it with the actual value. When you print a variable with `print()`, its value is shown — for example `print(name)` displays `Rifav`, not the word `name`.",
              "Variable names follow Python's naming rules: they must start with a letter or underscore, cannot start with a digit, and may only contain letters, digits, and underscores. Python is also case-sensitive: `Name` and `name` are two different variables.",
            ],
            example: {
              title: "Example: simple variables",
              code: 'name = "Rifav"\nage = 20\n\nprint(name)\nprint(age)\n\ncourse = "Python"\nprogress = 25\n\nprint(course)\nprint(progress)',
              explanation:
                "The first part creates the variables `name` (string) and `age` (integer), then prints them. `name` is a variable name, `\"Rifav\"` is a string, `20` is an integer, and `=` is the assignment. The second part adds the `course` and `progress` variables. Program output: `Rifav`, `20`, `Python`, `25` — one value per line.",
            },
            mistakes: [
              "Using a variable name that starts with a digit, for example `1student = \"Rifav\"`. Variable names must start with a letter or underscore.",
              "Using a hyphen as if it were an underscore, for example `student-name = \"Rifav\"`. Python treats `-` as the subtraction operator, not part of a name. Use an underscore: `student_name`.",
              "Mixing up letter case: `Name = \"Rifav\"` followed by `name = \"Budi\"` creates two different variables. Python is case-sensitive.",
              "Forgetting that variables have types (string, integer, etc.) even though Python does not require explicit declarations.",
            ],
            exercise: {
              title: "Exercise: your personal data program",
              description:
                "Create a file `data_diri.py`, then store three values in variables: `name` with your name, `age` with your age, and `language` with the programming language you are learning (for example \"Python\"). Print all three with `print()`, run the file, and observe the output. Then replace the values with your own data and run it again.",
              hint: "Strings are wrapped in quotes (`\"...\"`), while integers are written directly without quotes. Example output: `Rifav`, `20`, `Python` — one value per line.",
            },
          },
          {
            objective:
              "Learn Python's basic data types: string, integer, float, and boolean, and how to check a type with `type()`.",
            explanation: [
              "Every value in Python has a data type. The type determines what kind of value it is and which operations you can perform on it. The four most common basic types are: `string` (text), `integer` (whole number), `float` (decimal number), and `boolean` (`True`/`False`).",
              "Strings are written between quotes (`\"Rifav\"`), while numbers are not. `20` is an integer, `170.5` is a float. The difference: floats have a decimal part, integers do not.",
              "Booleans have only two values: `True` and `False` — capitalized. Python is case-sensitive: `true` raises an error, and `\"True\"` (with quotes) is a string, not a boolean.",
              "To check a value's type, use the `type()` function: `type(20)` returns `<class 'int'>`, while `type(\"20\")` returns `<class 'str'>`.",
            ],
            example: {
              title: "Example: basic data types",
              code: 'name = "Rifav"\nage = 20\nheight = 170.5\nis_student = True\n\nprint(name)\nprint(age)\nprint(height)\nprint(is_student)',
              explanation:
                "`name` holds a string, `age` an integer, `height` a float, and `is_student` a boolean. When printed, each variable shows its value. Notice that the boolean `True` prints without quotes, and `170.5` keeps its decimal part.",
            },
            mistakes: [
              "Writing numbers with quotes: `\"20\"` is a string, not an integer. `\"20\" + \"5\"` gives `\"205\"` (text concatenation), while `20 + 5` gives `25`.",
              "Thinking `95` and `95.0` are the same. They have different types: `95` is an integer, `95.0` is a float — even though their values are equal.",
              "Writing `\"True\"` with quotes — that is a string, not a boolean. Booleans are written without quotes: `True`.",
              "Writing `true` in lowercase. Python is case-sensitive: the correct forms are `True` and `False`.",
            ],
            exercise: {
              title: "Exercise: checking data types",
              description:
                "Create a file `data_tipe.py`. Store four values in variables: `name` (string), `age` (integer), `height` (float), and `student` (boolean). Print each variable with `print()`, then also print its `type()`, for example `print(type(name))`. Run the file and observe the output.",
              hint: "`type()` returns values like `<class 'str'>` or `<class 'int'>`. Compare `print(type(age))` with `print(type(\"age\"))` to see the difference between an integer and a string.",
            },
          },

          {
            objective:
              "Understand how to make decisions in a program using `if`, `elif`, and `else`.",
            explanation: [
              "Programs do not always run the same lines every time. With conditionals, a program can make decisions based on conditions: if a statement is true, run one block; otherwise, run another.",
              "The basic structure is `if condition:` followed by an indented block of code. Python uses indentation to determine which lines belong to a block. For example: `if age >= 17: print(\"Allowed\")`.",
              "Use `elif` (else if) for additional conditions, and `else` for everything else. Only one block runs: `if` is checked first, then `elif` in order, and `else` if nothing matches.",
              "Common comparison operators: `==` (equal), `!=` (not equal), `>`, `<`, `>=`, `<=`. Be careful: `==` compares values, while `=` assigns a value to a variable.",
            ],
            example: {
              title: "Example: a simple conditional",
              code: 'score = 85\n\nif score >= 75:\n    print("Pass")\nelse:\n    print("Not passed")',
              explanation:
                "The program checks whether `score` is greater than or equal to 75. Since 85 >= 75 is true, the `if` block runs and the program prints `Pass`. If the score were below 75, the `else` block would run. Note the colon (`:`) after the condition and the indentation of the `print` lines.",
            },
            mistakes: [
              "Forgetting the colon after the condition: `if score > 5` without `:` raises a SyntaxError.",
              "Using `=` for comparison: `if score = 85` is wrong. `=` is for assignment; `==` is for comparison.",
              "Forgetting to indent the block below `if` — Python requires indentation and will error without it.",
              "Writing `else if` instead of `elif`. Python uses `elif` for additional conditions.",
            ],
            exercise: {
              title: "Exercise: a simple grading program",
              description:
                "Create a file `kondisi.py`. Store your exam score in a variable `score`, then write a conditional: if `score >= 75` print `\"Pass\"`, if `score >= 60` print `\"Needs improvement\"`, and otherwise print `\"Not passed\"`. Change the value and run it again to see different results.",
              hint: "The order of `elif` matters: check the strictest condition first. Try swapping `>= 60` with `>= 75` to see the difference.",
            },
          },

          {
            objective:
              "Understand how to repeat code with `for` and `while`, and when to use each.",
            explanation: [
              "A loop lets a program run the same code many times without writing it over and over. Python has two main kinds: `for` and `while`.",
              "`for` is used to repeat a fixed number of times or to go through a collection. `for i in range(3):` runs the block three times, with `i` equal to 0, 1, then 2.",
              "`while` runs as long as a condition is true. `while count < 3:` keeps running the block while `count` is still less than 3. Make sure the condition eventually becomes false — otherwise the loop runs forever (infinite loop).",
              "The `range(n)` function produces the sequence 0 to n-1. `range(start, end)` produces the sequence from `start` to `end - 1`.",
            ],
            example: {
              title: "Example: for and while loops",
              code: 'for i in range(3):\n    print("Iteration", i)\n\ncount = 0\nwhile count < 3:\n    print("Count:", count)\n    count = count + 1',
              explanation:
                "The `for` part prints `Iteration 0`, `Iteration 1`, `Iteration 2`. The `while` part does something similar: while `count` is less than 3, print its value then add 1. Notice that we change `count` inside the loop — without that line, the loop would never stop.",
            },
            mistakes: [
              "Forgetting the colon and the indentation under `for` or `while` — both are required.",
              "Creating an infinite loop: `while count < 3:` without changing `count` inside the block runs forever.",
              "Thinking `range(3)` produces 1, 2, 3. It actually produces 0, 1, 2 — it starts at zero.",
              "Writing `for i = 0` as in other languages. In Python, use `for i in range(...)`.",
            ],
            exercise: {
              title: "Exercise: your loops",
              description:
                "Create a file `perulangan.py`. Use `for` to print the numbers 1 to 5 (hint: `range(1, 6)`). Then use `while` to count down from 5 to 1, decreasing the counter variable by one each iteration.",
              hint: "`range(1, 6)` produces 1, 2, 3, 4, 5 — the end value is not included. For `while`, remember to change the counter inside the block so the loop ends.",
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
        displayName: {
          label: "Display Name",
          placeholder: "Your name",
        },
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
          displayNameRequired: "Display name is required.",
          displayNameMinLength: "Display name must be at least 2 characters.",
          displayNameMaxLength: "Display name must be at most 50 characters.",
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
      welcome: {
        greeting: "Hi, {name}.",
        continuePrompt: "Pick up where you left off.",
        studentLabel: "Student",
      },
      profileCard: {
        title: "Profile",
        role: "Role",
        memberSince: "Member since",
        accountStatus: "Account Status",
        active: "Active",
        editLabel: "Edit Profile",
      },
      continueLearning: {
        title: "Continue Learning",
        description: "Return to your latest Stage 0 lesson.",
        currentLesson: "Current lesson",
        progress: "Progress",
        startLabel: "Start Learning",
        continueLabel: "Continue Learning",
        noProgressTitle: "No progress yet",
        noProgressDescription: "Start your first lesson to begin Stage 0.",
      },
      progressOverview: {
        title: "Progress Overview",
        description: "Real progress data from your account.",
        lessonsCompleted: "Lessons completed",
        currentStage: "Current stage",
        overallLabel: "Overall progress",
        lastActivity: "Last activity",
        never: "None yet",
      },
      pathSnapshot: {
        title: "Your Learning Path",
        description: "Status of the five stages toward your career.",
        current: "Current",
        available: "Available",
        locked: "Locked",
        viewPath: "View Learning Path",
      },
      recentActivity: {
        title: "Recent Activity",
        description: "Lessons you have recently completed.",
        emptyTitle: "No activity yet",
        emptyDescription: "Complete your first lesson — activity will appear here.",
      },
      assessmentSummary: {
        title: "Demo Assessments",
        description: "Test your understanding with per-stage demo quizzes.",
        completed: "Assessments completed",
        demoWarning: "All assessments are practice demos — not official certification exams.",
        viewLabel: "View Assessments",
      },
      settingsSummary: {
        title: "Account Settings",
        description: "Manage your profile, security, and preferences.",
        manageLabel: "Manage Account",
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
        emailValue: "hello@learncode.example",
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
    settings: {
      prototypeNotice: {
        title: "Prototype v0.0.1",
        description:
          "This settings page is a prototype. Some features (profile editing, password change) are not yet supported by the backend and are marked honestly.",
      },
      hero: {
        eyebrow: "Account",
        title: "Account Settings",
        description:
          "Manage your profile information, session security, and language preferences.",
      },
      tabs: {
        profile: "Profile",
        security: "Security",
        preferences: "Preferences",
      },
      profile: {
        title: "Profile",
        description:
          "Basic account information. Email is read-only in this prototype.",
        displayName: {
          label: "Display Name",
          note: "Display name editing is not yet supported by this prototype backend.",
        },
        email: {
          label: "Email",
          note: "Changing your email requires backend verification and is not available in this prototype yet.",
        },
        notAvailable: "Not available in this prototype",
        saveLabel: "Save Changes",
        saving: "Saving...",
        saveSuccess: "Display name updated successfully.",
        saveError: "Failed to save. Please try again.",
        displayNameRequired: "Display name is required.",
        displayNameMinLength: "Display name must be at least 2 characters.",
        displayNameMaxLength: "Display name must be at most 50 characters.",
      },
      security: {
        title: "Security",
        description:
          "Your account security status. Data is shown only when actually available.",
        role: "Role",
        memberSince: "Member since",
        sessionStatus: "Session Status",
        sessionActive: "Active",
      },
      password: {
        title: "Change Password",
        description: "Change your account password securely.",
        currentLabel: "Current Password",
        newLabel: "New Password",
        confirmLabel: "Confirm New Password",
        notAvailable:
          "Password change is not supported by this prototype backend yet — it will be available in a future release.",
      },
      preferences: {
        title: "Preferences",
        description: "Language preference for your interface.",
        language: "Language",
        idLabel: "Indonesian",
        enLabel: "English",
      },
    },
    authGuard: {
      checking: "Checking session...",
      networkErrorTitle: "Unable to verify session",
      networkErrorDescription:
        "We could not verify whether your session is still valid because of a network issue. Your session may still be active — try reloading or log in again.",
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
