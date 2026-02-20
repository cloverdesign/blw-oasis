"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

const inputClass = cn(
  "border-0 border-b border-border rounded-none px-0 shadow-none",
  "focus-visible:ring-0 focus-visible:border-ring"
)

export function ContactForm() {
    return (
        <section className="px-4 lg:px-10 py-12 lg:py-20">
            <form
                onSubmit={(e) => e.preventDefault()}
                className="max-w-3xl mx-auto flex flex-col gap-8"
                aria-label="Contact form"
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="first-name" className="text-sm text-muted-foreground">
                            First Name
                        </label>
                        <Input
                            id="first-name"
                            name="first-name"
                            type="text"
                            placeholder="First Name"
                            className={inputClass}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="last-name" className="text-sm text-muted-foreground">
                            Last Name
                        </label>
                        <Input
                            id="last-name"
                            name="last-name"
                            type="text"
                            placeholder="Last Name"
                            className={inputClass}
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
                            placeholder="Email"
                            className={inputClass}
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
                            placeholder="Phone Number"
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
                        placeholder="Subject"
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
                        placeholder="Message"
                        rows={6}
                        className={cn(inputClass, "min-h-[140px] resize-y")}
                    />
                </div>
                <div>
                    <Button type="submit" variant="default">
                        Send Message
                    </Button>
                </div>
            </form>
        </section>
    )
}
