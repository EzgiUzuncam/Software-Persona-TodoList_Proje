/**
 * TodoForm Component
 * Yeni todo eklemek için form işleri
 */
import React, { useState } from 'react';

export function TodoForm({ onAdd }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!title.trim()) {
      alert('Lütfen başlık girin!');
      return;
    }

    onAdd({
      title: title.trim(),
      description: description.trim(),
    });

    setTitle('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-2xl border border-purple-500/20 p-8 mb-8 hover:border-purple-500/40 transition-all duration-300 shadow-2xl">
      <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
        <span className="text-2xl">📝</span>
        Yeni Görev Ekle
      </h2>
      
      <div className="mb-6">
        <label className="block text-gray-300 font-semibold mb-3 text-sm tracking-wide">
          Görev Başlığı
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Örn: Proje tamamla, Alışveriş yap..."
          className="w-full px-5 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 backdrop-blur-sm"
        />
      </div>

      <div className="mb-6">
        <label className="block text-gray-300 font-semibold mb-3 text-sm tracking-wide">
          Açıklama (İsteğe Bağlı)
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Detaylı açıklama yazın... (isteğe bağlı)"
          className="w-full px-5 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 backdrop-blur-sm resize-none"
          rows="3"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-purple-500/50 flex items-center justify-center gap-2"
      >
        <span className="text-xl">✨</span>
        Görevi Ekle
      </button>
    </form>
  );
}
