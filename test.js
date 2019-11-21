localStorage.setItem('item_added_to_cart', 0);
function itemAddedToCart() {
  let userParsing = {};
  userParsing.id = window.localStorage.getItem('id');
  userParsing.start = window.localStorage.getItem('start');
  //   userParsing.id = window.localStorage.getItem('end');
  console.log(userParsing);
  console.log('userLoad');
  updateTimline(userParsing);
}

function updateTimline(userParsing) {
  items.update({
    id: userParsing.id,
    start: userParsing.start
  });
}
window.addEventListener('storage', itemAddedToCart);

// // console.log(window.localStorage.getItem('user'));

// console.log(items._data);
// console.log('items');

// const person = {
//   name: 'Obaseki Nosa',
//   location: 'Lagos'
// };

// const el1 = document.getElementById('utc');

// const el2 = document.getElementById('local');
// console.log(el1);
// console.log('el1');
// timelineUTC = new vis.Timeline(el1, items, option1);
// timelineUTC.addCustomTime(customTime);
// console.log(el2);
// console.log('el2');
// timelineLocal = new vis.Timeline(el2, items, option1);
// timelineLocal.addCustomTime(customTime);
