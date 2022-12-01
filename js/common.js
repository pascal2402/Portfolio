/**
 * Load stored entries from local storage, if some are stored there.
 *
 * @returns {*[]|any} Stored entries from local storage or empty array, if no entries are present.
 */
 function loadStoredEntries() {
  var storedEntriesJson = localStorage.getItem("entries");
  if (storedEntriesJson) {
      var entries = JSON.parse(storedCountsJson);
      console.debug(`Count of loaded entries: ${entries.length}`);
      return entries;
  }

  return [];
}

/**
* Store entries in the local storage.
*
* @param entries Entries to store.
*/
function storeEntries(entries) {
  if (entries) {
      localStorage.setItem("entries", JSON.stringify(entries));
      console.debug(`Count of stored entries: ${entries.length}`);
  } else {
      console.error("No entries to store");
  }
}