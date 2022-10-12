let focusDropDown = "";
//Making global variables for the website
let index = 0;
let i;
let pics = document.getElementsByClassName("naturePics");


$("#conservTag").hover(
  function () {
    focusDropDown = "#conservation";
    $(focusDropDown).css("display", "block");
    $(focusDropDown).css("top", "65px");
    $(focusDropDown).css("left", "140px");
    $(focusDropDown).css("width", "185px");
    console.log("hi");
  },
  function () {
    $(focusDropDown).css("display", "none");
    focusDropDown = "";
  }
);

$("#conservation").hover(
  function () {
    focusDropDown = "#conservation";
    $(focusDropDown).css("display", "block");
  },
  function () {
    $(focusDropDown).css("display", "none");
    focusDropDown = "";
  }
);

$("#activeTag").hover(
  function () {
    focusDropDown = "#activities";
    $(focusDropDown).css("display", "block");
    $(focusDropDown).css("top", "65px");
    $(focusDropDown).css("left", "325px");
    $(focusDropDown).css("width", "135px");
    console.log("hiew");
  },
  function () {
    $(focusDropDown).css("display", "none");
    focusDropDown = "";
  }
);

$("#activities").hover(
  function () {
    focusDropDown = "#activities";
    $(focusDropDown).css("display", "block");
  },
  function () {
    $(focusDropDown).css("display", "none");
    focusDropDown = "";
  }
);



function getStarted() {
  for (i = 0; i < pics.length; i++) {
    pics[i].style.display = "none";
  }
  console.log(i);
  index++;
  if (index > pics.length) {
    index = 1;
  }

  pics[index - 1].style.display = "block";
  setTimeout(getStarted, 4000); // Change image every 4 seconds
}

function getPicture(num) {
  let k = 0;
  for (i = 0; i < pics.length; i++) {
    if (pics[i].style.display == "block") {
      pics[i].style.display = "none";
      k = i;
    }
  }

  if (num > 0) {
    index++;
    if (index > pics.length) {
      index = 1;
    }
    pics[index - 1].style.display = "block";
    //setTimeout(getStarted, 4000);
  } else {
    let a = k - 1;
    if (k - 1 < 0) {
      a = 2;
    }

    pics[a].style.display = "block";
    console.log(9);
  }
}
