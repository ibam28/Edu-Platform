"""Seed demo assessments for Stage 1-4 (M08).

Stage 1 has 10 questions; Stage 2-4 have 5 questions each.
All assessments are labeled as demo content, not certification examinations.
"""

from typing import Any

from alembic import op
import sqlalchemy as sa

revision: str = "a9f4c2d1e8b7"
down_revision: str = "0c9577afa9b1"
branch_labels = None
depends_on = None

DEMO_LABEL = "Demo Assessment - Not a Certification Examination"

STAGE_1_QUESTIONS: list[dict[str, Any]] = [
    {
        "position": 1,
        "question_id": "Apa itu program?",
        "question_en": "What is a program?",
        "option_1_id": "Sekumpulan instruksi yang dijalankan komputer untuk menyelesaikan tugas.",
        "option_1_en": "A set of instructions that a computer follows to perform a task.",
        "option_2_id": "Komponen fisik komputer.",
        "option_2_en": "A physical component of a computer.",
        "option_3_id": "Jenis monitor komputer.",
        "option_3_en": "A type of computer monitor.",
        "option_4_id": "Berkas untuk menyimpan foto.",
        "option_4_en": "A file for storing photos.",
        "correct_option": 1,
    },
    {
        "position": 2,
        "question_id": "Pernyataan mana yang paling tepat tentang Python?",
        "question_en": "Which statement best describes Python?",
        "option_1_id": "Salah satu perangkat keras komputer.",
        "option_1_en": "A type of computer hardware.",
        "option_2_id": "Editor teks untuk dokumen.",
        "option_2_en": "A text editor for documents.",
        "option_3_id": "Bahasa pemrograman tingkat tinggi yang ramah bagi pemula.",
        "option_3_en": "A beginner-friendly, high-level programming language.",
        "option_4_id": "Sistem operasi.",
        "option_4_en": "An operating system.",
        "correct_option": 3,
    },
    {
        "position": 3,
        "question_id": "Perintah mana yang memeriksa versi Python yang terpasang?",
        "question_en": "Which command checks the installed Python version?",
        "option_1_id": "python run",
        "option_1_en": "python run",
        "option_2_id": "python --version",
        "option_2_en": "python --version",
        "option_3_id": "python check",
        "option_3_en": "python check",
        "option_4_id": "python start",
        "option_4_en": "python start",
        "correct_option": 2,
    },
    {
        "position": 4,
        "question_id": "Apa yang dicetak oleh kode berikut? print(\"Hello, World!\")",
        "question_en": "What does this code print? print(\"Hello, World!\")",
        "option_1_id": "World!",
        "option_1_en": "World!",
        "option_2_id": "Hello",
        "option_2_en": "Hello",
        "option_3_id": "Tidak ada",
        "option_3_en": "Nothing",
        "option_4_id": "Hello, World!",
        "option_4_en": "Hello, World!",
        "correct_option": 4,
    },
    {
        "position": 5,
        "question_id": "Manakah yang benar dalam membuat variabel?",
        "question_en": "Which option correctly creates a variable?",
        "option_1_id": "name = \"Budi\"",
        "option_1_en": "name = \"Budi\"",
        "option_2_id": "name == \"Budi\"",
        "option_2_en": "name == \"Budi\"",
        "option_3_id": "\"Budi\" = name",
        "option_3_en": "\"Budi\" = name",
        "option_4_id": "print name = \"Budi\"",
        "option_4_en": "print name = \"Budi\"",
        "correct_option": 1,
    },
    {
        "position": 6,
        "question_id": "Manakah yang merupakan string (teks)?",
        "question_en": "Which of the following is a string?",
        "option_1_id": "42",
        "option_1_en": "42",
        "option_2_id": "3.14",
        "option_2_en": "3.14",
        "option_3_id": "\"Python\"",
        "option_3_en": "\"Python\"",
        "option_4_id": "True",
        "option_4_en": "True",
        "correct_option": 3,
    },
    {
        "position": 7,
        "question_id": "Tipe data apa yang digunakan untuk bilangan bulat?",
        "question_en": "Which data type is used for whole numbers?",
        "option_1_id": "str",
        "option_1_en": "str",
        "option_2_id": "int",
        "option_2_en": "int",
        "option_3_id": "bool",
        "option_3_en": "bool",
        "option_4_id": "dict",
        "option_4_en": "dict",
        "correct_option": 2,
    },
    {
        "position": 8,
        "question_id": "Kata kunci apa yang memulai kondisi di Python?",
        "question_en": "Which keyword starts a condition in Python?",
        "option_1_id": "for",
        "option_1_en": "for",
        "option_2_id": "while",
        "option_2_en": "while",
        "option_3_id": "def",
        "option_3_en": "def",
        "option_4_id": "if",
        "option_4_en": "if",
        "correct_option": 4,
    },
    {
        "position": 9,
        "question_id": "Perulangan mana yang berjalan selama kondisi bernilai benar?",
        "question_en": "Which loop repeats while a condition is true?",
        "option_1_id": "while",
        "option_1_en": "while",
        "option_2_id": "if",
        "option_2_en": "if",
        "option_3_id": "import",
        "option_3_en": "import",
        "option_4_id": "print",
        "option_4_en": "print",
        "correct_option": 1,
    },
    {
        "position": 10,
        "question_id": "Ekstensi file apa yang digunakan untuk file sumber Python?",
        "question_en": "Which file extension is used for Python source files?",
        "option_1_id": ".txt",
        "option_1_en": ".txt",
        "option_2_id": ".py",
        "option_2_en": ".py",
        "option_3_id": ".doc",
        "option_3_en": ".doc",
        "option_4_id": ".exe",
        "option_4_en": ".exe",
        "correct_option": 2,
    },
]

