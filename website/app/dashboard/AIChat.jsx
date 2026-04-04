'use client';
import { useState } from 'react';

export default function AIChat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages([...messages, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input })
      });
      const data = await res.json();
      
      if (res.ok) {
        setMessages(prev => [...prev, { role: 'ai', content: data.answer }]);
      } else {
        setMessages(prev => [...prev, { role: 'error', content: data.error || 'Erro na IA.' }]);
      }
    } catch (err) {
      setMessages(prev => [...prev, { role: 'error', content: 'Erro de conexão.' }]);
    }
    setLoading(false);
  };

  return (
    <div className="card" style={{ gridColumn: '1 / -1', borderLeft: '4px solid #6366f1', marginTop: '1rem' }}>
      <h3 style={{ marginBottom: '1rem' }}>🤖 Agente IA - Analista de Dados</h3>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
        Perunte qualquer coisa sobre o banco de dados (Jogadores, Times, Temporadas). 
        A IA usará o schema <strong>gold</strong> para te responder em tempo real.
      </p>

      <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '0.5rem', minHeight: '150px', maxHeight: '400px', overflowY: 'auto', marginBottom: '1rem' }}>
        {messages.length === 0 && <p style={{ color: 'var(--text-secondary)', textAlign: 'center', marginTop: '1rem' }}>Nenhuma pergunta ainda...</p>}
        {messages.map((m, i) => (
          <div key={i} style={{ marginBottom: '1rem', textAlign: m.role === 'user' ? 'right' : 'left' }}>
             <div style={{ 
               display: 'inline-block', 
               padding: '0.75rem', 
               borderRadius: '0.5rem', 
               maxWidth: '80%',
               background: m.role === 'user' ? '#6366f1' : 'rgba(255,255,255,0.1)',
               color: 'white',
               whiteSpace: 'pre-wrap'
             }}>
               <strong>{m.role === 'user' ? 'Você' : 'Agente IA'}:</strong><br/>
               {m.content}
             </div>
          </div>
        ))}
        {loading && <p style={{ color: '#6366f1', fontSize: '0.9rem' }}>IA pensando e consultando o Postgres...</p>}
      </div>

      <form onSubmit={sendMessage} style={{ display: 'flex', gap: '0.5rem' }}>
        <input 
          type="text" 
          value={input} 
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ex: Qual time teve mais posse de bola na última rodada?"
          style={{ flex: 1, padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--card-border)', background: 'rgba(0,0,0,0.5)', color: 'white' }}
          disabled={loading}
        />
        <button type="submit" disabled={loading} className="btn btn-primary" style={{ background: '#6366f1' }}>
          Enviar
        </button>
      </form>
    </div>
  );
}
