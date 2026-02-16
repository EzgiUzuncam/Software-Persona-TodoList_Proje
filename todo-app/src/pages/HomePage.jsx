/**
 * HomePage
 * Ana sayfa - Todo uygulamasının merkez sayfası
 */
import React, { useState, useEffect } from 'react';
import { TodoForm } from '../components/TodoForm';
import { TodoList } from '../components/TodoList';

export function HomePage() {
  const [todos, setTodos] = useState([]);

  // Local Storage'dan verileri yükle
  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      try {
        const parsedTodos = JSON.parse(savedTodos).map(todo => ({
          ...todo,
          createdAt: new Date(todo.createdAt),
          updatedAt: new Date(todo.updatedAt),
        }));
        setTodos(parsedTodos);
      } catch (error) {
        console.error('Local Storage yükleme hatası:', error);
      }
    }
  }, []);

  // Local Storage'a kaydet
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  // Todo Ekleme (CREATE)
  const handleAddTodo = (data) => {
    const newTodo = {
      id: Date.now().toString(),
      title: data.title,
      description: data.description,
      isCompleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setTodos([newTodo, ...todos]);
  };

  // Todo Güncelleme (UPDATE)
  const handleUpdateTodo = (id, updates) => {
    setTodos(todos.map(todo => {
      if (todo.id === id) {
        return {
          ...todo,
          ...updates,
          updatedAt: new Date(),
        };
      }
      return todo;
    }));
  };

  // Todo Silme (DELETE)
  const handleDeleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const completedCount = todos.filter(todo => todo.isCompleted).length;
  const totalCount = todos.length;
  const progressPercentage = totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="max-w-5xl mx-auto px-4 py-12">
        {/* Header dengan Gradient Text */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="mb-4">
            <div className="inline-block bg-gradient-to-r from-blue-400 to-purple-400 p-3 rounded-full mb-4">
              <span className="text-3xl">✅</span>
            </div>
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-3">
            Smart Todo Manager
          </h1>
          <p className="text-gray-300 text-lg font-light">
            Üretkenliğinizi artırın - Modern, hızlı ve güvenli todo yönetimi
          </p>
        </div>

        {/* Stats Cards */}
        {totalCount > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 border border-blue-500/30 rounded-xl p-6 backdrop-blur-sm hover:border-blue-400/50 transition-all">
              <div className="text-blue-400 text-sm font-semibold mb-2">Toplam Görev</div>
              <div className="text-3xl font-bold text-white">{totalCount}</div>
            </div>
            <div className="bg-gradient-to-br from-green-500/20 to-green-600/20 border border-green-500/30 rounded-xl p-6 backdrop-blur-sm hover:border-green-400/50 transition-all">
              <div className="text-green-400 text-sm font-semibold mb-2">Tamamlanan</div>
              <div className="text-3xl font-bold text-white">{completedCount}</div>
            </div>
            <div className="bg-gradient-to-br from-orange-500/20 to-orange-600/20 border border-orange-500/30 rounded-xl p-6 backdrop-blur-sm hover:border-orange-400/50 transition-all">
              <div className="text-orange-400 text-sm font-semibold mb-2">İlerleme</div>
              <div className="text-3xl font-bold text-white">{progressPercentage}%</div>
            </div>
          </div>
        )}

        {/* Progress Bar */}
        {totalCount > 0 && (
          <div className="mb-8">
            <div className="bg-gray-700/40 rounded-full h-2 overflow-hidden border border-purple-500/20">
              <div 
                className="bg-gradient-to-r from-green-400 to-blue-400 h-full transition-all duration-500 ease-out"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
            <p className="text-gray-400 text-sm mt-2 text-center">
              {completedCount} / {totalCount} görev tamamlandı
            </p>
          </div>
        )}

        {/* Form Section */}
        <div className="mb-8 animate-fade-in">
          <TodoForm onAdd={handleAddTodo} />
        </div>

        {/* List Section */}
        <div className="animate-fade-in">
          <TodoList
            todos={todos}
            onUpdate={handleUpdateTodo}
            onDelete={handleDeleteTodo}
          />
        </div>

        {/* Footer */}
        <div className="mt-12 text-center border-t border-gray-700/50 pt-8">
          <p className="text-gray-400 text-sm mb-2">
            © 2026 Smart Todo Manager | Modern Web Geliştirme
          </p>
          <p className="text-gray-500 text-xs">
            React + Tailwind CSS + Vite
          </p>
        </div>
      </div>
    </div>
  );
}
