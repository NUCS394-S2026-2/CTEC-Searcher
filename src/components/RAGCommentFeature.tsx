import { GoogleGenerativeAI } from '@google/generative-ai';
import { useState } from 'react';

interface RAGCommentProps {
  comments: { text: string }[];
  courseName: string;
}

export const RAGCommentFeature = ({ comments, courseName }: RAGCommentProps) => {
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'model'; content: string }[]>(
    [],
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    const userQuery = query.trim();
    setMessages((prev) => [...prev, { role: 'user', content: userQuery }]);
    setQuery('');
    setLoading(true);
    setError(null);

    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      console.log('API key started with:', apiKey?.slice(0, 8));

      if (!apiKey) {
        setError('Gemini API Key missing. Please check your .env file.');
        setLoading(false);
        return;
      }
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({
        model: 'gemini-2.5-flash',
        systemInstruction: `You are a helpful Northwestern student assistant answering questions about the course "${courseName}". Use ONLY the provided student review comments to answer the user's questions. If the answer is not in the comments, say "I couldn't find information about that in the reviews." Do not make up information outside of these comments.

Course Comments for Context:
${comments.map((c, i) => `[Comment ${i + 1}]: ${c.text}`).join('\n')}
`,
      });

      // Prepare conversation history
      const history = messages.map((m) => ({
        role: m.role,
        parts: [{ text: m.content }],
      }));

      const chat = model.startChat({ history });
      const result = await chat.sendMessage(userQuery);

      setMessages((prev) => [
        ...prev,
        { role: 'model', content: result.response.text() },
      ]);
    } catch (err) {
      console.error('Failed to query AI:', err);
      setError('Unable to answer your question at this time.');
    } finally {
      setLoading(false);
    }
  };

  if (!comments || comments.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-2xl border border-purple-100 shadow-sm p-6 mb-4">
      <h2 className="text-sm font-bold text-purple-800 mb-2 flex items-center gap-2">
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
          />
        </svg>
        Ask the Reviews (AI)
      </h2>
      <p className="text-xs text-gray-500 mb-4">
        Ask a specific question about the workload, exams, or teaching style, and our AI
        will summarize exactly what past students said.
      </p>

      {/* Chat History */}
      <div className="flex flex-col gap-3 mb-4 max-h-[300px] overflow-y-auto pr-1">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`text-sm p-3 rounded-2xl max-w-[90%] ${
              m.role === 'user'
                ? 'bg-purple-700 text-white self-end rounded-tr-sm'
                : 'bg-purple-50 text-purple-900 self-start rounded-tl-sm border border-purple-100'
            }`}
          >
            {m.content}
          </div>
        ))}
        {loading && (
          <div className="text-sm p-3 rounded-2xl max-w-[90%] bg-purple-50 text-purple-900 self-start rounded-tl-sm border border-purple-100 flex items-center gap-2">
            <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></span>
            <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
            <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
          </div>
        )}
        {error && <div className="text-xs text-red-500 text-center">{error}</div>}
      </div>

      {/* Input Box */}
      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="e.g., Are the tests difficult?"
          className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-xl focus:ring-purple-500 focus:border-purple-500 block p-3 pr-12"
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading || !query.trim()}
          className="absolute inset-y-0 right-0 flex items-center pr-3 group disabled:opacity-50"
        >
          <div className="bg-purple-600 p-1.5 rounded-lg group-hover:bg-purple-700 transition-colors">
            <svg
              className="w-4 h-4 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 12h14M12 5l7 7-7 7"
              />
            </svg>
          </div>
        </button>
      </form>
    </div>
  );
};
