# The quiz engine

Config in, funnel out. Nothing under `components/quiz/` knows about a specific quiz,
so adding a second one means writing content and two thin route files, never forking
a renderer.

## Adding a quiz

1. **Write the config.** Copy `lib/quiz/diet.ts`. It exports one `QuizConfig`:
   `id` (namespaces its answers in sessionStorage), `basePath`, `resultsPath`, and the
   ordered `steps`. Every question, option, and line of copy lives here. A slug becomes
   a URL segment, so treat it as permanent once shipped.

2. **Add the step route**, `app/quiz/<name>/[slug]/page.tsx`. Copy the diet one and
   change the config import. It is the whole file.

3. **Add the landing page**, `app/quiz/<name>/page.tsx`. This one is bespoke per funnel
   because the hero is marketing, but the first tap uses the shared `StartChoice`, which
   stores an answer and routes into step one.

4. **Add the results screens** under `app/quiz/<name>/results/`. These are quiz-specific
   by nature. Reuse `ResultsShell`, `ResultsHeading`, and `NextButton` for the chrome.

## Step kinds

| Kind | Renders |
|---|---|
| `single` | A list of full-width answer cards. Tapping one stores it and advances. |
| `info` | An educational screen: body copy, optional bullets, one Continue button. |
| `height` | Feet and inches, or centimetres, with a unit switch. |
| `number` | One numeric field with an optional unit switch, prefix, and trailing word. |
| `email` | Validates, stores, then hands off to `resultsPath`. |

Need a kind that does not exist? Add it to the `Step` union in `lib/quiz/types.ts` and a
branch in `StepScreen`'s `Body`. Read colours and sizes from tokens, never a literal hex.

## Answers

`useAnswers(quizId)` reads on mount, never during render, so the server and client first
paint agree. Hold personalised copy behind its `ready` flag or the page will flash.
Answers sit in sessionStorage keyed by quiz id: a refresh keeps them, closing the tab
drops them, and nothing leaves the browser until a step sends it.

## Not wired yet

The email step stores the address and moves on. No provider is connected, so no lead is
delivered anywhere. Pick one through the Vercel Marketplace and send from a route
handler on submit.
