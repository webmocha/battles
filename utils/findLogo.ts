import logos from "../logos.json";

interface LogoObject {
  packages: string[];
  logoUrl: string;
}

const findByPackageName = (
  collection: LogoObject[],
  name: string,
): LogoObject | undefined => {
  return collection.find((obj) => {
    return obj.packages.includes(name);
  });
};

const findLogo = (name: string): string | undefined => {
  const result = findByPackageName(logos, name);
  return result ? result.logoUrl : undefined;
};

export default findLogo;
