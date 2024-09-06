(function () {
  emailjs.init({
    publicKey: "G6iebST1f-50BXH6p",
  });
})();

const firstName = document.getElementById("firstName");
const secondName = document.getElementById("secondName");
const lastName = document.getElementById("lastName");
const userEmail = document.getElementById("email");
const buttonSumbit = document.querySelector(".submit-btn");
const spinner = document.querySelector(".loader");
const notificationMsg = document.querySelector(".notification-msg");

buttonSumbit.addEventListener("click", function (e) {
  e.preventDefault();
  const name = lastName.value;
  const email = userEmail.value;
  const userName =
    firstName.value + " " + secondName.value + " " + lastName.value;
  const loginDetail =
    userName
      .split(" ")
      .map((name) => {
        return name.slice(0, 2);
      })
      .join("") + "2024";
  const date = new Date();
  const completeDate = date.toLocaleDateString();
  const passwordString = userName.replace(/\s/g, "") + "123456789#@.+_-";
  let newPassword = "";
  for (let i = 0; i < 8; i++) {
    let randomIndex = Math.floor(Math.random() * passwordString.length);
    newPassword += passwordString[randomIndex];
  }

  const param = {
    uniqueCode: loginDetail,
    email: email,
    name: name,
    date: completeDate,
    password: newPassword,
  };

  const serviceId = "service_msxwzae";
  const templateId = "template_vyc4hxg";
  spinner.classList.add("show");
  emailjs.send(serviceId, templateId, param).then(function () {
    spinner.classList.remove("show");
    firstName.value = " ";
    secondName.value = " ";
    lastName.value = " ";
    userEmail.value = " ";
    notificationMsg.innerHTML = " ";
    notificationMsg.innerHTML += '<span class="success-msg">Email sent</span>';
    notificationMsg.classList.add("show");
    setTimeout(() => {
      notificationMsg.classList.remove("show");
    }, 2000);
  });
});
