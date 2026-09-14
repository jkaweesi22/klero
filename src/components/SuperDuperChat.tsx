import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { MessageCircle, X, Send } from "lucide-react";
import { CHAT_NAME, GREETING, topics, matchTopic, type ChatAction } from "../data/chatbot";

type Message = {
  id: string;
  from: "bot" | "user";
  text: string;
  action?: ChatAction;
};

let messageId = 0;
const nextId = () => `m${++messageId}`;

/**
 * Super Duper — a floating chat widget that answers common visitor
 * questions from a small, scripted set of topics (see src/data/chatbot.ts).
 * It's presented plainly as Klero's assistant, not as a live AI — see the
 * comment at the top of that data file for why, and what real AI would
 * need instead.
 *
 * Conversation state is session-only (component state, not persisted) —
 * it resets on reload. Mounted once in App.tsx so it's available from
 * anywhere on the page.
 */
export default function SuperDuperChat() {
  const reduceMotion = useReducedMotion();
  const [isOpen, setIsOpen] = useState(false);
  const [hasGreeted, setHasGreeted] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && !hasGreeted) {
      setHasGreeted(true);
      setMessages([{ id: nextId(), from: "bot", text: GREETING }]);
    }
  }, [isOpen, hasGreeted]);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: reduceMotion ? "auto" : "smooth" });
  }, [messages, reduceMotion]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  function respondTo(userText: string) {
    const topic = matchTopic(userText);
    setMessages((prev) => [
      ...prev,
      { id: nextId(), from: "user", text: userText },
      { id: nextId(), from: "bot", text: topic.response, action: topic.action },
    ]);
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;
    respondTo(trimmed);
    setInput("");
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        aria-label={isOpen ? `Close chat with ${CHAT_NAME}` : `Chat with ${CHAT_NAME}`}
        aria-expanded={isOpen}
        aria-controls="super-duper-panel"
        className="fixed bottom-5 right-5 z-[60] flex items-center justify-center w-14 h-14 rounded-full bg-terracotta text-cream shadow-lg shadow-cocoa/30 transition-transform hover:scale-105 active:scale-95"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="super-duper-panel"
            role="dialog"
            aria-label={`Chat with ${CHAT_NAME}`}
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.97 }}
            animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: reduceMotion ? 0.12 : 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-24 right-5 z-[60] flex h-[65vh] max-h-[520px] w-[calc(100vw-2.5rem)] max-w-sm flex-col overflow-hidden rounded-[20px] border border-cocoa/10 bg-cream shadow-2xl shadow-cocoa/40"
          >
            <div className="flex items-center gap-3 bg-cocoa px-5 py-4 text-cream shrink-0">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-terracotta">
                <MessageCircle size={18} />
              </span>
              <div>
                <p className="font-display text-[1.05rem] leading-tight">{CHAT_NAME}</p>
                <p className="text-[0.72rem] text-cream/55">Klero's assistant</p>
              </div>
            </div>

            <div ref={listRef} className="flex flex-1 flex-col gap-3 overflow-y-auto px-4 py-4" aria-live="polite">
              {messages.map((m) => (
                <div key={m.id} className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-[0.88rem] leading-relaxed ${
                      m.from === "user" ? "rounded-br-sm bg-terracotta text-cream" : "rounded-bl-sm bg-white text-cocoa"
                    }`}
                  >
                    <p>{m.text}</p>
                    {m.action && (
                      <a
                        href={m.action.href}
                        target={m.action.external ? "_blank" : undefined}
                        rel={m.action.external ? "noopener" : undefined}
                        onClick={() => setIsOpen(false)}
                        className="mt-2 inline-flex text-[0.8rem] font-medium text-terracotta hover:underline"
                      >
                        {m.action.label} &rarr;
                      </a>
                    )}
                  </div>
                </div>
              ))}

              {messages.length <= 1 && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {topics.map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => respondTo(t.quickReply)}
                      className="rounded-full border border-cocoa/15 px-3 py-1.5 text-[0.78rem] text-brown transition-colors hover:border-terracotta hover:text-terracotta"
                    >
                      {t.quickReply}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <form onSubmit={handleSubmit} className="flex items-center gap-2 border-t border-cocoa/10 p-3 shrink-0">
              <label htmlFor="super-duper-input" className="sr-only">
                Ask {CHAT_NAME} a question
              </label>
              <input
                id="super-duper-input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={`Ask ${CHAT_NAME}...`}
                className="flex-1 rounded-full bg-cream-deep px-4 py-2.5 text-sm text-cocoa placeholder:text-brown/50 focus:outline-none focus:ring-2 focus:ring-terracotta/30"
              />
              <button
                type="submit"
                aria-label="Send"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-cocoa text-cream transition-colors hover:bg-terracotta"
              >
                <Send size={16} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
