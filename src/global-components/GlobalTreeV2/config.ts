export interface Tree {
  id: number;
  label: string;
  children?: Tree[];
  visible?: boolean;
}