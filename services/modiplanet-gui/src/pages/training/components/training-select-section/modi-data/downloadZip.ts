import JSZip from 'jszip';

const generateZipBlob = (zip: JSZip): Promise<Blob> => {
  return zip.generateAsync({ type: 'blob' });
};

export const downloadZip = (
  zip: JSZip,
  zipFileName: string,
  save: boolean = true,
): Promise<Blob | void> => {
  return generateZipBlob(zip).then((content) => {
    const url = URL.createObjectURL(content);

    if (save) {
      const link = document.createElement('a');
      link.href = url;
      link.download = zipFileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } else {
      return content;
    }
  });
};

export const downloadZipFromContent = (
  files: { name: string; content: string }[],
  zipFileName: string,
  save: boolean = true,
): Promise<Blob | void> => {
  const zip = new JSZip();

  files.forEach((file) => {
    zip.file(file.name, file.content);
  });

  return downloadZip(zip, zipFileName, save);
};

export const downloadZipFromFiles = (
  files: File[],
  zipFileName: string,
  save: boolean = true,
): Promise<Blob | void> => {
  const zip = new JSZip();

  files.forEach((file) => {
    zip.file(file.name, file);
  });

  return downloadZip(zip, zipFileName, save);
};
