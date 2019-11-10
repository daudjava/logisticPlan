//global variable
let maxCrane = 8;
let maxbarge = 7;
let maxCraneItem = 3;
// create groups
var numberOfGroups = 8;

var groupParentBefore = -1;

var groups = new vis.DataSet();
for (var i = 1; i < numberOfGroups; i++) {
  groups.add({
    id: i,
    subgroupStack: { 0: false, 1: true, 2: true },
    nestedGroups: [],
    showNested: true,
    orderGroup: 8,
    isSubGroup: false,
    content: 'Group&nbsp;' + i
  });
}

var arrayItem = [
  {
    id: 1,
    vesselNo: 'A',
    text: 'Vessel',
    groupContent: 1,
    startDate: '2019-10-21 12:00:00',
    endDate: '2019-10-24 00:00:00',
    className: 'expected',
    subgroup: 0,
    subgroupOrder: 0
  },
  {
    id: '1A',
    vesselNo: '',
    text: 'Actual Vessel A',
    groupContent: 1,
    startDate: '2019-10-21 12:00:00',
    endDate: '2019-10-24 00:00:00',
    className: 'actual',
    subgroup: 0,
    subgroupOrder: 0
  },
  {
    id: 2,
    vesselNo: 'B',
    text: 'Vessel',
    groupContent: 2,
    startDate: '2019-10-23 00:00:00',
    endDate: '2019-10-25 12:00:00',
    className: 'expected',
    subgroup: 0,
    subgroupOrder: 0
  },
  {
    id: 3,
    vesselNo: 'C',
    text: 'Vessel',
    groupContent: 3,
    startDate: '2019-10-25 00:00:00',
    endDate: '2019-10-28 00:00:00',
    className: 'expected',
    subgroup: 0,
    subgroupOrder: 0
  },
  {
    id: 4,
    vesselNo: 'D',
    text: 'Vessel',
    groupContent: 4,
    startDate: '2019-10-28 00:00:00',
    endDate: '2019-10-29 12:00:00',
    className: 'expected',
    subgroup: 0,
    subgroupOrder: 0
  },
  {
    id: '4A',
    vesselNo: 'D',
    text: 'Actual Vessel',
    groupContent: 4,
    startDate: '2019-10-28 00:00:00',
    endDate: '2019-10-29 12:00:00',
    className: 'actual',
    subgroup: 0,
    subgroupOrder: 0
  },
  {
    id: 5,
    vesselNo: 'E',
    text: 'Vessel',
    groupContent: 5,
    startDate: '2019-10-30 00:00:00',
    endDate: '2019-10-31 00:00:00',
    className: 'expected',
    subgroup: 0,
    subgroupOrder: 0
  },
  {
    id: 6,
    vesselNo: '',
    text: 'Crane',
    groupContent: 1,
    startDate: '2019-10-21 12:00:00',
    endDate: '2019-10-24 00:00:00',
    className: 'crane',
    type: 'range',
    subgroup: 1,
    subgroupOrder: 1
  },
  {
    id: 7,
    vesselNo: '',
    text: 'Barge',
    groupContent: 1,
    startDate: '2019-10-21 12:00:00',
    endDate: '2019-10-24 00:00:00',
    className: 'barge',
    type: 'range',
    subgroup: 2,
    subgroupOrder: 1
  },
  {
    id: 8,
    vesselNo: '',
    text: 'Crane',
    groupContent: 4,
    startDate: '2019-10-28 00:00:00',
    endDate: '2019-10-29 12:00:00',
    className: 'crane',
    type: 'range',
    subgroup: 1,
    subgroupOrder: 1
  },
  {
    id: 9,
    vesselNo: '',
    text: 'Barge',
    groupContent: 4,
    startDate: '2019-10-28 00:00:00',
    endDate: '2019-10-29 12:00:00',
    className: 'barge',
    type: 'range',
    subgroup: 2,
    subgroupOrder: 1
  },
  {
    id: 10,
    vesselNo: '',
    text: 'Crane',
    groupContent: 4,
    startDate: '2019-10-28 00:00:00',
    endDate: '2019-10-29 12:00:00',
    className: 'crane',
    type: 'range',
    subgroup: 1,
    subgroupOrder: 1
  },
  {
    id: 11,
    vesselNo: '',
    text: 'Barge',
    groupContent: 4,
    startDate: '2019-10-28 00:00:00',
    endDate: '2019-10-29 12:00:00',
    className: 'barge',
    type: 'range',
    subgroup: 2,
    subgroupOrder: 1
  }
];

