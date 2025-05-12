import { useEffect, useRef, useState } from 'react';
import { Vehicle } from '@/types/vehicle';
interface InfiniteScrollProps {
  items: Vehicle[];
  renderItem: (item: Vehicle) => JSX.Element;
  loadMore: () => void;
  hasMore: boolean;
  isLoading: boolean;
}
const InfiniteScroll: React.FC<InfiniteScrollProps> = ({ items, renderItem, loadMore, hasMore, isLoading }) => {
  const observer = useRef<IntersectionObserver | null>(null);
  const lastElementRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (isLoading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        loadMore();
      }
    });
    if (lastElementRef.current) {
      observer.current.observe(lastElementRef.current);
    }
    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [isLoading, hasMore, loadMore]);
  return (
    <>
      {items.map((item, index) => {
        if (index === items.length - 1) {
          return (
            <div ref={lastElementRef} key={item.id || index}>
              {renderItem(item)}
            </div>
          );
        }
        return renderItem(item);
      })}
      {isLoading && <p>Carregando mais veículos...</p>}
      {!hasMore && <p>Não há mais veículos para carregar.</p>}
    </>
  );
};
export default InfiniteScroll;