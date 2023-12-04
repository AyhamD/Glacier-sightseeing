import Papa from "papaparse";
import { useEffect, useRef } from "react";
import Helicopter from "../../components/Helicopters/Helicopter";

interface CsvParserProps {
  file: File | null;
  hasParsed: React.MutableRefObject<boolean>;
  onParse: (data: Helicopter[]) => void;
}

const CsvParser = ({ hasParsed, file, onParse }: CsvParserProps) => {
  useEffect(() => {
    const parseCsv = (file: File) => {
      Papa.parse(file, {
        download: true,
        header: true,
        complete: (result) => {
          if (!hasParsed.current) {
            onParse(result.data as Helicopter[]);
            hasParsed.current = true; // to parse file just once
          }
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
