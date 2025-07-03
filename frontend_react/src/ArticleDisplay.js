import React from "react";

/**
 * PUBLIC_INTERFACE
 * ArticleDisplay - displays either a loading state, an error, or the generated article content.
 * Used by ArticleForm after generation.
 */
function ArticleDisplay({ loading, article, error }) {
  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "1rem", fontSize: "1.15rem", color: "#64748b" }}>
        Generating article, please wait...
      </div>
    );
  }
  if (error && !loading) {
    // error shown in ArticleForm already
    return null;
  }
  if (article) {
    return (
      <div
        className="generated-article"
        style={{
          background: "var(--bg-secondary,#f8f9fa)",
          border: "1px solid var(--border-color,#e9ecef)",
          borderRadius: 10,
          padding: "2rem",
          margin: "2rem auto 0",
          maxWidth: 700,
          color: "var(--text-primary,#282c34)",
          boxShadow: "0 2px 8px 0 rgba(0,0,0,0.07)"
        }}
      >
        <h3 style={{ marginTop: 0, color: "#2563eb" }}>Generated Article</h3>
        <div style={{ whiteSpace: "pre-line", fontSize: "1.07em", lineHeight: 1.65 }}>
          {article}
        </div>
      </div>
    );
  }
  return null;
}

export default ArticleDisplay;
