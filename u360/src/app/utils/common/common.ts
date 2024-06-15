export const isScrollAtBottom = (event: Event) => {
  const element = event.target as HTMLElement;
  const atBottom = element.scrollHeight - element.scrollTop <= element.clientHeight;

  return atBottom;
};
