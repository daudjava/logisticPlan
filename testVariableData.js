// $(document).ready(function() {
// });
// Handler for .ready() called.
// Create a DataSet (allows two way data-binding)
var today = vis.moment(vis.moment.utc().format('YYYY-MM-DDT00:00:00.000Z'));
var start = today.clone();
var end = today.clone().add(2, 'day');
var customTime = today.clone().add(28, 'hour');
var items = new vis.DataSet([
  { id: 1, content: 'item 1', start: today.clone().add(8, 'hour') },
  { id: 2, content: 'item 2', start: today.clone().add(16, 'hour') },
  { id: 3, content: 'item 3', start: today.clone().add(32, 'hour') }
]);

// Create a timeline displaying in local time (default)
let option1 = {
  editable: true,
  start: start,
  autoResize: true,
  end: end,
  onMove: function(item, callback) {
    //when resize item
    callback(item); // send back adjusted new item
    console.log(item);
    // timelineLocal.itemsData.update(items);
    // timelineLocal.redraw();
    // timelineUTC.redraw();
    localStorage.setItem('item_added_to_cart', 1);
    localStorage.setItem('id', item.id);
    localStorage.setItem('start', item.start);
    // localStorage.setItem('end', item.end);
  }
};

let option2 = {
  editable: true,
  start: start,
  autoResize: true,
  end: end,
  onMove: function(item, callback) {
    //when resize item
    callback(item); // send back adjusted new item
    console.log(item.id);

    localStorage.setItem('item_added_to_cart', 1);
    localStorage.setItem('id', item.id);
    localStorage.setItem('start', item.start);
    // timelineUTC.itemsData.update(items);
  }
};
// Create a timeline displaying in UTC
const el1 = document.getElementById('utc');

const el2 = document.getElementById('local');
if (el1 != null) {
  console.log(el1);
  console.log('el1');
  let timelineUTC = new vis.Timeline(el1, items, option1);
  timelineUTC.addCustomTime(customTime);
} else {
  console.log(el2);
  console.log('el2');
  let timelineLocal = new vis.Timeline(el2, items, option2);
  timelineLocal.addCustomTime(customTime);
}
// console.log(timelineLocal.itemsData);
// console.log(timelineUTC.itemsData);
// console.log('-----------------');
