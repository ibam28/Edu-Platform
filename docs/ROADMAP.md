# ROADMAP — Bilingual Programming Education, Certification & Talent Platform

**Current Version:** 0.0.1  
**Project Phase:** Prototype  
**Status:** M00 through M22 completed  
**Next Milestone:** M23 Security Review

---

## 1. Roadmap Purpose

This roadmap defines the development sequence for Prototype v0.0.1 and the transition from prototype validation to a future commercial MVP.

The roadmap is subordinate to:

1. `docs/PROJECT_MASTER_BLUEPRINT.md`
2. `docs/PROTOTYPE_PRD.md`
3. `docs/AI_CODING_RULES.md`

When there is a conflict, those source-of-truth documents take precedence.

---

## 2. Product Direction

The long-term product is a bilingual programming education, certification, talent, and recruitment platform.

Core journey:

**Learn → Practice → Build → Assess → Certify → Portfolio → Professional → Talent Pool → Recruit → Work**

Prototype v0.0.1 demonstrates the concept and validates the user experience. It is **not** the final commercial product.

---

## 3. Prototype v0.0.1 Scope

Prototype v0.0.1 consists of milestones **M00 through M25**.

The prototype should demonstrate:

- Public product story
- Indonesian and English localization
- Registration and login
- Student dashboard
- Admin dashboard
- Python Stage 0 learning content
- Demo assessments for Stage 1–4
- Basic progress tracking
- Contact page
- Privacy Policy page
- Terms & Conditions page
- Deployment of the prototype

The following remain future capabilities and are **not required for v0.0.1**:

- Real paid course checkout
- Real certification issuance
- Government/BNSP certification claims
- Employer marketplace
- Full recruitment platform
- Advanced talent matching
- Advanced AI tutoring/agents
- Production-scale code execution
- Mobile application
- Full multi-language programming curriculum
- Enterprise administration
- Production-scale anti-cheating/proctoring
- Complex billing/subscription infrastructure

---

# 4. Milestone Roadmap

## M00 — Project Foundation ✅

**Status:** Completed

### Goal
Create a clean, reproducible technical foundation.

### Includes
- Repository structure
- Documentation structure
- Next.js / React / TypeScript foundation
- Tailwind CSS
- FastAPI
- PostgreSQL
- SQLAlchemy
- Migration-ready setup
- Docker Compose
- Environment configuration
- `/api/health`
- Basic tests
- README

### Boundary
No business features.

---

## M01 — Design System

**Status:** Completed ✅

### Goal
Establish the visual and interaction system used consistently throughout the prototype.

### Includes
- Brand/working name usage
- Colors
- Typography
- Spacing
- Radius
- Shadows
- Buttons
- Inputs
- Cards
- Badges
- Containers
- Loading states
- Error states
- Empty states
- Responsive breakpoints
- Accessibility basics

### Boundary
No full page implementation.

---

## M02 — App Shell

**Status:** Completed ✅

### Goal
Create the global application structure.

### Includes
- Global layout
- Header/navigation
- Footer
- Route structure
- Responsive shell
- Language switcher
- ID/EN locale foundation

### Boundary
No dashboard business logic.

---

## M03 — Home Page

**Status:** Completed ✅

### Goal
Build the primary public-facing prototype landing page.

### Includes
- Prototype notice
- Hero
- Product positioning
- Stage 0–4 cards
- CTA
- Education-to-employment story
- Future product vision
- Bilingual content

### Boundary
No backend-dependent business features.

---

## M04 — Project Vision

**Status:** Completed ✅

### Goal
Explain what the prototype is and what the final platform is intended to become.

### Includes
- Prototype explanation
- Long-term vision
- Stage 0–4 roadmap
- Certification roadmap
- Education-to-employment model
- Future product modules

### Boundary
No marketing automation.

---

## M05 — Learning Path

**Status:** Completed ✅

### Goal
Create the Stage 0–4 learning path overview.

### Includes
- Stage cards
- FREE / PAID labels
- COMING SOON states
- Locked future stages
- Stage 0 entry point

### Boundary
No complete curriculum.

---

## M06 — Python Stage 0

**Status:** Completed ✅

### Goal
Create the first real learning experience.

### Includes
- Python Stage 0 overview
- Lesson list
- Seed lessons
- Indonesian/English content

Initial lessons:
1. What is Programming?
2. What is Python?
3. Installing / Running Python
4. Hello World
5. Variables
6. Data Types
7. Conditions (optional)
8. Loops (optional)

### Boundary
No advanced code sandbox.

---

## M07 — Lesson Detail

**Status:** Completed ✅

### Goal
Create the lesson-reading experience.

