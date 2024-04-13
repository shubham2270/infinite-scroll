import { useEffect, useState } from "react";

export const useInfiniteLoad = () => {
  const [data, setData] = useState({ next: "" });
  const [skillsList, setSkillsList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/ability/?limit=20&offset=20")
      .then((res) => res.json())
      .then((apiData) => {
        setData(apiData);
        setSkillsList(apiData?.results);
      });
  }, []);

  useEffect(() => {
    if (data) {
      const loadMoreContent = () => {
        setIsLoading(true);
        fetch(data.next)
          .then((res) => res.json())
          .then((apiData) => {
            setIsLoading(false);
            setSkillsList([...skillsList, ...apiData?.results]);
          });
      };

      const onScroll = () => {
        const scrolledTo = window.scrollY + window.innerHeight;
        const threshold = 300;
        const isReachBottom =
          document.body.scrollHeight - threshold <= scrolledTo;
        if (isReachBottom) {
          loadMoreContent();
        }
      };

      window.addEventListener("scroll", onScroll);
      return () => {
        window.removeEventListener("scroll", onScroll);
      };
    }
  }, [data.next, skillsList]);

  return { skillsList, isLoading };
};
