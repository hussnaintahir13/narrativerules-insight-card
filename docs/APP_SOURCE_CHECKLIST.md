# AppSource Submission Checklist

- [ ] `pbiviz package` produces a clean `.pbiviz`.
- [ ] Unique stable GUID in `pbiviz.json`.
- [ ] Versions match across `package.json`, `pbiviz.json`, CHANGELOG, release tag.
- [ ] `assets/icon.png` 300×300 transparent.
- [ ] Sample `.pbix` demonstrating every tone and number format.
- [ ] Privacy policy URL (specifically state: no data leaves Power BI).
- [ ] Support URL.
- [ ] Terms of use URL.
- [ ] ≥3 screenshots (1280×720) — one per tone is recommended.
- [ ] No outbound network calls — verifiable via the network panel.
- [ ] `privileges` array empty.
- [ ] Aria-labels and keyboard focus rings on KPI cards.
- [ ] Tested under Windows high-contrast.
- [ ] Tested with: current+previous only / +target / drivers / compact / extreme variance / zero previous / negative target tolerance edges.
