# PS4 firmware 9.00 static audit and stability notes

## Applied wrapper fixes
- Fixed the definite `setTimeout(PayloadLoader(...), 500)` bug: the old code executed the loader immediately and passed its return value to the timer.
- Payload requests are now checked for network errors, timeouts, empty responses, and unexpectedly large files.
- The AIO patch loader is started before GoldHEN, with a short delay between loader starts.
- Success is no longer displayed immediately after starting the exploit; the UI reports success only after both payload loader requests complete.
- Errors are written to the page log and surfaced through the status indicator.
- The PSFree/Lapse exploit internals, firmware offsets, and binary payloads were not changed.

## Static validation
- JavaScript syntax and relative imports should be checked before packaging.
- ZIP CRC validation should pass after packaging.

## Important limitations
- This is a static code correction, not a test on a physical PS4.
- A white-light/black-screen freeze during kernel exploitation can be a kernel panic or a hardware/firmware-level hang. A web page cannot reliably recover the console from that state.
- The exploit implementation and payload binaries are unchanged; this work does not guarantee a higher exploit success rate or eliminate kernel panics.
- Do not repeatedly retry after a freeze. Fully restart the console, then retry only after confirming the browser is stable and the console is on firmware 9.00.
- AppCache is legacy browser functionality; offline behavior must be verified on the target PS4 browser.
