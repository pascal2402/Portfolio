/**
 * Initialize the page. Will load all entries from the local storage and show them.
 */
 function initialize() {
  console.debug("Initializing list page")
  showEntries(loadStoredEntries());
}

/**
* Display the given entries in the entry list.
*
* @param entries The entries to show from the list.
*/
function showEntries(entries) {
  if (entries && entries.length !==0) { // if no entries are stored, nothing is displayed
      let firstRow =                  // first row is different to the others
      `                                                              
          <div class="entry-date">
          </div>
          <div class="entry-count">
          <div>
              <img src="img/counter_light.png"/>
          </div>
              <p>${String(entries[0].value).replace(".",",")} kWh</p>
          </div>
          <div class="entry-calc">
          <div>
            <img src="img/energy-consumption_light.png"/>
          </div>
          <div>
            <p class="entry-calc-kWh">
            ${String((entries[0].value - entries[entries.length-1].value).toFixed(2)).replace(".", ",")} kWh
            </p>
            <p class="entry-calc-period">
            ${formatDate(entries[entries.length-1].date)}-${formatDate(entries[0].date)}
            </p>
          </div>
          </div>
          <div class="entry-delete">
          </div>
      `
      let entryLi = document.createElement("li");
      entryLi.innerHTML = firstRow
      appendById("entries", entryLi);
      
      for (let i = 0; i < entries.length; i++) { 
          let entryHtmlContent = `  
          <div class="entry-date">
              <img src="img/calendar.png"/>
              <p>${formatDate(entries[i].date)}</p>
          </div>
          <div class="entry-count">
          <div>
              <img src="img/counter_dark.png"/>
          </div>
              <p>${String(entries[i].value).replace(".", ",")} kWh</p>
          </div>
          <div class="entry-calc">
              ${CalculateDiff(i, entries)}
          </div>
          </div>
          <div class="entry-delete">
              <img src="img/delete.png" onclick="deleteEntry('${entries[i].id}')"/>
          </div>
      `;

          entryLi = document.createElement("li");
          entryLi.innerHTML = entryHtmlContent
          appendById("entries", entryLi);
      }}
  else {
      console.error("No entries provided to be shown")
  }}

/**
* Safely append a new element to an element identified by its ID.
* @param id The ID of the parent element.
* @param elementToAppend The new element to append.
*/
function appendById(id, elementToAppend) {
  let element = document.getElementById(id);
  if (element) {
      element.append(elementToAppend);
  } else {
      console.error(`Element with ID not found: ${id}`);
  }}

/**
* Delete the entry with a certain ID.
*
* @param id The ID of the entry to delete.
*/
function deleteEntry(id) {
  console.debug(`Attempting to delete entry with ID: ${id}`);
  let entries = loadStoredEntries();
  if (entries && id) {
      for (let i = 0; i < entries.length; i++) {
          if (entries[i].id == id) {
              entries.splice(i, 1);
              storeEntries(entries);
              cleanEntryList();
              showEntries(entries);

              console.info(`Deleted entry with ID: ${id}`);

              break;
          }
      }
  } else {
      console.error("Invalid arguments to remove entry");
  }
}

/**
* Remove all entries from the entry list.
*/
function cleanEntryList() {
  let EntryList = document.getElementById("entries");
  if (EntryList) {
      EntryList.innerHTML = "";
      console.debug("Cleared entry list");
  } else {
      console.error("entry list not found");
  }
}

/**
* Properly format a date to be displayed.
*
* @param date The date to format.
* @returns {string} The formatted date.
*/
function formatDate(date) {
  date = new Date(date); 
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();

  if (day < 10) {
      day = '0' + day;
  }
  if (month < 10) {
      month = '0' + month;
  }

  const formattedDate = `${day}.${month}.${year}`;
  console.debug(`Formatted date is: ${formattedDate}`);
  return formattedDate;}


/**
* Calculate the difference between the array values and create the period.
* @param i Index of the current Array element.
* @param entries Array of Entries.
* @returns The formatted HTML content for the calculated column in the list.
*/
function CalculateDiff(i, entries) {
  if (i == entries.length - 1) {
      return "";
  } else {
      return `<div>
                  <img src="img/energy-consumption_dark.png"/>
              </div>
              <div> 
                  <p class="entry-calc-kWh">
                      ${String((entries[i].value - entries[i + 1].value).toFixed(2)).replace(".",",")} kWh
                  </p> 
                  <p class="entry-calc-period">
                  ${formatDate(entries[i+1].date)}-${formatDate(entries[i].date)}
                  </p>
              </div>`;
      }
    }