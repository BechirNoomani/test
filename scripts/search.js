const searchInput = document.getElementById("search");
const usernameCheckbox = document.getElementById("username");
const roleCheckbox = document.getElementById("role");
const roleSelect = document.getElementById("role-select");
const tableRows = document
  .getElementsByTagName("tbody")[0]
  .getElementsByTagName("tr");

function filterRows() {
  const searchQuery = searchInput.value.toLowerCase();
  const searchByUsername = usernameCheckbox.checked;
  const searchByRole = roleCheckbox.checked;
  const selectedRole = roleSelect.value.toLowerCase();

  for (let i = 0; i < tableRows.length; i++) {
    let row = tableRows[i];
    let username = row.getElementsByTagName("td")[0].innerText.toLowerCase();
    let role = row
      .getElementsByTagName("td")[3]
      .getElementsByTagName("select")[0]
      .value.toLowerCase();

    if (
      (!searchByUsername || username.indexOf(searchQuery) > -1) &&
      (!searchByRole || selectedRole === "all" || selectedRole === role)
    ) {
      row.style.display = "";
    } else {
      row.style.display = "none";
    }
  }
}

searchInput.addEventListener("keyup", filterRows);
usernameCheckbox.addEventListener("change", filterRows);
roleCheckbox.addEventListener("change", filterRows);
roleSelect.addEventListener("change", filterRows);

//menu dropdown
function toggleDD(myDropMenu) {
  document.getElementById(myDropMenu).classList.toggle("invisible");
}
function filterDD(myDropMenu, myDropMenuSearch) {
  var input, filter, ul, li, a, i;
  input = document.getElementById(myDropMenuSearch);
  filter = input.value.toUpperCase();
  div = document.getElementById(myDropMenu);
  a = div.getElementsByTagName("a");
  for (i = 0; i < a.length; i++) {
    if (a[i].innerHTML.toUpperCase().indexOf(filter) > -1) {
      a[i].style.display = "";
    } else {
      a[i].style.display = "none";
    }
  }
}
window.onclick = function (event) {
  if (
    !event.target.matches(".drop-button") &&
    !event.target.matches(".drop-search")
  ) {
    var dropdowns = document.getElementsByClassName("dropdownlist");
    for (var i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (!openDropdown.classList.contains("invisible")) {
        openDropdown.classList.add("invisible");
      }
    }
  }
};
