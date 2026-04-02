CTEC Search Prototype
Overview

I’m building a project called CTEC Search and I want you to create a frontend-only prototype.

Before writing any code, first understand the purpose of the project, then design a UI that best represents it.

What the CTEC Project Is

CTEC Search is a tool for Northwestern students to explore course and professor evaluations.

At Northwestern, students fill out CTECs (Course and Teacher Evaluations) after each class. These reports contain:

ratings (usually on a 1–6 scale)
structured feedback about teaching quality and course experience
written student comments

The problem is that this data is locked in long, hard-to-read PDF documents.

The goal of this project is to:

make that data searchable
make it easy to compare courses and professors
surface the most important insights quickly

Think of it like:

a search engine for course reviews
or a “RateMyProfessor but structured and data-driven”
Scope of This Prototype

This is a frontend-only prototype.

You should:

use hardcoded mock data
implement client-side search/filtering
focus on UI/UX and presentation
make it feel like a real product students would use

Do NOT include:

backend
databases
APIs
PDF parsing
authentication
What to Display

Each course/professor entry should include:

course name and code
professor name
term/quarter
ratings for ~6 key evaluation questions (scale: 1–6)

The ratings are the most important part.

They should be:

easy to scan
visually appealing
comparable across courses

You can decide how to present them (e.g., bars, numbers, visual indicators).

Design Philosophy

You have creative control over the layout and structure.

Guidelines:

prioritize clarity and usability
make it feel modern and polished
design for a student audience
emphasize search and discovery
keep the interface clean and intuitive

Avoid over-engineering—this is a prototype.

Tech Stack

Use:

React
Next.js
TypeScript
Tailwind CSS

All data should be stored locally in the frontend.

Interaction Expectations

Include:

live search (by course, professor, etc.)
scrollable results
smooth, responsive interactions
Final Goal

The result should feel like:

“I would actually use this to pick my classes.”

Prioritize:

strong visual hierarchy
clean components
thoughtful spacing
intuitive interactions
