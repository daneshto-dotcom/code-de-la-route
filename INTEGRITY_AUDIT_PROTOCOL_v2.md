# INTEGRITY AUDIT PROTOCOL v2 — Post-Parallel-Agent Verification

## YOUR MISSION

Multiple Claude Code agents have been working on the same projects simultaneously over the past 2 days. There was NO coordination protocol in place. Agents may have overwritten each other's work, corrupted files, or drifted from the project vision without anyone noticing.

You are the auditor. Your job is to systematically verify that NOTHING has been lost, corrupted, or silently overwritten. You must be thorough, paranoid, and explicit about what you find.

**Do NOT fix anything yet.** First, produce a complete report. Fixes come after the founder reviews your findings.

---

## PHASE 1: Detect Parallel Agent Activity

The goal is NOT to flag rapid edits (that's normal single-agent iteration). The goal is to find evidence that MULTIPLE INDEPENDENT PROCESSES were modifying the same codebase. Here are the concrete signals.

### 1.1 Find all projects
```bash
find ~/Claude ~/founder-hq 2>/dev/null -maxdepth 3 -name ".git" -type d | sort
```

### 1.2 For EACH repo, run the detection suite:

#### Detection 1: Pickaxe Search — Functions That Appeared Then Vanished

`git log -S` (the "pickaxe") finds commits where a specific string was ADDED or REMOVED. If a function was added in one commit and removed in a LATER commit by a different context (not a rename), that's an overwrite.

```bash
cd "$PROJECT_DIR"
echo "=== PICKAXE: FUNCTIONS THAT APPEARED THEN VANISHED ==="

# Step 1: Get all function/class/export names added in the last 48h
git log --since="2 days ago" --all -p --diff-filter=M | \
  grep "^+" | grep -v "^+++" | \
  grep -oE "(function |export (default )?|class |interface |type |const |def )[A-Za-z_][A-Za-z0-9_]*" | \
  sort -u | while read SIGNATURE; do
  
  # Step 2: For each signature, check if it was both added AND removed
  CHANGES=$(git log --since="2 days ago" --all -S "$SIGNATURE" --format="%H %ai %s" 2>/dev/null)
  CHANGE_COUNT=$(echo "$CHANGES" | grep -c . 2>/dev/null)
  
  if [ "$CHANGE_COUNT" -ge 2 ]; then
    echo ""
    echo "  ⚠️ '$SIGNATURE' was ADDED and then CHANGED/REMOVED:"
    echo "$CHANGES" | head -5
    echo "     Run: git log -S '$SIGNATURE' -p --since='2 days ago' for full diff"
  fi
done

echo ""
echo "=== PICKAXE: KEY IDENTIFIERS ==="
echo "(Checking project-critical names that should NEVER disappear)"

# Project-specific critical identifiers — add your own
CRITICAL_NAMES="ConvictionState STRONG BUILDING STABLE WEAKENING BROKEN FROZEN audit_log AuditEvent Planner Estimator Checker ActAgent"
for NAME in $CRITICAL_NAMES; do
  HITS=$(git log --since="2 days ago" --all -S "$NAME" --format="%H %s" 2>/dev/null | wc -l)
  if [ "$HITS" -ge 2 ]; then
    echo "  ⚠️ Critical name '$NAME' was modified in $HITS commits:"
    git log --since="2 days ago" --all -S "$NAME" --format="    %h %ai %s" 2>/dev/null
  fi
done
```

**Why this is better than diffing consecutive commits:** The pickaxe searches by CONTENT, not by line number. If a function was at line 50, moved to line 80, but the content is identical — pickaxe ignores it (not a real change). If the function's content was genuinely removed or rewritten — pickaxe catches it. Zero false positives from normal iteration.

#### Detection 1b: Net Code Loss Per File

Complements the pickaxe by catching bulk overwrites where the WHOLE file was replaced.

```bash
echo ""
echo "=== NET CODE LOSS PER FILE ==="
MODIFIED_FILES=$(git log --since="2 days ago" --name-only --format="" | sort -u)

for FILE in $MODIFIED_FILES; do
  [ ! -f "$FILE" ] && continue
  
  COMMITS=$(git log --since="2 days ago" --format="%H" -- "$FILE" 2>/dev/null | tac)
  COMMIT_COUNT=$(echo "$COMMITS" | wc -w)
  [ "$COMMIT_COUNT" -lt 2 ] && continue
  
  FIRST=$(echo "$COMMITS" | head -1)
  LAST=$(echo "$COMMITS" | tail -1)
  
  LINES_AT_FIRST=$(git show "$FIRST:$FILE" 2>/dev/null | wc -l)
  LINES_AT_LAST=$(git show "$LAST:$FILE" 2>/dev/null | wc -l)
  NET_CHANGE=$((LINES_AT_LAST - LINES_AT_FIRST))
  
  if [ "$NET_CHANGE" -lt -20 ]; then
    echo "  ⚠️ $FILE: LOST $((NET_CHANGE * -1)) lines across $COMMIT_COUNT commits"
    echo "     Was $LINES_AT_FIRST lines, now $LINES_AT_LAST lines"
    echo "     First commit: $(git log -1 --format='%h %s' $FIRST)"
    echo "     Last commit:  $(git log -1 --format='%h %s' $LAST)"
  fi
done
```

#### Detection 2: Git Reflog Divergence

The reflog records every time HEAD moves. In normal single-agent work, the reflog is a clean linear sequence: commit, commit, commit. If multiple agents were committing, you'll see HEAD jumping between different branches or commits interleaving.

```bash
echo ""
echo "=== GIT REFLOG ANALYSIS (last 48h) ==="
git reflog --since="2 days ago" --format="%h %gd %gs %ci"

echo ""
echo "=== REFLOG ANOMALIES ==="
# Count unique commit parents — if > 1 parent appears for the same timestamp range, parallel work happened
git reflog --since="2 days ago" --format="%H %ci" | sort -k2 | awk '
{
  # Extract hour from timestamp
  split($2, d, "T")
  hour = d[1] " " substr($3, 1, 2)
  commits_per_hour[hour]++
  hashes[hour] = hashes[hour] " " $1
}
END {
  for (h in commits_per_hour) {
    if (commits_per_hour[h] > 5) {
      print "HIGH ACTIVITY: " h " — " commits_per_hour[h] " ref updates"
    }
  }
}'
```

#### Detection 3: File Content Duplication / Full Replacement

When Agent B overwrites Agent A's file, the diff often shows the ENTIRE file being replaced (all lines removed, all lines added) rather than a targeted edit. This is the "wrote the whole file from scratch instead of editing" pattern.

```bash
echo ""
echo "=== FULL FILE REPLACEMENTS ==="
git log --since="2 days ago" --format="%H %s" | while read HASH MSG; do
  git diff-tree --no-commit-id -r --numstat "$HASH" 2>/dev/null | while read ADDED REMOVED FILE; do
    [ "$ADDED" = "-" ] && continue  # binary file
    TOTAL_LINES=$(git show "$HASH:$FILE" 2>/dev/null | wc -l)
    if [ "$TOTAL_LINES" -gt 20 ] && [ "$ADDED" -gt "$((TOTAL_LINES * 80 / 100))" ]; then
      echo "  ⚠️ FULL REWRITE: $FILE in commit $HASH"
      echo "     $ADDED lines added out of $TOTAL_LINES total ($((ADDED * 100 / TOTAL_LINES))% of file is new)"
      echo "     Message: $MSG"
    fi
  done
done
```

**What this catches:** Agent B ran Claude Code, which regenerated the entire file instead of editing specific lines. The previous agent's work is now gone, replaced by a fresh generation.

#### Detection 4: Concurrent File System Activity (macOS/Linux)

If the project has build logs, editor logs, or terminal logs, check for timestamps showing two processes accessing the same files.

```bash
echo ""
echo "=== FILE SYSTEM TIMESTAMPS vs GIT TIMESTAMPS ==="
echo "(Files whose mtime is AFTER the last git commit — uncommitted parallel work)"
LAST_COMMIT_TIME=$(git log -1 --format="%ci" 2>/dev/null)
echo "Last commit: $LAST_COMMIT_TIME"
echo ""
echo "Files modified after last commit:"
find . -name "*.ts" -o -name "*.tsx" -o -name "*.py" -o -name "*.dart" -o -name "*.sql" -o -name "*.json" 2>/dev/null | grep -v node_modules | grep -v .git | while read f; do
  FILE_TIME=$(stat -f "%Sm" -t "%Y-%m-%d %H:%M:%S" "$f" 2>/dev/null || stat -c "%y" "$f" 2>/dev/null | cut -d. -f1)
  if [ -n "$FILE_TIME" ]; then
    echo "  $FILE_TIME  $f"
  fi
done | sort -r | head -20
```

#### Detection 5: Lost Work in Reflog

Check if there are commits that are in the reflog but NOT in any branch's history. These are "orphaned commits" — work that was done but then lost, possibly because another agent's commit moved HEAD past them.

```bash
echo ""
echo "=== ORPHANED COMMITS (in reflog but not in any branch) ==="
git reflog --since="2 days ago" --format="%H" | while read HASH; do
  # Check if this commit is reachable from any branch
  BRANCHES=$(git branch --contains "$HASH" 2>/dev/null | wc -l)
  if [ "$BRANCHES" -eq 0 ]; then
    echo "  ⚠️ ORPHANED: $HASH"
    echo "     $(git log -1 --format='%ai %s' $HASH 2>/dev/null)"
    echo "     Files changed:"
    git diff-tree --no-commit-id --name-only -r "$HASH" 2>/dev/null | head -5
  fi
done
```

**What this catches:** Agent A committed work. Agent B then did a force operation (reset, checkout, etc.) that moved HEAD, making Agent A's commit unreachable. The work exists in the reflog but is invisible to `git log`.

---

## PHASE 2: Standard Health Checks

### 2.1 Basic Repository State
```bash
cd "$PROJECT_DIR"

echo "=== CURRENT STATE ==="
git status
git branch -a
git stash list
echo ""
echo "=== MERGE CONFLICT MARKERS IN CODE ==="
grep -rn "<<<<<<< \|>>>>>>> \|=======" --include="*.ts" --include="*.tsx" --include="*.js" --include="*.jsx" --include="*.py" --include="*.dart" --include="*.sql" --include="*.json" . 2>/dev/null | grep -v node_modules || echo "None found."
```

### 2.2 Dependency Integrity
```bash
# Node.js
if [ -f "package.json" ]; then
  echo "=== package.json valid JSON? ==="
  node -e "JSON.parse(require('fs').readFileSync('package.json','utf8')); console.log('Valid')" 2>&1
  
  echo "=== npm dependency check ==="
  npm ls --depth=0 2>&1 | grep -E "ERR|WARN|missing|invalid" | head -10 || echo "Dependencies OK."
fi

# Python
if [ -f "requirements.txt" ]; then
  echo "=== pip check ==="
  pip3 check 2>&1 | head -10 || echo "Dependencies OK."
fi
```

### 2.3 Compilation / Syntax Check
```bash
if [ -f "tsconfig.json" ]; then
  echo "=== TypeScript compilation ==="
  npx tsc --noEmit 2>&1 | tail -20
fi
```

### 2.4 Broken Imports
```bash
echo "=== Broken imports ==="
grep -rn "from ['\"]\./" --include="*.ts" --include="*.tsx" . 2>/dev/null | grep -v node_modules | while IFS=: read file line content; do
  imported=$(echo "$content" | sed "s/.*from ['\"]//;s/['\"].*//" )
  dir=$(dirname "$file")
  target="$dir/$imported"
  if [ ! -f "${target}.ts" ] && [ ! -f "${target}.tsx" ] && [ ! -f "${target}/index.ts" ] && [ ! -f "${target}/index.tsx" ] && [ ! -f "${target}.js" ] && [ ! -f "${target}.jsx" ]; then
    echo "  BROKEN: $file:$line imports '$imported' — file not found"
  fi
done
echo "(End of broken imports check)"
```

---

## PHASE 3: Vision Alignment Check

For each project that has code (not just specs), verify that core architectural decisions are intact.

### 3.1 Run these searches and ANALYZE the results against the project specs:

**CNC:**
```bash
echo "=== CNC Vision Check ==="
# Conviction states — should be exactly 5 user-facing + 2 system
grep -rn "STRONG\|BUILDING\|STABLE\|WEAKENING\|BROKEN\|FROZEN\|UNINITIALIZED" src/ 2>/dev/null | grep -v node_modules | head -20

# Doctrine rules count
grep -rn "doctrine\|rule.*[0-9]\|Rule [0-9]" src/ 2>/dev/null | grep -v node_modules | head -20

# AI isolation — AI should never initiate state changes
grep -rn "setState\|updateState\|changeConviction\|setConviction" src/ 2>/dev/null | grep -v node_modules | head -20

# R/R gate threshold
grep -rn "2\.5\|MIN_RR\|RR_THRESHOLD\|reward_risk\|rewardRisk" src/ 2>/dev/null | grep -v node_modules | head -10

# Data providers — should be exactly 8
grep -rn "provider\|Provider\|DATA_SOURCE\|dataSource" src/ 2>/dev/null | grep -v node_modules | head -20
```

**Chateau Guardian:**
```bash
echo "=== Chateau Guardian Vision Check ==="
# Audit events on every state transition
grep -rn "audit\|AuditEvent\|audit_log\|createAudit" src/ 2>/dev/null | grep -v node_modules | head -20

# Actor attribution
grep -rn "actor\|Actor\|attributed\|actor.*founder\|actor.*system\|actor.*brain" src/ 2>/dev/null | grep -v node_modules | head -20

# File vault immutability
grep -rn "vault\|immutable\|original.*file\|deleteFile\|removeFile" src/ 2>/dev/null | grep -v node_modules | head -20
```

**PDCA Engine:**
```bash
echo "=== PDCA Vision Check ==="
# 4 agent types
grep -rn "Planner\|Estimator\|Checker\|ActAgent\|act_agent" src/ 2>/dev/null | grep -v node_modules | head -20

# pgmpy usage (deterministic, not LLM)
grep -rn "pgmpy\|BayesianNetwork\|TabularCPD\|VariableElimination" src/ 2>/dev/null | grep -v node_modules | head -10

# Max cycles cap
grep -rn "max_cycle\|MAX_CYCLE\|maxCycles\|cycle.*4\|cycle_limit" src/ 2>/dev/null | grep -v node_modules | head -10
```

**Permis Tutor:**
```bash
echo "=== Permis Tutor Vision Check ==="
# SM-2 algorithm
grep -rn "SM2\|sm2\|spaced.*repetition\|easiness\|interval\|repetition" lib/ 2>/dev/null | head -10

# 7 interaction types
grep -rn "interaction.*type\|InteractionType\|EXPLAIN\|SIMPLIFY\|VOCABULARY\|MEMORY_AID\|SIMILAR\|RULE_LOOKUP\|GENERAL" lib/ 2>/dev/null | head -20
```

### 3.2 Interpretation Guidelines

For each search result, the auditor must answer:
- **Are the expected constants/patterns present?** If a conviction state is missing, that's a vision drift.
- **Are there UNEXPECTED patterns?** If there's a 6th conviction state that shouldn't exist, that's a drift.
- **Are there contradictions?** If AI is calling setState directly somewhere, that violates CNC Rule 9.
- **Is the count right?** 5 conviction states, not 4 or 6. 8 data providers, not 7 or 9. These are precise numbers from locked specs.

---

## PHASE 4: Cross-Project Contamination

```bash
echo "=== Cross-Project Contamination ==="
for dir in $(find ~/Claude ~/founder-hq 2>/dev/null -maxdepth 2 -name "src" -o -name "lib" | grep -v node_modules | grep -v .git); do
  project=$(basename $(dirname "$dir"))
  echo "--- $project: checking for wrong-project references ---"
  grep -rn "chateau\|guardian" "$dir" --include="*.ts" --include="*.tsx" --include="*.py" --include="*.dart" 2>/dev/null | grep -vi "$project" | grep -v "node_modules" | grep -v "// " | head -5
  grep -rn "cnc\|conviction" "$dir" --include="*.ts" --include="*.tsx" --include="*.py" --include="*.dart" 2>/dev/null | grep -vi "$project" | grep -v "node_modules" | grep -v "// " | head -5
  grep -rn "pdca\|reflexion" "$dir" --include="*.ts" --include="*.tsx" --include="*.py" --include="*.dart" 2>/dev/null | grep -vi "$project" | grep -v "node_modules" | grep -v "// " | head -5
done

echo ""
echo "=== Config Path Check ==="
find ~/Claude ~/founder-hq 2>/dev/null -name ".env*" -o -name "config.*" | grep -v node_modules | while read f; do
  echo "--- $f ---"
  cat "$f" 2>/dev/null | grep -in "path\|dir\|root\|url\|database" | head -5
done
```

---

## PHASE 5: Generate Audit Report

After running ALL phases, produce a structured report in this EXACT format:

```markdown
# PARALLEL AGENT INTEGRITY AUDIT REPORT
Date: [today's date]
Auditor: Claude Code (audit session)
Period reviewed: Last 48-72 hours

## Executive Summary
[2-3 sentences: is the codebase healthy, compromised, or needs attention?]

## Projects Audited
| Project | Path | Branch | Status | Last Commit |
|---------|------|--------|--------|-------------|
[One row per project]

## CRITICAL Findings (Immediate Action Required)
[Each finding: project, file, what happened, git evidence (commit hashes), recommended action]

## HIGH Findings (Review Within 24h)
[Same format]

## MEDIUM Findings (Awareness)
[Same format]

## Regression Analysis Results
| File | # Commits | Net Lines Lost | Suspicious? | Detail |
|------|-----------|----------------|-------------|--------|
[One row per file that was modified 2+ times]

## Orphaned Commits
| Hash | Date | Message | Files | Recovery Command |
|------|------|---------|-------|------------------|
[Include `git cherry-pick <hash>` as recovery command for each]

## Full File Rewrites
| File | Commit | % New Lines | Message |
|------|--------|-------------|---------|
[Files where >80% of content was rewritten in a single commit]

## Vision Alignment Status
| Project | Status | Notes |
|---------|--------|-------|
[ALIGNED / DRIFTED / NEEDS REVIEW / NOT YET BUILT]

## Recommended Recovery Actions
[Ordered by urgency. For each: what to do, which commit to revert/cherry-pick, which file to review]

## Prevention
Install the BCC Multi-Agent Coordination Protocol (Extension D) before running parallel agents again.
```

Save the report to: `~/Claude/audit_report_[YYYY-MM-DD].md` or `~/founder-hq/command-center/logs/audit_report_[YYYY-MM-DD].md`

---

## CRITICAL RULES FOR THE AUDITOR

1. **Do NOT fix anything.** Report only. Fixes require founder approval.
2. **Do NOT skip any phase.** Run every check even if early phases look clean.
3. **Use git reflog as your ground truth.** Reflog never lies — it records every HEAD movement even if commits were overwritten.
4. **A "clean" git status means nothing.** Files can be overwritten and committed cleanly. The overwrite IS a clean commit. You must use pickaxe (`git log -S`) to find content-level regressions.
5. **For orphaned commits, always provide the cherry-pick command.** Lost work can almost always be recovered from the reflog. Make recovery easy.
6. **When in doubt, flag it HIGH.** False positives are fine. Missed overwrites are not.
7. **The pickaxe (`git log -S "functionName"`) is your best tool.** It tracks when specific content appeared and disappeared, regardless of line numbers or file reorganization. Use it on every critical identifier.

---

## PHASE 6: Prevention Recommendations

After completing the audit, include these specific recommendations in the report:

### 6.1 Immediate: Use Git Worktrees

Claude Code has BUILT-IN git worktree support. This is the industry standard solution for parallel agents. Every future parallel session must use one of these methods:

```bash
# Method 1: Launch Claude Code with --worktree flag
claude --worktree

# Method 2: From within a session, use the Task tool with isolation
# Task tool with isolation: "worktree" gives each sub-agent its own worktree

# Method 3: Manual worktree creation before launching sessions
git worktree add .claude/worktrees/feature-name -b feature/feature-name
cd .claude/worktrees/feature-name
claude  # launch Claude Code here
```

Each worktree gets:
- Its own directory under `.claude/worktrees/`
- Its own branch (auto-created)
- Full filesystem isolation — agents CANNOT overwrite each other
- Clean merge path when work is complete

### 6.2 Set Git Push Safety

Run this ONCE, globally, to prevent accidental pushes to main:
```bash
git config --global push.autoSetupRemote true
```

### 6.3 Add CLAUDE.md Routing Rules

Add this to each project's CLAUDE.md file to help agents self-organize:
```markdown
## Sub-Agent Routing Rules

**Parallel dispatch** (ALL conditions must be met):
- Tasks are in separate file domains (different directories)
- No shared state or imports between tasks
- Each agent uses worktree isolation

**Sequential dispatch** (ANY condition triggers):
- Tasks have dependencies (B needs output from A)
- Shared files like package.json, schema files, or config
- Unclear scope or overlapping directories
```

### 6.4 Never Again Run Parallel Agents Without Worktrees

The following command should be run before ANY parallel work session:
```bash
# Check for other active worktrees before starting
git worktree list
```

If only the main worktree is listed, you are clear to create a new one. If other worktrees exist, coordinate with the agent using that worktree before proceeding.
