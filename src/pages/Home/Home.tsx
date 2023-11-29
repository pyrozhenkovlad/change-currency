import CustomTable from "../../components/CustomTable";
import Exchanger from "../../components/Exchanger";
import Layout from "../../components/Layout";
import { useCurrencies } from "../../hooks/useCurrencies";
import { useCurrencyStore } from "../../utils/currenciesStore";

export const Home = () => {
  const { isLoading, isError } = useCurrencies();

  const fetchedData = useCurrencyStore((state) => state.currencies);

  if (isError) return <div>Error</div>;
  if (isLoading) return <div>Loading...</div>;
  if (fetchedData.length < 1) return <div>Loading</div>;

  return (
    <Layout>
      <CustomTable currencies={fetchedData} />
      <Exchanger currencies={fetchedData} />
    </Layout>
  );
};
