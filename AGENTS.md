# AGENTS.md — Directives for AI Coding Agents

All AI coding assistants and autonomous agents working on **UdyamSetu AI** must adhere strictly to the following 25 operating principles:

---

## 25 Strict Operating Rules

1. **Read `prd.md` Before Major Product Changes**: Always confirm product requirements, user journeys, and module definitions before altering or introducing features.
2. **Read `architecture.md` Before Architecture Changes**: Understand the actual current directory tree, communication layers, and tier separation prior to modifying project structure.
3. **Read `memory.md` Before Modifying Business Logic**: Adhere to the established SIH 26091 financial formulas, loan brackets, interest rates, and project history.
4. **Follow `AGENTS.md`**: These instructions are binding across all iterations and tasks.
5. **Never Automatically Commit or Push Git Changes**: Do NOT execute `git init`, `git add`, `git commit`, `git push`, `git reset`, or `git clean`. The human developer retains exclusive control over version control.
6. **Never Delete Working Functionality Without Explicit Reason**: Backward compatibility with previous milestones (e.g., Task 0 engines and existing routes) must be preserved.
7. **Never Rewrite the Entire Project for a Small Feature**: Practice surgical, targeted enhancements rather than scorched-earth rewrites.
8. **Keep React Components Focused on Presentation**: React components must handle layout, UI state, rendering, and accessibility. Do not embed financial formulas, tax calculations, or lending rules inside React JSX.
9. **Keep Business Logic in Backend Engines / Services**: Core computations belong in `backend/app/engines/` and backend service handlers.
10. **Use Reusable Components**: Abstract repeating UI patterns (cards, metrics, badges, headers, alert boxes) into clean modular components in `frontend/src/components/`.
11. **Use Service Layers for API Communication**: Never invoke raw `fetch()` or `axios` inside page views. Route all network queries through `frontend/src/services/`.
12. **Avoid Unnecessary Hardcoded Business Values**: Keep configuration values, category lists, and interest parameters parameterized in dedicated schema/data modules.
13. **Use Environment Variables for Configurable API URLs**: Access backend endpoints via `VITE_API_BASE_URL` with sensible local fallbacks.
14. **Add Loading States Where Appropriate**: Ensure asynchronous operations provide clear visual feedback (spinners, skeletons, or progress indicators).
15. **Add Empty States Where Appropriate**: Render informative empty states when search results, lists, or filter conditions yield no data.
16. **Add Error States Where Appropriate**: Gracefully catch and display helpful diagnostic messages if an API fails, without crashing the application shell.
17. **Maintain Responsive Design**: Ensure all pages, forms, and navigation menus are tested and functional across mobile, tablet, and desktop viewports.
18. **Never Represent Demo/Synthetic Data as Live Official Data**: Clearly tag mock/synthetic metrics with visible "Prototype • Demo Data" labels and appropriate disclaimers.
19. **Never Create Fake Government Branding / Logos**: Avoid unauthorized emblems, counterfeit national crests, or misleading agency stamps. Use neutral, dignified SVG icons and clear typography.
20. **Keep the UI Professional and SIH/Government-Product Appropriate**: Use the specified palette (deep green primary, white/cream surfaces, restrained orange accent). Avoid childish illustrations, excessive neon glows, or distracting animations.
21. **Avoid Unnecessary Dependencies**: Utilize the existing dependencies (`react-router-dom`, `recharts`, `lucide-react`, `tailwindcss`) rather than installing redundant packages.
22. **Do Not Perform Unrelated Refactoring**: Focus exclusively on the assigned task specifications. Do not alter working unrelated code.
23. **Do Not Change Working Backend Engines Without Necessity**: The Task-0 backend engines (`market_engine.py`, `feasibility_engine.py`, `financial_engine.py`, `scheme_engine.py`, `advisory_engine.py`) are validated and must remain intact.
24. **Test Changes Before Declaring a Task Complete**: Always run `npm run build` and verify all route transitions before finalizing work.
25. **Update `architecture.md` or `memory.md` When Major Architectural Decisions Change**: Keep project documentation in sync with any modifications made during development.
