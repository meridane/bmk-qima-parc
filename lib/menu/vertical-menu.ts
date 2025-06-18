export type MenuProps = {
  title: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  children?: MenuProps[];
  menuSectionStyles?: {
    root?: object;
  };
};
