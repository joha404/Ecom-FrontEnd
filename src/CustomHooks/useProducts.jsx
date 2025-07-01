import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { getAllProduct } from "../api/product/product";

//customHook => share logic ? code js bytkrar
export default function useProducts() {
  const response = useQuery({
    queryKey: ["products"],
    queryFn: () => getAllProduct(),
    select: (data) => data.data.data, // hygelk param data => data.dataAxios.dataBackend => data ?? == dataBackend ==[{}]
  });
  return response;
}
