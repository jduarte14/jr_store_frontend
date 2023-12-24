export const fetchData = async(url: string, method: string, bodyData: any)=> {
  try {
    const response = await fetch(url, {
      method: method,
      body: bodyData,
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    throw new Error(error.message);
  }
}