var numberOfItems = arrayItem.length;
var items = new vis.DataSet();
var idSubGroupCrane = 1;
var idSubGroupBarge = 1;
var groupBefore = -1;
for (var indexItem = 0; indexItem < numberOfItems; indexItem++) {
  if (arrayItem[indexItem].subgroup == 0) {
    // klo dia parent
    items.add({
      id: indexItem,
      className: arrayItem[indexItem].className,
      group: arrayItem[indexItem].groupContent,
      groupChild: '',
      groupParent: arrayItem[indexItem].groupContent,
      subgroup: arrayItem[indexItem].subgroup,
      subgroupOrder: arrayItem[indexItem].subgroupOrder,
      start: arrayItem[indexItem].startDate, //'2019-10-21 00:00:00'
      end: arrayItem[indexItem].endDate,
      content: arrayItem[indexItem].text + ' ' + arrayItem[indexItem].vesselNo
    });
  } else {
    // berarti child
    createGroup(arrayItem, indexItem); // buat dulu groupnya
  }
}

var groupChild = '';
var sumCrane = 0;
var sumBarge = 0;
function createGroup(itemSelected, indexItem) {
  itemSelected = itemSelected[indexItem];
  let selectedGroup = itemSelected.groupContent;

  var groupNow = selectedGroup;
  let groupSub = '';
  if (groupBefore != groupNow) {
    idSubGroupCrane = 1;
    idSubGroupBarge = 1;
    sumCrane = 0;
    sumBarge = 0;
  } else {
    idSubGroupCrane = idSubGroupCrane;
    idSubGroupBarge = idSubGroupBarge;
    sumCrane = sumCrane;
    sumBarge = sumBarge;
  }

  groupBefore = selectedGroup;
  let countCrane = itemSelected.className === 'crane' ? idSubGroupCrane : 0;
  let countBarge = itemSelected.className === 'barge' ? idSubGroupBarge : 0;
  let idItem = '';
  let qGroup = 0;
  if (itemSelected.className == 'crane') {
    idItem = selectedGroup + 'C' + countCrane;
    idSubGroupCrane = idSubGroupCrane + 1;
    groupChild = idItem;
    sumCrane = sumCrane + 2;
    qGroup = maxCrane - sumCrane;
  } else {
    idItem = selectedGroup + 'B' + countBarge;
    idSubGroupBarge = idSubGroupBarge + 1;
    groupSub = groupChild;
    sumBarge = sumBarge + 2;
    qGroup = maxbarge - sumBarge;
  }

  let groupData = [
    {
      id: idItem,
      content: itemSelected.className,
      isSubGroup: true,
      orderGroup: qGroup
    }
  ];
  let groupSelect = groups.get(selectedGroup); //get current group
  groupSelect.nestedGroups.push(idItem);
  groups.add(groupData);
  addGroupData(itemSelected, idItem, indexItem, groupSub);
}

function addGroupData(itemSelected, idItem, indexItem, groupSub) {
  items.add({
    id: indexItem,
    className: itemSelected.className,
    group: idItem,
    groupChild: groupSub,

    groupParent: itemSelected.groupContent,
    subgroup: itemSelected.subgroup,
    subgroupOrder: itemSelected.subgroupOrder,
    start: itemSelected.startDate, //'2019-10-21 00:00:00'
    end: itemSelected.endDate,
    content: itemSelected.text + ' ' + arrayItem[indexItem].vesselNo,
    editable: { updateTime: true, updateGroup: false, remove: true }
  });
}

function max_date(all_dates) {
  let max_dt = all_dates[0],
    max_dtObj = new Date(all_dates[0]);
  all_dates.forEach(function(dt, index) {
    if (new Date(dt) > max_dtObj) {
      max_dt = dt;
      max_dtObj = new Date(dt);
    }
  });
  return max_dt;
}

