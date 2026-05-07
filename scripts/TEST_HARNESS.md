# Test Harness Conventions (FDTTA)

Codified from S47-P1 smoke-test edge cases (`audits/S47_P1_B21_smoke.md`).
Any automated smoke test, e2e flow, or external verifier touching the exam UI
MUST follow these rules.

## E1 — Answer-tile shuffle: click by `data-letter`, never `data-display`

The B22 exam simulator (`js/exam.js`) shuffles answer tiles per question
using a deterministic seeded PRNG. Each tile carries TWO data attributes:

| Attribute | Value | Authoritative for |
|-----------|-------|-------------------|
| `data-letter` | Original letter from `question.options` (A/B/C/D as defined in `data/questions.json`) | **Grading** — the engine compares this against `correctAnswers`. |
| `data-display` | Visual label shown to the user (A/B/C/D in shuffled position) | UI only — what the user sees on screen. |

After shuffle these two values diverge. Original option `B` may end up rendered
in display position 3, so the tile has `data-letter="B"` but `data-display="C"`.

**Rule:** automated tests MUST locate and click tiles by `data-letter`, never
by `data-display` and never by visible letter text. Selecting by visible letter
on a shuffled exam will mis-score because the engine grades against the
original letter.

```js
// CORRECT
document.querySelector('.answer-tile[data-letter="B"]').click();

// WRONG — selects by visual position, mis-scores after shuffle
document.querySelector('.answer-tile[data-display="B"]').click();
```

## E2 — Override `window.confirm` before retake-prompt screens

The Daily Mock (`B21`) calls `window.confirm(...)` if the user re-clicks Start
on a mock that already exists. Headless browsers block on this dialog.

```js
window.confirm = () => true;  // before clicking the Start button
// OR clear state:
localStorage.removeItem('fdtta_daily_mocks');
```

## E3 — Branch on `q.answerCount` for submission path

- `answerCount === 1` → tile click auto-submits 200 ms later. Do not click confirm.
- `answerCount > 1` → tile clicks accumulate selection; you must click
  `#exam-confirm-btn` (or `#confirm-btn` in practice mode) to submit.

A test that doesn't branch on `answerCount` will either double-submit (single)
or hang (multi).
