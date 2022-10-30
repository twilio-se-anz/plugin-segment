const getTraitsForUser = async (userId: string) => {
  try {
    const url = `http://localhost:3000/segment/get-traits?userId=${userId}`;
    const config = {
      method: 'get',
      headers: {},
    };

    const response = await fetch(url, config);

    if (!response.ok) {
      throw new Error(
        `Error getting traits: ${response.status} - ${response.statusText}`
      );
    }

    const data = await response.json();

    return data.traits;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export { getTraitsForUser };
