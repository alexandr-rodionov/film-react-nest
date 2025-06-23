export const serializeArray = (v: any): string => {
  if (v === null || v === undefined) return '';
  return v.join(',');
};

export const deserializeArray = (v: any): string[] => {
  if (v === '' || v === null || v === undefined) return [];
  return v.split(',').map((i) => i.trim());
};
