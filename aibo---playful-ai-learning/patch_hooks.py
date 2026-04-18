import sys

with open('/workspaces/AIBO-MVP/aibo---playful-ai-learning/src/components/LessonSession.tsx', 'r') as f:
    lines = f.readlines()

new_lines = []
loading_part = ""

# Extract the loading block
for i, line in enumerate(lines):
    if "if (isLoading || adaptiveChallenges.length === 0)" in line:
        loading_part = lines[i:i+3]
        lines[i] = "// MOVED LOADING CHECK\n"
        lines[i+1] = ""
        lines[i+2] = ""
        break

# Find where to put it back: right before "const renderExercise ="
for i, line in enumerate(lines):
    if "const renderExercise =" in line:
        for p_line in loading_part:
            new_lines.append(p_line)
        new_lines.append(line)
        new_lines.extend(lines[i+1:])
        break
    else:
        if lines[i] != "":
            new_lines.append(lines[i])

with open('/workspaces/AIBO-MVP/aibo---playful-ai-learning/src/components/LessonSession.tsx', 'w') as f:
    f.writelines(new_lines)