function min_date(all_dates) {
  var min_dt = all_dates[0],
    min_dtObj = new Date(all_dates[0]);
  all_dates.forEach(function(dt, index) {
    if (new Date(dt) < min_dtObj) {
      min_dt = dt;
      min_dtObj = new Date(dt);
    }
  });
  return min_dt;
}

function customOrder(a, b) {
  // order by id
  return a.itemIndex - b.itemIndex;
}

var options = {
  height: '95%',
  min: new Date(2019, 9, 1), // lower limit of visible range
  max: new Date(2019, 12, 1), // upper limit of visible range
  // zoomMin: 1000 * 60 * 60 * 24,             // one day in milliseconds
  zoomMax: 1000 * 60 * 60 * 24 * 31 * 2, // about three months in milliseconds
  locale: 'en',
  showCurrentTime: true,
  stack: true,
  stackSubgroups: true,
  start: '2019-10-21 00:00:00', //'2019-10-21 00:00:00'
  end: '2019-10-31 12:00:00',
  editable: true,
  verticalScroll: true,
  zoomKey: 'ctrlKey',
  orientation: 'top',
  margin: {
    item: {
      horizontal: -1
    }
  },
  itemsAlwaysDraggable: {
    item: true,
    range: true
  },
  loadingScreenTemplate: function() {
    return '<br><h1>Loading...</h1>';
  },
  groupOrder: function(a, b) {
    return b.orderGroup - a.orderGroup;
  },

  onUpdate: function(item, callback) {
    prettyPrompt('Update item', 'Edit items text:', item.content, function(value) {
      if (value) {
        item.content = value;
        callback(item); // send back adjusted item
      } else {
        callback(null); // cancel updating the item
      }
    });
  },
  // groupOrder: 'orderGroup',  // groupOrder can be a property name or a sorting function
  onMove: function(item, callback) {
    //when resize item
    callback(item); // send back adjusted new item
    updateActualVessel(item.groupParent);
    showPopOverItem(item);
  },
  onRemove: function(item, callback) {
    prettyConfirm('Remove item', 'Do you really want to remove item ' + item.content + '?', function(ok) {
      if (ok) {
        deleteItem(item);

        callback(item); // send back adjusted new item

        console.log(timeline1.itemsData.get());
        console.log('itemObjAfterDelet');
      } else {
        callback(null); // cancel deletion
      }
    });
  }
};

function runscript(object) {
  object.querySelector('.insider').style.color = 'red';
}
var container = document.getElementById('mytimeline');

var timeline1 = new vis.Timeline(container, items, groups, options);

// items.on("*", function(event, properties) {
//   logEvent(event, properties);
// });

// function logEvent(event, properties) {
//   var log = document.getElementById("log");
//   var msg = document.createElement("div");
//   msg.innerHTML =
//     "event=" +
//     JSON.stringify(event) +
//     ", " +
//     "properties=" +
//     JSON.stringify(properties);
//   log.firstChild ? log.insertBefore(msg, log.firstChild) : log.appendChild(msg);
// }

function prettyConfirm(title, text, callback) {
  swal(
    {
      title: title,
      text: text,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#DD6B55'
    },
    callback
  );
}

function prettyPrompt(title, text, inputValue, callback) {
  swal(
    {
      title: title,
      text: text,
      type: 'input',
      showCancelButton: true,
      inputValue: inputValue
    },
    callback
  );
}

function updateActualVessel(groupParent) {
  // var newItem_dropped = timeline1.itemsData.get(item.id);
  var lookTheirParent = groupParent;
  var itemObj = timeline1.itemsData.get();
  var index = itemObj.findIndex(x => x.group === lookTheirParent && x.className === 'actual');
  console.log(lookTheirParent);
  console.log('lookTheirParent');
  if (index > 0) {
    //klo actualnya udh di hapus
    let mapMaxDateEnd = itemObj
      .map(function(e) {
        return e.groupParent === lookTheirParent && e.subgroup !== 0 ? e.end : '';
      })
      .sort()
      .reverse();
    let mapMaxDateStart = itemObj
      .map(function(e) {
        return e.groupParent === lookTheirParent && e.subgroup !== 0 ? e.start : '';
      })
      .sort()
      .reverse();

    console.log(mapMaxDateEnd);
    console.log('mapMaxDateEnd');
    var maxEndDate = moment(max_date(mapMaxDateEnd)).format('YYYY-MM-DD hh:mm:ss');
    var maxStartDate = moment(min_date(mapMaxDateStart)).format('YYYY-MM-DD hh:mm:ss');
    console.log(maxEndDate);
    console.log('maxEndDate');
    items.update({
      id: itemObj[index].id,
      start: maxStartDate,
      end: maxEndDate
    });
  }
}