### Includes
- Lesson content
- Metadata
- Code blocks
- Exercise CTA
- Lesson navigation
- Completion UI
- Progress UI

### Boundary
No advanced coding execution environment.

---

## M08 — Assessment Demo

**Status:** Completed ✅

### Goal
Demonstrate assessment functionality without claiming formal certification.

### Includes
- Stage 1 demo assessment — 10 questions
- Stage 2 demo assessment — 5 questions
- Stage 3 demo assessment — 5 questions
- Stage 4 demo assessment — 5 questions
- Answer selection
- Submit
- Score
- Demo result

### Mandatory label

**“Demo Assessment — Not a Certification Examination”**

### Boundary
No official certification workflow.

---

## M09 — Register

**Status:** Completed ✅

### Goal
Create user registration.

### Includes
- Registration UI
- Email/password
- Validation
- Password confirmation
- ID/EN support

### Boundary
No social login or enterprise SSO.

---

## M10 — Login

**Status:** Completed ✅

### Goal
Create user login.

### Includes
- Login form
- Validation
- Loading/error states
- ID/EN
- Secure authentication integration

### Boundary
No enterprise identity provider.

---

## M11 — Authentication Backend

**Status:** Completed ✅

### Goal
Implement prototype authentication and authorization.

### Includes
- Users
- Roles
- Registration
- Login
- Logout
- Password hashing
- Session/token handling
- Protected routes
- Role checks

### Prototype roles
- Guest
- Student
- Admin

### Boundary
No advanced identity provider.

---

## M12 — Student Dashboard ✅

### Goal
Create the learner dashboard.

### Includes
- User welcome
- Learning path
- Current course
- Current lesson
- Progress summary
- Continue Learning CTA
- Locked Stage 2–4

### Boundary
No recruitment features.

---

## M13 — Progress ✅

### Goal
Persist learning progress.

### Includes
- Lesson completion
- Stage 0 progress
- Demo assessment result persistence
- Dashboard progress display

### Boundary
No advanced analytics.

---

## M14 — Admin Dashboard ✅

### Goal
Create the prototype administrator dashboard.

### Includes
- Basic statistics
- User count
- Learning participation
- Assessment attempts
- Navigation to users/courses/assessments

### Boundary
No enterprise administration.

---

## M15 — Admin Users ✅

### Goal
Provide basic user administration.

### Includes
- User list
- Basic search/filter
- Role display
- Basic management
- Admin-only access

### Boundary
No advanced user operations.

---

## M16 — Admin Courses ✅

### Goal
Provide basic course and lesson management.

### Includes
- Course list
- Course detail
- Lesson list
- Basic metadata editing
- Basic Stage 0 content editing

### Boundary
No full LMS/CMS complexity.

---

## M17 — Admin Assessments ✅

### Goal
Provide basic demo-assessment management.

### Includes
- Assessment list
- Question list
- Create/edit questions
- Stage association
- Demo labels

### Boundary
No official certification workflow.

---

## M18 — Contact ✅

### Goal
Provide a way to contact the project.

### Includes
- Contact information and/or simple contact form
- ID/EN

### Boundary
No CRM integration.

---

## M19 — Privacy ✅ Policy

### Goal
Create the prototype privacy page.

### Includes
- Data collection
- Account data
- Security
- Cookies
- Contact
- Prototype status

### Note
Legal review is required before production.

---

## M20 — Terms ✅ & Conditions

### Goal
Create the prototype terms page.

### Includes
- Account usage
- Learning content
- Demo assessments
- Prohibited use
- Intellectual property
- Future service concepts

### Note
Legal review is required before production.

---

## M21 — Localization QA ✅

### Goal
Verify the bilingual implementation.

### Includes
- Indonesian/English consistency
- Missing translation detection
- Hardcoded user-facing string review
- Route language switching
- Content parity

### Boundary
No new features.

---

## M22 — Responsive QA ✅

### Goal
Verify the entire prototype across devices.

### Targets
- Desktop
- Tablet
- Mobile

### Check
- Layout overflow
- Typography
- Navigation
- Cards
- Forms
- Tables
- Dashboards
- Lesson pages
- Assessment pages

### Boundary
No feature expansion.

---

## M23 — Security Review

### Goal
Perform a prototype-level security review.

### Includes
- Authentication
- Authorization
- Secrets
- Input validation
- Session/cookie security
- CORS/configuration
- Dependency review
- Basic route protection

### Boundary
Do not claim a complete penetration test.

---

## M24 — Deployment

### Goal
Deploy the prototype.

### Includes
- Staging/prototype deployment
- Environment configuration
- Frontend availability
- Backend availability
- Database connectivity
- Health check
- Basic deployment documentation

