"use client";

import { useState } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("Please enter your email.");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data?.error || "Something went wrong.");
        return;
      }

      setSubmitted(true);
      setEmail("");
    } catch (err: any) {
      setError(err?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-100 text-gray-900">
      {/* HERO */}
      <section className="max-w-6xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="text-5xl font-bold mb-6 leading-tight">
            Never Lose Another Real Estate Lead
          </h1>

          <p className="text-xl text-gray-600 mb-10">
            CloseFlow AI instantly responds to inquiries, follows up for months,
            and books showings automatically so agents close more deals.
          </p>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="border-2 border-gray-300 focus:border-black outline-none p-4 rounded-lg w-full bg-white"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <button
                type="submit"
                disabled={loading}
                className="bg-black text-white px-6 py-4 rounded-lg font-semibold hover:opacity-90 disabled:opacity-60"
              >
                {loading ? "Joining..." : "Join Waitlist"}
              </button>
            </form>
          ) : (
            <p className="text-lg font-semibold">
              You&apos;re on the list! We&apos;ll be in touch soon.
            </p>
          )}

          {error && <p className="text-red-600 mt-4">{error}</p>}

          <p className="text-sm text-gray-500 mt-4">
            Launching soon for the first 100 realtors
          </p>
        </div>

        {/* HERO VISUAL */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border">
          <div className="space-y-4">
            <ChatBubble text="Hi! Are you interested in the Maple St home?" />
            <ChatBubble text="Yes! Can I see it this weekend?" agent />
            <ChatBubble text="Absolutely. Saturday 11am or Sunday 2pm?" />
          </div>

          <div className="mt-6 p-4 bg-green-50 border rounded-lg text-sm text-green-700">
            ✓ Showing automatically booked
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-3 gap-10">
        <Feature
          icon="⚡"
          title="Instant Lead Response"
          text="AI replies to new inquiries in seconds so you never lose a hot buyer."
        />
        <Feature
          icon="🤖"
          title="Smart AI Qualification"
          text="Automatically asks questions to qualify buyers and sellers."
        />
        <Feature
          icon="📅"
          title="Showing Booking"
          text="AI schedules showings directly on your calendar."
        />
      </section>

      {/* BENEFITS */}
      <section className="bg-white py-24 border-t">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-12">What Realtors Get</h2>

          <div className="grid md:grid-cols-2 gap-6 text-left">
            <Benefit text="AI SMS lead follow-up" />
            <Benefit text="Lead qualification chatbot" />
            <Benefit text="Open house lead capture" />
            <Benefit text="Missed call text-back" />
            <Benefit text="Listing inquiry automation" />
            <Benefit text="Long-term lead nurturing" />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 text-center px-6 bg-gradient-to-r from-gray-900 to-black text-white">
        <div className="max-w-xl mx-auto">
          <h3 className="text-3xl font-bold mb-4">Get Early Access</h3>

          <p className="text-gray-300 mb-8">
            We&apos;re inviting the first 100 realtors to automate their lead flow
            with AI.
          </p>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Your email"
                className="p-4 rounded-lg w-full text-black bg-white border-2 border-white focus:border-gray-300 outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <button
                type="submit"
                disabled={loading}
                className="bg-white text-black px-6 py-4 rounded-lg font-semibold disabled:opacity-60"
              >
                {loading ? "Joining..." : "Join Waitlist"}
              </button>
            </form>
          ) : (
            <p className="font-semibold">Thanks! We&apos;ll notify you soon.</p>
          )}

          {error && <p className="text-red-300 mt-4">{error}</p>}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="text-center py-10 text-gray-500 text-sm">
        © {new Date().getFullYear()} CloseFlow AI
      </footer>
    </main>
  );
}

function Feature({
  icon,
  title,
  text,
}: {
  icon: string;
  title: string;
  text: string;
}) {
  return (
    <div className="bg-white border rounded-xl p-8 shadow-sm text-center">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{text}</p>
    </div>
  );
}

function Benefit({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-green-600 font-bold">✓</span>
      <p>{text}</p>
    </div>
  );
}

function ChatBubble({ text, agent }: { text: string; agent?: boolean }) {
  return (
    <div
      className={`p-3 rounded-lg max-w-xs text-sm ${
        agent ? "bg-gray-200 ml-auto" : "bg-blue-100"
      }`}
    >
      {text}
    </div>
  );
}