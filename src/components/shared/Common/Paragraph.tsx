interface ParagraphProps {
  className?: string;
  content?: string;
}

const Paragraph = ({ className = "", content = "N/A" }: ParagraphProps) => {
  return (
    <span className={`text-grey-950 dark:text-slate-300 font-normal font-inter text-lg ${className}`}>
      {content}
    </span>
  );
};

export default Paragraph;
