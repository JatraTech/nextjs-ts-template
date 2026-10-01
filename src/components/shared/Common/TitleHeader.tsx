import BackIcon from "./BackIcon";

interface TitleHeaderProps {
  className?: string;
  title?: string;
  back?: boolean;
  /** Page title level — default `1` for main page headings. */
  headingLevel?: 1 | 2;
}

const TitleHeader = ({
  className = "",
  title = "Demo Title",
  back = false,
  headingLevel = 1,
}: TitleHeaderProps) => {
  const Heading = headingLevel === 2 ? "h2" : "h1";

  return (
    <div className="flex items-center gap-2">
      {back ? <BackIcon /> : null}
      <Heading
        className={`m-0 text-grey-950 dark:text-slate-100 font-inter font-medium text-[30px] ${className}`}
      >
        {title}
      </Heading>
    </div>
  );
};

export default TitleHeader;
