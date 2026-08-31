import { saveAs } from 'file-saver';

export const useSaveFiles = () => {
  const getFileExtension = (filename: string) => {
    const splittedNames = filename.split('.');
    return splittedNames[splittedNames.length - 1];
  };

  const saveFile = (url: string, filename: string) => {
    const extension = getFileExtension(filename);

    switch (extension) {
      case 'pdf':
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
        // pdf와 image 파일 등의 파일은 file-saver 사용
        // 미리보기가 있는 파일은 a태그 사용 시 브라우저가 다운로드 하지 않고 미리보기를 열기 때문
        return () =>
          fetch(url)
            .then((res) => res.blob())
            .then((blob) => {
              saveAs(blob, filename);
            });

      default:
        // 그 외 형식의 파일은 a태그 만들어서 다운로드
        // saveAs 사용 시 파일 용량이 커짐에 따라 파일 onload가 늦어지기 때문
        return () => {
          const a = document.createElement('a');
          a.href = url;
          a.download = filename;
          a.click();
        };
    }
  };

  return saveFile;
};
