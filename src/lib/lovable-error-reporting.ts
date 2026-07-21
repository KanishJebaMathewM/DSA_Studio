// Neutral error reporter — no Lovable dependency.
// Reports errors to the browser console only; compatible with the same
// call-site signature used across the app.
export function reportLovableError(
  error: unknown,
  context: Record<string, unknown> = {},
) {
  if (typeof error === "undefined") return;
  const message =
    error instanceof Response
      ? `Response ${error.status}${error.url ? ` at ${error.url}` : ""}`
      : error instanceof Error
        ? error.message
        : String(error);
  console.error("[DSA Studio Error]", message, context);
}
