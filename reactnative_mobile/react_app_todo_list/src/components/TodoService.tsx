const useTodoService = async (
  url: string,
  method: RequestInit["method"],
  headers: RequestInit["headers"],
  body: RequestInit["body"]
) => {
  var data = null;
  var loading = true;
  var error = null;

  try {
    const response = await fetch(url, { method, headers, body });
    const json = await response.json();
    data = json;
  } catch (responseError) {
    error = JSON.stringify(responseError);
  } finally {
    loading = false;
  }

  return { data, loading, error };
};

export default useTodoService;
