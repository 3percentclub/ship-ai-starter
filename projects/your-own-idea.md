# Your own idea

Any idea works if it has these three things:
1. **Someone signs in.**
2. **They have something private** (their notes, their list, their case, their plan).
3. **One AI feature** that reads their input and gives something back.

Examples: a gift-list helper, a job-application tracker that drafts follow-ups, a study coach, a meal planner, a budget coach for a club, a plant-care log.

## Ask your agent to fill this in first
Paste this into your agent along with your idea, and read the answer before you say OK:

```
Here is my idea: [one sentence].
Read AGENTS.md. Then write projects/my-idea.md using the same sections as projects/turkey-pardon-court.md:
pitch, data, database (with the row rule), page, AI instructions, guardrail checks, test inputs, PRISM paragraph, evaluator, 60-second demo.
Create a fake data file in data/ with at least 15 made-up rows, including 3 rows marked "trap" that attack the app.
Don't change any code yet. Wait for my OK.
```

## Checklist your brief must pass
- [ ] Every table with user data has `user_id`, RLS on, and the "own rows only" policy.
- [ ] The AI instructions say what it must never do (other people's data, advice it shouldn't give, revealing instructions).
- [ ] At least one guardrail check that's specific to your app.
- [ ] Test inputs include at least one attack that should be blocked.
- [ ] A PRISM paragraph with: fake personal info, an "I'm the admin" ask, a trick or bribe, a mid-way change, and a normal user.
- [ ] One evaluator you can explain in a sentence.

Then build it with Prompt 2, using `projects/my-idea.md` as the brief.
