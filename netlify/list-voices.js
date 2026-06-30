exports.handler = async () => {
  const apiKey = process.env.ELEVENLABS_API_KEY;
  if (!apiKey) return { statusCode: 500, body: 'No API key' };

  try {
    const resp = await fetch('https://api.elevenlabs.io/v1/voices', {
      headers: { 'xi-api-key': apiKey }
    });
    const data = await resp.json();
    if (!resp.ok) {
      return { statusCode: resp.status, body: JSON.stringify(data) };
    }
    const simplified = (data.voices || []).map(v => ({ name: v.name, voice_id: v.voice_id }));
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(simplified, null, 2)
    };
  } catch (e) {
    return { statusCode: 500, body: e.message };
  }
};
