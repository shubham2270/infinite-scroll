import styles from './styles.module.css';
import { useInfiniteLoad } from "./useInfiniteLoad";

const InfiniteScroll = () => {
 const { skillsList, isLoading } = useInfiniteLoad();

  return (
    <div className={styles['container']}>
     <div className={styles['cardList']}>
       {skillsList?.map((data) => {
         return (
        <div className={styles['card']}>
         <div className={styles['text']}>{data?.name}</div>
        </div> )
       })}
     </div>
      {isLoading && <h3>Loading....</h3>}
    
    </div>
  );
};

export default InfiniteScroll;
