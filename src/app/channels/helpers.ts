export const options = (user: string) => ({
  method: 'POST',
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  },
  body: JSON.stringify({ user }),
});

export async function handler(responce: Response): Promise<string> {
  const data = await responce.json();
  if (data && 'token' in data && typeof data.token === 'string')
    return data.token;
  throw new TypeError('No token');
} 