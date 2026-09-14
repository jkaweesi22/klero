import { useState } from "react";
import type { FormEvent } from "react";
import Button from "./Button";
import { ORDER_FORM_ENDPOINT, isOrderEndpointConfigured, orderTypes } from "../data/order";

type Status = { kind: "idle" | "success" | "error"; message: string };

/**
 * Because this is a static site (GitHub Pages) with no backend, the form
 * submits in "demo mode" by default: it validates input and shows a
 * confirmation message, but sends nothing anywhere. See src/data/order.ts
 * for exactly where to plug in a real submission service (Formspree,
 * Netlify Forms, EmailJS, Supabase, or a custom API).
 */
export default function OrderForm() {
  const [status, setStatus] = useState<Status>({ kind: "idle", message: "" });
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    setSubmitting(true);

    if (!isOrderEndpointConfigured()) {
      await new Promise((resolve) => setTimeout(resolve, 600));
      console.info(
        "[Klero] Order form is running in demo mode — no data was sent. " +
          "Set ORDER_FORM_ENDPOINT in src/data/order.ts to connect a real submission service."
      );
      setStatus({
        kind: "success",
        message:
          "Thank you — your request has been noted. (Demo mode: connect a form endpoint in src/data/order.ts to receive real submissions.)",
      });
      form.reset();
      setSubmitting(false);
      return;
    }

    try {
      const formData = new FormData(form);
      const response = await fetch(ORDER_FORM_ENDPOINT, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      if (!response.ok) throw new Error("Submission failed");

      setStatus({
        kind: "success",
        message: "Thank you — your request has been sent. Klero will confirm availability and next steps shortly.",
      });
      form.reset();
    } catch {
      setStatus({
        kind: "error",
        message: "Something went wrong sending your request. Please try WhatsApp or email instead.",
      });
    } finally {
      setSubmitting(false);
    }
  }

  const inputClasses =
    "w-full border border-cocoa/15 rounded bg-cream px-4 py-3.5 text-cocoa transition-colors duration-200 focus:outline-none focus:border-terracotta focus:ring-4 focus:ring-terracotta/15";
  const labelClasses = "text-[0.82rem] font-medium text-brown tracking-wide";

  return (
    <form id="order-form" className="flex flex-col gap-5" action={ORDER_FORM_ENDPOINT} method="POST" noValidate onSubmit={handleSubmit}>
      <div className="grid sm:grid-cols-2 gap-5">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="field-name" className={labelClasses}>Full Name</label>
          <input id="field-name" name="name" type="text" autoComplete="name" required className={inputClasses} />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="field-phone" className={labelClasses}>Phone Number</label>
          <input id="field-phone" name="phone" type="tel" autoComplete="tel" required className={inputClasses} />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="field-email" className={labelClasses}>Email</label>
          <input id="field-email" name="email" type="email" autoComplete="email" required className={inputClasses} />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="field-order-type" className={labelClasses}>Order Type</label>
          <select id="field-order-type" name="order_type" required defaultValue="" className={inputClasses}>
            <option value="" disabled>Select one</option>
            {orderTypes.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="field-date" className={labelClasses}>Requested Date</label>
          <input id="field-date" name="requested_date" type="date" required className={inputClasses} />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="field-qty" className={labelClasses}>Number of People / Quantity</label>
          <input
            id="field-qty"
            name="quantity"
            type="text"
            placeholder="e.g. 12 people, or 1 cake"
            required
            className={inputClasses}
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <span className={labelClasses}>Pickup or Delivery Preference</span>
        <div className="flex gap-3">
          {["Pickup", "Delivery"].map((option, i) => (
            <label
              key={option}
              className="inline-flex items-center gap-2 px-4.5 py-2.5 border border-cocoa/15 rounded-full text-sm cursor-pointer has-[:checked]:border-terracotta has-[:checked]:bg-cream-deep transition-colors"
            >
              <input type="radio" name="fulfillment" value={option} defaultChecked={i === 0} className="accent-terracotta" />
              <span>{option}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="field-order-details" className={labelClasses}>What would you like?</label>
        <textarea
          id="field-order-details"
          name="order_details"
          rows={3}
          required
          placeholder="Dishes, bakes, flavors, quantities..."
          className={`${inputClasses} resize-y`}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="field-notes" className={labelClasses}>Special Requests / Notes</label>
        <textarea
          id="field-notes"
          name="notes"
          rows={3}
          placeholder="Allergies, dietary needs, occasion details..."
          className={`${inputClasses} resize-y`}
        />
      </div>

      <label className="flex items-start gap-2.5 text-[0.88rem] text-brown leading-relaxed">
        <input type="checkbox" id="field-ack" name="acknowledgement" required className="mt-1 accent-terracotta shrink-0" />
        <span>
          I understand that submitting this form is an inquiry and my order is not confirmed until Klero confirms
          availability.
        </span>
      </label>

      <Button type="submit" variant="primary" withArrow disabled={submitting} className="w-full">
        {submitting ? "Sending…" : "Send Order Request"}
      </Button>

      <p role="status" aria-live="polite" className={`text-sm min-h-[1.2em] ${status.kind === "error" ? "text-[#a4453a]" : "text-olive"}`}>
        {status.message}
      </p>
    </form>
  );
}