STAGE_2_QUESTIONS: list[dict[str, Any]] = [
    {
        "position": 1,
        "question_id": "Apa tujuan latihan?",
        "question_en": "What is the purpose of practice exercises?",
        "option_1_id": "Menggantikan membaca pelajaran.",
        "option_1_en": "To replace reading the lessons.",
        "option_2_id": "Memasang perangkat lunak baru.",
        "option_2_en": "To install new software.",
        "option_3_id": "Memperkuat keterampilan dengan menerapkan apa yang Anda pelajari.",
        "option_3_en": "To strengthen skills by applying what you learned.",
        "option_4_id": "Menerbitkan sertifikat.",
        "option_4_en": "To issue certificates.",
        "correct_option": 3,
    },
    {
        "position": 2,
        "question_id": "Pendekatan terbaik saat memulai proyek kecil?",
        "question_en": "What is the best approach when starting a small project?",
        "option_1_id": "Memecah masalah menjadi langkah-langkah kecil.",
        "option_1_en": "Break the problem into small steps.",
        "option_2_id": "Menulis semua kode sekaligus tanpa perencanaan.",
        "option_2_en": "Write all the code at once without planning.",
        "option_3_id": "Menghindari pengujian kode.",
        "option_3_en": "Avoid testing your code.",
        "option_4_id": "Menyalin kode tanpa memahaminya.",
        "option_4_en": "Copy code without understanding it.",
        "correct_option": 1,
    },
    {
        "position": 3,
        "question_id": "Manfaat utama menguji kode Anda?",
        "question_en": "What is the main benefit of testing your code?",
        "option_1_id": "Membuat program lebih panjang.",
        "option_1_en": "Making the program longer.",
        "option_2_id": "Menemukan dan memperbaiki kesalahan lebih awal.",
        "option_2_en": "Finding and fixing mistakes early.",
        "option_3_id": "Menghapus semua komentar.",
        "option_3_en": "Removing all comments.",
        "option_4_id": "Mengganti nama semua variabel.",
        "option_4_en": "Renaming every variable.",
        "correct_option": 2,
    },
    {
        "position": 4,
        "question_id": "Fungsi di Python adalah...",
        "question_en": "A function in Python is...",
        "option_1_id": "Jenis variabel.",
        "option_1_en": "A type of variable.",
        "option_2_id": "Tipe data.",
        "option_2_en": "A data type.",
        "option_3_id": "Pesan kesalahan.",
        "option_3_en": "An error message.",
        "option_4_id": "Blok kode yang dapat digunakan kembali.",
        "option_4_en": "A reusable block of code.",
        "correct_option": 4,
    },
    {
        "position": 5,
        "question_id": "Apa itu proyek dalam jalur belajar ini?",
        "question_en": "What is a project in this learning path?",
        "option_1_id": "Sertifikat kelulusan.",
        "option_1_en": "A certificate of completion.",
        "option_2_id": "Aplikasi nyata kecil yang dibangun dengan keterampilan Anda.",
        "option_2_en": "A small real-world application built with your skills.",
        "option_3_id": "Ujian pilihan ganda.",
        "option_3_en": "A multiple-choice exam.",
        "option_4_id": "Tabel basis data.",
        "option_4_en": "A database table.",
        "correct_option": 2,
    },
]

