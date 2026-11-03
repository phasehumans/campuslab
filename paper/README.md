# Real-Time Coding Contests in College Programming Labs: A Case Study at RCPIT Shirpur

## Paper Overview

- **Title:** Real-Time Coding Contests in College Programming Labs: A Case Study at RCPIT Shirpur
- **Authors:** Patil Sakshi Dadabhau, Girase Jayesh Rameshsing, Sonawane Chetan Prabhakar, Chaudhari Sachin Narendra
- **Project Guide:** Dr. N. G. Shinde
- **Affiliation:** Department of Artificial Intelligence and Machine Learning, R. C. Patel Institute of Technology, Shirpur, Maharashtra, India
- **Academic Year:** 2026--2027
- **Track:** Computer Science Education / Engineering Laboratory Learning (CS Education, Automated Assessment & Practical Pedagogy)
- **Format:** Standard LaTeX academic paper format (Article class, 11pt font, standard margins, exactly 8 pages)
- **Target Venues:** ACM Technical Symposium on Computer Science Education (SIGCSE), ACM Conference on Innovation and Technology in Computer Science Education (ITiCSE), IEEE Frontiers in Education (FIE), IEEE Technology for Education (T4E), or IEEE Transactions on Learning Technologies.

---

## File Structure

```
paper/
├── main.tex          # Primary LaTeX manuscript (standard 11pt, clear language, TikZ figures, tables)
├── references.bib    # Curated BibTeX database (17 landmark, peer-reviewed citations)
├── main.bbl          # Pre-compiled bibliography matching IEEE style
├── main.pdf          # Compiled 8-page publication-ready PDF document
├── Dockerfile        # Reproducible TeX Live compiler environment
├── campuslab-research-paper.zip # Complete redistributable bundle
└── README.md         # Compilation guide, paper summary, and codebase mapping
```

---

## Abstract Summary

Data Structures and Algorithms (DSA) is a cornerstone of undergraduate computing and artificial intelligence curricula. However, teaching DSA effectively in practical laboratory sessions presents several persistent challenges. In many engineering institutions, laboratory work is assigned as open-ended exercises or weekly take-home homework. Under this conventional format, faculty members frequently observe three major difficulties: students postpone their programming tasks until just before the deadline, rely on superficial trial-and-error submissions to guess hidden test cases without diagnosing the underlying logic, and struggle to write correct programs independently during proctored practical examinations.

To address these laboratory challenges, we developed and deployed **Campus Lab**, an open-source, web-based coding environment designed specifically for institutional computer laboratories. Campus Lab combines real-time contest rooms with an isolated code execution sandbox (Judge0 CE) supporting C++, Java, and Python. The platform allows lab instructors to host timed coding sessions during standard two-hour practical slots, providing immediate evaluation on sample test cases and a live room leaderboard visible to students.

We conducted a semester-long crossover classroom study with 64 sophomore (Second Year) Artificial Intelligence and Machine Learning students at R. C. Patel Institute of Technology (RCPIT), Shirpur. Students were divided into two regular laboratory practical batches ($n = 32$ each). In the first half of the semester, Batch 1 completed weekly lab practicals using synchronous contest rooms, while Batch 2 completed identical problems through the traditional take-home assignment format. In the second half of the semester, the two batches swapped learning modes.

Key findings include:
- **Higher In-Lab Completion:** In-lab task completion reached **88.5%** during the 2-hour practical slot (vs. 61.2% in traditional homework format), eliminating weekend deadline rushes.
- **Improved Practical Exam Scores:** Practical exam scores improved by an average of **+5.8 marks (out of 50)** (+11.2% to +12.6%) on topics learned under the contest format.
- **Disciplined Debugging:** Submissions per solved problem dropped from **5.7 to 3.2**, with students testing sample cases locally and tracing code on paper before formal evaluation.
- **Supportive & Equitable Atmosphere:** When marks were decoupled from leaderboard speed and tied strictly to problem correctness, female and male students achieved equal performance gains (+5.8 vs. +6.1 marks) with low reported stress.

---

## Compilation Instructions

The paper is 100% self-contained and universally compatible with standard TeX distributions (TeX Live 2020+, MacTeX, MikTeX) and Overleaf.

### Method 1: Using `latexmk` (Recommended)
```bash
cd paper
latexmk -pdf main.tex
```

### Method 2: Traditional `pdflatex` + `bibtex` Sequence
```bash
cd paper
pdflatex main.tex
bibtex main
pdflatex main.tex
pdflatex main.tex
```

### Method 3: Overleaf (Zero-Install)
1. Use the pre-built `campuslab-research-paper.zip` or create a fresh zip:
   ```bash
   cd paper
   zip -r ../campuslab-research-paper.zip main.tex references.bib main.bbl README.md
   ```
2. In Overleaf, click **New Project** $\to$ **Upload Project** and select `campuslab-research-paper.zip`.
3. Set `main.tex` as the root document and compile with pdfLaTeX.

---

## Core Codebase Mapping to Research Paper

| Paper Section | Codebase Architectural Component | Implementation Location in Repository |
|---|---|---|
| **Section 3.1: Architecture** | React 19 Frontend + Express 5 Backend | `web/src/` & `server/src/app.ts`, `server/src/index.ts` |
| **Section 3.1: Execution Sandbox** | Judge0 CE Batch Dispatching & cgroup Isolation | `server/src/shared/judge0.lib.ts`, `codeRunner.ts` |
| **Section 3.3: Contest Engine** | Ephemeral Contest Room Lifecycle & Tie-Breaking | `server/src/modules/contest/contest.service.ts` |
| **Section 3.1: Problem Set** | Curated DSA Problems across 15 Categories | `server/prisma/seed-data/01-*.ts` through `15-*.ts` |
| **Section 3.2: Dual Evaluation** | Sample Run (2 cases) vs. Hidden Submit (10 cases) | `server/src/modules/execution/`, `submission/` |
| **Section 3.1: Student PRNs** | Institutional Identity & PRN Credentialing | `server/src/modules/auth/`, `schema.prisma` |
| **Section 3.1: Lab Deployment** | Docker Compose Local Lab Infrastructure | `docker-compose.yml`, `start.sh`, `stop.sh` |

---

## Research Questions Addressed

- **RQ1 (Practical Examination Performance):** Crossover practical exam results demonstrating $+5.6$ to $+6.3$ mark improvements (out of 50) on proctored coding assessments, with greatest gains in pointer-heavy and recursive structures (Trees and Graphs).
- **RQ2 (Problem-Solving Velocity & Debugging):** Reduction in formal submissions per solved task from $5.7$ to $3.2$, increase in local sample runs, and significant reduction in syntax errors.
- **RQ3 (Laboratory Engagement & Pacing):** Increase in 2-hour in-lab problem completion to $88.5\%$, elimination of Sunday midnight procrastination spikes, and increased persistence on complex problems.
- **RQ4 (Student Perceptions & Inclusivity):** Strong positive student feedback ($4.3/5.0$ focus, $4.4/5.0$ preference), equal performance gains across male and female student cohorts, and low evaluative anxiety when marks reward solution correctness rather than leaderboard speed.
