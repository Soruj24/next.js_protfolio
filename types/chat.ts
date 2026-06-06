export interface Action {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  prompt: string;
}

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}