function deleteItem(item) {
  var itemObj = timeline1.itemsData.get();

  var selectedParent = timeline1.itemsData.get(item.id);

  var insideGroupItem = itemObj.filter(function(num) {
    return num.group == selectedParent.group ? num.id : '';
  });

  var countItemData = _.countBy(itemObj, function(num) {
    return num.groupParent == selectedParent.groupParent ? num.className : '';
  });

  const countCraneItem = countItemData.crane;
  var groupRemoved = itemObj.filter(function(e) {
    let statementDelet = e.groupChild == selectedParent.group || e.group == selectedParent.group;
    if (item.className == 'crane') {
      if (countCraneItem < 2) {
        statementDelet =
          e.groupChild == selectedParent.group ||
          e.group == selectedParent.group ||
          (e.group == selectedParent.groupParent && e.className == 'actual');
      }
    }
    return statementDelet ? e : '';
  });

  let countGroupItem = insideGroupItem.length;

  console.log(countGroupItem);
  console.log('groupRemoved');
  if (countGroupItem < 2) {
    groupRemoved.forEach(function(element) {
      var firstItemClick = $('.vis-item-overflow');
      firstItemClick.popover('hide');
      let itemGroup = element.groupParent;
      items.remove({ id: element.id });
      console.log(element);
      console.log('Element remove from the group');
      if (element.className !== 'actual') {
        groups.remove({ id: element.group });
        updateActualVessel(itemGroup);
      }
    });
  } else {
    console.log(item.groupParent);
    console.log('itemElse');
    updateActualVessel(item.groupParent);
  }
}

