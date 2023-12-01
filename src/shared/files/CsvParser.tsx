import Papa from "papaparse";
import { useEffect } from "react";
import Helicopter from "../../components/Helicopters/Helicopter";

interface CsvParserProps {
  file: File | null;
  onParse: (data: Helicopter[]) => void;
}

const CsvParser = ({ file, onParse }: CsvParserProps) => {
  useEffect(() => {
    const parseCsv = (file: File) => {
      Papa.parse(file, {
        download: true,
        header: true,
        complete: (result) => {
          onParse(result.data as Helicopter[]);
        },
      });
    };

    if (file) {
      parseCsv(file);
    }
  }, [file, onParse]);

  return null;
};

export default CsvParser;
