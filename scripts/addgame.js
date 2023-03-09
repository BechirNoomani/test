particlesJS.load(
  "particles-js",

  "../particlesjs-config.json",
  function () {
    console.log("callback - particles-js config loaded");
  }
);
particlesJS("particles-js", {
  interactivity: {
    detect_on: "window", // "canvas" or "window"
  },
});
// validation control
const form = document.getElementById("my-form");

form.addEventListener("submit", (event) => {
  const engineSelect = document.getElementById("engine");
  const publisherSelect = document.getElementById("publisher");
  const EselectedValue = engineSelect.value;
  const PselectedValue = publisherSelect.value;

  switch (true) {
    case EselectedValue === "-" && PselectedValue === "-":
      event.preventDefault();
      alert("Please select a valid engine and publisher");
      break;
    case EselectedValue === "-":
      event.preventDefault();
      alert("Please select a valid engine");
      break;
    case PselectedValue === "-":
      event.preventDefault();
      alert("Please select a valid publisher");
      break;
  }
});

//devloper
const dsearchInput = document.querySelector("#developer-search");
const checkboxes = document.querySelectorAll('input[id="developer_id"]');
dsearchInput.addEventListener("input", function (e) {
  const searchValue = e.target.value.toLowerCase();
  checkboxes.forEach(function (checkbox) {
    const checkboxLabel = checkbox.nextElementSibling.textContent.toLowerCase();
    if (checkboxLabel.indexOf(searchValue) !== -1) {
      checkbox.closest("label").style.display = "block";
    } else {
      checkbox.closest("label").style.display = "none";
    }
  });
});

function adddeveloperInput() {
  const developerInputs = document.getElementById("developer-inputs");
  const newInput = document.createElement("div");
  newInput.classList.add("relative", "flex", "items-center", "mt-2");
  const input = document.createElement("input");
  input.type = "text";
  input.name = "developer_input[]";
  input.placeholder = "New developer";
  input.required = true;
  input.classList.add(
    "py-2",
    "px-3",
    "border",
    "w-30",
    "border-gray-300",
    "rounded-md",
    "focus:outline-none",
    "focus:ring-2",
    "focus:ring-indigo-400",
    "focus:border-transparent"
  );
  const removeButton = document.createElement("button");
  removeButton.type = "button";
  removeButton.innerHTML = "X";
  removeButton.classList.add("ml-2", "text-red-600", "font-bold");
  removeButton.addEventListener("click", function () {
    newInput.remove();
    dcheckRequired();
  });
  newInput.appendChild(input);
  newInput.appendChild(removeButton);
  developerInputs.appendChild(newInput);

  dcheckRequired();
}

function dcheckRequired() {
  const developerInputs = document.querySelectorAll(
    'input[name="developer-input"]'
  );
  const developerCheckboxes = document.querySelectorAll(
    'input[name="developer[]"]'
  );
  if (developerInputs.length === 0) {
    let gcheckedcounter = 0;
    developerCheckboxes.forEach((checkbox) => {
      if (checkbox.checked) {
        gcheckedcounter++;
      }
    });

    if (gcheckedcounter === 0) {
      developerCheckboxes[0].required = true;
    } else {
      developerCheckboxes.forEach((checkbox) => {
        checkbox.required = false;
      });
    }
  } else if (developerInputs.length === 1) {
    developerCheckboxes.forEach((checkbox) => {
      checkbox.required = false;
    });
    developerInputs[0].required = true;
  } else {
    developerInputs.forEach((input, index) => {
      if (index === 0) {
        input.required = true;
      } else {
        input.required = true;
      }
    });
    developerCheckboxes.forEach((checkbox) => {
      checkbox.required = false;
    });
  }
}
const developerCheckboxes = document.querySelectorAll(
  'input[name="developer[]"]'
);
developerCheckboxes.forEach((checkbox) => {
  checkbox.addEventListener("change", function () {
    dcheckRequired();
  });
});

// player prespective

const pseachInput = document.querySelector("#prespective-search");
const pcheckboxes = document.querySelectorAll('input[id="prespective_id"]');
pseachInput.addEventListener("input", function (e) {
  const searchValue = e.target.value.toLowerCase();
  pcheckboxes.forEach(function (checkbox) {
    const checkboxLabel = checkbox.nextElementSibling.textContent.toLowerCase();
    if (checkboxLabel.indexOf(searchValue) !== -1) {
      checkbox.closest("label").style.display = "block";
    } else {
      checkbox.closest("label").style.display = "none";
    }
  });
});