function showPopOverItem(itemSelected) {
  console.log(itemSelected);
  console.log('Onselect event fired');
  var selectedIdItem = itemSelected.id;
  var selectedContentItem = itemSelected.content;
  var selectedStartItem = itemSelected.start;
  var selectedEndItem = itemSelected.end;
  // let stringClass = target.attributes.class.nodeValue;
  // var itemDom = $("." + stringClass);
  var firstItemClick = $('.vis-item-overflow');
  // var secondItemClick = $(".vis-drag-center");

  firstItemClick.on('click', function(e) {
    firstItemClick.not(this).popover('hide');
  });
  firstItemClick
    .popover({
      placement: 'bottom',
      html: true,
      sanitize: false,
      title:
        '<h3><strong>Item Information</strong> <a href="#" class="close" data-dismiss="alert" style="margin-top:-4px;">&times;</a></h3>',
      // content: $("#myForm").html()
      content:
        '<div class="panel panel-primary" id="div-popup-box">' +
        '<div class="panel-body">' +
        '<div class="form-inline row" style="margin-bottom:5px;">' +
        '<label for="colFormLabelLg" class="col-auto col-form-label col-form-label-sm font-weight-bold">Name :</label>' +
        '<div class="col-auto">' +
        '<input type="hidden" class="form-control" id="itemId" value="' +
        '"/>' +
        '<label class="form-check-label" id="itemName">' +
        '</label>' +
        '</div>' +
        '</div>' +
        '<div class="row">' +
        '<div class="col-md-6">' +
        '<div class="form-group">' +
        '<label class="control-label">Start Date In Item</label>' +
        '<input type="text" class="form-control" id="txtStartItem" readonly/>' +
        '</div>' +
        '</div>' +
        '<div class="col-md-6">' +
        '<div class="form-group">' +
        '<label class="control-label">End Date In Item </label>' +
        '<input type="text" class="form-control" id="txtEndItem" readonly/>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '<div class="row">' +
        '<div class="col-sm-6">' +
        '<label class="control-label font-weight-bold">Custom Start Date</label>' +
        '<input type="text" class="form-control datetimepicker-input" id="edtStartDate" data-toggle="datetimepicker" data-target="#edtStartDate"/>' +
        '</div>' +
        '<div class="col-sm-6">' +
        '<label class="control-label font-weight-bold">Custom End Date</label>' +
        '<input type="text" class="form-control datetimepicker-input" id="edtEndDate" data-toggle="datetimepicker" data-target="#edtEndDate"/>' +
        '</div>' +
        '</div>' +
        '<hr>' +
        '<div class="row justify-content-between" style="margin-top:5px;margin-bottom:3px;margin-left:0px;">' +
        '<div class="col-4">' +
        '<input type="submit" class="btn btn-danger btn-lg" value="Cancel" />' +
        '</div>' +
        '<div class="col-4">' +
        '<input type="submit" class="btn btn-primary btn-lg" value="Submit" />' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>'
    })
    .on('shown.bs.popover', function() {
      console.log(selectedIdItem);
      $('#itemId').val(selectedIdItem);
      $('#itemName').empty();
      $('#itemName').append(selectedContentItem);
      $('#txtStartItem').val(selectedStartItem);
      $('#txtEndItem').val(selectedEndItem);
      $('#edtStartDate').datetimepicker({
        format: 'YYYY-MM-DD HH:mm:ss',
        sideBySide: true
        // date: moment(selectedStartItem, "YYYY-MM-DD HH:mm:ss")
      });
      $('#edtEndDate').datetimepicker({
        format: 'YYYY-MM-DD HH:mm:ss',
        sideBySide: true
        // date: moment(selectedEndItem, "YYYY-MM-DD HH:mm:ss")
      });
      $('#edtStartDate').datetimepicker('date', moment(selectedStartItem, 'YYYY-MM-DD HH:mm:ss'));
      $('#edtEndDate').datetimepicker('date', moment(selectedEndItem, 'YYYY-MM-DD HH:mm:ss'));
    })
    .on('click', function() {
      $('.close').on('click', function() {
        firstItemClick.popover('hide');
        timeline1.setSelection(-1);
      });
      $('.btn-danger').click(function() {
        firstItemClick.popover('hide');
        timeline1.setSelection(-1);
      });
      $('.btn-primary').click(function() {
        firstItemClick.popover('hide');
        timeline1.setSelection(-1);
        let newStartDate = $('#edtStartDate').val();
        let newEndDate = $('#edtEndDate').val();
        let itemName = $('#itemName').text();
        let itemId = $('#itemId').val();
        let objUpdate = {
          id: itemId,
          contex: itemName,
          start: newStartDate,
          end: newEndDate
        };
        // $("#result").after("form submitted by " + JSON.stringify(objUpdate));
        console.log(objUpdate);
        console.log('result input submit');
        items.update(objUpdate);
        updateActualVessel(objUpdate.groupParent);
      });
    });

  firstItemClick.click(function(e) {
    e.stopPropagation();
  });
}

var sel = 1;

// timeline1.on("click", function(properties) {
//   console.log(" click event fired");
// });
timeline1.on('doubleClick', function(properties) {
  let item = items.get(properties.items);
  let getLastItemDrop = item.length - 1;
  var itemSelected = item[getLastItemDrop];
  items.remove({ id: itemSelected.id });
});

timeline1.on('select', function(properties) {
  var target = properties.event.target;
  var item = items.get(properties.items);
  if (item[0] !== undefined) {
    var itemSelected = item[0];
    showPopOverItem(itemSelected);
  }
});

var itemObj = timeline1.itemsData.get();
var maxIdForNewItem =
  itemObj.reduce((max, arrayItem) => (arrayItem.id > max ? arrayItem.id : max), arrayItem[0].id) + 1;

var getMaxId = numberOfItems;
var itemAddCrane = 1;
var itemAddBarge = 1;
function handleDragStart(event) {
  var sg = 0;
  var sgo = 0;
  let color = event.target.attributes['data-id'].value;
  event.dataTransfer.effectAllowed = 'move';

  if (color == 'crane') {
    sg = itemAddCrane;
    sgo = itemAddCrane;
  } else {
    sg = itemAddBarge;
    sgo = itemAddBarge;
  }

  var item = {
    id: maxIdForNewItem,
    type: 'range',
    className: color,
    subgroup: sg,
    subgroupOrder: sgo,
    groupParent: 0,
    domObj: event.target,
    content: event.target.innerHTML.trim(),
    editable: { updateTime: true, updateGroup: false, remove: true }
  };

  event.target.id = maxIdForNewItem;

  event.dataTransfer.setData('text', JSON.stringify(item));
  if (color == 'crane') {
    itemAddCrane = itemAddCrane + 1;
  } else {
    itemAddBarge = itemAddBarge + 1;
  }
  getMaxId = getMaxId + 1;
  maxIdForNewItem = maxIdForNewItem + 1;
}

