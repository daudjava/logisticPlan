$(document).ready(function() {
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
    end: end
  };

  let option2 = {
    editable: true,
    start: start,
    end: end,
    moment: function(date) {
      return vis.moment(date).utc();
    }
  };
  // Create a timeline displaying in UTC
  var timelineUTC = new vis.Timeline(document.getElementById('utc'), items, option2);
  timelineUTC.addCustomTime(customTime);

  var timelineLocal = new vis.Timeline(document.getElementById('local'), items, option1);
  timelineLocal.addCustomTime(customTime);
});
