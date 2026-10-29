import { useEffect, useState } from "react";
import { copy, linkIcon, loader, tick } from "../assets";
import { useLazyGetSummaryQuery } from "../services/article";
const Demo = () => {
  const [article, setArticle] = useState({
    url: "",
    summary: "",
  });
  const [allArticles, setAllArticles] = useState([]);
  const [copied, setCopied] = useState("");
  const [getSummary, { error, isfetching }] = useLazyGetSummaryQuery();

  useEffect(() => {
    const articlesFromLocalStorage = JSON.parse(
      localStorage.getItem("articles")
    );
    if (articlesFromLocalStorage) {
      setAllArticles(articlesFromLocalStorage);
    }
  }, []);

  const handleClick = async (e) => {
    e.preventDefault();
    console.log("handleClick called");

    try {
      console.log("Fetching summary...");
      const result = await getSummary({
        articleUrl: article.url,
      });
      console.log("getSummary result:", result);

      const { data } = result;
      console.log("data:", data);

      if (data?.summary) {
        const newArticle = {
          ...article,
          summary: data.summary,
        };
        const updatedArticles = [newArticle, ...allArticles];
        setArticle(newArticle);
        setAllArticles(updatedArticles);
        localStorage.setItem("articles", JSON.stringify(updatedArticles));
      } else {
        console.log("No summary in data");
      }
    } catch (error) {
      console.error("Error fetching summary:", error);
    }
  };

  const handleCopy = (copyUrl) => {
    setCopied(copyUrl);
    navigator.clipboard.writeText(copyUrl);
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

  return (
    <section className="mt-16  w-full max-w-xl">
      <div className="flex flex-col w-full gap-2">
        <form
          action=""
          className="relative flex justify-center items-center "
          onSubmit={handleClick}
        >
          <img
            src={linkIcon}
            alt="link-icno"
            className=" absolute left-0  my-3 ml-2 w-5"
          />
          <input
            type="url"
            placeholder="Type the url "
            value={article.value}
            onChange={(e) => {
              setArticle({
                ...article,
                url: e.target.value,
              });
            }}
            required
            className="url_input peer"
          />
          <button
            type="submit"
            className="submit_btn peer-focus:border-gray-700
           peer-focus:text-gray-700
           active:bg-slate-100"
          >
            ↵
          </button>
        </form>
        {/* browser url history */}
        <div className="flex flex-col max-h-60 overflow-y-auto gap-1">
          {allArticles.map((article, i) => (
            <div
              className="link_card"
              key={`link${i}`}
              onClick={() => setArticle(article)}
            >
              <div className="copy_btn" onClick={() => handleCopy(article.url)}>
                <img
                  src={copied === article.url ? tick:copy}
                  alt="copyicon"
                  className="w-[40%] h-[40%] object-contain"
                />
              </div>
              <p className="flex-1 font-satoshi text-blue-700 font-medium text-sm truncate">
                {" "}
                {article.url}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="my-10 max-w-full flex justify-center items-center">
        {isfetching ? (
          <img src={loader} alt="loader" className="w-20 h-20 object-contain" />
        ) : error ? (
          <p className="font-inter font-medium text-black text-center">
            Well that was dont suppose to happen change the url may be
            <br />
            <span className="font-satoshi font-normal text-gray-700">
              {error?.data?.error}
            </span>
          </p>
        ) : (
          article.summary && (
            <div className="flex flex-col gap-3">
              <h2 className="font-satoshi font-bold text-gray-600 text-xl">
                Article<span className="blue_gradient ml-1">Summary</span>
              </h2>
              <div className="summary_box">
                <p className="font-inter font-medium text-sm text-gray-700">
                  {article.summary}
                </p>
              </div>
            </div>
          )
        )}
      </div>
    </section>
  );
};

export default Demo;
