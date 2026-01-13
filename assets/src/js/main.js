import flatpickr from "flatpickr";

flatpickr(".datepicker", {
  dateFormat: "d_m_Y",
  altInput: true,
  altFormat: "d_m_Y",
  disableMobile: true,
  allowInput: false,

  monthSelectorType: "static",

  locale: {
    firstDayOfWeek: 1,
    weekdays: {
      shorthand: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
      longhand: [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
    },
    months: {
      shorthand: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      longhand: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
    },
  },

  prevArrow: '<img src="/img/svg/arrow-left.svg" class="fp-arrow">',
  nextArrow: '<img src="/img/svg/arrow-right.svg" class="fp-arrow">',

  defaultDate: null,
});

const inputs = document.querySelectorAll(".datepicker");
inputs.forEach((el) => {
  el.addEventListener("focus", () => {
    const alt = el.nextElementSibling;
    if (alt && alt.classList.contains("flatpickr-alt-input")) {
      alt.placeholder = el.dataset.placeholder;
    }
  });
});

const buttons = document.querySelectorAll(".view-switch__btn");
const posts = document.getElementById("posts");

buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    buttons.forEach((b) => b.classList.remove("is-active"));
    btn.classList.add("is-active");

    posts.classList.toggle("posts--cards", btn.dataset.view === "cards");
    posts.classList.toggle("posts--list", btn.dataset.view === "list");
  });
});

document.querySelectorAll(".date-clear").forEach((btn) => {
  btn.addEventListener("click", () => {
    const wrapper = btn.closest(".date-field");
    const fpInput = wrapper.querySelector(".flatpickr-input");

    if (fpInput && fpInput._flatpickr) {
      fpInput._flatpickr.clear();
    }
  });
});
