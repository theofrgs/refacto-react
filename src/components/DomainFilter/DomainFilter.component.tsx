import { useEffect, useState } from "react";

interface State {
  name: string;
  delimiter: string;
  values: string[];
}

interface Props {
  domains?: string[];
  pattern: string;
}
function getSelectorFromPattern(pattern: string) {
  // Match  {...} => to get code
  const codeMatches = pattern.match(/{([^}]+)}/g);

  // everything outside the {...} => to get delimiter
  const delimiterMatches = pattern.match(/[^{}]+(?=\{|$)/g);
  const newSelector: State[] = [];
  if (codeMatches) {
    for (let i = 0; i < codeMatches.length; i++) {
      const delimiter = delimiterMatches ? delimiterMatches[i] : "";
      // We remove the {} from ex: {country code} and
      newSelector.push({
        name: codeMatches[i].slice(1, -1),
        delimiter,
        values: [],
      });
    }
  }
  return newSelector;
}
function getOptFromDomains(domains: string[], selectors: State[]) {
  domains?.forEach((domain) => {
    selectors.forEach((selector, index) => {
      let newValue = "";
      if (index === 0) {
        newValue = selector.delimiter
          ? domain.split(selector.delimiter)[0]
          : domain;
      } else {
        if (selector.delimiter) {
          newValue = domain
            .split(selectors[index - 1].delimiter)[1]
            .split(selector.delimiter)[0];
        } else newValue = domain.split(selectors[index - 1].delimiter)[1];
      }
      if (!selector.values.includes(newValue)) selector.values.push(newValue);
    });
  });
  return selectors;
}

const DomainFilter = ({ domains, pattern }: Props) => {
  const [selectors, setSelectors] = useState<State[]>([]);

  useEffect(() => {
    setSelectors(getOptFromDomains(domains!, getSelectorFromPattern(pattern)));
  }, [domains, pattern]);

  return (
    <div>
      {selectors.map((selector, index) => (
        <select name={selector.name} multiple key={index}>
          {selector.name}
          {selector.values.map((opt) => (
            <option value={opt} key={opt}>
              {opt}
            </option>
          ))}
        </select>
      ))}
    </div>
  );
};

export default DomainFilter;