var groupBefore = -1;
var groupData = [];
var countItemCrane = 1;
var sumCrane = 0;
function handleDragEnd(event) {
  if (timeline1.itemsData.get(event.target.id) != null) {
    var newItem_dropped = timeline1.itemsData.get(event.target.id);
    var selectedGroup = newItem_dropped.group;

    var itemObj = timeline1.itemsData.get();
    var convertToArray = Object.values(itemObj);
    var index = convertToArray.findIndex(x => x.group == selectedGroup); //find index group selected
    var selectedParent = itemObj[index].groupParent;
    var countItemData = _.countBy(convertToArray, function(num) {
      return num.groupParent == selectedParent ? num.className : '';
    });

    var groupParent = itemObj[index].groupParent;
    var groupParentNow = groupParent;

    var whereItemPlaced = itemObj[index].subgroup;

    var groupSelect = groups.get(selectedGroup); //get current group

    if (groupParentBefore != groupParentNow) {
      sumCrane = 0;
      sumBarge = 0;
      countItemCrane = 1;
      groupData = [];
      let detectItemCrane = countItemData.crane != undefined ? countItemData.crane : 0;
      countItemCrane = detectItemCrane + countItemCrane;
      generateIdSubGroupCrane = '';
      generateIdSubGroupBarge = '';
    } else {
      groupData = groupData;
      countItemCrane = countItemCrane;
    }

    if (whereItemPlaced == 0) {
      // group vessel

      if (newItem_dropped.className == 'crane') {
        // var index = convertToArray.findIndex(x => (x.group == selectedGroup) && (x.className == 'actual')); //find index group selected
        var findActualItem = _.countBy(convertToArray, function(num) {
          return num.groupParent == selectedParent ? num.className : '';
        });
        let isThereActualItem = findActualItem.actual;

        if (isThereActualItem == undefined) {
          // belum ada barge pada crane

          let startDateItem = itemObj[index].start;
          let endDateItem = itemObj[index].end;
          items.add({
            id: maxIdForNewItem,
            className: 'actual',
            group: groupParent,
            groupChild: '',
            groupParent: groupParent,
            subgroup: 0,
            subgroupOrder: 0,
            start: startDateItem, //'2019-10-21 00:00:00'
            end: endDateItem,
            content: 'Vessel New'
          });

          maxIdForNewItem++;
        }

        if (countItemCrane > maxCraneItem) {
          console.log('Jumlah crane melebihi kapasitas!');
          items.remove({
            id: newItem_dropped.id,
            subgroup: 1,
            subgroupOrder: 1,
            groupChild: '',
            groupParent: groupParent,
            group: selectedGroup,
            start: startDateItem,
            end: endDateItem
          });
          maxIdForNewItem--;
        } else {
          if (!groupSelect.isSubGroup) {
            // klo dia taroh di parent
            let generateIdSubGroupCrane = selectedGroup + 'C' + countItemCrane;
            sumCrane = maxCrane - countItemCrane * 2;
            let qGroup = sumCrane;
            groupData = [
              {
                id: generateIdSubGroupCrane,
                content: 'Crane ',
                isSubGroup: true,
                orderGroup: qGroup
              }
            ];
            groupSelect.nestedGroups.push(generateIdSubGroupCrane);

            groups.add(groupData);
            selectedGroup = generateIdSubGroupCrane;
            countItemCrane = countItemCrane + 1; // berkurang 2
          }
          let startDateItem = itemObj[index].start;
          let endDateItem = itemObj[index].end;

          items.update({
            id: newItem_dropped.id,
            subgroup: 1,
            subgroupOrder: 1,
            groupChild: '',
            groupParent: groupParent,
            group: selectedGroup,
            start: startDateItem,
            end: endDateItem
          });
        }
      } else {
        // klo taroh crane di child
        console.log('hapus Item');
        items.remove({
          id: newItem_dropped.id,
          subgroup: 1,
          subgroupOrder: 1,
          groupChild: '',
          groupParent: groupParent,
          group: selectedGroup,
          start: startDateItem,
          end: endDateItem
        });
        // items.remove({id: newItem_dropped.id, subgroup:sg,subgroupOrder:sgo,itemIndex:sgo, groupParent:groupParent, group: selectedGroup, start:startDateItem, end:endDateItem});
        maxIdForNewItem--;
      }
    } else if (whereItemPlaced == 1) {
      // group crane

      var countChildItem = _.countBy(convertToArray, function(num) {
        return num.groupChild == selectedGroup ? num.className : '';
      });
      let countBargeItemInCraneGroup = countChildItem.barge;

      let getGroupSelected = selectedGroup.substr(selectedGroup.length - 1); // => "1"

      if (newItem_dropped.className == 'barge') {
        // klo masukin barge
        if (countBargeItemInCraneGroup == undefined) {
          // belum ada barge pada crane
          var parentGroup = groupSelect.nestedInGroup;
          var parentSelect = groups.get(parentGroup); //get parent group
          if (groupSelect.isSubGroup) {
            //harus taroh di child
            var generateIdSubGroupBarge = parentGroup + 'B' + getGroupSelected;
            sumBarge = maxbarge - getGroupSelected * 2;
            var qGroup = sumBarge;
            groupData = [
              {
                id: generateIdSubGroupBarge,
                content: 'Barge ',
                isSubGroup: true,
                orderGroup: qGroup
              }
            ];
            parentSelect.nestedGroups.push(generateIdSubGroupBarge);
            groups.add(groupData);
            selectedGroup = generateIdSubGroupBarge;
            // countItemBarge = countItemBarge + 1;
          }
          var startDateItem = itemObj[index].start;
          var endDateItem = itemObj[index].end;

          items.update({
            id: newItem_dropped.id,
            subgroup: 2,
            subgroupOrder: 2,
            groupChild: newItem_dropped.group,
            groupParent: groupParent,
            group: selectedGroup,
            start: startDateItem,
            end: endDateItem
          });
        } else {
          items.remove({
            id: newItem_dropped.id,
            subgroup: 2,
            subgroupOrder: 2,
            groupChild: newItem_dropped.group,
            groupParent: groupParent,
            group: selectedGroup,
            start: startDateItem,
            end: endDateItem
          });
          maxIdForNewItem--;
        }
      } else {
        // klo masukin crane
        let convertStartToEnd = itemObj[index].end;
        let differentTime = diffDateTime(itemObj[index].start, itemObj[index].end);

        let endDateItem = increaseDate(convertStartToEnd, differentTime);

        items.update({
          id: newItem_dropped.id,
          subgroup: 2,
          subgroupOrder: 2,
          groupChild: newItem_dropped.group,
          groupParent: groupParent,
          group: selectedGroup,
          start: convertStartToEnd,
          end: endDateItem
        });

        updateActualVessel(groupParent);
      }
    } else {
      // klo select placenya gk di group 1 atau 0

      if (newItem_dropped.className == 'crane') {
        timeline1.itemsData.remove({
          id: newItem_dropped.id,
          subgroup: 1,
          subgroupOrder: 1,
          groupParent: groupParent,
          group: selectedGroup,
          start: startDateItem,
          end: endDateItem
        });
        maxIdForNewItem--;
      } else {
        let convertStartToEnd = itemObj[index].end;
        let differentTime = diffDateTime(itemObj[index].start, itemObj[index].end);

        let endDateItem = increaseDate(convertStartToEnd, differentTime);

        timeline1.itemsData.update({
          id: newItem_dropped.id,
          subgroup: 2,
          subgroupOrder: 2,
          groupChild: newItem_dropped.group,
          groupParent: groupParent,
          group: selectedGroup,
          start: convertStartToEnd,
          end: endDateItem
        });
        updateActualVessel(groupParent);
      }
    }

    groupParentBefore = groupParent;
    groupBefore = groupChild;

    infoDragged(newItem_dropped);
  } else {
    console.log('ItemDropNull');
    maxIdForNewItem--;
  }
}

