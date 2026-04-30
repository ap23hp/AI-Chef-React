import chefLogo from "../assets/images/cheflogo.png";

export default function Header() {
  const strip = "✦ drop the ingredients ✦ get the recipe ✦ let's cook ✦ drop the ingredients ✦ get the recipe ✦ let's cook ✦ ";

  return (
    <>
      <header>
        <img src={chefLogo} alt="AI Chef logo" />
        <h1>
          AI <em>Chef</em>
        </h1>
      </header>
      <div className="header-strip">
        <span className="strip-inner">
          {strip.repeat(4)}
        </span>
      </div>
    </>
  );
}
