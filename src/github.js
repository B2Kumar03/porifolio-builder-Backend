export const gihubData = async (userId) => {
  const url = `https://api.github.com/users/${userId}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log(data);
    return data
  } catch (err) {
    console.error('Fetch error:', err);
    return null;
  }
};
