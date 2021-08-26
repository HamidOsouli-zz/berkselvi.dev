/**
 * Check browser mobile or not.
 * Mobile -> true
 * Other -> false
 * @returns boolean
 */
window.mobileCheck = function () {
  let check = false;
  (function (a) {
    if (
      /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
        a
      ) ||
      /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
        a.substr(0, 4)
      )
    )
      check = true;
  })(navigator.userAgent || navigator.vendor || window.opera);
  return check;
};

// Variables
const contactModal = document.getElementById("contact-modal");
const contactBtn_1 = document.getElementById("contact-btn-1");
const contactBtn_2 = document.getElementById("contact-btn-2");
const contactBtn_cancel = document.getElementById("contact-btn-cancel");
const contactBtn_send = document.getElementById("contact-btn-send");
const form_email = document.getElementById("email");
const form_name = document.getElementById("name");
const form_message = document.getElementById("message");
const error_modal = document.getElementById("error-modal");
const success_modal = document.getElementById("success-modal");
const shareButton = document.querySelector("#share-button");
const clipboardText = document.getElementById("clipboard-input");
const clipboard_modal = document.getElementById("clipboard-modal");

/**
 * Opens modal with classes
 */
function openModal(modal) {
  modal.classList.remove("invisible");
  modal.classList.remove("opacity-0");
  modal.classList.add("opacity-100");
}

/**
 * Closes modal with classes
 */
function closeModal(modal) {
  modal.classList.remove("opacity-100");
  modal.classList.add("opacity-0");
  modal.classList.add("invisible");
}

/**
 * Contact me form submit event
 */
function submit() {
  // if inputs null
  if (
    form_email.value !== "" &&
    form_name.value !== "" &&
    form_message.value !== ""
  ) {
    // if there is error model, closed it.
    if (!error_modal.classList.contains("hidden")) {
      error_modal.classList.add("hidden");
    }
  } else {
    // something wrong, show the error and exit the func.
    error_modal.classList.remove("hidden");
    return;
  }

  // send mail with external mail app.
  sendMail(form_email.value, form_name.value, form_message.value);

  // action resulted with success.
  success_modal.classList.remove("hidden");
}

/**
 * Opens external mail app with subject etc.
 * @param {string} email
 * @param {string} name
 * @param {string} message
 */
function sendMail(email, name, message) {
  const _message = `${email}, ${name}, ${message}`.trim();
  const subject = `Contact request by ${name}`;

  // opens mail app.
  document.location.href =
    "mailto:berkslv@gmail.com?subject=" +
    encodeURIComponent(subject) +
    "&body=" +
    encodeURIComponent(_message);
}

/*
  Share API is only compatible with Safari and mobile Samsung browser.
 */

// Share API content.
const shareData = {
  title: "Berk Selvi's portfolio",
  url: "https://berkslv.github.io",
};

/**
 * Copy URL to the clipboard
 */
function copyToClipboard() {
  /* Select the text field */
  clipboardText.select();
  clipboardText.setSelectionRange(0, 99999); /* For mobile devices */

  /* Copy the text inside the text field */
  navigator.clipboard.writeText(clipboardText.value);

  openModal(clipboard_modal);

  setTimeout(() => {
    closeModal(clipboard_modal);
  }, 1800);
}

// Must be triggered some kind of "user activation"
shareButton.addEventListener("click", async () => {
  // IOS and mobile devices try to Share API
  if (navigator.share && window.mobileCheck()) {
    try {
      await navigator.share(shareData);
    } catch (err) {
      alert(err);
    }
  } else {
    copyToClipboard();
  }
});

// Events.
contactBtn_1.addEventListener("click", () => {
  openModal(contactModal);
});
contactBtn_2.addEventListener("click", () => {
  openModal(contactModal);
});
contactBtn_cancel.addEventListener("click", () => {
  closeModal(contactModal);
});
contactBtn_send.addEventListener("click", submit);
