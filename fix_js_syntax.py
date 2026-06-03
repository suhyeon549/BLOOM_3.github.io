import re

with open("c:/Bloom/BLOOM_3.github.io/product.html", "r", encoding="utf-8") as f:
    content = f.read()

bad_syntax = """if (st4) setTimeout(() => st4.classList.add('visible'), 1800);
      }
      } else if (index === 4) {"""
good_syntax = """if (st4) setTimeout(() => st4.classList.add('visible'), 1800);
      } else if (index === 4) {"""

if bad_syntax in content:
    content = content.replace(bad_syntax, good_syntax)
else:
    print("Could not find bad syntax verbatim, using regex...")
    content = re.sub(r'if \(st4\) setTimeout\(\(\) => st4\.classList\.add\(\'visible\'\), 1800\);\s*}\s*}\s*else if \(index === 4\) {',
                     r"if (st4) setTimeout(() => st4.classList.add('visible'), 1800);\n      } else if (index === 4) {", content)

with open("c:/Bloom/BLOOM_3.github.io/product.html", "w", encoding="utf-8") as f:
    f.write(content)

print("Done")
