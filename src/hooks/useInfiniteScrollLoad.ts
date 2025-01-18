import { useCallback, useEffect, useRef, useState } from "react";

/**
 * 無限スクロールによるデータのロードを行うカスタムフック
 *
 * 責務
 * - 無限スクロールによるデータのロードを行う。
 * - データのロード中かどうかを管理する。
 * - 全てのデータを読み込んだかどうかを管理する。
 * - データのロードを行うボタンのrefを提供する。
 *
 * @component
 * @param initialValues - 初期データ
 * @param pageSize - 1ページあたりのデータ数
 * @param action - データのロードを行う関数
 */
const useInfiniteScrollLoad = <T>(
  initialValues: T[],
  pageSize: number,
  action: (offset: number, per_page: number) => Promise<T[]>
) => {
  const scrollRef = useRef<HTMLButtonElement>(null);
  const currentOffsetRef = useRef<number | undefined>(0);
  const [values, setValues] = useState<T[]>(initialValues);
  const [isLoading, setIsLoading] = useState(false);
  const [allDataLoaded, setAllDataLoaded] = useState(false);

  const loadMore = useCallback(
    async (abortController?: AbortController) => {
      setIsLoading(true);
      if (currentOffsetRef.current === undefined) {
        setIsLoading(false);
        return;
      }
      try {
        const newOffset = (currentOffsetRef.current + 1) * pageSize;
        const response = await action(newOffset, pageSize);
        setValues((prev) => [...prev, ...response]);
        if (abortController?.signal.aborted) return;
        if (response.length < pageSize) {
          setAllDataLoaded(true);
          currentOffsetRef.current = undefined;
          return;
        }
        currentOffsetRef.current++;
      } catch (e) {
        console.log(e);
      } finally {
        setIsLoading(false);
      }
    },
    [action, pageSize]
  );

  useEffect(() => {
    const abortController = new AbortController();
    const element = scrollRef.current;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting && element?.disabled === false) {
        loadMore(abortController);
      }
    });
    if (element) observer.observe(element);
    return () => {
      abortController.abort();
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [loadMore]);

  return { values, scrollRef, isLoading, allDataLoaded };
};

export default useInfiniteScrollLoad;
