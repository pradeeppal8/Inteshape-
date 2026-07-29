const BASE_URL = 'http://localhost:5000/api';

export const getSettings = async () => {
  const res = await fetch(`${BASE_URL}/settings`);
  const data = await res.json();
  if (!data.success) throw new Error(data.message);
  return data.data;
};

export const saveSettings = async (settings) => {
  const res = await fetch(`${BASE_URL}/settings`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(settings),
  });
  const data = await res.json();
  if (!data.success) throw new Error(data.message);
  return data.data;
};
