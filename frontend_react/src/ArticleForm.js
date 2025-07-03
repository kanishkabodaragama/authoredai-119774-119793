import React, { useState, useContext } from "react";
import { AuthContext } from "./AuthContext";
import ArticleDisplay from "./ArticleDisplay";

/**
 * PUBLIC_INTERFACE
 * ArticleForm - allows a user to enter a topic and word count, submits to backend for article generation,
 * and displays results or errors. Only accessible to authenticated users.
 */
function ArticleForm() {
  const { token, isAuthenticated } = useContext(AuthContext);

  const [topic, setTopic] = useState("");
  const [wordCount, setWordCount] = useState(800);
  const [loading, setLoading] = useState(false);
  const [article, setArticle] = useState(null);
  const [error, setError] = useState(null);

  // PUBLIC_INTERFACE
  async function handleSubmit(e) {
    e.preventDefault();
    if (!isAuthenticated) {
      setError("You must be logged in to generate an article.");
      return;
    }
    setError(null);
    setArticle(null);
    setLoading(true);
    try {
      const res = await fetch("/api/article/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { "Authorization": `Bearer ${token}` } : {})
        },
        body: JSON.stringify({ topic, word_count: wordCount })
      });
      const data = await res.json();
      if (res.ok && data.article) {
        setArticle(data.article);
      } else {
        setError(data.message || "Failed to generate article");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    }
    setLoading(false);
  }

  if (!isAuthenticated) {
    // Defensive: shouldn't render when unauthenticated, but double-check
    return (
      <div style={{ margin: "2rem auto", maxWidth: 500, color: "#d9534f" }}>
        You must be logged in to use the article generator.
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 500, margin: "2rem auto" }}>
      <form onSubmit={handleSubmit} className="auth-form" style={{ gap: 18 }}>
        <h2>Generate an Article</h2>
        {error && <div className="auth-error">{error}</div>}
        <input
          type="text"
          placeholder="Article topic"
          value={topic}
          required
          minLength={3}
          maxLength={180}
          onChange={e => setTopic(e.target.value)}
          disabled={loading}
        />
        <input
          type="number"
          placeholder="Word count"
          value={wordCount}
          onChange={e => setWordCount(Number(e.target.value))}
          min={100}
          max={3000}
          step={50}
          required
          disabled={loading}
        />
        <button type="submit" className="auth-btn" disabled={loading || !topic.trim()}>
          {loading ? "Generating..." : "Generate Article"}
        </button>
      </form>
      <ArticleDisplay loading={loading} article={article} error={error} />
    </div>
  );
}

export default ArticleForm;
