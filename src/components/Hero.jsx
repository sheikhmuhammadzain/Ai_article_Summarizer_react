import { logo } from "../assets";
const Hero = () => {
  return (
    <header className="w-full flex justify-center items-center flex-col">
      <nav className="flex justify-between w-full items-center mb-10 pt-3">
        <img src={logo} alt="sumz_logo" className="w-28 object-contain" />
        <button className="black_btn" onClick={() => window.open("")}>
          Github Repo
        </button>
      </nav>
      <h1 className="head_text animate-pulse">
        Summarize Articles with <br className="max:md hidden" />{" "}
        <span className=" orange_gradient">Sheikhoo.ai</span>
      </h1>
      <h2 className="desc">
        Enter the Url of the website to Summarize its articles
      </h2>
    </header>
  );
};

export default Hero;
