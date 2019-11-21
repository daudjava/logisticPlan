$(document).ready(function() {
  // Handler for .ready() called.
  // Create a DataSet (allows two way data-binding)
  var today = vis.moment(vis.moment.utc().format('YYYY-MM-DDT00:00:00.000Z'));
  var start = today.clone();
  var end = today.clone().add(2, 'day');
  var customTime = today.clone().add(28, 'hour');
  var timelineUTC = '';
  var timelineLocal = '';
  var items = new vis.DataSet([
    { id: 1, content: 'item 1', start: today.clone().add(8, 'hour') },
    { id: 2, content: 'item 2', start: today.clone().add(16, 'hour') },
    { id: 3, content: 'item 3', start: today.clone().add(32, 'hour') }
  ]);

  // Create a timeline displaying in local time (default)
  let option1 = {
    editable: true,
    start: start,
    end: end,
    onMove: function(item, callback) {
      //when resize item
      callback(item); // send back adjusted new item
      console.log(timelineUTC.itemsData.get());
    }
  };

  let option2 = {
    editable: true,
    start: start,
    end: end,
    onMove: function(item, callback) {
      //when resize item
      callback(item); // send back adjusted new item
      console.log(timelineUTC.itemsData.get());
    }
  };
  // Create a timeline displaying in UTC
  const el1 = document.getElementById('utc');

  const el2 = document.getElementById('local');
  if (el1 != null) {
    console.log(el1);
    console.log('el1');
    timelineUTC = new vis.Timeline(el1, items, option2);
    timelineUTC.addCustomTime(customTime);
  } else {
    console.log(el2);
    console.log('el2');
    timelineLocal = new vis.Timeline(el2, items, option1);
    timelineLocal.addCustomTime(customTime);
  }
});
