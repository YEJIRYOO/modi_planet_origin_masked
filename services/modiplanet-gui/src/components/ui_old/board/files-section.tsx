import { useSaveFiles } from '@hooks/useSaveFiles';
import useTranslator from '@hooks/useTranslator';

interface IFilesSection {
  files: Array<
    | {
        url: string;
        name: string;
      }
    | null
    | undefined
  >;
}

export function FilesSection({ files }: IFilesSection) {
  const { t } = useTranslator();
  const saveFile = useSaveFiles();

  return (
    <div className="border-b border-form-border flex">
      <div>
        <span className="text-brand p5-sb p-[9px_24px] border border-brand rounded-8 whitespace-nowrap mr-[10px] sm:p-[8px_14px]">
          {t('ATTACHMENT')}
        </span>
      </div>
      <div>
        {files.map(
          (file, index) =>
            file && (
              <div
                key={index}
                className="flex items-center pb-6 p5-r  sm:pb-[15px]"
              >
                <p
                  role="button"
                  onClick={saveFile(file.url, file.name)}
                  className="inline-block overflow-hidden text-ellipsis whitespace-nowrap hover:underline"
                >
                  {file.name}
                </p>
              </div>
            ),
        )}
      </div>
    </div>
  );
}

export default FilesSection;