### Boundary
No autoscaling or complex production infrastructure.

---

## M25 — Release v0.0.1

**Status:** Final Prototype Release

### Goal
Freeze and release Prototype v0.0.1.

### Includes
- Final requirement checklist
- Final user-flow verification
- Release notes
- Known limitations
- Demo checklist
- Version tag
- README update
- Scope verification

### Boundary
Do not start the commercial MVP automatically.

---

# 5. Milestone Execution Rule

Only one micro-prompt should be executed at a time.

Workflow:

**Read relevant docs → Execute one prompt → Test → Review → Commit → Move to next prompt**

Do not upload the entire prompt ZIP to the AI Coder.

Do not ask the AI Coder to build the entire prototype in one prompt.

---

# 6. Documentation Reading Rule

The AI Coder must read only the documentation relevant to the current prompt.

Example:

### UI task
Read:
- `PROJECT_MASTER_BLUEPRINT.md`
- `PROTOTYPE_PRD.md`
- `AI_CODING_RULES.md`
- `UI_UX_DESIGN_SYSTEM.md`

### Database task
Read:
- `PROJECT_MASTER_BLUEPRINT.md`
- `ARCHITECTURE.md`
- `DATABASE_DESIGN.md`
- `AI_CODING_RULES.md`

### Authentication task
Read:
- `PROJECT_MASTER_BLUEPRINT.md`
- `ARCHITECTURE.md`
- `DATABASE_DESIGN.md`
- `API_SPECIFICATION.md`
- `SECURITY.md`
- `AI_CODING_RULES.md`

The AI Coder must not recursively read the entire repository without a reason.

---

# 7. Prototype Quality Gate

A milestone is complete only when:

- Page/function works
- Relevant tests pass
- TypeScript/lint/build checks pass where applicable
- API/data flow works where applicable
- Loading/error states exist where required
- Indonesian and English work
- Responsive layout works
- No unrelated functionality breaks
- Changes are documented
- Known limitations are reported

---

# 8. Versioning

| Version | Meaning |
|---|---|
| `0.0.1` | First demonstrable prototype |
| `0.0.2+` | Bug fixes / minor prototype improvements |
| `0.1.x` | Expanded validated prototype / pre-MVP |
| `1.0.0` | Commercial MVP |
| `2.x+` | Major product evolution |

---

# 9. Validation After Prototype

After v0.0.1:

**Prototype → Validation → Evidence → Funding → Commercial MVP**

Initial validation targets are directional, not guarantees:

- 50–500 registered users
- Meaningful Stage 0 completion
- Assessment participation
- Stage 2 interest / waitlist
- Certification interest
- Employer discovery conversations
- Investor interest

---

# 10. Funding Strategy

Do not spend the later MVP budget before prototype validation.

Indicative roadmap:

| Phase | Indicative Capital | Goal |
|---|---:|---|
| Prototype / Super Lean | Rp25–40 million | Build and validate concept |
| MVP / Realistic | Rp75–150 million | Launch MVP and obtain beta traction |
| Investor-ready | Rp250–500 million | MVP + traction + early monetization |
| Seed / Scale | Rp500 million+ | Team, certification, recruitment, growth |

Working target for a serious MVP:

**Approximately Rp100 million**

This is a later fundraising target, not a requirement for Prototype v0.0.1.

---

# 11. Post-v0.0.1 Roadmap

After successful prototype validation:

1. Collect user feedback
2. Measure engagement
3. Measure Stage 0 completion
4. Measure assessment participation
5. Validate willingness to pay for Stage 2
6. Explore certification partnerships/pathways
7. Build commercial MVP
8. Add Stage 2
9. Add Stage 3
10. Add Stage 4
11. Build professional assessment
12. Build talent pool
13. Build employer/recruitment capabilities
14. Scale

---

# 12. Master Principle

When in doubt:

**Choose the smallest change that moves the project forward while preserving:**

- Architecture
- Design system
- Bilingual foundation
- Security baseline
- Long-term product vision
- Prototype scope

The prototype is a stepping stone, not the final product.

The purpose of Prototype v0.0.1 is to create enough evidence to justify the next investment.

---

# 13. Current Status

**Completed:**
- M00 Project Foundation
- M01 Design System
- M02 App Shell
- M03 Home Page
- M04 Project Vision
- M05 Learning Path
- M06 Python Stage 0
- M07 Lesson Detail
- M08 Assessment Demo
- M09 Register
- M10 Login
- M11 Authentication Backend

**Current next step:**
- M12 Student Dashboard

**Do not repeat M00 unless the foundation is intentionally rebuilt or a documented defect requires it.**
