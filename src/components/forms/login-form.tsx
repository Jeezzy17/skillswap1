"use client";
import { useActionState, useState } from "react";
import Link from "next/link";
import { loginAction, type LoginState } from "@/app/(public)/login/actions";
import { Button } from "@/components/ui/button";
import { Card, Field, inputStyles } from "@/components/ui/primitives";
 
const initial: LoginState = { message: "", errors: {}, values: { email: "" } };
 
export function LoginForm({ next }: { next: string }) {
  const [state, action, pending] = useActionState(loginAction, initial);
  const [show, setShow] = useState(false);
  const aria = (k: "email" | "password") => ({
    "aria-invalid": !!state.errors[k],
    "aria-describedby": state.errors[k] ? `${k}-err` : undefined,
  });
 
  return (
    <form action={action} noValidate className="mx-auto w-full max-w-sm">
      <Card className="gap-4 p-6">
        <div>
          <p className="text-sm font-bold text-brand">SkillSwap</p>
          <h1 className="text-2xl font-bold">Masuk</h1>
          <p className="text-sm text-subtle">Lanjutkan bertukar keahlian dengan komunitas.</p>
        </div>
 
        {next !== "/" && (
          <p role="status" className="rounded-lg bg-muted p-3 text-sm">
            Masuk dulu untuk membuka halaman <b>{next}</b>.
          </p>
        )}
        {state.message && <p role="alert" className="text-sm text-danger">{state.message}</p>}
 
        <input type="hidden" name="next" value={next} />
 
        <Field id="email" label="Email" error={state.errors.email}>
          <input id="email" name="email" type="email" autoComplete="email" inputMode="email"
            defaultValue={state.values.email} className={inputStyles} {...aria("email")} />
        </Field>
 
        <Field id="password" label="Password" error={state.errors.password}>
          <div className="relative">
            <input id="password" name="password" type={show ? "text" : "password"} autoComplete="current-password"
              className={`${inputStyles} pr-20`} {...aria("password")} />
            <button type="button" onClick={() => setShow((v) => !v)} aria-pressed={show}
              className="absolute inset-y-0 right-0 min-w-16 rounded-r-lg px-3 text-sm font-medium text-brand hover:bg-muted focus-visible:outline-2 focus-visible:outline-brand">
              {show ? "Sembunyi" : "Tampilkan"}
            </button>
          </div>
        </Field>
 
        <Button type="submit" disabled={pending}>{pending ? "Memeriksa..." : "Masuk"}</Button>
 
        <p className="text-center text-sm text-subtle">
          Prototipe: email valid apa saja + password min. 6 karakter.
        </p>
        <Link href="/cari" className="text-center text-sm font-medium text-brand underline">
          Lanjut menjelajah tanpa masuk
        </Link>
      </Card>
    </form>
  );
}