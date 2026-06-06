interface ModalChallengesProps {
  challenges: string[];
  solutions: string[];
}

export default function ModalChallenges({ challenges, solutions }: ModalChallengesProps) {
  return (
    <div>
      <h3 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4">🎯 Challenges & Solutions</h3>
      <div className="space-y-2 sm:space-y-3">
        {challenges.slice(0, 3).map((challenge, index) => (
          <div key={index} className="bg-white/5 p-2 sm:p-3 rounded-xl sm:rounded-2xl border border-white/10">
            <div className="flex items-start space-x-2">
              <span className="text-red-400 mt-0.5 text-sm">⚡</span>
              <div className="min-w-0 flex-1">
                <p className="text-gray-300 text-xs sm:text-sm mb-1 break-words">{challenge}</p>
                <p className="text-cyan-400 text-xs break-words">{solutions[index]}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
