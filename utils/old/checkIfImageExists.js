async function isWorkingImage(url) {
  try {
    const response = await fetch(url, { method: 'HEAD', mode: 'no-cors' });
    if (response.ok) {
      const contentType = response.headers.get('Content-Type');
      const cacheStatus = response.headers.get('cf-cache-status');
      const status = response.headers.get('cf-status');
      const result =
        (response.status === 200 || response.status === 304) &&
        contentType.includes('image/') &&
        !cacheStatus?.includes('BYPASS') &&
        status !== '503';

      return {
        status: result,
        url: url
      };
    }
    return false;
  } catch (error) {
    console.error('isWorkingImage() error: ', isWorkingImage);
    return { status: false, url: url };
  }
}

export { isWorkingImage };
