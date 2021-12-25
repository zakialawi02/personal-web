$(document).ready(function () {

  $('#menu').click(function () {
    $(this).toggleClass('fa-times');
    $('.navbar').toggleClass('nav-toggle');
  });

  $(window).on('load scroll', function () {

    $('#menu').removeClass('fa-times');
    $('.navbar').removeClass('nav-toggle');

    if ($(window).scrollTop() > 0) {
      $('header').addClass('sticky');
    } else {
      $('header').removeClass('sticky');
    }

    if ($(window).scrollTop() > 0) {
      $('.scroll-top').show();
    } else {
      $('.scroll-top').hide();
    }

    // scroll spy 

    $('section').each(function () {

      let top = $(window).scrollTop();
      let offset = $(this).offset().top - 200;
      let id = $(this).attr('id');
      let height = $(this).height();

      if (top > offset && top < offset + height) {
        $('.navbar a').removeClass('active');
        $('.navbar').find(`[href="#${id}"]`).addClass('active');
      }

    });

  });

  //-------------------------- smooth scrolling 

  $('a[href*="#"]').on('click', function (e) {

    $('html, body').animate({

        scrollTop: $($(this).attr('href')).offset().top,

      },
      500,
      'linear'
    );

  });

});

//---------------------------- typingg....
new TypeIt("#type1", {
    speed: 120,
    loop: true,
    waitUntilVisible: true,
  })
  .type("Not Designer", {
    delay: 400
  })
  .pause(500)
  .delete(12)
  .type("Not Developer", {
    delay: 400
  })
  .pause(500)
  .delete(13)
  .type("Human", {
    delay: 400
  })
  .pause(500)
  .delete(5)
  .type("Student", {
    delay: 400
  })
  .pause(500)
  .delete(7)
  .go();

new TypeIt("#type2", {
    speed: 120,
    loop: true,
    waitUntilVisible: true,
  })
  .type("Geomatic Engineer", {
    delay: 400
  })
  .pause(500)
  .delete(17)
  .type("Student", {
    delay: 400
  })
  .pause(500)
  .delete(7)
  .go();

// gsap
gsap.from("header", {
  opacity: 0,
  duration: 1,
  delay: .7,
  y: -50
});
gsap.from(".home-text h3", {
  opacity: 0,
  duration: 1,
  delay: 1.2,
  y: -50
});
gsap.from(".home-text h1", {
  opacity: 0,
  duration: 1,
  delay: 1.8,
  y: -45
});
gsap.from(".home-text h4", {
  opacity: 0,
  duration: 1,
  delay: 2.2,
  y: -30
});
gsap.from(".home-text p", {
  opacity: 0,
  duration: 1,
  delay: 3,
  y: -20
});
gsap.from(".home-text a", {
  opacity: 0,
  duration: 1,
  delay: 3.5,
  y: 50
});
gsap.from(".home-img", {
  opacity: 0,
  duration: 1,
  delay: 2.5,
  y: 50
});


// ----------------------- Gallery filter
//selecting all required elements
const filterItem = document.querySelector(".items");
const filterImg = document.querySelectorAll(".gallery .image");

window.onload = () => { //after window loaded
  filterItem.onclick = (selectedItem) => { //if user click on filterItem div
    if (selectedItem.target.classList.contains("item")) { //if user selected item has .item class
      filterItem.querySelector(".active").classList.remove("active"); //remove the active class which is in first item
      selectedItem.target.classList.add("active"); //add that active class on user selected item
      let filterName = selectedItem.target.getAttribute("data-name"); //getting data-name value of user selected item and store in a filtername variable
      filterImg.forEach((image) => {
        let filterImges = image.getAttribute("data-name"); //getting image data-name value
        //if user selected item data-name value is equal to images data-name value
        //or user selected item data-name value is equal to "all"
        if ((filterImges == filterName) || (filterName == "all")) {
          image.classList.remove("hide"); //first remove the hide class from the image
          image.classList.add("show"); //add show class in image
        } else {
          image.classList.add("hide"); //add hide class in image
          image.classList.remove("show"); //remove show class from the image
        }
      });
    }
  }
  for (let i = 0; i < filterImg.length; i++) {
    filterImg[i].setAttribute("onclick", "preview(this)"); //adding onclick attribute in all available images
  }
}

//fullscreen image preview function
//selecting all required elements
const previewBox = document.querySelector(".preview-box"),
  categoryName = previewBox.querySelector(".title p"),
  previewImg = previewBox.querySelector("img"),
  closeIcon = previewBox.querySelector(".icon"),
  shadow = document.querySelector(".shadow");

function preview(element) {
  //once user click on any image then remove the scroll bar of the body, so user can't scroll up or down
  document.querySelector("body").style.overflow = "hidden";
  let selectedPrevImg = element.querySelector("img").src; //getting user clicked image source link and stored in a variable
  let selectedImgCategory = element.getAttribute("data-name"); //getting user clicked image data-name value
  previewImg.src = selectedPrevImg; //passing the user clicked image source in preview image source
  categoryName.textContent = selectedImgCategory; //passing user clicked data-name value in category name
  previewBox.classList.add("show"); //show the preview image box
  shadow.classList.add("show"); //show the light grey background
  closeIcon.onclick = () => { //if user click on close icon of preview box
    previewBox.classList.remove("show"); //hide the preview box
    shadow.classList.remove("show"); //hide the light grey background
    document.querySelector("body").style.overflow = "auto"; //show the scroll bar on body
  }
}
// ------------------------- QUOTES
const quoteText = document.querySelector(".quote"),
  quoteBtn = document.querySelector("button"),
  authorName = document.querySelector(".name"),
  speechBtn = document.querySelector(".speech"),
  copyBtn = document.querySelector(".copy"),
  twitterBtn = document.querySelector(".twitter"),
  synth = speechSynthesis;

function randomQuote() {
  quoteBtn.classList.add("loading");
  quoteBtn.innerText = "Loading Quote...";
  fetch("http://api.quotable.io/random").then(response => response.json()).then(result => {
    quoteText.innerText = result.content;
    authorName.innerText = result.author;
    quoteBtn.classList.remove("loading");
    quoteBtn.innerText = "New Quote";
  });
}

speechBtn.addEventListener("click", () => {
  if (!quoteBtn.classList.contains("loading")) {
    let utterance = new SpeechSynthesisUtterance(`${quoteText.innerText} by ${authorName.innerText}`);
    synth.speak(utterance);
    setInterval(() => {
      !synth.speaking ? speechBtn.classList.remove("active") : speechBtn.classList.add("active");
    }, 10);
  }
});

copyBtn.addEventListener("click", () => {
  navigator.clipboard.writeText(quoteText.innerText);
});

twitterBtn.addEventListener("click", () => {
  let tweetUrl = `https://twitter.com/intent/tweet?url=${quoteText.innerText}`;
  window.open(tweetUrl, "_blank");
});

quoteBtn.addEventListener("click", randomQuote);