STAGE_3_QUESTIONS: list[dict[str, Any]] = [
    {
        "position": 1,
        "question_id": "Dalam prototipe ini, demo penilaian adalah...",
        "question_en": "In this prototype, demo assessments are...",
        "option_1_id": "Ujian resmi pemerintah.",
        "option_1_en": "Official government exams.",
        "option_2_id": "Ujian akhir berbayar.",
        "option_2_en": "Paid final exams.",
        "option_3_id": "Layanan penerbitan sertifikat.",
        "option_3_en": "Certificate issuance services.",
        "option_4_id": "Alat latihan, bukan ujian sertifikasi resmi.",
        "option_4_en": "Practice tools, not official certification exams.",
        "correct_option": 4,
    },
    {
        "position": 2,
        "question_id": "Apa tujuan jalur sertifikasi?",
        "question_en": "What is the purpose of a certification pathway?",
        "option_1_id": "Menggantikan seluruh proses belajar.",
        "option_1_en": "Replacing the learning process entirely.",
        "option_2_id": "Memverifikasi keterampilan secara terstruktur.",
        "option_2_en": "Verifying skills in a structured way.",
        "option_3_id": "Menjamin pekerjaan.",
        "option_3_en": "Guaranteeing employment.",
        "option_4_id": "Mengenakan biaya kepada pembelajar secara otomatis.",
        "option_4_en": "Charging learners automatically.",
        "correct_option": 2,
    },
    {
        "position": 3,
        "question_id": "Pernyataan mana yang benar tentang prototipe?",
        "question_en": "Which statement is true about the prototype?",
        "option_1_id": "Sertifikat tidak diterbitkan di prototipe.",
        "option_1_en": "Certificates are not issued in the prototype.",
        "option_2_id": "Sertifikat diterbitkan secara otomatis.",
        "option_2_en": "Certificates are issued automatically.",
        "option_3_id": "Hasil demo adalah hasil kompetensi resmi.",
        "option_3_en": "Demo results are official competency results.",
        "option_4_id": "Sertifikasi telah diimplementasikan sepenuhnya.",
        "option_4_en": "Certification is fully implemented.",
        "correct_option": 1,
    },
    {
        "position": 4,
        "question_id": "Apa yang harus dimiliki penilaian yang adil?",
        "question_en": "What should a fair assessment include?",
        "option_1_id": "Pertanyaan tersembunyi.",
        "option_1_en": "Hidden questions.",
        "option_2_id": "Penilaian acak.",
        "option_2_en": "Random scoring.",
        "option_3_id": "Pertanyaan yang jelas dan penilaian yang konsisten.",
        "option_3_en": "Clear questions and consistent scoring.",
        "option_4_id": "Tanpa umpan balik.",
        "option_4_en": "No feedback.",
        "correct_option": 3,
    },
    {
        "position": 5,
        "question_id": "Memverifikasi sertifikat berarti...",
        "question_en": "Verifying a certificate means...",
        "option_1_id": "Sertifikat dicetak.",
        "option_1_en": "The certificate is printed.",
        "option_2_id": "Pemberi kerja dapat memeriksa keasliannya.",
        "option_2_en": "Employers can check its authenticity.",
        "option_3_id": "Sertifikat tidak pernah kedaluwarsa.",
        "option_3_en": "The certificate never expires.",
        "option_4_id": "Hanya pembelajar yang melihatnya.",
        "option_4_en": "Only the learner sees it.",
        "correct_option": 2,
    },
]

