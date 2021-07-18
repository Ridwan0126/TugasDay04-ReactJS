let pageConfig = {
  showData: 4,
  currentPage: 1,
  buttonPerPage: 3,
};

let users = [
  { name: "Alfred Nobel", Pekerjaan: "Marketing", Kota: "Jakarta" },
  { name: "Antonio Meucci", Pekerjaan: "Admin", Kota: "Bogor" },
  { name: "Benjamin Franklin", Pekerjaan: "Admin", Kota: "Depok" },
  { name: "Abraham Lincoln", Pekerjaan: "Supervisor", Kota: "Depok" },
  { name: "Sir Isaac Newton", Pekerjaan: "Leader", Kota: "Jakarta" },
  { name: "Leonardo Davinci", Pekerjaan: "Marketing", Kota: "Bekasi" },
  { name: "Thomas Alfa Edison", Pekerjaan: "Leader", Kota: "Depok" },
  { name: "Albert Enstein", Pekerjaan: "Leader", Kota: "Jakarta" },
  { name: "Galileo Galilei", Pekerjaan: "Supervisor", Kota: "Bekasi" },
  { name: "Benjamin Franklin", Pekerjaan: "Marketing", Kota: "Tangerang" },
  { name: "Alexander Graham Bell", Pekerjaan: "Admin", Kota: "Bogor" },
  { name: "Nikola Tesla", Pekerjaan: "Marketing", Kota: "Depok" },
  { name: "Alesandro Volta", Pekerjaan: "Admin", Kota: "Jakarta" },
  { name: "Samuel Morse", Pekerjaan: "Admin", Kota: "Depok" },
  { name: "James Watt", Pekerjaan: "Leader", Kota: "Bogor" },
  { name: "Michael Faraday", Pekerjaan: "Leader", Kota: "Depok" },
  { name: "John Dalton", Pekerjaan: "Supervisor", Kota: "Bogor" },
  { name: "Alexander Graham Bell", Pekerjaan: "Supervisor", Kota: "Depok" },
  { name: "Antonie Lavaoiser", Pekerjaan: "Supervisor", Kota: "Bogor" },
  { name: "Bill Gates", Pekerjaan: "Admin", Kota: "Depok" },
  { name: "Hans Lippershey", Pekerjaan: "Admin", Kota: "Bekasi" },
  { name: "Hans von Ohain", Pekerjaan: "Leader", Kota: "Bekasi" },
  { name: "Karls Drais", Pekerjaan: "Leader", Kota: "Depok" },
  { name: "George de Hevesy", Pekerjaan: "Marketing", Kota: "Bekasi" },
  { name: "Michael Faraday", Pekerjaan: "Marketing", Kota: "Tangerang" },
  { name: "Benjamin Holt", Pekerjaan: "Admin", Kota: "Bekasi" },
  { name: "Cai Lun", Pekerjaan: "Leader", Kota: "Bekasi" },
  { name: "Cornelius van Drebbe", Pekerjaan: "Leader", Kota: "Depok" },
  { name: "C. Marconi", Pekerjaan: "Admin", Kota: "Depok" },
  { name: "Dmitri Mendeleev", Pekerjaan: "Admin", Kota: "Bekasi" },
];
let filteredUsers = [];
let updateStatus = false;

const generateTable = (data = users) => {
  let tbody = document.querySelector("table > tbody");
  let rows = "";

  let startIndex = (pageConfig.currentPage - 1) * pageConfig.showData;
  let endIndex = startIndex + pageConfig.showData;

  for (
    let index = startIndex;
    index < endIndex && index < data.length;
    index++
  ) {
    const user = data[index];

    rows += `
              <tr>
                  <td align="center">${index + 1}</td>
                  <td id="name_id" >${user.name}</td>
                  <td id="gender" >${user.Pekerjaan}</td>
                  <td id="address" >${user.Kota}</td>
                  <td>
                  <button class="button-flat" onclick="editRow(${index})">Edit</button>
                  </td>
                  <td>
                  <button class="button-flat-delete" onclick="deleteRow(${index})">Delete</button>
                  </td>
              </tr>
          `;
  }
  tbody.innerHTML = rows;
  generatePagination(data);
};

const generatePagination = (data) => {
  const pagination = document.querySelector("div.pagination");
  let panjangDataBaru = users.length;
  console.log("Panjang Data Baru:", panjangDataBaru);
  let buttonPage = "";
  let pageAwal = 1;
  let pageAkhir = pageConfig.buttonPerPage;
  const totalPage = Math.ceil(data.length / pageConfig.showData);
  const batas = Math.floor(pageConfig.buttonPerPage / 2);

  if (data.length < users.length) {
    if (data == "") {
      buttonPage = `<span class="btn btn btn-info" onClick=__init();
              >Data Not Found</span>`;
    } else {
      if (pageConfig.currentPage != 1)
        buttonPage += `<span class="page prev">Prev</span>`;

      for (let page = 1; page <= totalPage; page++) {
        let className = "page";
        if (pageConfig.currentPage == page) className = "page-active";

        buttonPage += `<span class="${className} btn btn-primary">${page}</span>`;
      }
      if (pageConfig.currentPage != totalPage)
        buttonPage += `<span class="page next">Next</span>`;
    }

    pagination.innerHTML = buttonPage;
    mapEvent();
  } else if (panjangDataBaru == 0) {
    console.log("Test Data");
    buttonPage = `<span class="btn btn btn-info" onClick= location.reload();
              >All Data Deleted Refresh The page </span>`;

    pagination.innerHTML = buttonPage;
    mapEvent();
  } else {
    if (pageConfig.currentPage - batas > 0) {
      if (pageConfig.currentPage + batas >= totalPage) {
        pageAwal = totalPage - pageConfig.buttonPerPage + 1;
        pageAkhir = totalPage;
      } else {
        pageAwal = pageConfig.currentPage - batas + 1;
        pageAkhir = pageConfig.currentPage + batas + 1;
      }
    }
    if (pageConfig.currentPage != 1)
      buttonPage += `<span class="page prev btn btn btn-info">Prev</span>`;

    for (let page = pageAwal; page <= pageAkhir; page++) {
      let className = "page";
      if (pageConfig.currentPage == page) className = "page-active";

      buttonPage += `<span class="${className} btn btn-primary">${page}</span>`;
    }

    if (pageConfig.currentPage != totalPage)
      buttonPage += `<span class="page next btn btn btn-info">Next</span>`;

    pagination.innerHTML = buttonPage;
    mapEvent();
  }
};