function infoDragged(newItem_dropped) {
  // var html = "<b>id: </b>" + newItem_dropped.id + "<br>";
  // html += "<b>content: </b>" + newItem_dropped.content + "<br>";
  // html += "<b>Group: </b>" + newItem_dropped.group + "<br>";
  // html += "<b>start: </b>" + newItem_dropped.start + "<br>";
  // html += "<b>end: </b>" + newItem_dropped.end + "<br>";
  // document.getElementById("output").innerHTML = html;

  console.log(timeline1.itemsData.get());
  console.log('dataItem');
  console.log(groups.get());
  console.log('--------222');
}

function diffDateTime(startDate, endDate) {
  let date1 = new Date(startDate);
  let date2 = new Date(endDate);
  var res = Math.abs(date1 - date2) / 1000;

  // get total days between two dates
  var days = Math.floor(res / 86400);
  var hours = Math.floor(res / 3600) % 24;
  var minutes = Math.floor(res / 60) % 60;
  var seconds = res % 60;

  let differentTime = { d: days, h: hours, m: minutes, s: seconds };

  return differentTime;
}

function increaseDate(endDate, differentTime) {
  var today = moment(endDate);
  let tomorrow = moment(today)
    .add(differentTime.d, 'days')
    .add(differentTime.h, 'hours')
    .add(differentTime.m, 'minutes')
    .add(differentTime.s, 'seconds');
  // console.log(tomorrow.format('YYYY-MM-DD hh:mm:ss'));
  // console.log('tomorrow');
  return tomorrow;
}

