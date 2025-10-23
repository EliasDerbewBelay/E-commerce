export interface ButtonProps {
  title: string;
  style?: string;
  onAction?: () => void;
}

export interface LayoutProps {
  children: React.ReactNode;
}
