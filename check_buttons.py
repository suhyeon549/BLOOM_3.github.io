import re
with open(r'C:\Users\yeons\.gemini\antigravity-ide\brain\19dd06ea-d339-4e64-a527-045ae1af5761\.system_generated\steps\680\output.txt', 'r', encoding='utf-8') as f:
    text = f.read()

matches = re.finditer(r'name="([^"]*button[^"]*)"', text, re.IGNORECASE)
for m in matches:
    print(m.group(1))
