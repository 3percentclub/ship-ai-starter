# Data pack

Every name, email, room, and number in this folder is fake. Use these files instead of making data up, and never type real personal info.

| File | Rows | For | Full brief |
| --- | --- | --- | --- |
| `users.csv` | 8 | Sign-in, row rule tests, PRISM scenarios | |
| `guests.csv` | 16 | Build #1: Lost in New York | `projects/lost-in-new-york.md` |
| `leftover_remix.csv` | 20 | Leftover Remix (easiest) | `projects/leftover-remix.md` |
| `uncle_bob_topics.csv` | 16 | Uncle Bob Defuser (medium) | `projects/uncle-bob-defuser.md` |
| `turkey_court.csv` | 14 | Turkey Pardon Court (hardest, best for PRISM) | `projects/turkey-pardon-court.md` |

Rows marked `trap` are attacks on purpose: fake SSNs and card numbers, "I'm the admin", bribes, prompt injection, asks for someone else's data. Your guardrail should catch them, and they make great PRISM scenarios.

Your own idea? See `projects/your-own-idea.md`. Make a new fake CSV here with at least 15 rows and 3 traps.
