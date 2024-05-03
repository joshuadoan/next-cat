import { Suspense } from "react";

const CAT_FACT_URL = "https://cat-fact.herokuapp.com/facts";

export type Fact = {
  _id: string;
  text: string;
  updatedAt: string; // Datetime
};

type GenericError = {
  statusText: string;
  status?: number;
};

enum ActionTypes {
  SET_DATA = "SET_DATA",
  SET_LOADING = "SET_LOADING",
  SET_ERROR = "SET_ERROR",
}

type AppState = {
  selectedFact: Fact | null,
  data: Fact[] | null;
  isLoading: boolean;
  error: GenericError | null;
}

type SetDataAction = {
  type: ActionTypes.SET_DATA
  payload: Fact[] | null,
}

type SetLoadingAction = {
  type: ActionTypes.SET_LOADING,
  payload: boolean,
}

type SetErrorAction = {
  type: ActionTypes.SET_ERROR,
  payload: GenericError | null,
}

type Action = SetDataAction | SetLoadingAction | SetErrorAction;

const defaultAppState: AppState = {
  selectedFact: null,
  data: null,
  isLoading: true,
  error: null,
}

async function fetchCatFact(): Promise<Fact[]> {
  const res = await fetch(CAT_FACT_URL);
  return res.json()
}

/**
 * The main component of the application.
 * It fetches cat facts from the API and displays them.
 */
async function Home() {
  const response = await fetchCatFact();

  return (
    <main className="p-24">
      <Suspense fallback={<p className="text-center">Loading...</p>}>
        <ul className="space-y-2">
          {
            // Map over the fetched data and create a list item for each fact.
            response?.map(fact => {
              // Return a JSX element representing a list item.
              return (
                <li key={fact._id}>
                  {fact.text} {" "}
                  <small>{new Date(fact.updatedAt).toLocaleDateString()}</small>
                </li>
              )
            })
          }
        </ul>
      </Suspense>
    </main>

  );
}

export default Home