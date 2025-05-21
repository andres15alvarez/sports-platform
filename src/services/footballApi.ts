export const fetchFootballData = async (
  endpoint: string,
  params: Record<string, string> = {},
) => {
  const query = new URLSearchParams({ endpoint, ...params }).toString();

  const response = await fetch(`/api/football?${query}`);

  if (!response.ok) {
    throw new Error('Error al obtener datos del backend');
  }

  return await response.json();
};
