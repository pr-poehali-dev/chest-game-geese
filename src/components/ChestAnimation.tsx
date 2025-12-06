interface ChestAnimationProps {
  isOpening: boolean;
}

export default function ChestAnimation({ isOpening }: ChestAnimationProps) {
  return (
    <div className="relative w-48 h-48 flex items-center justify-center">
      <div className={`text-9xl transition-all duration-500 ${isOpening ? 'animate-bounce scale-110' : ''}`}>
        {isOpening ? '📦' : '🎁'}
      </div>
      {isOpening && (
        <>
          <div className="absolute top-0 left-0 text-4xl animate-ping">✨</div>
          <div className="absolute top-0 right-0 text-4xl animate-ping animation-delay-100">✨</div>
          <div className="absolute bottom-0 left-0 text-4xl animate-ping animation-delay-200">✨</div>
          <div className="absolute bottom-0 right-0 text-4xl animate-ping animation-delay-300">✨</div>
        </>
      )}
    </div>
  );
}