var itemCrane = document.getElementById('dropCrane');
var itemBarge = document.getElementById('dropBarge');
itemCrane.addEventListener('dragstart', handleDragStart.bind(this), false);
itemBarge.addEventListener('dragstart', handleDragStart.bind(this), false);
itemCrane.addEventListener('dragend', handleDragEnd.bind(this), false);
itemBarge.addEventListener('dragend', handleDragEnd.bind(this), false);

//----------------------------------Option Select----------------------
// $("#dropDownCrane").on("click", function() {
//   $("#divDropdownCrane").toggle("show");
// });

// $("#dropDownBarge").on("click", function() {
//   $("#divDropdownBarge").toggle("show");
// });
// $("#divDropdownCrane").on("click", function(event) {
//   event.stopPropagation();
// });

function showDropDownCrane() {
  document.getElementById('divDropdownCrane').classList.toggle('show');
}

function showDropDownBarge() {
  document.getElementById('divDropdownBarge').classList.toggle('show');
}

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName('dropdown-content');
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
};

let dataDropDown = [
  { id: 11, name: 'Crane A', typeClass: 'Crane' },
  { id: 12, name: 'Crane Keala Marga Nasa', typeClass: 'Crane' },
  { id: 13, name: 'Crane A2', typeClass: 'Crane' },
  { id: 21, name: 'Barge B', typeClass: 'Barge' },
  { id: 22, name: 'Barge B1', typeClass: 'Barge' },
  { id: 23, name: 'Barge B2', typeClass: 'Barge' }
];
$.each(dataDropDown, function(index, value) {
  console.log(value);
  var newHTML =
    '<a href="#" class="dropDown' +
    value.typeClass +
    '" data-id="' +
    value.id +
    '" data-item="' +
    value.name +
    '" data-classType="' +
    value.typeClass +
    '">' +
    value.name +
    '</a>';
  console.log('#divDropdown' + value.typeClass);
  $('#divDropdown' + value.typeClass).append(newHTML);
});

// $(".dropDownCrane").on("click", function() {
$('.dropdown-content a').on('click', function() {
  var dataId = $(this).attr('data-id');
  var classType = $(this).attr('data-classType');
  var dataName = $(this).attr('data-item');
  $('#drop' + classType).text(dataName);
});

// $("#cranec").data("dataObj", { id: 16, name: "craneC" });
// let dataCraneC = $("#cranec").data("dataObj");

// var filterByGroup = itemObj.filter(function(element, i, array) {
//     var onlyDateInThisGroup = element.groupParent === lookTheirParent ? element : '';
//     return onlyDateInThisGroup;
// });
