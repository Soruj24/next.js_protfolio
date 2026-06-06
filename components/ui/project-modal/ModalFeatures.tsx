interface ModalFeaturesProps {
  features: string[];
}

export default function ModalFeatures({ features }: ModalFeaturesProps) {
  return (
    <div>
      <h3 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4">✨ Features</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
        {features.map((feature, index) => (
          <div
            key={index}
            className="flex items-center space-x-2 sm:space-x-3 p-2 sm:p-3 bg-white/5 rounded-xl sm:rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300"
          >
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-cyan-400 rounded-full flex-shrink-0"></div>
            <span className="text-gray-300 text-sm sm:text-base break-words">{feature}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
