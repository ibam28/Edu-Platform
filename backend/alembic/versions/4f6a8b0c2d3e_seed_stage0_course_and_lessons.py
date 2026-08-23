"""seed stage 0 course and lessons

Revision ID: 4f6a8b0c2d3e
Revises: 3e5f7a9b1c2d
Create Date: 2026-08-22 13:20:00.000000

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


revision: str = '4f6a8b0c2d3e'
down_revision: Union[str, None] = '3e5f7a9b1c2d'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


COURSE = {
    "slug": "python-stage-0",
    "stage": "stage_0",
    "title_id": "Python Stage 0 — Dasar Pemrograman",
    "title_en": "Python Stage 0 — Programming Fundamentals",
    "description_id": (
        "Mulai dari nol: pelajari apa itu pemrograman, kenali Python, "
        "dan tulis program pertama Anda."
    ),
    "description_en": (
        "Start from zero: learn what programming is, get to know Python, "
        "and write your first program."
    ),
}

LESSONS = [
    {
        "lesson_id": "01",
        "optionality": "core",
        "title_id": "Apa itu Pemrograman?",
        "title_en": "What is Programming?",
        "objective_id": "Pahami apa itu pemrograman dan bagaimana komputer menjalankan instruksi.",
        "objective_en": "Understand what programming is and how computers follow instructions.",
        "explanation_id": "\n\n".join([
            "Pemrograman adalah cara kita memberikan instruksi kepada komputer agar komputer melakukan tugas tertentu. Sama seperti resep masakan yang berisi langkah-langkah, sebuah program berisi langkah-langkah yang diikuti komputer satu per satu.",
            "Komputer tidak berpikir seperti manusia. Ia hanya menjalankan instruksi yang jelas dan tidak ambigu. Karena itu, kita menulis instruksi dalam bahasa pemrograman — bahasa yang dirancang agar mudah dipahami manusia sekaligus dapat dijalankan komputer.",
            "Hasilnya, dengan belajar memprogram Anda bisa menyuruh komputer menyelesaikan masalah nyata, seperti mengolah data, membuat aplikasi, atau mengotomatiskan tugas yang berulang.",
        ]),
        "explanation_en": "\n\n".join([
            "Programming is how we give instructions to a computer so it can perform a specific task. Just like a recipe contains steps, a program contains steps that the computer follows one by one.",
            "A computer does not think like a human. It only executes instructions that are clear and unambiguous. That is why we write instructions in a programming language — a language designed to be easy for humans to read and for computers to run.",
            "The payoff: by learning to program, you can instruct a computer to solve real problems, such as processing data, building apps, or automating repetitive tasks.",
        ]),
        "example_title_id": "Contoh analogi: membuat teh",
        "example_title_en": "Example analogy: making tea",
        "example_code": "1. Didihkan air\n2. Masukkan kantong teh ke cangkir\n3. Tuang air panas ke cangkir\n4. Tunggu 3 menit\n5. Angkat kantong teh\n6. Nikmati teh Anda",
        "example_explanation_id": "Program bekerja seperti daftar langkah ini: komputer membaca instruksi dari atas ke bawah dan mengerjakannya sesuai urutan.",
        "example_explanation_en": "A program works like this list of steps: the computer reads the instructions from top to bottom and carries them out in order.",
        "mistakes_id": "\n".join([
            "Membayangkan komputer bisa 'mengerti maksud kita'. Faktanya, komputer hanya menjalankan instruksi persis seperti yang ditulis.",
            "Menulis instruksi yang terlalu samar, misalnya 'buatkan aplikasi yang bagus', tanpa langkah yang jelas.",
            "Menyerah terlalu cepat karena mengira pemrograman hanya untuk orang yang pandai matematika. Pemrograman adalah keterampilan yang bisa dipelajari siapa saja.",
        ]),
        "mistakes_en": "\n".join([
            "Imagining the computer can 'understand what we mean'. In reality, a computer only runs instructions exactly as written.",
            "Writing instructions that are too vague, such as 'build a nice app', without clear steps.",
            "Giving up too early because you think programming is only for people who are good at math. Programming is a skill anyone can learn.",
        ]),
        "exercise_title_id": "Latihan: instruksi membuat sandwich",
        "exercise_title_en": "Exercise: instructions to make a sandwich",
        "exercise_description_id": "Tuliskan langkah-langkah membuat sandwich dalam 5–7 instruksi singkat, dalam urutan yang benar. Pastikan setiap langkah cukup jelas untuk diikuti orang yang belum pernah membuat sandwich.",
        "exercise_description_en": "Write the steps to make a sandwich in 5–7 short instructions, in the correct order. Make sure each step is clear enough for someone who has never made a sandwich.",
        "exercise_hint_id": "Bayangkan pembaca tidak tahu apa pun. Langkah seperti 'letakkan selembar roti' lebih baik daripada 'siapkan bahan makanan'.",
        "exercise_hint_en": "Imagine the reader knows nothing. A step like 'place a slice of bread' is better than 'prepare ingredients'.",
    },
    {
        "lesson_id": "02",
        "optionality": "core",
        "title_id": "Apa itu Python?",
        "title_en": "What is Python?",
        "objective_id": "Kenali Python, mengapa ia populer, dan apa saja yang bisa Anda bangun dengannya.",
        "objective_en": "Get to know Python, why it is popular, and what you can build with it.",
        "explanation_id": "\n\n".join([
            "Python adalah bahasa pemrograman tingkat tinggi yang populer di seluruh dunia. Python dirancang agar mudah dibaca, sehingga cocok untuk pemula sekaligus untuk proyek profesional.",
            "Python digunakan di berbagai bidang: pengembangan web, analisis data, kecerdasan buatan, dan otomasi. Karena peminatnya besar, dokumentasi dan komunitasnya pun sangat luas.",
            "Kelebihan utamanya untuk pemula: sintaksnya mirip bahasa Inggris, tidak terlalu 'berisik', dan hasilnya cepat terlihat.",
        ]),
        "explanation_en": "\n\n".join([
            "Python is a high-level programming language popular around the world. Python is designed to be easy to read, so it suits beginners and professional projects alike.",
            "Python is used in many fields: web development, data analysis, artificial intelligence, and automation. Because of its large following, its documentation and community are very extensive.",
            "Its main advantage for beginners: syntax similar to English, not too 'noisy', and results are visible quickly.",
        ]),
        "example_title_id": "Contoh: sekilas sintaks Python",
        "example_title_en": "Example: a glimpse of Python syntax",
        "example_code": 'name = "Alex"\nprint("Hello, " + name)',
        "example_explanation_id": "Di sini kita menyimpan teks ke dalam variabel `name`, lalu menampilkannya dengan `print`. Anda akan mempelajari variabel dan `print` pada pelajaran berikutnya.",
        "example_explanation_en": "Here we store text in the `name` variable, then display it with `print`. You will learn about variables and `print` in the next lesson.",
        "mistakes_id": "\n".join([
            "Mengira Python hanya bisa digunakan di satu bidang. Faktanya, Python dipakai di banyak industri.",
            "Membandingkan diri dengan programmer lain yang sudah mahir; fokuslah pada kemajuan Anda sendiri.",
            "Mengabaikan dokumentasi resmi dan komunitas — keduanya adalah sumber belajar terbaik.",
        ]),
        "mistakes_en": "\n".join([
            "Thinking Python is only useful in one field. In fact, Python is used across many industries.",
            "Comparing yourself to expert programmers; focus on your own progress.",
            "Ignoring the official documentation and community — both are the best learning resources.",
        ]),
        "exercise_title_id": "Latihan: jelaskan Python",
        "exercise_title_en": "Exercise: explain Python",
        "exercise_description_id": "Tuliskan tiga kalimat tentang Python dengan kata-kata Anda sendiri: apa itu Python, mengapa populer, dan satu hal yang ingin Anda buat dengannya.",
        "exercise_description_en": "Write three sentences about Python in your own words: what Python is, why it is popular, and one thing you want to build with it.",
        "exercise_hint_id": "Jika bingung, baca kembali bagian penjelasan dan contoh di atas.",
        "exercise_hint_en": "If stuck, re-read the explanation and example sections above.",
    },
    {
        "lesson_id": "03",
        "optionality": "core",
        "title_id": "Memasang & Menjalankan Python",
        "title_en": "Installing & Running Python",
        "objective_id": "Pasang Python di komputer Anda dan jalankan program Python pertama dari terminal.",
        "objective_en": "Install Python on your computer and run your first Python program from the terminal.",
        "explanation_id": "\n\n".join([
            "Sebelum menulis program, kita perlu memasang Python. Kunjungi situs resmi python.org, unduh versi terbaru untuk sistem operasi Anda, lalu ikuti petunjuk pemasangannya. Di Windows, pastikan Anda mencentang opsi 'Add Python to PATH'.",
            "Setelah terpasang, buka terminal (Command Prompt di Windows, Terminal di macOS/Linux) dan ketik `python --version`. Jika muncul nomor versi, Python siap digunakan.",
            "Untuk menjalankan program, simpan kode Anda dalam file berekstensi `.py`, lalu jalankan dengan perintah `python nama-file.py`.",
        ]),
        "explanation_en": "\n\n".join([
            "Before writing programs, you need to install Python. Visit the official python.org site, download the latest version for your operating system, and follow the installer instructions. On Windows, make sure you check the 'Add Python to PATH' option.",
            "Once installed, open a terminal (Command Prompt on Windows, Terminal on macOS/Linux) and type `python --version`. If a version number appears, Python is ready.",
            "To run a program, save your code in a file with the `.py` extension, then run it with the command `python file-name.py`.",
        ]),
        "example_title_id": "Contoh: memeriksa versi dan menjalankan file",
        "example_title_en": "Example: checking the version and running a file",
        "example_code": "python --version\npython program.py",
        "example_explanation_id": "Baris pertama memeriksa versi Python yang terpasang. Baris kedua menjalankan file `program.py`; file tersebut harus berada di folder tempat Anda membuka terminal.",
        "example_explanation_en": "The first line checks the installed Python version. The second line runs `program.py`; the file must be in the folder where you opened the terminal.",
        "mistakes_id": "\n".join([
            "Melewatkan opsi 'Add Python to PATH' di Windows sehingga perintah `python` tidak dikenali.",
            "Membuka terminal di folder yang salah sehingga Python tidak menemukan file Anda.",
            "Mencampur perintah terminal dengan kode Python, atau lupa menekan Enter setelah mengetik perintah.",
        ]),
        "mistakes_en": "\n".join([
            "Skipping the 'Add Python to PATH' option on Windows so the `python` command is not recognized.",
            "Opening the terminal in the wrong folder so Python cannot find your file.",
            "Mixing terminal commands with Python code, or forgetting to press Enter after typing a command.",
        ]),
        "exercise_title_id": "Latihan: cek instalasi",
        "exercise_title_en": "Exercise: check the installation",
        "exercise_description_id": "Buka terminal Anda dan jalankan `python --version`. Catat versi yang muncul, lalu buat file `pertama.py` berisi `print(\"Halo!\")` dan jalankan dengan `python pertama.py`.",
        "exercise_description_en": "Open your terminal and run `python --version`. Note the version that appears, then create a `pertama.py` file containing `print(\"Halo!\")` and run it with `python pertama.py`.",
        "exercise_hint_id": "Jika muncul pesan 'command not found' atau 'tidak dikenali', periksa kembali langkah 'Add to PATH' atau minta bantuan komunitas.",
        "exercise_hint_en": "If you see a 'command not found' or 'not recognized' message, re-check the 'Add to PATH' step or ask the community for help.",
    },
    {
        "lesson_id": "04",
        "optionality": "core",
        "title_id": "Hello World",
        "title_en": "Hello World",
    },
    {
        "lesson_id": "05",
        "optionality": "core",
        "title_id": "Variabel",
        "title_en": "Variables",
    },
    {
        "lesson_id": "06",
        "optionality": "core",
        "title_id": "Tipe Data",
        "title_en": "Data Types",
    },
    {
        "lesson_id": "07",
        "optionality": "optional",
        "title_id": "Kondisi",
        "title_en": "Conditions",
    },
    {
        "lesson_id": "08",
        "optionality": "optional",
        "title_id": "Perulangan",
        "title_en": "Loops",
    },
]


def upgrade() -> None:
    connection = op.get_bind()
    result = connection.execute(
        sa.text(
            "INSERT INTO courses (slug, stage, title_id, title_en, description_id, description_en) "
            "VALUES (:slug, :stage, :title_id, :title_en, :description_id, :description_en) "
            "RETURNING id"
        ),
        COURSE,
    )
    course_id = result.fetchone()[0]
    for index, lesson in enumerate(LESSONS, start=1):
        row = {
            "course_id": course_id,
            "position": index,
            "lesson_id": lesson["lesson_id"],
            "optionality": lesson["optionality"],
            "title_id": lesson["title_id"],
            "title_en": lesson["title_en"],
            "objective_id": lesson.get("objective_id"),
            "objective_en": lesson.get("objective_en"),
            "explanation_id": lesson.get("explanation_id"),
            "explanation_en": lesson.get("explanation_en"),
            "example_title_id": lesson.get("example_title_id"),
            "example_title_en": lesson.get("example_title_en"),
            "example_code": lesson.get("example_code"),
            "example_explanation_id": lesson.get("example_explanation_id"),
            "example_explanation_en": lesson.get("example_explanation_en"),
            "mistakes_id": lesson.get("mistakes_id"),
            "mistakes_en": lesson.get("mistakes_en"),
            "exercise_title_id": lesson.get("exercise_title_id"),
            "exercise_title_en": lesson.get("exercise_title_en"),
            "exercise_description_id": lesson.get("exercise_description_id"),
            "exercise_description_en": lesson.get("exercise_description_en"),
            "exercise_hint_id": lesson.get("exercise_hint_id"),
            "exercise_hint_en": lesson.get("exercise_hint_en"),
        }
        connection.execute(
            sa.text(
                "INSERT INTO lessons (course_id, position, lesson_id, optionality, "
                "title_id, title_en, objective_id, objective_en, explanation_id, "
                "explanation_en, example_title_id, example_title_en, example_code, "
                "example_explanation_id, example_explanation_en, mistakes_id, "
                "mistakes_en, exercise_title_id, exercise_title_en, "
                "exercise_description_id, exercise_description_en, exercise_hint_id, "
                "exercise_hint_en) "
                "VALUES (:course_id, :position, :lesson_id, :optionality, "
                ":title_id, :title_en, :objective_id, :objective_en, "
                ":explanation_id, :explanation_en, :example_title_id, "
                ":example_title_en, :example_code, :example_explanation_id, "
                ":example_explanation_en, :mistakes_id, :mistakes_en, "
                ":exercise_title_id, :exercise_title_en, "
                ":exercise_description_id, :exercise_description_en, "
                ":exercise_hint_id, :exercise_hint_en)"
            ),
            row,
        )


def downgrade() -> None:
    op.execute("DELETE FROM courses WHERE slug = 'python-stage-0'")