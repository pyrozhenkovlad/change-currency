import { useEffect } from "react";
import Layout from "../../components/Layout";
import { useCurrencies } from "../../hooks/useCurrencies";
import { useCurrencyStore } from "../../utils/currenciesStore";

export const Home = () => {
  const { isLoading, isError } = useCurrencies();

  const fetchedData = useCurrencyStore((state) => state.currencies);

  useEffect(() => {
    console.log("fetchedData", fetchedData);
  }, [fetchedData]);

  return (
    <Layout>
      {isLoading && <div>Loading...</div>}
      {isError && <div>Error</div>}
    </Layout>
  );
};
