"use client";

import { useState } from "react";

export default function Home() {
  const [theme, setTheme] = useState("");
  const [haiku, setHaiku] = useState("");
  const [loading, setLoading] = useState(false);

  const generateHaiku = async () => {
    setLoading(true);
    setHaiku("");

    try {
      const response = await fetch('/api/generateHaiku', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ theme }),
      });

      const data = await response.json();
      setHaiku(data.haiku);
    } catch (error) {
      setHaiku("俳句の生成に失敗しました");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold mb-6">🌸 AI俳句ジェネレーター 🌸</h1>

      <input
        type="text"
        placeholder="テーマを入力（例：秋の空)"
        className="border p-2 rounded-2xl shadow-md w-80"
        value={theme}
        onChange={(e) => setTheme(e.target.value)}
      />

      <button
        onClick={generateHaiku}
        className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-2xl"
        disabled={loading}
      >
        {loading ? "生成中…" : "俳句を生成！"}
      </button>

      {haiku && (
        <div className="mt-8 p-4 bg-white shadow-lg rounded-2xl text-xl whitespace-pre-wrap">
          {haiku}
        </div>
      )}
    </div>
  );
}
