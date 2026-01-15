import React from "react";

interface Testimonial {
  name: string;
  role: string;
  content: string;
  avatar: string;
  color: string;
}

interface TestimonialCardProps {
  testimonial: Testimonial;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => {
  return (
    <div className="testimonial-card group p-8 rounded-[2rem] bg-white/[0.03] border border-white/10 hover:border-cyan-500/50 transition-all duration-500 backdrop-blur-3xl hover:bg-white/[0.05]">
      <div className="flex items-center space-x-4 mb-6">
        <div
          className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${testimonial.color} flex items-center justify-center text-white font-bold text-xl shadow-lg`}
        >
          {testimonial.avatar}
        </div>
        <div>
          <div className="text-white font-bold text-lg">{testimonial.name}</div>
          <div className="text-cyan-400 text-sm font-mono">{testimonial.role}</div>
        </div>
      </div>
      <p className="text-gray-400 leading-relaxed italic text-lg">
        &ldquo;{testimonial.content}&rdquo;
      </p>
      <div className="mt-6 flex text-yellow-500">
        {"★★★★★".split("").map((s, i) => (
          <span key={i}>{s}</span>
        ))}
      </div>
    </div>
  );
};

export default TestimonialCard;
