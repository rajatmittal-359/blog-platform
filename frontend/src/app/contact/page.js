export const metadata = {
  title: "Contact",
  description: "Contact us for questions, feedback, or collaboration opportunities.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="mx-auto max-w-3xl rounded-2xl bg-white p-8 shadow-sm">
        <h1 className="mb-4 text-4xl font-bold text-gray-900">Contact</h1>
        <p className="mb-6 text-gray-700">
          This is a sample public contact page. In a production setup, this would
          send messages to a backend service.
        </p>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-xl border border-gray-200 p-4">
            <p className="text-sm font-semibold text-gray-900">Email</p>
            <p className="mt-1 text-sm text-gray-600">support@example.com</p>
          </div>
          <div className="rounded-xl border border-gray-200 p-4">
            <p className="text-sm font-semibold text-gray-900">Location</p>
            <p className="mt-1 text-sm text-gray-600">Online / Remote</p>
          </div>
        </div>

        <form className="mt-8 space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-900">
              Your name
            </label>
            <input
              type="text"
              required
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-900">
              Your email
            </label>
            <input
              type="email"
              required
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-900">
              Message
            </label>
            <textarea
              rows={5}
              required
              className="w-full resize-none rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            Send Message
          </button>
        </form>
      </div>
    </main>
  );
}

