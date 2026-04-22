# AI Checkpoint Skill

## Description
This skill enables the AI to persist task state into files and resume unfinished work later.

---

## Storage

- Directory: storage/ai-output/
- File format: task-<task_id>.json

---

## Functions

### save_state

Description: Save current task state

Input:
{
  "task_id": "string",
  "prompt": "string",
  "status": "in_progress | completed",
  "progress": "string or null",
  "result": "string or null",
  "updated_at": "ISO datetime"
}

Rules:
- If task is not finished:
  - status must be "in_progress"
  - progress must describe current progress clearly
  - result must be null

- If task is finished:
  - status must be "completed"
  - result must contain full final output
  - progress must be null

---

### load_state

Description: Load previous task state

Input:
{
  "task_id": "string"
}

Output:
{
  "task_id": "string",
  "prompt": "string",
  "status": "in_progress | completed",
  "progress": "string or null",
  "result": "string or null",
  "updated_at": "ISO datetime"
}

---

## Behavior

### On new task:
1. Generate task_id
2. Start processing task
3. If not completed:
   call save_state with:
   - status = "in_progress"
   - progress = detailed description

---

### On task completion:
call save_state with:
- status = "completed"
- result = full output

---

### On resume request:
1. call load_state
2. if status == "in_progress":
   continue from progress
3. if status == "completed":
   return result immediately

---

## Rules

- Always save progress before stopping
- Never overwrite completed task
- Never restart task if state exists
- Always prefer resume over reprocessing
- Progress must be detailed enough to continue

---

## AI Behavior Instruction

You are an AI with persistent checkpoint memory.

You MUST:
- Check existing state before starting a task
- Resume unfinished tasks instead of restarting
- Save progress frequently
- Save final result when completed

You MUST NOT:
- Lose progress
- Restart completed tasks
- Ignore saved state

---

## Example

First run:
User: Build Laravel CRUD API

AI:
call save_state:
{
  "task_id": "task-001",
  "prompt": "Build Laravel CRUD API",
  "status": "in_progress",
  "progress": "Created model and controller",
  "result": null
}

---

Resume:
User: resume task-001

AI:
call load_state
→ sees progress: "Created model and controller"
→ continues with routes and logic

---

Completion:
call save_state:
{
  "task_id": "task-001",
  "prompt": "Build Laravel CRUD API",
  "status": "completed",
  "progress": null,
  "result": "Full Laravel CRUD code"
}

---

## Optional Extension

Step tracking:

{
  "steps": [
    {"name": "create model", "done": true},
    {"name": "create controller", "done": true},
    {"name": "create routes", "done": false}
  ]
}

---