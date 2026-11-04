/**
 * Spam trap: bots fill every input, people never see this one. The name means
 * nothing to browser autofill, and the data attributes tell password managers
 * (1Password, LastPass, Bitwarden, Dashlane) to skip it. A field called
 * "website" was being autofilled, which silently discarded real submissions.
 */
export const HONEYPOT_FIELD = "hp_x7q";

export function Honeypot() {
  return (
    <div aria-hidden="true" className="absolute -left-[9999px] size-px overflow-hidden">
      <label>
        Leave this field empty
        <input
          type="text"
          name={HONEYPOT_FIELD}
          tabIndex={-1}
          autoComplete="off"
          data-1p-ignore
          data-lpignore="true"
          data-bwignore
          data-form-type="other"
        />
      </label>
    </div>
  );
}
