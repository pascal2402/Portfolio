/**
   * Save the data contained in the form.
   *
   * @param id The ID of the count, if a count should be updated.
   */
 function save() {
  let counts = loadStoredCounts();
  const count = getInputObject();
  console.log(count);
  insertSorted(counts, count)
  storeCounts(counts);
  console.debug('Count saved');
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
* @param counts The counts array.
* @param count The count object which should be inserted into the array.
*/
function insertSorted(counts, count) {
  if (counts.length == 0){ 
    counts.push(count);
  }
  else {
    let i = 0;
    while (i < counts.length && counts[i].date > count.date){ // search for place to insert
      i+=1
    }
    let insert_at = i;
    i = counts.length;
    while (i > insert_at){ // shift counts behind place to insert up (create space for the count that shall be inserted)
      counts[i] = counts[i-1];
      i-=1
    }
    counts[insert_at] = count; // insert count into list at the right place
  }
}