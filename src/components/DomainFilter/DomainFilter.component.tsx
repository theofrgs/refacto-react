import { useEffect, useState } from "react";

interface State {
  countries: string[];
  classifications: string[];
  subClassifications: string[];
}

interface Props {
  domains?: string[];
}

const DomainFilter = (props: Props) => {
  const [state, setState] = useState<State>({
    countries: [],
    classifications: [],
    subClassifications: [],
  });

  useEffect(() => {
    const domains = props?.domains ?? [];
    const countries: string[] = [];
    const classifications: string[] = [];
    const subClassifications: string[] = [];

    for (let i = 0; i < domains.length; i++) {
      if (countries.indexOf(domains[i].substring(0, 2)) <= 0) {
        countries.push(domains[i].substring(0, 2));
      }
      classifications.push(domains[i].substring(3, 5));
      let flag = false;
      for (let j = 0; j < subClassifications.length; j++) {
        if (subClassifications[j] === domains[i].substring(6)) {
          flag = true;
          break;
        }
      }
      if (!flag) {
        subClassifications.push(domains[i].substring(6));
      }
    }
    setState({
      countries: countries,
      classifications: classifications.filter((e, i, l) => l.indexOf(e) === i),
      subClassifications: subClassifications,
    });
  }, [props?.domains]);

  return (
    <>
      <select name="countries" multiple>
        {state.countries.map((country) => (
          <option value={country} key={country}>
            {country}
          </option>
        ))}
      </select>
      <select name="classifications" multiple>
        {state.classifications.map((classification) => (
          <option value={classification} key={classification}>
            {classification}
          </option>
        ))}
      </select>
      <select name="subClassifications" multiple>
        {state.subClassifications.map((subClassification) => (
          <option value={subClassification} key={subClassification}>
            {subClassification}
          </option>
        ))}
      </select>
    </>
  );
};

export default DomainFilter;
