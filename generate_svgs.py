svg_line = '<svg width="910" height="2" viewBox="0 0 910 2" fill="none" xmlns="http://www.w3.org/2000/svg"><line y1="1" x2="910" y2="1" stroke="#1E1E1E" stroke-width="2"/></svg>'
svg_circle = '<svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="100" cy="100" r="100" fill="#1E1E1E" fill-opacity="0.1"/></svg>'
svg_mask = '<svg width="950" height="477" viewBox="0 0 950 477" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="950" height="477" rx="238.5" fill="black"/></svg>'

with open("assets/vector23.svg", "w") as f: f.write(svg_line)
with open("assets/vector24.svg", "w") as f: f.write(svg_line)
with open("assets/group12.svg", "w") as f: f.write(svg_circle)
with open("assets/group13.svg", "w") as f: f.write(svg_circle)
with open("assets/image362.svg", "w") as f: f.write(svg_mask)
