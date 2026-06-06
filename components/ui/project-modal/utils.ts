export function getCategoryGradient(category: string) {
  const gradients: Record<string, string> = {
    ai: "from-purple-500 to-pink-500",
    fullstack: "from-blue-500 to-cyan-500",
    mobile: "from-green-500 to-emerald-500",
    frontend: "from-orange-500 to-red-500",
    backend: "from-gray-600 to-blue-600",
    blockchain: "from-yellow-500 to-orange-500",
  };
  return gradients[category.toLowerCase()] || "from-cyan-500 to-blue-500";
}

export function getStatusColor(status: string) {
  const colors: Record<string, string> = {
    completed: "bg-green-500/20 text-green-400 border-green-500/30",
    "in-progress": "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  };
  return colors[status] || "bg-gray-500/20 text-gray-400";
}

export function getDifficultyColor(difficulty: string) {
  const colors: Record<string, string> = {
    beginner: "bg-green-500/20 text-green-400 border-green-500/30",
    intermediate: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    advanced: "bg-red-500/20 text-red-400 border-red-500/30",
  };
  return colors[difficulty] || "bg-gray-500/20 text-gray-400";
}
