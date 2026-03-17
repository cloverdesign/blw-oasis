"use client"

import { useRef, useState, type FormEvent } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

const COOLDOWN_MS = 10_000

const inputClass = cn(
    "border-0 border-b border-border rounded-none px-0 shadow-none",
    "focus-visible:ring-0 focus-visible:border-ring"
)

export function ContactForm() {
    const contactFormAction = process.env.NEXT_PUBLIC_CONTACT_FORM_ACTION
    const isConfigured = Boolean(contactFormAction)
    const lastSubmitTime = useRef(0)
    const [cooldownMsg, setCooldownMsg] = useState("")

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        if (!isConfigured) {
            e.preventDefault()
            return
        }
        const now = Date.now()
        if (now - lastSubmitTime.current < COOLDOWN_MS) {
            e.preventDefault()
            setCooldownMsg("Please wait a few seconds before submitting again.")
            return
        }
        lastSubmitTime.current = now
        setCooldownMsg("")
    }

    return (
        <section className="px-4 lg:px-32 py-12 lg:py-20">
            <form
                action={isConfigured ? contactFormAction : undefined}
                method="POST"
                onSubmit={handleSubmit}
                className=" mx-auto flex flex-col gap-8"
                aria-label="Contact form"
            >
                <input type="hidden" name="_subject" value="New BLW Oasis contact inquiry" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="first-name" className="text-sm text-muted-foreground">
                            First Name
                        </label>
                        <Input
                            id="first-name"
                            name="firstName"
                            type="text"
                            className={inputClass}
                            required
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="last-name" className="text-sm text-muted-foreground">
                            Last Name
                        </label>
                        <Input
                            id="last-name"
                            name="lastName"
                            type="text"
                            className={inputClass}
                            required
                        />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="email" className="text-sm text-muted-foreground">
                            Email
                        </label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            className={inputClass}
                            required
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="phone" className="text-sm text-muted-foreground">
                            Phone Number
                        </label>
                        <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            className={inputClass}
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="subject" className="text-sm text-muted-foreground">
                        Subject
                    </label>
                    <Input
                        id="subject"
                        name="subject"
                        type="text"
                        className={inputClass}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="message" className="text-sm text-muted-foreground">
                        Message
                    </label>
                    <Textarea
                        id="message"
                        name="message"
                        rows={6}
                        className={cn(inputClass, "min-h-[140px] resize-y")}
                    />
                </div>
                <div>
                    <Button type="submit" variant="default" disabled={!isConfigured}>
                        Send Message
                    </Button>
                </div>
                {cooldownMsg && (
                    <p className="text-sm text-muted-foreground">{cooldownMsg}</p>
                )}
                {!isConfigured && (
                    <p className="text-sm text-destructive">
                        Contact form is not configured yet. Please set `NEXT_PUBLIC_CONTACT_FORM_ACTION`.
                    </p>
                )}
            </form>
        </section>
    )
}
