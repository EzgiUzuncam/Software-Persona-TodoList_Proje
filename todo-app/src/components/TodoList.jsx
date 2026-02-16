/**
 * TodoList Component
 * Tüm todoları listeleme
 */
import React from 'react';
import { TodoItem } from './TodoItem';

export function TodoList({ todos, onUpdate, onDelete }) {
  if (todos.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <p className="text-gray-500 text-lg">
          📭 Henüz todo eklememişsiniz. Bir tane ekleyerek başlayın!
        </p>
      </div>
    );
  }

  const completedCount = todos.filter(todo => todo.isCompleted).length;

  if (todos.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-7xl mb-4">📭</div>
        <h3 className="text-2xl font-bold text-gray-200 mb-2">Henüz görev yok</h3>
        <p className="text-gray-400">Yukarıdan yeni bir görev ekleyerek başlayın!</p>
      </div>
    );
  }

  return (
    <div>
      <div className="bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-xl p-6 mb-8 backdrop-blur-sm">
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="text-2xl">📋</span>
          Görev Listesi
        </h2>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <p className="text-gray-400 text-sm">Toplam Görev</p>
            <p className="text-2xl font-bold text-blue-400">{todos.length}</p>
          </div>
          <div>
            <p className="text-gray-400 text-sm">Tamamlanan</p>
            <p className="text-2xl font-bold text-green-400">{completedCount}</p>
          </div>
          <div>
            <p className="text-gray-400 text-sm">Kalan</p>
            <p className="text-2xl font-bold text-orange-400">{todos.length - completedCount}</p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onUpdate={onUpdate}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
}
