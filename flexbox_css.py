with open('c:/Bloom/BLOOM_3.github.io/interactions.css', 'a', encoding='utf-8') as f:
    f.write("""
/* Curation Dynamic Card Animation */
.curation-dynamic-card {
  width: 0 !important;
  opacity: 0;
  overflow: hidden;
  margin: 0;
  transition: width 0.6s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  white-space: nowrap; /* prevent text wrapping while width is 0 */
}

.curation-dynamic-card.revealed {
  width: 358px !important;
  opacity: 1;
  overflow: visible;
}
""")
print("CSS updated.")
