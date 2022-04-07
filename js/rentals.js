fetch("../data/rentals.json")
  .then(function (response) {
    return response.json();
  })
  .then(function (jsonObject) {
    console.log(jsonObject);
    const data = jsonObject;
    const dataTable = document.createElement("table");
    const thead = document.createElement("thead");
    const tbody = document.createElement("tbody");
    const div = document.querySelector(".rental");
    const vehicles = [
      "dioscooter",
      "metroscooter",
      "pcx150scooter",
      "pioneeratv",
      "wrangler2",
      "wrangler4",
    ];

    const titles = [
      "Max seating",
      "Half day with reservation",
      "Full day with reservation",
      "Half day without reservation",
      "Full day with reservation",
    ];

    const tags = ["maxpersons", "halfdayR", "fulldayR", "halfdayW", "fulldayW"];

    for (let i = 0; i < 7; i++) {
      if (i == 0) {
        const tr = document.createElement("th");
        tr.innerHTML = "Rental Data";
        thead.appendChild(tr);
      } else {
        const tr = document.createElement("th");
        tr.innerHTML = data[vehicles[i - 1]]["name"];
        thead.appendChild(tr);
      }
    }

    for (let i = 0; i < 5; i++) {
      const tr = document.createElement("tr");

      const td1 = document.createElement("td");
      td1.innerHTML = titles[i];
      tr.appendChild(td1);

      for (let y = 0; y < 6; y++) {
        const td = document.createElement("td");
        if (data[vehicles[y]][tags[i]] > 5) {
          td.innerHTML = "$" + data[vehicles[y]][tags[i]];
        } else {
          td.innerHTML = data[vehicles[y]][tags[i]];
        }
        tr.appendChild(td);
      }
      tbody.appendChild(tr);
    }

    dataTable.appendChild(thead);
    dataTable.appendChild(tbody);
    div.appendChild(dataTable);
  });
