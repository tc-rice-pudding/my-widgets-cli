import type { Directive, DirectiveBinding } from "vue";

const DISTANCE = 200;
const DURATION = 500;

const map = new WeakMap();
const ob = new IntersectionObserver((entries) => {
  for (const entrie of entries) {
    console.log(entrie);
    if (entrie.isIntersecting) {
      const animation = map.get(entrie.target);
      animation.play();
      ob.unobserve(entrie.target);
    }
  }
});

function isBelowViewport(el) {
  const rect = el.getBoundingClientRect();
  return rect.top > window.innerHeight;
}

const slideIn: Directive = {
  mounted(el: HTMLElement) {
    if (!isBelowViewport(el)) return;

    const animation = el.animate(
      [
        {
          transform: `translateY(${DISTANCE}px)`,
          opacity: 0.5,
        },
        {
          transform: `translateY(0)`,
          opacity: 1,
        },
      ],
      {
        duration: DURATION,
        easing: "ease-out",
        fill: "forwards",
      }
    );
    map.set(el, animation);
    animation.pause();
    ob.observe(el);
  },
  unmounted(el: HTMLElement) {
    ob.unobserve(el);
  },
};

export default slideIn;
