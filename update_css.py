with open('c:/Bloom/BLOOM_3.github.io/interactions.css', 'a', encoding='utf-8') as f:
    f.write("""
/* Curation Section 5 Text Animations */
.curation-text-anim {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 1s ease-out, transform 1s ease-out;
}
.curation-text-anim.visible {
  opacity: 1;
  transform: translateY(0);
}

.next-btn.visible {
  opacity: 1 !important;
  pointer-events: auto !important;
}
""")
print("CSS updated.")
