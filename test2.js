localStorage.setItem('item_added_to_cart', 0);
function itemAddedToCart() {
  let userParsing = {};
  userParsing.id = window.localStorage.getItem('id');
  userParsing.start = window.localStorage.getItem('start');
  //   userParsing.id = window.localStorage.getItem('end');
  console.log(userParsing);
  console.log('userLoad');
  updateTimline(userParsing);
  //   pageClosed();
}

function pageClosed(ev) {
  if (localStorage.getItem('item_added_to_cart') == 1) {
    window.location.reload(true);
  }
}

function updateTimline(userParsing) {
  items.update({
    id: userParsing.id,
    start: userParsing.start
  });
}
window.addEventListener('storage', itemAddedToCart);
// console.log(el1);
// console.log('el1');
// timelineUTC = new vis.Timeline(el1, userParsing, option1);
// timelineUTC.addCustomTime(customTime);
// console.log(el2);
// console.log('el2');
// timelineLocal = new vis.Timeline(el2, userParsing, option1);
// timelineLocal.addCustomTime(customTime);
