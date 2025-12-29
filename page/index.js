import { useState, useRef } from 'react';

export default function Home() {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const handleCapture = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setText('');

    const reader = new FileReader();
    reader.onload = async () => {
      const base64 = reader.result.split(',')[1];
      
      try {
        const response = await fetch('/api/read', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ image: base64, mediaType: file.type })
        });

        const data = await response.json();
        setText(data.text || 'Could not read text. Please try again.');
      } catch (err) {
        setText('Error reading image. Please try again.');
      }
      setLoading(false);
    };
    reader.readAsDataURL(file);
  };

  const readAloud = () => {
    if (!text) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.85;
    window.speechSynthesis.speak(utterance);
  };

  const stopReading = () => {
    window.speechSynthesis.cancel();
  };

  return (
    <div style={{ 
      padding: 24, 
      maxWidth: 600, 
      margin: '0 auto',
      fontFamily: 'system-ui, sans-serif'
    }}>
      <h1 style={{ fontSize: 32, textAlign: 'center', marginBottom: 24 }}>
        Text Reader
      </h1>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleCapture}
        style={{ display: 'none' }}
      />

      <button
        onClick={() => fileInputRef.current?.click()}
        disabled={loading}
        style={{
          width: '100%',
          padding: 24,
          fontSize: 28,
          backgroundColor: '#2563eb',
          color: 'white',
          border: 'none',
          borderRadius: 12,
          cursor: loading ? 'wait' : 'pointer',
          marginBottom: 24
        }}
      >
        {loading ? 'Reading...' : '📷 Take Photo of Text'}
      </button>

      {text && (
        <>
          <div style={{
            padding: 24,
            fontSize: 28,
            lineHeight: 1.6,
            backgroundColor: '#fffef0',
            border: '2px solid #333',
            borderRadius: 12,
            marginBottom: 24,
            whiteSpace: 'pre-wrap'
          }}>
            {text}
          </div>

          <div style={{ display: 'flex', gap: 12 }}>
            <button
              onClick={readAloud}
              style={{
                flex: 1,
                padding: 20,
                fontSize: 24,
                backgroundColor: '#16a34a',
                color: 'white',
                border: 'none',
                borderRadius: 12,
                cursor: 'pointer'
              }}
            >
              🔊 Read Aloud
            </button>
            <button
              onClick={stopReading}
              style={{
                padding: 20,
                fontSize: 24,
                backgroundColor: '#dc2626',
                color: 'white',
                border: 'none',
                borderRadius: 12,
                cursor: 'pointer'
              }}
            >
              ⏹ Stop
            </button>
          </div>
        </>
      )}
    </div>
  );
}
