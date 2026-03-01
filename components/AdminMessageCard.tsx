import { format } from "date-fns";

type Message = {
  _id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
};

export default function AdminMessageCard({ message }: { message: Message }) {
  return (
    <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/20">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-cyan-300">{message.name}</h3>
          <p className="text-gray-400">{message.email}</p>
        </div>
        <span className="text-xs text-gray-500">
          {format(new Date(message.createdAt), "MMM dd, yyyy HH:mm")}
        </span>
      </div>

      <p className="text-gray-300 leading-relaxed line-clamp-5">
        {message.message}
      </p>

      <div className="mt-6 flex gap-3">
        <a
          href={`mailto:${message.email}`}
          className="flex-1 py-2 text-center bg-cyan-600/20 text-cyan-400 rounded-lg hover:bg-cyan-600/30 transition"
        >
          Reply
        </a>
        <button className="flex-1 py-2 bg-white/10 rounded-lg text-gray-400 hover:bg-white/20 transition">
          Copy Email
        </button>
      </div>
    </div>
  );
}
