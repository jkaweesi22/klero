// ---------------------------------------------------------------------------
// ORDER FORM ENDPOINT CONFIGURATION
//
// This is a static site (GitHub Pages) with no backend, so the order form in
// <OrderForm /> currently runs in "demo mode": submissions are validated and
// a confirmation message is shown, but nothing is sent anywhere.
//
// To connect it to a real service, replace the placeholder below:
//
//   1. Formspree (recommended, zero backend code)
//      → create a form at https://formspree.io
//      → set ORDER_FORM_ENDPOINT to "https://formspree.io/f/YOUR_FORM_ID"
//
//   2. Netlify Forms
//      → add `data-netlify="true"` and a hidden `form-name` input to the
//        <form> in OrderForm.tsx, then deploy on Netlify.
//
//   3. EmailJS
//      → remove the fetch() call in OrderForm.tsx's submit handler and call
//        emailjs.sendForm() instead.
//
//   4. Supabase / a custom API
//      → point ORDER_FORM_ENDPOINT at your endpoint and adjust the fetch()
//        call in OrderForm.tsx to match your API's request/response shape.
// ---------------------------------------------------------------------------

export const ORDER_FORM_ENDPOINT = "https://formspree.io/f/YOUR_FORM_ID";

export const isOrderEndpointConfigured = (): boolean =>
  !!ORDER_FORM_ENDPOINT && !ORDER_FORM_ENDPOINT.includes("YOUR_FORM_ID");

export const orderTypes = ["Weekend Order", "Celebration Order", "Catering", "Baking", "Other"] as const;
export type OrderType = (typeof orderTypes)[number];
