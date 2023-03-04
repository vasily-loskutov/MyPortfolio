import React from "react";
import { Header, Footer } from "@components/Layout";
import Routing from "@components/Routing/routing";
import store, { persistor } from "@store/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "react-query";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});
function App() {
  return (
    <>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <PersistGate loading={null} persistor={persistor}>
            <Header />
            <Routing />
            <Footer />
          </PersistGate>
        </QueryClientProvider>
      </Provider>
    </>
  );
}

export default App;
