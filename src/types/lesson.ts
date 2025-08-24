export interface Lesson {
  id: string;
  title: string;
  type: "video" | "quiz" | "interactive" | "article";
  duration: string;
  isCompleted: boolean;
  isActive: boolean;
}

export interface Chapter {
  id: string;
  title: string;
  lessons: Lesson[];
  isExpanded: boolean;
  progress: number;
}

export interface ChatMessage {
  type: "bot" | "user";
  text: string;
}
