export function getFilteredData(objectData, fromDate, toDate) {
  const filteredDate = objectData && Object.values(objectData)[1];
  const listedDate = filteredDate && Object.values(filteredDate)[0];
  return filtered(listedDate && listedDate, fromDate, toDate);
}

function filtered(date, fromDate, toDate) {
  const result =
    date &&
    Object.keys(date)
      .map((item) => item)
      .filter((date) => date >= fromDate && date <= toDate);

  const dateObject = date && Object.entries(date);
  return findObjectByKey(dateObject, result && result.map((key) => key));
}

function findObjectByKey(dateObject, keysToFilter) {
  return (
    dateObject &&
    dateObject.filter((item) =>
      Object.values(item).some((value) => keysToFilter.includes(value))
    )
  );
}
