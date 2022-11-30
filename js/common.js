/**
 * Load stored counts from local storage, if some are stored there.
 *
 * @returns {*[]|any} Stored counts from local storage or empty array, if no counts were present.
 */
 function loadStoredCounts() {
  var storedCountsJson = localStorage.getItem("counts");
  if (storedCountsJson) {
      var counts = JSON.parse(storedCountsJson);
      console.debug(`Count of loaded counts: ${counts.length}`);
      return counts;
  }

  return [];
}

/**
* Store counts in the local storage.
*
* @param counts Counts to store.
*/
function storeCounts(counts) {
  if (counts) {
      localStorage.setItem("counts", JSON.stringify(counts));
      console.debug(`Count of stored counts: ${counts.length}`);
  } else {
      console.error("No counts to store");
  }
}