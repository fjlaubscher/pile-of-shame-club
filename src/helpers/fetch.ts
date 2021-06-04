interface APIOptions {
  body?: any;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
}

const Fetch = async <T>(url: string, options: APIOptions) => {
  let errorMessage = '';

  try {
    const response = await fetch(url, {
      body: options.body ? JSON.stringify(options.body) : undefined,
      headers: { 'Content-Type': 'application/json' },
      method: options.method
    });
    const data = await response.json();

    if (response.ok) {
      return data.data as T;
    } else {
      errorMessage = data.message;
    }
  } catch (ex) {
    errorMessage = 'Unable to connect to Cloudfront Worker!';
  }

  if (errorMessage) {
    throw new Error(errorMessage);
  }
};

export default Fetch;
