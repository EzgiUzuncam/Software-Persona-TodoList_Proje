/**
 * TodoItem Component
 * Tekil todo gösterimi ve güncelleme/silme işlemleri
 */
import React, { useState } from 'react';

export function TodoItem({ todo, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editDescription, setEditDescription] = useState(todo.description);

  const handleSaveEdit = () => {
    if (!editTitle.trim()) {
      alert('Başlık boş olamaz!');
      return;
    }

    onUpdate(todo.id, {
      title: editTitle.trim(),
      description: editDescription.trim(),
    });
    setIsEditing(false);
  };

  const handleToggleComplete = () => {
    onUpdate(todo.id, {
      isCompleted: !todo.isCompleted,
    });
  };

  return (
    <div className={`bg-gradient-to-r rounded-xl border transition-all duration-300 backdrop-blur-sm ${
      todo.isCompleted 
        ? 'from-gray-700/40 to-gray-800/40 border-green-500/20' 
        : 'from-gray-800/60 to-gray-900/60 border-purple-500/20 hover:border-purple-500/40'
    }`}>
      {isEditing ? (
        <div className="p-6 space-y-4">
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
          />
          <textarea
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all resize-none"
            rows="2"
          />
          <div className="flex gap-3">
            <button
              onClick={handleSaveEdit}
              className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-2 rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95"
            >
              ✓ Kaydet
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95"
            >
              ✕ İptal
            </button>
          </div>
        </div>
      ) : (
        <div className="p-6">
          <div className="flex items-start gap-4">
            <input
              type="checkbox"
              checked={todo.isCompleted}
              onChange={handleToggleComplete}
              className="mt-1 w-6 h-6 rounded-md bg-gray-700/50 border border-gray-600 cursor-pointer accent-green-500 transition-all duration-200"
            />
            <div className="flex-1">
              <h3 className={`font-bold text-lg transition-all duration-200 ${
                todo.isCompleted 
                  ? 'line-through text-gray-500' 
                  : 'text-white'
              }`}>
                {todo.title}
              </h3>
              {todo.description && (
                <p className={`text-sm mt-2 transition-all duration-200 ${
                  todo.isCompleted 
                    ? 'line-through text-gray-500' 
                    : 'text-gray-300'
                }`}>
                  {todo.description}
                </p>
              )}
              <p className="text-xs text-gray-500 mt-3">
                📅 {new Date(todo.createdAt).toLocaleDateString('tr-TR')} {new Date(todo.createdAt).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
            {todo.isCompleted && (
              <div className="text-2xl">✅</div>
            )}
          </div>

          <div className="flex gap-3 mt-4 pt-4 border-t border-gray-700/50">
            <button
              onClick={() => setIsEditing(true)}
              disabled={todo.isCompleted}
              className={`flex-1 py-2 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2 ${
                todo.isCompleted
                  ? 'bg-gray-700/30 text-gray-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white'
              }`}
            >
              ✏️ Düzenle
            </button>
            <button
              onClick={() => {
                if (window.confirm('Bu görevi silmek istediğinize emin misiniz?')) {
                  onDelete(todo.id);
                }
              }}
              className="flex-1 bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white font-semibold py-2 rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
            >
              🗑️ Sil
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