const goToPage = (e) => {
  const search = document.querySelector('input[name="search"]');

  if (e.classList.contains("prev")) pageConfig.currentPage--;
  else if (e.classList.contains("next")) pageConfig.currentPage++;
  else pageConfig.currentPage = e.innerText;

  if (search.value != "") generateTable(filteredUsers);
  else generateTable();
};

const mapEvent = () => {
  document.querySelectorAll("span.page").forEach((el) => {
    el.addEventListener("click", () => goToPage(el));
  });
};

const filterRow = (e) => {
  // filteredUsers = []
  // for (let index = 0; index < users.length; index++) {
  //     const user = users[index];

  //     if (user.name.toLocaleLowerCase().includes(e.value.toLocaleLowerCase()))
  //         filteredUsers.push(user)
  // }
  // generateTable(filteredUsers)

  // filter (array method) usage
  // filteredUsers = users.filter(user => user.name.toLocaleLowerCase().includes(e.value.toLocaleLowerCase()))
  // atau
  filteredUsers = users.filter((user) => {
    return user.name.toLocaleLowerCase().includes(e.value.toLocaleLowerCase());
  });
  generateTable(filteredUsers);
};

const addRow = () => {
  const tbody = document.querySelector("table > tbody");
  const input = document.querySelector("input");

  if (updateStatus) return alert("isi dulu input nya!!");

  const newRow = `
              <tr name"addRow">
              <td align="center">${users.length + 1}</td>
              <td>
                  <input type="text" name="name" />
              </td>
              <td>
                  <select name="Pekerjaan">
                      <option>Leader</option>
                      <option>Marketing</option>
                      <option>Admin</option>
                      <option>Supervisor</option>
                  </select>
              </td>
              <td>
                  <input type="text" name="Kota" />
              </td>
              <td>
              <input type="button" value="save" onclick="saveData()" ></input>
              </td>
              <td>
              <input type="button" value="cancel " onclick="location.reload()" ></input>
              </td>
              </tr>
          `;
  tbody.innerHTML = newRow + tbody.innerHTML;
  updateStatus = true;
};

const saveData = () => {
  const name = document.querySelector("input[name='name']");
  const Pekerjaan = document.querySelector("select[name='Pekerjaan']");
  const Kota = document.querySelector("input[name='Kota']");

  if (name.value == "" && address.value == "") {
    document.querySelector("button").focus();
    return alert("Isi formnya dulu Guys!!!");
  }

  users.push({
    name: name.value,
    Pekerjaan: Pekerjaan.value,
    Kota: Kota.value,
  });

  updateStatus = false;
  generateTable();
};

const updateData = (item) => {
  console.log(item);
  const name = document.querySelector("input[name='name']");
  const Pekerjaan = document.querySelector("select[name='Pekerjaan']");
  const Kota = document.querySelector("input[name='Kota']");

  console.log("cek");
  console.log(name.value);
  console.log(Pekerjaan.value);
  console.log(Kota.value);
  if (name.value == "" && address.value == "") {
    document.querySelector("button").focus();
    return alert("Isi formnya dulu ege!!");
  }

  users[item].name = name.value;
  users[item].Pekerjaan = Pekerjaan.value;
  users[item].Kota = Kota.value;

  console.log(users);
  updateStatus = false;
  generateTable();
};

const resetSearch = () => {
  document.querySelector('input[name="search"]').value = "";
};

const deleteRow = (item) => {
  users.splice(item, 1);
  generateTable();
};

const editRow = (item) => {
  var getResult = users[item];
  console.log(getResult);
  var index2 = item;
  var name = getResult.name;
  var Pekerjaan = getResult.Pekerjaan;
  var Kota = getResult.Kota;

  const tbody = document.querySelector("table > tbody");
  const input = document.querySelector("input");

  if (updateStatus) return alert("isi dulu inputnya guys!!");

  const editRow = `
              <tr>
              <td></td>
              <td>
              <input type="text" name="name" value="${name}" />
              </td>
              <td>
              <select name="Pekerjaan">
              <option>${Pekerjaan}</option>
  
              if(${Pekerjaan}==="Leader"){
                  <option value="Leader">Leader</option>
              }else{
                  <option value="Marketing">Marketing</option>
              }else{
                <option value="Admin">Admin</option>
            }else{
                <option value="Supervios">Supervisor</option>
            }
  
              </select>
              </td>
              <td>
              <input type="text" name="Kota" value="${Kota}" />
              </td>
              <td>
              <input type="button" value="update" onclick="updateData(${index2})" ></input>
              </td>
              </tr>
          `;
  tbody.innerHTML = editRow;

  updateStatus = true;

  console.log(name);
  console.log(Pekerjaan);
  console.log(Kota);
};

const __init = () => {
  generateTable();
  //   mapEventAddNew();
  resetSearch();
};
__init();