function addprespectiveInput() {
  const prespectiveInputs = document.getElementById("prespective-inputs");
  const newInput = document.createElement("div");
  newInput.classList.add("relative", "flex", "items-center", "mt-2");
  const input = document.createElement("input");
  input.type = "text";
  input.name = "prespective_input[]";
  input.placeholder = "New prespective";
  input.required = true;
  input.classList.add(
    "py-2",
    "px-3",
    "border",
    "w-30",
    "border-gray-300",
    "rounded-md",
    "focus:outline-none",
    "focus:ring-2",
    "focus:ring-indigo-400",
    "focus:border-transparent"
  );
  const removeButton = document.createElement("button");
  removeButton.type = "button";
  removeButton.innerHTML = "X";
  removeButton.classList.add("ml-2", "text-red-600", "font-bold");
  removeButton.addEventListener("click", function () {
    newInput.remove();
    pcheckRequired();
  });
  newInput.appendChild(input);
  newInput.appendChild(removeButton);
  prespectiveInputs.appendChild(newInput);

  pcheckRequired();
}

function pcheckRequired() {
  const prespectiveInputs = document.querySelectorAll(
    'input[name="prespective-input"]'
  );
  const prespectiveCheckboxes = document.querySelectorAll(
    'input[name="prespective[]"]'
  );
  if (prespectiveInputs.length === 0) {
    let gcheckedcounter = 0;
    prespectiveCheckboxes.forEach((checkbox) => {
      if (checkbox.checked) {
        gcheckedcounter++;
      }
    });

    if (gcheckedcounter === 0) {
      prespectiveCheckboxes[0].required = true;
    } else {
      prespectiveCheckboxes.forEach((checkbox) => {
        checkbox.required = false;
      });
    }
  } else if (prespectiveInputs.length === 1) {
    prespectiveCheckboxes.forEach((checkbox) => {
      checkbox.required = false;
    });
    prespectiveInputs[0].required = true;
  } else {
    prespectiveInputs.forEach((input, index) => {
      if (index === 0) {
        input.required = true;
      } else {
        input.required = true;
      }
    });
    prespectiveCheckboxes.forEach((checkbox) => {
      checkbox.required = false;
    });
  }
}
const prespectiveCheckboxes = document.querySelectorAll(
  'input[name="prespective[]"]'
);
prespectiveCheckboxes.forEach((checkbox) => {
  checkbox.addEventListener("change", function () {
    pcheckRequired();
  });
});

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

//**************************************** publisher*/
const publisherSelect = new Choices("#publisher", {
  searchEnabled: true,
  searchChoices: true,
  searchResultLimit: 10,
  renderChoice(item, escape) {
    if (item.value === "-") {
      return `
        <div class="choices__item choices__item--choice choices__item--disabled" data-select-text="${
          item.label
        }" role="option" aria-disabled="true">
          ${escape(item.label)}
        </div>
      `;
    }

    return `
      <div class="choices__item choices__item--choice" data-choice data-select-text="${
        item.label
      }" data-choice-selectable="${
      item.disabled ? "false" : "true"
    }" role="option">
        ${escape(item.label)}
      </div>
    `;
  },
  placeholder: true,
  placeholderValue: "Select Publisher",
  allowHTML: true,
  searchPlaceholderValue: null,
});

const newPublisherInput = document.getElementById("new-publisher-input");

publisherSelect.passedElement.element.addEventListener("change", (event) => {
  const selectedValue = event.target.value;
  if (selectedValue === "__add_publisher__") {
    newPublisherInput.classList.remove("hidden");
    newPublisherInput.querySelector("input").required = true;
    newPublisherInput.querySelector("input").disabled = false;
  } else {
    newPublisherInput.classList.add("hidden");
    newPublisherInput.querySelector("input").required = false;
    newPublisherInput.querySelector("input").disabled = true;
  }
});

// Hide the "Select Publisher" option by default
const selectPublisherOption = document.querySelector(
  "#publisher > option[value='-']"
);
selectPublisherOption.style.display = "none";

//**************************** engine********************************************** */
const engineSelect = new Choices("#engine", {
  searchEnabled: true,
  searchChoices: true,
  searchResultLimit: 10,
  placeholder: true,
  placeholderValue: "Select engine",
  searchPlaceholderValue: false,
  allowHTML: true,
  searchPlaceholderValue: null,
});

const newengineInput = document.getElementById("new-engine-input");

