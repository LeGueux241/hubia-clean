export function ChatMessage({
  role,
  content,
}: {
  role: "user" | "assistant";
  content: string;
}) {
  const isUser = role === "user";
  return (
    <div className={`w-full flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[80%] whitespace-pre-wrap rounded-2xl px-4 py-3 border ${
          isUser
            ? "bg-blue-600 text-white border-blue-600"
            : "bg-white text-gray-900 border-gray-200"
        }`}
      >
        {content}
      </div>
    </div>
  );
}