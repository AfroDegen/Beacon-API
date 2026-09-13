import { getObservation } from "./observer";

async function run() {
  const observation =
    await getObservation(
      "water damage restoration austin"
    );

  console.log(
    JSON.stringify(
      observation,
      null,
      2
    )
  );
}

run();
