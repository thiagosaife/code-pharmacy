/** Presentation: contact terminal — posts to Formspree with a loader + error state. */

const FORMSPREE_ENDPOINT = "https://formspree.io/f/mlgqrnoy";

export function initUplink(): void {
  const form = document.getElementById("uplink-form")!;
  const input = document.getElementById("uplink-input") as HTMLInputElement;
  const send = document.getElementById("uplink-send") as HTMLButtonElement;
  const sent = document.getElementById("uplink-sent")!;
  const loading = document.getElementById("uplink-loading")!;
  const error = document.getElementById("uplink-error")!;
  const reset = document.getElementById("uplink-reset")!;

  let sending = false;

  const setView = (view: "form" | "loading" | "sent"): void => {
    form.hidden = view !== "form";
    loading.hidden = view !== "loading";
    sent.hidden = view !== "sent";
  };

  const doSend = async (): Promise<void> => {
    const msg = input.value.trim();
    if (!msg || sending) return;
    sending = true;
    error.hidden = true;
    setView("loading");
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({ message: msg, _subject: "DIRECT_UPLINK // portfolio contact" }),
      });
      if (res.ok) {
        setView("sent");
      } else {
        setView("form");
        error.hidden = false;
      }
    } catch {
      setView("form");
      error.hidden = false;
    } finally {
      sending = false;
    }
  };

  send.addEventListener("click", doSend);
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") void doSend();
  });

  // Any link pointing at #contact focuses the terminal input once the scroll lands.
  // preventScroll keeps the native anchor scroll from being hijacked by the focus.
  const focusInput = (): void => {
    if (form.hidden) return;
    input.focus({ preventScroll: true });
  };

  document.querySelectorAll<HTMLAnchorElement>('a[href="#contact"]').forEach((link) => {
    if (link === reset) return;
    link.addEventListener("click", () => {
      window.setTimeout(focusInput, 600);
    });
  });
  reset.addEventListener("click", (e) => {
    e.preventDefault();
    input.value = "";
    error.hidden = true;
    setView("form");
    input.focus();
  });
}