engineSelect.passedElement.element.addEventListener("change", (event) => {
  const selectedValue = event.target.value;
  if (selectedValue === "__add_engine__") {
    newengineInput.classList.remove("hidden");
    newengineInput.querySelector("input").required = true;
    newengineInput.querySelector("input").disabled = false;
  } else {
    newengineInput.classList.add("hidden");
    newengineInput.querySelector("input").required = false;
    newengineInput.querySelector("input").disabled = true;
  }
});
// ********************************************** Language ***********************************
const LsearchInput = document.querySelector("#language-search");
const Lcheckboxes = document.querySelectorAll('input[id="language_id"]');
LsearchInput.addEventListener("input", function (e) {
  const searchValue = e.target.value.toLowerCase();
  Lcheckboxes.forEach(function (checkbox) {
    const checkboxLabel = checkbox.nextElementSibling.textContent.toLowerCase();
    if (checkboxLabel.indexOf(searchValue) !== -1) {
      checkbox.closest("label").style.display = "block";
    } else {
      checkbox.closest("label").style.display = "none";
    }
  });
});

function addlanguageInput() {
  const languageInputs = document.getElementById("language-inputs");
  const newInput = document.createElement("div");
  newInput.classList.add("relative", "flex", "items-center", "mt-2");
  const input = document.createElement("input");
  input.type = "text";
  input.name = "language_input[]";
  input.placeholder = "New Language";
  input.required = true;
  input.classList.add(
    "py-2",
    "px-3",
    "border",
    "w-30",
    "border-gray-300",
    "rounded-md",
    "focus:outline-none",
    "focus:ring-2",
    "focus:ring-indigo-400",
    "focus:border-transparent"
  );
  const removeButton = document.createElement("button");
  removeButton.type = "button";
  removeButton.innerHTML = "X";
  removeButton.classList.add("ml-2", "text-red-600", "font-bold");
  removeButton.addEventListener("click", function () {
    newInput.remove();
    lcheckRequired();
  });
  newInput.appendChild(input);
  newInput.appendChild(removeButton);
  languageInputs.appendChild(newInput);

  lcheckRequired();
}

function lcheckRequired() {
  const languageInputs = document.querySelectorAll(
    'input[name="language-input"]'
  );
  const languageCheckboxes = document.querySelectorAll(
    'input[name="language[]"]'
  );
  if (languageInputs.length === 0) {
    let gcheckedcounter = 0;
    languageCheckboxes.forEach((checkbox) => {
      if (checkbox.checked) {
        gcheckedcounter++;
      }
    });

    if (gcheckedcounter === 0) {
      languageCheckboxes[0].required = true;
    } else {
      languageCheckboxes.forEach((checkbox) => {
        checkbox.required = false;
      });
    }
  } else if (languageInputs.length === 1) {
    languageCheckboxes.forEach((checkbox) => {
      checkbox.required = false;
    });
    languageInputs[0].required = true;
  } else {
    languageInputs.forEach((input, index) => {
      if (index === 0) {
        input.required = true;
      } else {
        input.required = true;
      }
    });
    languageCheckboxes.forEach((checkbox) => {
      checkbox.required = false;
    });
  }
}
const languageCheckboxes = document.querySelectorAll(
  'input[name="language[]"]'
);
languageCheckboxes.forEach((checkbox) => {
  checkbox.addEventListener("change", function () {
    lcheckRequired();
  });
});
//************************************************genre**************************** */
const gsearchInput = document.querySelector("#genre-search");
const Gcheckboxes = document.querySelectorAll('input[id="genre_id"]');
gsearchInput.addEventListener("input", function (e) {
  const searchValue = e.target.value.toLowerCase();
  Gcheckboxes.forEach(function (checkbox) {
    const checkboxLabel = checkbox.nextElementSibling.textContent.toLowerCase();
    if (checkboxLabel.indexOf(searchValue) !== -1) {
      checkbox.closest("label").style.display = "block";
    } else {
      checkbox.closest("label").style.display = "none";
    }
  });
});

function addgenreInput() {
  const genreInputs = document.getElementById("genre-inputs");
  const newInput = document.createElement("div");
  newInput.classList.add("relative", "flex", "items-center", "mt-2");
  const input = document.createElement("input");
  input.type = "text";
  input.name = "genre_input[]";
  input.placeholder = "New Genre";
  input.required = true;
  input.classList.add(
    "py-2",
    "px-3",
    "border",
    "w-30",
    "border-gray-300",
    "rounded-md",
    "focus:outline-none",
    "focus:ring-2",
    "focus:ring-indigo-400",
    "focus:border-transparent"
  );
  const removeButton = document.createElement("button");
  removeButton.type = "button";
  removeButton.innerHTML = "X";
  removeButton.classList.add("ml-2", "text-red-600", "font-bold");
  removeButton.addEventListener("click", function () {
    newInput.remove();
    gcheckRequired();
  });
  newInput.appendChild(input);
  newInput.appendChild(removeButton);
  genreInputs.appendChild(newInput);

  gcheckRequired();
}

