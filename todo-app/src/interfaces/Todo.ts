/**
 * Todo Interface
 * Proje kapsamında kullanılan Todo veri yapısı
 */
export interface Todo {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}
