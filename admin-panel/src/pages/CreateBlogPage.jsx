import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function CreateBlogPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    metaTitle: "",
    metaDescription: "",
    categories: "",
    tags: "",
    status: "draft",
    canonicalUrl: "",
    featureImage: "",
    ogTitle: "",
    ogDescription: "",
    ogImage: "",
    twitterCard: "summary_large_image",
    internalLinks: "",
    externalLinks: "",
    faq: [{ question: "", answer: "" }],
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleFaqChange = (index, field, value) => {
  const updatedFaq = [...formData.faq];
  updatedFaq[index][field] = value;

  setFormData((prev) => ({
    ...prev,
    faq: updatedFaq,
  }));
};

const addFaqItem = () => {
  setFormData((prev) => ({
    ...prev,
    faq: [...prev.faq, { question: "", answer: "" }],
  }));
};

const removeFaqItem = (index) => {
  const updatedFaq = formData.faq.filter((_, i) => i !== index);

  setFormData((prev) => ({
    ...prev,
    faq: updatedFaq.length ? updatedFaq : [{ question: "", answer: "" }],
  }));
};
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      setError("");
      const payload = {
  ...formData,
  categories: formData.categories
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean),
  tags: formData.tags
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean),
  internalLinks: formData.internalLinks
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean),
  externalLinks: formData.externalLinks
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean),
};
      await api.post("/blogs/create", payload);
      navigate("/dashboard/blogs");
    } catch (error) {
      setError(error.response?.data?.message || "Failed to create blog");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl rounded-xl bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Create Blog</h2>
        <p className="text-sm text-gray-500">
          Add a new blog with basic SEO fields
        </p>
      </div>

      {error && (
        <div className="mb-4 rounded-md bg-red-100 px-4 py-2 text-sm text-red-600">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter blog title"
            className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Content
          </label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            placeholder="Write blog content"
            rows="8"
            className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500"
            required
          />
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Meta Title
            </label>
            <input
              type="text"
              name="metaTitle"
              value={formData.metaTitle}
              onChange={handleChange}
              placeholder="Enter meta title"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Meta Description
          </label>
          <textarea
            name="metaDescription"
            value={formData.metaDescription}
            onChange={handleChange}
            placeholder="Enter meta description"
            rows="3"
            className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500"
          />
        </div>
        <div className="grid gap-5 md:grid-cols-2">
  <div>
    <label className="mb-1 block text-sm font-medium text-gray-700">
      Canonical URL
    </label>
    <input
      type="text"
      name="canonicalUrl"
      value={formData.canonicalUrl}
      onChange={handleChange}
      placeholder="https://example.com/blog/your-slug"
      className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500"
    />
  </div>

  <div>
    <label className="mb-1 block text-sm font-medium text-gray-700">
      Feature Image URL
    </label>
    <input
      type="text"
      name="featureImage"
      value={formData.featureImage}
      onChange={handleChange}
      placeholder="https://example.com/image.jpg"
      className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500"
    />
  </div>
</div>

<div className="grid gap-5 md:grid-cols-2">
  <div>
    <label className="mb-1 block text-sm font-medium text-gray-700">
      OG Title
    </label>
    <input
      type="text"
      name="ogTitle"
      value={formData.ogTitle}
      onChange={handleChange}
      placeholder="Enter Open Graph title"
      className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500"
    />
  </div>

  <div>
    <label className="mb-1 block text-sm font-medium text-gray-700">
      OG Image URL
    </label>
    <input
      type="text"
      name="ogImage"
      value={formData.ogImage}
      onChange={handleChange}
      placeholder="https://example.com/og-image.jpg"
      className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500"
    />
  </div>
</div>

<div>
  <label className="mb-1 block text-sm font-medium text-gray-700">
    OG Description
  </label>
  <textarea
    name="ogDescription"
    value={formData.ogDescription}
    onChange={handleChange}
    placeholder="Enter Open Graph description"
    rows="3"
    className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500"
  />
</div>

<div className="grid gap-5 md:grid-cols-2">
  <div>
    <label className="mb-1 block text-sm font-medium text-gray-700">
      Twitter Card
    </label>
    <select
      name="twitterCard"
      value={formData.twitterCard}
      onChange={handleChange}
      className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500"
    >
      <option value="summary">summary</option>
      <option value="summary_large_image">summary_large_image</option>
    </select>
  </div>

  <div>
    <label className="mb-1 block text-sm font-medium text-gray-700">
      Internal Links
    </label>
    <input
      type="text"
      name="internalLinks"
      value={formData.internalLinks}
      onChange={handleChange}
      placeholder="/blog/react-guide, /blog/nextjs-seo"
      className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500"
    />
  </div>
</div>

<div>
  <label className="mb-1 block text-sm font-medium text-gray-700">
    External Links
  </label>
  <input
    type="text"
    name="externalLinks"
    value={formData.externalLinks}
    onChange={handleChange}
    placeholder="https://mongoosejs.com, https://nextjs.org"
    className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500"
  />
</div>
<div className="space-y-4 rounded-lg border border-gray-200 p-4">
  <div className="flex items-center justify-between">
    <div>
      <h3 className="text-lg font-semibold text-gray-800">FAQ Section</h3>
      <p className="text-sm text-gray-500">
        Add schema-ready FAQs for this blog
      </p>
    </div>

    <button
      type="button"
      onClick={addFaqItem}
      className="rounded-lg bg-green-600 px-4 py-2 text-sm text-white hover:bg-green-700"
    >
      Add FAQ
    </button>
  </div>

  {formData.faq.map((item, index) => (
    <div key={index} className="space-y-3 rounded-lg border border-gray-200 p-4">
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">
          Question
        </label>
        <input
          type="text"
          value={item.question}
          onChange={(e) => handleFaqChange(index, "question", e.target.value)}
          placeholder="Enter FAQ question"
          className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">
          Answer
        </label>
        <textarea
          value={item.answer}
          onChange={(e) => handleFaqChange(index, "answer", e.target.value)}
          placeholder="Enter FAQ answer"
          rows="3"
          className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500"
        />
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => removeFaqItem(index)}
          className="rounded-lg bg-red-100 px-4 py-2 text-sm text-red-600 hover:bg-red-200"
        >
          Remove
        </button>
      </div>
    </div>
  ))}
</div>
        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Categories
            </label>
            <input
              type="text"
              name="categories"
              value={formData.categories}
              onChange={handleChange}
              placeholder="e.g. Web Development, React"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Tags
            </label>
            <input
              type="text"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              placeholder="e.g. MERN, JavaScript, SEO"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="rounded-lg bg-blue-600 px-6 py-2 text-white hover:bg-blue-700 disabled:opacity-60"
        >
          {isLoading ? "Creating..." : "Create Blog"}
        </button>
      </form>
    </div>
  );
}

export default CreateBlogPage;