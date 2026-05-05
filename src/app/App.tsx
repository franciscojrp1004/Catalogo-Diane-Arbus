import { FlipBook, CatalogPageData } from "./components/flip-book";
import { catalogPages } from "../data/catalog";

const pages = catalogPages;

export default function App() {
  return <FlipBook pages={catalogPages} />;
}
