/**
   * Save the data contained in the form.
   *
   * @param id The ID of the count, if a count should be updated.
   */
 function save() {
  let entries = loadStoredEntries();
  const entry = getInputObject();
  console.log(entry);
  insertSorted(entries, entry)
  storeCounts(entries);
  console.debug('Entry saved');
}

/**
 * Search for an HTML input element by its ID and return the value.
 *
 * @param id The ID of the HTML input element.
 * @returns {undefined|*} The value of the HTML input element, if one with the given ID exists.
 */
function getInputObject() {
  const id = new Date().getTime();
  const value= document.getElementById('value');
  const date = document.getElementById('date');

  return {
    id: id,
    value: value.value,
    date: date.value
  };
}

/**
* Insert into a sorted array while keeping the sorting.
* 
* @param counts The entries array.
* @param count The entry object which should be inserted into the array.
*/
function insertSorted(entries, entry) {
  if (entries.length == 0){ 
    entries.push(count);
  }
  else {
    let i = 0;
    while (i < entries.length && entries[i].date > entry.date){ // search for place to insert
      i+=1
    }
    let insert_at = i;
    i = entries.length;
    while (i > insert_at){ // shift counts behind place to insert up (create space for the count that shall be inserted)
      entries[i] = entries[i-1];
      i-=1
    }
    entries[insert_at] = entry; // insert count into list at the right place
  }
}