STAGE_4_QUESTIONS: list[dict[str, Any]] = [
    {
        "position": 1,
        "question_id": "Apa itu portofolio dalam konteks ini?",
        "question_en": "What is a portfolio in this context?",
        "option_1_id": "Jenis sertifikat.",
        "option_1_en": "A type of certificate.",
        "option_2_id": "Kumpulan hasil kerja dan proyek Anda.",
        "option_2_en": "A collection of your work and projects.",
        "option_3_id": "Bahasa pemrograman.",
        "option_3_en": "A programming language.",
        "option_4_id": "Agen rekrutmen.",
        "option_4_en": "A recruitment agency.",
        "correct_option": 2,
    },
    {
        "position": 2,
        "question_id": "Bagaimana talenta terverifikasi dapat ditampilkan kepada pemberi kerja?",
        "question_en": "How can verified talent be presented to employers?",
        "option_1_id": "Dengan membagikan kata sandi.",
        "option_1_en": "By sharing passwords.",
        "option_2_id": "Melalui klaim tanpa verifikasi.",
        "option_2_en": "Through unverified claims.",
        "option_3_id": "Melalui profil talenta dengan keterampilan terverifikasi.",
        "option_3_en": "Through a talent profile with verified skills.",
        "option_4_id": "Dengan menyembunyikan semua hasil.",
        "option_4_en": "By hiding all results.",
        "correct_option": 3,
    },
    {
        "position": 3,
        "question_id": "Apa konsep pasar talenta?",
        "question_en": "What is the talent marketplace concept?",
        "option_1_id": "Menjual sertifikat.",
        "option_1_en": "Selling certificates.",
        "option_2_id": "Layanan pengganti pekerjaan.",
        "option_2_en": "A job replacement service.",
        "option_3_id": "Toko daring.",
        "option_3_en": "An online store.",
        "option_4_id": "Menghubungkan talenta terverifikasi dengan peluang karier.",
        "option_4_en": "Connecting verified talent with career opportunities.",
        "correct_option": 4,
    },
    {
        "position": 4,
        "question_id": "Cara terbaik untuk berkembang secara profesional?",
        "question_en": "Which is the best way to grow professionally?",
        "option_1_id": "Terus belajar dan membangun proyek.",
        "option_1_en": "Keep learning and building projects.",
        "option_2_id": "Berhenti belajar setelah satu kursus.",
        "option_2_en": "Stop learning after one course.",
        "option_3_id": "Menghindari umpan balik.",
        "option_3_en": "Avoid feedback.",
        "option_4_id": "Mengabaikan komunitas.",
        "option_4_en": "Ignore the community.",
        "correct_option": 1,
    },
    {
        "position": 5,
        "question_id": "Dalam prototipe, fitur rekrutmen adalah...",
        "question_en": "In the prototype, recruitment features are...",
        "option_1_id": "Sepenuhnya beroperasi.",
        "option_1_en": "Fully operational.",
        "option_2_id": "Diperlukan untuk Stage 0.",
        "option_2_en": "Required for Stage 0.",
        "option_3_id": "Rencana masa depan, belum diimplementasikan.",
        "option_3_en": "Future plans, not yet implemented.",
        "option_4_id": "Bagian dari penilaian demo.",
        "option_4_en": "Part of demo scoring.",
        "correct_option": 3,
    },
]

ALL_STAGES: list[tuple[str, list[dict[str, Any]]]] = [
    ("stage_1", STAGE_1_QUESTIONS),
    ("stage_2", STAGE_2_QUESTIONS),
    ("stage_3", STAGE_3_QUESTIONS),
    ("stage_4", STAGE_4_QUESTIONS),
]


def upgrade() -> None:
    conn = op.get_bind()
    assessments = sa.table(
        "demo_assessments",
        sa.column("id", sa.Integer),
        sa.column("stage", sa.String),
        sa.column("is_demo", sa.Boolean),
        sa.column("demo_label", sa.String),
    )
    questions = sa.table(
        "demo_assessment_questions",
        sa.column("assessment_id", sa.Integer),
        sa.column("position", sa.Integer),
        sa.column("question_id", sa.Text),
        sa.column("question_en", sa.Text),
        sa.column("option_1_id", sa.Text),
        sa.column("option_1_en", sa.Text),
        sa.column("option_2_id", sa.Text),
        sa.column("option_2_en", sa.Text),
        sa.column("option_3_id", sa.Text),
        sa.column("option_3_en", sa.Text),
        sa.column("option_4_id", sa.Text),
        sa.column("option_4_en", sa.Text),
        sa.column("correct_option", sa.Integer),
    )

    conn.execute(
        sa.insert(assessments).values(
            [
                {"stage": stage, "is_demo": True, "demo_label": DEMO_LABEL}
                for stage, _ in ALL_STAGES
            ]
        )
    )
    rows = conn.execute(sa.select(assessments.c.id, assessments.c.stage)).fetchall()
    stage_to_id = {row.stage: row.id for row in rows}

    for stage, question_list in ALL_STAGES:
        conn.execute(
            sa.insert(questions).values(
                [
                    {**question, "assessment_id": stage_to_id[stage]}
                    for question in question_list
                ]
            )
        )


def downgrade() -> None:
    conn = op.get_bind()
    conn.execute(sa.text("DELETE FROM demo_assessment_questions"))
    conn.execute(sa.text("DELETE FROM demo_assessments"))
