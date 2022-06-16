import { useRef, useEffect } from "react";
import useBlockNumber from "./useBlockNumber";

export default function useKeepSWRDataLiveAsBlocksArrive(
  mutate: () => Promise<any>
) {
  const mutateRef = useRef(mutate);

  useEffect(() => {
    mutateRef.current = mutate;
  });

  const { data } = useBlockNumber();

  useEffect(() => {
    mutateRef.current();
  }, [data]);
}