function gcheckRequired() {
  const genreInputs = document.querySelectorAll('input[name="genre-input"]');
  const genreCheckboxes = document.querySelectorAll('input[name="genre[]"]');
  if (genreInputs.length === 0) {
    let gcheckedcounter = 0;
    genreCheckboxes.forEach((checkbox) => {
      if (checkbox.checked) {
        gcheckedcounter++;
      }
    });

    if (gcheckedcounter === 0) {
      genreCheckboxes[0].required = true;
    } else {
      genreCheckboxes.forEach((checkbox) => {
        checkbox.required = false;
      });
    }
  } else if (genreInputs.length === 1) {
    genreCheckboxes.forEach((checkbox) => {
      checkbox.required = false;
    });
    genreInputs[0].required = true;
  } else {
    genreInputs.forEach((input, index) => {
      if (index === 0) {
        input.required = true;
      } else {
        input.required = true;
      }
    });
    genreCheckboxes.forEach((checkbox) => {
      checkbox.required = false;
    });
  }
}
const genreCheckboxes = document.querySelectorAll('input[name="genre[]"]');
genreCheckboxes.forEach((checkbox) => {
  checkbox.addEventListener("change", function () {
    gcheckRequired();
  });
});

//*************************************************Platform */
const psearchInput = document.querySelector("#platform-search");
const Pcheckboxes = document.querySelectorAll('input[id="platform_id"]');
psearchInput.addEventListener("input", function (e) {
  const searchValue = e.target.value.toLowerCase();
  Pcheckboxes.forEach(function (checkbox) {
    const checkboxLabel = checkbox.nextElementSibling.textContent.toLowerCase();
    if (checkboxLabel.indexOf(searchValue) !== -1) {
      checkbox.closest("label").style.display = "block";
    } else {
      checkbox.closest("label").style.display = "none";
    }
  });
});

function addPlatformInput() {
  const platformInputs = document.getElementById("platform-inputs");
  const newInput = document.createElement("div");
  newInput.classList.add("relative", "flex", "items-center", "mt-2");
  const input = document.createElement("input");
  input.type = "text";
  input.name = "platform_input[]";
  input.placeholder = "New Platform";
  input.required = true;
  input.classList.add(
    "py-2",
    "px-3",
    "border",
    "w-30",
    "border-gray-300",
    "rounded-md",
    "focus:outline-none",
    "focus:ring-2",
    "focus:ring-indigo-400",
    "focus:border-transparent"
  );
  const removeButton = document.createElement("button");
  removeButton.type = "button";
  removeButton.innerHTML = "X";
  removeButton.classList.add("ml-2", "text-red-600", "font-bold");
  removeButton.addEventListener("click", function () {
    newInput.remove();
    checkRequired();
  });
  newInput.appendChild(input);
  newInput.appendChild(removeButton);
  platformInputs.appendChild(newInput);

  checkRequired();
}

function checkRequired() {
  const platformInputs = document.querySelectorAll(
    'input[name="platform-input"]'
  );
  const platformCheckboxes = document.querySelectorAll(
    'input[name="platform[]"]'
  );
  if (platformInputs.length === 0) {
    let checkedCount = 0;
    platformCheckboxes.forEach((checkbox) => {
      if (checkbox.checked) {
        checkedCount++;
      }
    });

    if (checkedCount === 0) {
      platformCheckboxes[0].required = true;
    } else {
      platformCheckboxes.forEach((checkbox) => {
        checkbox.required = false;
      });
    }
  } else if (platformInputs.length === 1) {
    platformCheckboxes.forEach((checkbox) => {
      checkbox.required = false;
    });
    platformInputs[0].required = true;
  } else {
    platformInputs.forEach((input, index) => {
      if (index === 0) {
        input.required = true;
      } else {
        input.required = true;
      }
    });
    platformCheckboxes.forEach((checkbox) => {
      checkbox.required = false;
    });
  }
}
const platformCheckboxes = document.querySelectorAll(
  'input[name="platform[]"]'
);
platformCheckboxes.forEach((checkbox) => {
  checkbox.addEventListener("change", function () {
    checkRequired();
  });
});
