import CustomTable from "../../components/CustomTable";
import Error from "../../components/Error";
import Exchanger from "../../components/Exchanger";
import Layout from "../../components/Layout";
import { useCurrencies } from "../../hooks/useCurrencies";
import { useCurrencyStore } from "../../store/currenciesStore";

export const Home = () => {
  const { isLoading, isError } = useCurrencies();
  const fetchedData = useCurrencyStore((state) => state.currencies);
  const currencyError = useCurrencyStore((state) => state.error);

  if (isError) return <div>Error</div>;
  if (isLoading) return <div>Loading...</div>;
  if (fetchedData.length < 1) return <div>Loading</div>;

  return (
    <Layout>
      {currencyError ? (
        <Error />
      ) : (
        <>
          <CustomTable currencies={fetchedData} />
          <Exchanger currencies={fetchedData} />
        </>
      )}
    </Layout>
  );
};
