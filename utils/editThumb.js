function editThumb(obj, targetW, rss, sized) {
  // TODO: take targetW, targetH, and request the thumb for it (w/h)
  let thumbUrl = obj.thumb;
  let indexW = thumbUrl.lastIndexOf('-w') + 2;
  let indexH = thumbUrl.lastIndexOf('-h') + 2;
  let width = thumbUrl.slice(indexW, thumbUrl.indexOf('-', indexW));
  let height = thumbUrl.slice(indexH, thumbUrl.indexOf('-', indexH));
  let newWidth = targetW;
  let newHeight = Number.parseFloat((targetW * height) / width).toFixed(0);
  let newThumbUrl = thumbUrl.replace(
    '-w' + width + '-h' + height,
    '-w' + newWidth + '-h' + newHeight
  );

  let cdnUrl = `https://imagecdn.app/v2/image/${newThumbUrl}?width=${newWidth}${
    rss ? '&amp;' : '&'
  }height=${newHeight}`;
  // obj.thumb = newThumbUrl;

  // Remove duplicate substrings from the URL
  let basePrefix = 'https://imagecdn.app/v2/image/';
  let baseSuffix = `?width=${newWidth}${
    rss ? '&amp;' : '&'
  }height=${newHeight}`;
  let oldbaseSuffix = `?width=${width}&height=${height}`;
  let oldbaseSuffixEncoded = `?width=${width}&amp;height=${height}`;

  while (cdnUrl.startsWith(basePrefix)) {
    cdnUrl = cdnUrl.slice(basePrefix.length);
  }
  while (cdnUrl.endsWith(baseSuffix)) {
    cdnUrl = cdnUrl.slice(0, -baseSuffix.length);
  }
  while (cdnUrl.endsWith(oldbaseSuffix)) {
    cdnUrl = cdnUrl.slice(0, -oldbaseSuffix.length);
  }
  while (cdnUrl.endsWith(oldbaseSuffixEncoded)) {
    cdnUrl = cdnUrl.slice(0, -oldbaseSuffixEncoded.length);
  }

  cdnUrl = sized ? `${cdnUrl}` : `${basePrefix}${cdnUrl}${baseSuffix}`;
  obj.thumb = cdnUrl;
  // console.log('obj.thumb: ', obj.thumb);
  return { obj: obj, newHeight: newHeight, newWidth: newWidth };
}

export { editThumb };
