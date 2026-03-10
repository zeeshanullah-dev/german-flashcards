import { useState } from 'react';
import { motion } from 'framer-motion';
import { addCard, deleteCard, updateCard, exportCards, importCards, resetToDefaultVocabulary } from '../utils/storage';

const categories = ['Noun', 'Verb', 'Adjective', 'Phrase', 'Other'];
const articles = ['der', 'die', 'das'];

function CardManager({ cards, onUpdate }) {
  const [showForm, setShowForm] = useState(false);
  const [editingCard, setEditingCard] = useState(null);
  const [formData, setFormData] = useState({
    german: '',
    english: '',
    category: 'Noun',
    article: '',
    example: '',
    exampleTranslation: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingCard) {
      updateCard(editingCard.id, formData);
    } else {
      addCard(formData);
    }
    resetForm();
    onUpdate();
  };

  const handleEdit = (card) => {
    setEditingCard(card);
    setFormData({
      german: card.german,
      english: card.english,
      category: card.category,
      article: card.article || '',
      example: card.example || '',
      exampleTranslation: card.exampleTranslation || '',
    });
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this card?')) {
      deleteCard(id);
      onUpdate();
    }
  };

  const resetForm = () => {
    setFormData({
      german: '',
      english: '',
      category: 'Noun',
      article: '',
      example: '',
      exampleTranslation: '',
    });
    setEditingCard(null);
    setShowForm(false);
  };

  const handleExport = () => {
    const data = exportCards();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `german-flashcards-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        importCards(event.target.result);
        onUpdate();
        alert('Cards imported successfully!');
      } catch (error) {
        alert('Error importing cards. Please check the file format.');
      }
    };
    reader.readAsText(file);
  };

  const handleReset = () => {
    if (confirm('This will reset all cards to the default B1 vocabulary and clear your progress. Are you sure?')) {
      resetToDefaultVocabulary();
      onUpdate();
      alert('Vocabulary reset successfully! You now have all default B1 cards.');
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-white">Manage Cards</h2>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={handleReset}
            className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-4 py-2.5 rounded-xl font-bold transition-all transform hover:scale-105 shadow-lg text-sm"
          >
            🔄 Reset
          </button>
          <button
            onClick={handleExport}
            className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-4 py-2.5 rounded-xl font-bold transition-all transform hover:scale-105 shadow-lg text-sm"
          >
            📥 Export
          </button>
          <label className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-4 py-2.5 rounded-xl font-bold transition-all transform hover:scale-105 shadow-lg cursor-pointer text-sm inline-block">
            📤 Import
            <input
              type="file"
              accept=".json"
              onChange={handleImport}
              className="hidden"
            />
          </label>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-5 py-2.5 rounded-xl font-bold transition-all transform hover:scale-105 shadow-lg text-sm"
          >
            {showForm ? '❌ Cancel' : '➕ Add Card'}
          </button>
        </div>
      </div>

      {/* Form */}
      {showForm && (
        <motion.form
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl p-6 mb-6 space-y-4 shadow-xl border border-purple-100"
        >
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                German Word *
              </label>
              <input
                type="text"
                required
                value={formData.german}
                onChange={(e) =>
                  setFormData({ ...formData, german: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="e.g., Haus"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                English Translation *
              </label>
              <input
                type="text"
                required
                value={formData.english}
                onChange={(e) =>
                  setFormData({ ...formData, english: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="e.g., house"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Article (for nouns)
              </label>
              <select
                value={formData.article}
                onChange={(e) =>
                  setFormData({ ...formData, article: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="">None</option>
                {articles.map((art) => (
                  <option key={art} value={art}>
                    {art}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Example Sentence (German)
            </label>
            <input
              type="text"
              value={formData.example}
              onChange={(e) =>
                setFormData({ ...formData, example: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="e.g., Ich wohne in einem großen Haus."
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Example Translation (English)
            </label>
            <input
              type="text"
              value={formData.exampleTranslation}
              onChange={(e) =>
                setFormData({ ...formData, exampleTranslation: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="e.g., I live in a big house."
            />
          </div>

          <div className="flex gap-3 justify-end pt-2">
            <button
              type="button"
              onClick={resetForm}
              className="px-6 py-2.5 border-2 border-gray-300 rounded-xl font-bold hover:bg-gray-50 transition-all hover:scale-105"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl font-bold shadow-lg transition-all hover:scale-105"
            >
              {editingCard ? '✓ Update Card' : '+ Add Card'}
            </button>
          </div>
        </motion.form>
      )}

      {/* Cards List */}
      <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
        {cards.length === 0 ? (
          <div className="text-center bg-white/20 backdrop-blur rounded-2xl py-12 px-6">
            <div className="text-6xl mb-4">📝</div>
            <p className="text-xl font-bold text-white mb-2">No cards yet</p>
            <p className="text-purple-100 text-sm">Add your first vocabulary card to get started!</p>
          </div>
        ) : (
          cards.map((card) => (
            <motion.div
              key={card.id}
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="bg-white rounded-2xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between hover:shadow-xl transition-all hover:scale-[1.01] gap-3 border border-purple-50"
            >
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="font-bold text-lg text-gray-800">
                    {card.article && <span className="text-purple-600">{card.article} </span>}
                    {card.german}
                  </span>
                  <span className="text-gray-300">→</span>
                  <span className="text-gray-600">{card.english}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-purple-600 bg-purple-50 px-2 py-1 rounded-full">
                    {card.category}
                  </span>
                  {card.example && (
                    <span className="text-xs text-gray-500">• Has example</span>
                  )}
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(card)}
                  className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white rounded-xl font-bold transition-all transform hover:scale-105 shadow-md text-sm"
                >
                  ✏️ Edit
                </button>
                <button
                  onClick={() => handleDelete(card.id)}
                  className="px-4 py-2 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white rounded-xl font-bold transition-all transform hover:scale-105 shadow-md text-sm"
                >
                  🗑️
                </button>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}

export default CardManager;
