interface HeadingProps {
  text: string | React.ReactNode;
  customStyle?: string;
}

export const Heading = ({ text, customStyle }: HeadingProps) => {
  return (
    <h1
      className={` ${
        customStyle ? customStyle : "text-[25px] text-black font-[700]"
      } `}
    >
      {text}{" "}
    </h1>
  );
};

export const SubHeading = ({ text, customStyle }: HeadingProps) => {
  return (
    <p className={` ${customStyle ? customStyle : "text-[15px]"} `}>{text}</p>
  );
};
