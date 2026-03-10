# CodeLeap Network

Frontend engineering test for [CodeLeap](https://www.codeleap.co.uk/). A social network interface with full CRUD functionality, integrated with CodeLeap's REST API.

🔗 **[Live Demo](https://codeleap-engineering-test-rho.vercel.app)**

---

## Assessment Criteria

**Faithful to the design** — the UI accurately reproduces the provided Figma specs, with careful attention to spacing, typography, and component states across all screen sizes.

**Clean and reusable code** — the project follows SOLID and DRY principles, with a clear separation between the API layer, data hooks, and UI components. Each concern lives in exactly one place.

**Correct button states** — Create, Save, and Enter buttons are disabled whenever required fields are empty or a request is pending, preventing invalid submissions.

**End-user focus** — built with a real consumer in mind, not just to pass a code review. Interactions feel intentional, loading states are handled gracefully, and the app never leaves the user without feedback.

---

## Bonus Features

- **Mobile responsiveness** — fluid layout that adapts from small phones to large desktops without breaking the design
- **Permanent session** — username persisted in `localStorage`, keeping the user logged in across page reloads, with a logout option in the header
- **Infinite scroll** — posts load progressively as the user scrolls, using React Query's `useInfiniteQuery` and the API's native pagination via the `next` field
- **Animations and transitions** — smooth modal fade-ins and micro-interactions on buttons and hover states, implemented with Tailwind CSS
- **Dark mode** — full dark theme support built into the design system, toggled with the `D` key

---

## Tech Stack

| Technology | Why |
|---|---|
| **React 19 + TypeScript** | Required by the test. TypeScript adds type safety across the API layer, hooks, and component props, catching errors at compile time |
| **Vite** | Faster dev server and build times compared to CRA, with native TypeScript support out of the box |
| **TanStack React Query v5** | Explicit requirement of the test. Handles server state, automatic cache invalidation on mutations, and infinite pagination without manual loading state management |
| **Axios** | Cleaner HTTP client with automatic JSON parsing and better error handling compared to native fetch, without adding significant bundle size |
| **Tailwind CSS v4** | Utility-first approach keeps styles co-located with components, making it easy to maintain consistency and avoid unused CSS |
| **shadcn/ui + Radix UI** | Accessible, unstyled primitives for modals and interactive components, fully customized to match the Figma design |
| **Lucide React** | Lightweight and consistent icon set, used for the edit and delete actions on posts |
| **date-fns** | Lightweight date utility for relative time formatting ("25 minutes ago"), without pulling in a heavy library like Moment.js |
| **pnpm** | Faster installs and more efficient disk usage compared to npm or yarn |

---

## Project Structure

```
src/
  api/
    axios.ts          # Axios instance configuration
  hooks/
    usePosts.ts       # React Query hooks: useInfinitePosts, useCreatePost, useUpdatePost, useDeletePost
  components/
    ui/               # Reusable shadcn/ui components (buttons, inputs, dialogs)
    SignupModal.tsx   # Initial username screen
    Feed.tsx          # Main layout with header and post list
    CreatePostForm.tsx # Form for creating new posts
    PostCard.tsx      # Individual post with conditional edit/delete actions
    EditModal.tsx     # PATCH form pre-filled with current post values
    DeleteModal.tsx   # Confirmation dialog before deleting
    theme-provider.tsx # Dark mode context provider
  lib/
    queryClient.ts    # Shared React QueryClient instance
    utils.ts          # Utility functions for tailwind classes (cn)
```

---

## Getting Started

```bash
git clone https://github.com/joaopconstant/codeleap_engineering_test.git
cd codeleap_engineering_test
pnpm install
pnpm dev
```

Open `http://localhost:5173` in your browser.

---

## API

Base URL: `https://dev.codeleap.co.uk/careers/`

The trailing slash is required on all endpoints to avoid CORS issues with the Django backend.

| Operation | Method | Endpoint |
|---|---|---|
| List posts | GET | `/careers/` |
| Create post | POST | `/careers/` |
| Update post | PATCH | `/careers/{id}/` |
| Delete post | DELETE | `/careers/{id}/` |