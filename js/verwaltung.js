/**
 * Initialize the page. Will load all counts from the local storage and show them.
 */
 function initialize() {
  console.debug("Initializing list page")
  showEntries(loadStoredEntries());
}

/**
* Display the given counts in the count list.
*
* @param counts The counts to show in the count list.
*/
function showEntries(entries) {
  if (entries && entries.length !==0) { // if no counts are stored, nothing is displayed
      let firstRow =                  // first row must be created different than the other ones
      `                                                              
          <div class="list-value-date">
          </div>
          <div class="list-value-counterstatus">
          <div>
              <img src="img/counter_light.png"/>
          </div>
              <p>${String(counts[0].value).replace(".",",")} kWh</p>
          </div>
          <div class="list-value-diff">
          <div>
            <img src="img/energy-consumption_light.png"/>
          </div>
          <div>
            <p class="list-value-diff-kWh">
            ${String((counts[0].value - counts[counts.length-1].value).toFixed(2)).replace(".", ",")} kWh
            </p>
            <p class="list-value-diff-period">
            ${formatDate(counts[counts.length-1].date)}-${formatDate(counts[0].date)}
            </p>
          </div>
          </div>
          <div class="list-value-delete">
          </div>
      `
      let countLi = document.createElement("li");
      countLi.innerHTML = firstRow
      appendById("counts", countLi);
      
      for (let i = 0; i < counts.length; i++) { // create list entry for every count in count array
          let countHtmlContent = `  
          <div class="list-value-date">
              <img src="img/calendar.png"/>
              <p>${formatDate(counts[i].date)}</p>
          </div>
          <div class="list-value-counterstatus">
          <div>
              <img src="img/counter_dark.png"/>
          </div>
              <p>${String(counts[i].value).replace(".", ",")} kWh</p>
          </div>
          <div class="list-value-diff">
              ${CalculateDiff(i, counts)}
          </div>
          </div>
          <div class="list-value-delete">
              <img src="img/delete.png" onclick="deleteCount('${counts[i].id}')"/>
          </div>
      `;

          countLi = document.createElement("li");
          countLi.innerHTML = countHtmlContent
          appendById("counts", countLi);
      }}
  else {
      console.error("No counts provided to be shown")
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
* Delete the count with the given ID.
*
* @param id The ID of the count to delete.
*/
function deleteCount(id) {
  console.debug(`Attempting to delete count with ID: ${id}`);
  let counts = loadStoredCounts();
  if (counts && id) {
      for (let i = 0; i < counts.length; i++) {
          if (counts[i].id == id) {
              counts.splice(i, 1);
              storeCounts(counts);
              cleanCountList();
              showCounts(counts);

              console.info(`Deleted count with ID: ${id}`);

              break;
          }
      }
  } else {
      console.error("Invalid arguments to remove count");
  }
}

/**
* Remove all counts from the count list.
*/
function cleanCountList() {
  let countList = document.getElementById("counts");
  if (countList) {
      countList.innerHTML = "";
      console.debug("Cleared count list");
  } else {
      console.error("count list not found");
  }
}

/**
* Properly format a date to be displayed.
*
* @param date The date to format.
* @returns {string} The formatted date.
*/
function formatDate(date) {
  date = new Date(date); // didn't work without creating new date
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
* @param i Index of the current Array item.
* @param counts Array of Counts.
* @returns The formatted HTML content for the difference column in the "Zaehlerstaende verwalten"-list.
*/
function CalculateDiff(i, counts) {
  if (i == counts.length - 1) {
      return "";
  } else {
      return `<div>
                  <img src="img/energy-consumption_dark.png"/>
              </div>
              <div> 
                  <p class="list-value-diff-kWh">
                      ${String((counts[i].value - counts[i + 1].value).toFixed(2)).replace(".",",")} kWh
                  </p> 
                  <p class="list-value-diff-period">
                  ${formatDate(counts[i+1].date)}-${formatDate(counts[i].date)}
                  </p>
              </div>`;
      }
    }