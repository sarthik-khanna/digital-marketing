"use client";

import { useActionState, useState } from "react";
import { PenLineIcon } from "lucide-react";
import { signAgreement, type SignState } from "@/app/actions";
import { Field, FieldError, FormMessage, SubmitButton } from "@/components/form-parts";
import { SignatureField } from "@/components/signature-field";

const initialState: SignState = { status: "idle", message: "", errors: {} };

/** The signing panel: name, signature, acceptance. Posts to signAgreement. */
export function SignForm({
  agreementId,
  stamp,
  defaultName,
  email,
}: {
  agreementId: string;
  /** agreementStamp() of the version on screen; signing fails if the plan changed since. */
  stamp: string;
  defaultName: string;
  email: string;
}) {
  const [state, action, pending] = useActionState(signAgreement, initialState);
  const [name, setName] = useState(defaultName);
  const [accepted, setAccepted] = useState(false);
  const [missingSignature, setMissingSignature] = useState(false);

  return (
    <form
      action={action}
      aria-busy={pending}
      className="space-y-5"
      onSubmit={(event) => {
        const empty = !new FormData(event.currentTarget).get("signature");
        setMissingSignature(empty);
        if (empty) event.preventDefault();
      }}
    >
      <input type="hidden" name="id" value={agreementId} />
      <input type="hidden" name="stamp" value={stamp} />
      <Field
        id="signerName"
        name="signerName"
        label="Full legal name"
        autoComplete="name"
        required
        maxLength={100}
        value={name}
        onChange={(event) => setName(event.target.value)}
        error={state.errors.signerName}
        hint="As it should appear on the agreement."
      />

      <SignatureField typedName={name} error={missingSignature ? "Add your signature first." : state.errors.signature} />

      <div>
        <label className="flex items-start gap-3 text-sm">
          <input
            type="checkbox"
            name="accept"
            value="yes"
            required
            checked={accepted}
            onChange={(event) => setAccepted(event.target.checked)}
            aria-invalid={state.errors.accept ? true : undefined}
            aria-describedby={state.errors.accept ? "accept-error" : undefined}
            className="mt-0.5 size-4 shrink-0 accent-primary"
          />
          <span>I have read and agree to the terms and conditions of this agreement, and I agree to sign it electronically.</span>
        </label>
        <FieldError id="accept-error" error={state.errors.accept} />
      </div>

      <FormMessage message={state.message} />
      <SubmitButton pending={pending} className="gap-2">
        <PenLineIcon aria-hidden="true" />
        {pending ? "Signing…" : "Sign agreement"}
      </SubmitButton>
      <p className="text-xs leading-relaxed text-muted-foreground">
        After you sign, a PDF copy is emailed to <span className="font-medium text-foreground">{email}</span>. The time of
        signing, your IP address and your browser are recorded with your signature.
      </p>
    </form>
  );
}
