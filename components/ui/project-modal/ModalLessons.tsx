interface ModalLessonsProps {
  lessonsLearned: string[];
  futureImprovements: string[];
}

export default function ModalLessons({ lessonsLearned, futureImprovements }: ModalLessonsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-white/10">
      <div>
        <h3 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4">📚 Lessons Learned</h3>
        <div className="space-y-2">
          {lessonsLearned.map((lesson, index) => (
            <div
              key={index}
              className="flex items-start space-x-2 sm:space-x-3 p-2 sm:p-3 bg-white/5 rounded-xl sm:rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300"
            >
              <span className="text-yellow-400 mt-0.5 text-sm">💡</span>
              <p className="text-gray-300 text-xs sm:text-sm break-words">{lesson}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4">🔮 Future Improvements</h3>
        <div className="space-y-2">
          {futureImprovements.map((improvement, index) => (
            <div
              key={index}
              className="flex items-start space-x-2 sm:space-x-3 p-2 sm:p-3 bg-white/5 rounded-xl sm:rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300"
            >
              <span className="text-green-400 mt-0.5 text-sm">🚀</span>
              <p className="text-gray-300 text-xs sm:text-sm break-words">{improvement}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
