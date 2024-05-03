```
const CAT_FACT_URL = "https://cat-fact.herokuapp.com/facts";

export type Fact = {
  _id: string;
  text: string;
  updatedAt: string; // Datetime
};

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
    </main>

  );
}

export default Home
```
