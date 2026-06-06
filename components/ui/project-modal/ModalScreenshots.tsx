interface ModalScreenshotsProps {
  screenshots: string[];
  title: string;
}

export default function ModalScreenshots({ screenshots, title }: ModalScreenshotsProps) {
  if (screenshots.length === 0) return null;

  return (
    <div>
      <h3 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4">📸 Screenshots</h3>
      <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 sm:gap-4">
        {screenshots.slice(0, 4).map((screenshot, index) => (
          <div
            key={index}
            className="aspect-video bg-white/5 rounded-xl sm:rounded-2xl border border-white/10 overflow-hidden"
          >
            <img
              src={screenshot}
              alt={`${title} screenshot ${index + 1}`}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
