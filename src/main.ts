const app = document.getElementById("app")!;
const textarea = document.getElementById("area")! as HTMLTextAreaElement;
const spans = document.getElementById("spansContainer")!;
const generateRandomNumber = (max: number) => Math.floor(Math.random() * max);
let currentText: string[] = [];
let currentSpan: number = 0;
let counter = 0;
let isWritting = false;

function interval() {
  const randomSelect = setInterval(() => {
    if (isWritting === true) {
      clearInterval(randomSelect);
      return;
    }
    const totalSpans = spans.children.length;
    const number = generateRandomNumber(totalSpans);
    if (counter === 25) {
      clearInterval(randomSelect);
      counter = 0;
    }
    if (totalSpans > 0) {
      spans.children[currentSpan].classList.remove("active");
      currentSpan = number;
      counter++;
      spans.children[number].classList.add("active");
    }
  }, 100);
}
const showSpans = (array: string[]) => {
  const test = array.map((el) => {
    if (el !== "" && el !== " ") return `<span>${el}</span>`;
  });
  spans.innerHTML = test.join("");
  
  
};
textarea.addEventListener("input", () => {
  counter = 0;
  currentSpan = 0;
  isWritting = true;
  currentText = textarea.value.split(",");
  
  

  showSpans(currentText);
});
textarea.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    textarea.value !== "" && textarea.value !== " " && interval();
    textarea.value = "";
    isWritting = false;
    e.preventDefault();
  }
});
