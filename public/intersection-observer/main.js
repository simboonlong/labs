const updateGuides = (entry) => {
  const id = entry.target.getAttribute("data-id");
  const guide = document.getElementById(id);
  guide.style.left = `${entry.rootBounds.left}px`;
  guide.style.top = `${entry.rootBounds.top}px`;
  guide.style.width = `${entry.rootBounds.width}px`;
  guide.style.height = `${entry.rootBounds.height}px`;
};

const callback = (entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      if (entry.intersectionRatio < 0.2) {
        console.log(entry.target.getAttribute("data-id"), ": enter partially");
      }

      // for 0.5 threshold demo purpose
      if (entry.intersectionRatio > 0.4 && entry.intersectionRatio < 0.6) {
        console.log(
          entry.target.getAttribute("data-id"),
          `: ${entry.intersectionRatio}`,
        );
      }

      if (entry.intersectionRatio === 1) {
        console.log(entry.target.getAttribute("data-id"), ": entered");
      }
    } else {
      if (entry.intersectionRatio > 0.8) {
        console.log(entry.target.getAttribute("data-id"), ": exit partially");
      }

      if (entry.intersectionRatio === 0) {
        console.log(entry.target.getAttribute("data-id"), ": exited");
      }
    }

    updateGuides(entry); // for visual demo purposes
  });
};

const root = null;

const rootMarginExampleA = "0px 0px 0px 0px";
const rootMarginExampleB = "-25% -25% -25% -25%";
const rootMarginExampleC = "-20px -20px -50% -30%";

const options = {
  root, // TODO: figure out what other use cases
  rootMargin: rootMarginExampleB,
  threshold: 1, // determines at which point on element intersected gets callback
};

document.querySelectorAll(".element").forEach((element, index) => {
  let opt = {
    ...options,
  };
  if (index === 0) {
    opt = {
      ...options,
      rootMargin: rootMarginExampleB,
    };
  } else {
    opt = {
      ...options,
      rootMargin: rootMarginExampleC,
    };
  } // feeling lazy, quick assign options
  const observer = new IntersectionObserver(callback, opt);
  observer.observe(element);
});
