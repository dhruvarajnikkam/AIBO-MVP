import sys

with open('src/lib/sessionGenerator.ts', 'r') as f:
    content = f.read()

bad_call = """  try {
    const profile = await loadProfileStats({
      userId,
      accuracy: performance.accuracy,
      streak: performance.streak,
    });"""

good_call = """  try {
    const profile = await loadProfileStats(
      userId,
      { accuracy: performance.accuracy, streak: performance.streak }
    );"""

content = content.replace(bad_call, good_call)

with open('src/lib/sessionGenerator.ts', 'w') as f:
    f.write(content)

