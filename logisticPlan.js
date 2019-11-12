//global variable
const maxCrane = 8;
const maxbarge = 7;
const maxCraneItem = 3;
const numberOfGroups = 8;

const container = document.getElementById('mytimeline');

let groups = new vis.DataSet();
let groupParentBefore = -1;
let groupBefore = -1;
let groupChild = '';

let items = new vis.DataSet();
let sumCrane = 0;
let sumBarge = 0;
let idSubGroupCrane = 1;
let idSubGroupBarge = 1;

let dataItem = [
  {
    id: 1,
    productNo: 'A-01',
    product: 'Product A',
    name: 'Vessel',
    groupContent: 1,
    startDate: '2019-10-21 12:00:00',
    endDate: '2019-10-24 00:00:00',
    className: 'expected',
    subgroup: 0,
    subgroupOrder: 0
  },
  {
    id: '1A',
    productNo: 'A-01',
    product: 'Product A',
    name: 'Vessel',
    groupContent: 1,
    startDate: '2019-10-21 12:00:00',
    endDate: '2019-10-24 00:00:00',
    className: 'actual',
    subgroup: 0,
    subgroupOrder: 0
  },
  {
    id: 2,
    productNo: 'B-01',
    product: 'Product B',
    name: 'Vessel',
    groupContent: 2,
    startDate: '2019-10-23 00:00:00',
    endDate: '2019-10-25 12:00:00',
    className: 'expected',
    subgroup: 0,
    subgroupOrder: 0
  },
  {
    id: 3,
    productNo: 'C-01',
    product: 'Product C',
    name: 'Vessel',
    groupContent: 3,
    startDate: '2019-10-25 00:00:00',
    endDate: '2019-10-28 00:00:00',
    className: 'expected',
    subgroup: 0,
    subgroupOrder: 0
  },
  {
    id: 4,
    productNo: 'D-01',
    product: 'Product D',
    name: 'Vessel',
    groupContent: 4,
    startDate: '2019-10-28 00:00:00',
    endDate: '2019-10-29 12:00:00',
    className: 'expected',
    subgroup: 0,
    subgroupOrder: 0
  },
  {
    id: '4A',
    productNo: 'D-01',
    product: 'Product D',
    name: 'Vessel',
    groupContent: 4,
    startDate: '2019-10-28 00:00:00',
    endDate: '2019-10-29 12:00:00',
    className: 'actual',
    subgroup: 0,
    subgroupOrder: 0
  },
  {
    id: 5,
    productNo: 'E-01',
    product: 'Product E',
    name: 'Vessel',
    groupContent: 5,
    startDate: '2019-10-30 00:00:00',
    endDate: '2019-10-31 00:00:00',
    className: 'expected',
    subgroup: 0,
    subgroupOrder: 0
  },
  {
    id: 6,
    loadingRate: 30,
    name: 'Crane',
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
    capacity: 20,
    name: 'Barge',
    product: 'Product A',
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
    loadingRate: 50,
    name: 'Crane',
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
    capacity: 40,
    name: 'Barge',
    product: 'Product D',
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
    loadingRate: 50,
    name: 'Crane',
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
    capacity: 40,
    name: 'Barge',
    product: 'Product D',
    groupContent: 4,
    startDate: '2019-10-28 00:00:00',
    endDate: '2019-10-29 12:00:00',
    className: 'barge',
    type: 'range',
    subgroup: 2,
    subgroupOrder: 1
  }
];

let options = {
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
  // onUpdate: function(item, callback) {
  //   prettyPrompt('Update item', 'Edit items text:', item.content, function(value) {
  //     if (value) {
  //       item.content = value;
  //       callback(item); // send back adjusted item
  //     } else {
  //       callback(null); // cancel updating the item
  //     }
  //   });
  // },
  // onAdd: function(item, callback) {
  //   addCranePopup(item, callback);
  //   // prettyPrompt('Add item', 'Enter text content for new item:', item.content, function(value) {
  //   //   if (value) {
  //   //     item.content = value;
  //   //     callback(item); // send back adjusted new item
  //   //   } else {
  //   //     callback(null); // cancel item creation
  //   //   }
  //   // });
  // },
  // groupOrder: 'orderGroup',  // groupOrder can be a property name or a sorting function
  onMove: function(item, callback) {
    //when resize item
    callback(item); // send back adjusted new item
    updateActualVessel(item.groupParent);
    showPopOverItem(item);
  },
  onRemove: function(item, callback) {
    removeConfirm(item, callback);
    // prettyConfirm('Remove item', 'Do you really want to remove item ' + item.content + '?', function(ok) {
    //   if (ok) {

    //   } else {
    //     callback(null); // cancel deletion
    //   }
    // });
  }
};

let timeline1 = new vis.Timeline(container, items, groups, options);

let numberOfItems = dataItem.length;
// let allObjItem = timeline1.itemsData.get();
// const allObjItem = index => {
//   return timeline1.itemsData.get();
// };
const allObjItem = function(indexItem) {
  return timeline1.itemsData.get(indexItem);
};

const allGroupItem = function(indexGroup) {
  return groups.get(indexGroup);
};

timeline1.on('doubleClick', function(properties) {
  let item = items.get(properties.items);
  let getLastItemDrop = item.length - 1;
  let itemSelected = item[getLastItemDrop];
  items.remove({ id: itemSelected.id });
});

timeline1.on('select', function(properties) {
  let target = properties.event.target;
  let item = items.get(properties.items);
  if (item[0] !== undefined) {
    let itemSelected = item[0];
    showPopOverItem(itemSelected);
  }
});

for (let i = 1; i < numberOfGroups; i++) {
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

for (let indexItem = 0; indexItem < numberOfItems; indexItem++) {
  if (dataItem[indexItem].subgroup == 0) {
    // klo dia parent
    items.add({
      id: indexItem,
      productNo: dataItem[indexItem].productNo,
      product: dataItem[indexItem].product,
      name: dataItem[indexItem].name,
      loadingRate: dataItem[indexItem].loadingRate,
      capacity: dataItem[indexItem].capacity,
      className: dataItem[indexItem].className,
      group: dataItem[indexItem].groupContent,
      groupChild: '',
      groupParent: dataItem[indexItem].groupContent,
      start: dataItem[indexItem].startDate, //'2019-10-21 00:00:00'
      end: dataItem[indexItem].endDate,
      subgroup: dataItem[indexItem].subgroup,
      subgroupOrder: dataItem[indexItem].subgroupOrder,
      content: dataItem[indexItem].name + ' ' + dataItem[indexItem].productNo
    });
  } else {
    // add child Group
    createGroup(dataItem, indexItem); // buat dulu groupnya
  }
}

function createGroup(itemSelected, indexItem) {
  itemSelected = itemSelected[indexItem];
  let selectedGroup = itemSelected.groupContent;
  let groupNow = selectedGroup;
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

  // let groupSelect = groups.get(selectedGroup); //get current group
  let groupSelect = allGroupItem(selectedGroup); //get current group
  groupSelect.nestedGroups.push(idItem);
  groups.add(groupData);
  addGroupData(itemSelected, idItem, indexItem, groupSub);
}

function addGroupData(itemSelected, idItem, indexItem, groupSub) {
  let textContent2 = dataItem[indexItem].loadingRate != undefined ? dataItem[indexItem].loadingRate : dataItem[indexItem].capacity;
  let textContent1 = itemSelected.product != undefined ? itemSelected.product : itemSelected.name;
  items.add({
    id: indexItem,
    productNo: itemSelected.productNo,
    product: itemSelected.product,
    name: itemSelected.name,
    loadingRate: itemSelected.loadingRate,
    capacity: itemSelected.capacity,
    className: itemSelected.className,
    group: idItem,
    groupChild: groupSub,
    groupParent: itemSelected.groupContent,
    start: itemSelected.startDate, //'2019-10-21 00:00:00'
    end: itemSelected.endDate,
    subgroup: itemSelected.subgroup,
    subgroupOrder: itemSelected.subgroupOrder,
    content: textContent1 + ' ' + textContent2,
    editable: { updateTime: true, updateGroup: false, remove: true }
  });
}

function customOrder(a, b) {
  // order by id
  return a.itemIndex - b.itemIndex;
}

function removeConfirm(item, callback) {
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then(result => {
    if (result.value) {
      Swal.fire('Deleted!', item.name + ' has been deleted.', 'success');
      deleteItem(item);

      callback(item); // send back adjusted new item

      updateActualVessel(item.groupParent);

      $('div.popover:visible').popover('hide');

      console.log(allObjItem());
      console.log('allObjItemAfterDelet');
    } else {
      callback(null); // cancel deletion
    }
  });
}

// function prettyPrompt(title, text, inputValue, callback) {
//   swal(
//     {
//       title: title,
//       // : text,,
//       text: '<select><option value="volvo">Volvo</option><option value="audi">Audi</option></select>',
//       type: 'input',
//       showCancelButton: true
//     },
//     callback
//   );
// }

function addCranePopup(item) {
  let inputOption = {
    '700 T/Hr': 'Loading Rate : 700 T/Hr',
    '890 T/Hr': 'Loading Rate : 890 T/Hr',
    '990 T/Hr': 'Loading Rate : 990 T/Hr'
  };
  Swal.fire({
    title: 'Select Outage Tier',
    input: 'select',
    inputOptions: inputOption,
    inputPlaceholder: 'Select Loading Rate...',
    showCancelButton: true,
    inputValidator: function(value) {
      return new Promise(function(resolve, reject) {
        if (value !== '') {
          resolve();
        } else {
          resolve('You need to select a Tier');
        }
      });
    }
  }).then(function(result) {
    if (result.value) {
      Swal.fire({
        html: 'You selected: ' + result.value
      });
      return result.value;
    } else {
      return;
    }
  });
}

function runscript(object) {
  object.querySelector('.insider').style.color = 'red';
}

function updateActualVessel(groupParent) {
  // let newItem_dropped = timeline1.itemsData.get(item.id);
  let lookTheirParent = groupParent;
  // let allObjItem = timeline1.itemsData.get();
  // console.log(allObjItem());
  let index = allObjItem().findIndex(x => x.group === lookTheirParent && x.className === 'actual');
  if (index > 0) {
    //klo actualnya udh di hapus
    let mapMaxDateEnd = allObjItem()
      .map(function(e) {
        return e.groupParent === lookTheirParent && e.subgroup !== 0 ? e.end : '';
      })
      .sort()
      .reverse();
    let mapMaxDateStart = allObjItem()
      .map(function(e) {
        return e.groupParent === lookTheirParent && e.subgroup !== 0 ? e.start : '';
      })
      .sort()
      .reverse();

    let maxEndDate = max_date(mapMaxDateEnd);
    let maxStartDate = min_date(mapMaxDateStart);
    items.update({
      id: allObjItem(index).id,
      start: maxStartDate,
      end: maxEndDate
    });
  }
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
  let min_dt = all_dates[0],
    min_dtObj = new Date(all_dates[0]);
  all_dates.forEach(function(dt, index) {
    if (new Date(dt) < min_dtObj) {
      min_dt = dt;
      min_dtObj = new Date(dt);
    }
  });
  return min_dt;
}

function deleteItem(item) {
  // let allObjItem = timeline1.itemsData.get();

  // let selectedParent = timeline1.itemsData.get(item.id);
  let selectedParent = allObjItem(item.id);

  let insideGroupItem = allObjItem().filter(function(num) {
    return num.group == selectedParent.group ? num.id : '';
  });

  let countItemData = _.countBy(allObjItem(), function(num) {
    return num.groupParent == selectedParent.groupParent ? num.className : '';
  });

  const countCraneItem = countItemData.crane;
  let groupRemoved = allObjItem().filter(function(e) {
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

  if (countGroupItem < 2) {
    groupRemoved.forEach(function(element) {
      let firstItemClick = $('.vis-item-overflow');
      firstItemClick.popover('hide');
      let itemGroup = element.groupParent;
      items.remove({ id: element.id });
      if (element.className !== 'actual') {
        groups.remove({ id: element.group });
      }
    });
  }
}

function showPopOverItem(itemSelected) {
  let selectedIdItem = itemSelected.id;
  let selectedContentItem = itemSelected.content;
  let selectedStartItem = itemSelected.start;
  let selectedEndItem = itemSelected.end;
  // let stringClass = target.attributes.class.nodeValue;
  // let itemDom = $("." + stringClass);
  let firstItemClick = $('.vis-item-overflow');
  // let secondItemClick = $(".vis-drag-center");

  firstItemClick.on('click', function(e) {
    firstItemClick.not(this).popover('hide');
  });
  firstItemClick
    .popover({
      placement: 'bottom',
      html: true,
      sanitize: false,
      title: '<h3><strong>Item Information</strong> <a href="#" class="close" data-dismiss="alert" style="margin-top:-4px;">&times;</a></h3>',
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
          content: itemName,
          start: newStartDate,
          end: newEndDate
        };
        // $("#result").after("form submitted by " + JSON.stringify(objUpdate));
        items.update(objUpdate);
        updateActualVessel(objUpdate.groupParent);
      });
    });

  firstItemClick.click(function(e) {
    e.stopPropagation();
  });
}

let getMaxId = numberOfItems;
let itemAddCrane = 1;
let itemAddBarge = 1;
let maxIdForNewItem = allObjItem().reduce((max, item) => (item.id > max ? item.id : max), allObjItem()[0].id) + 1;
// const maxIdForNewItem = allObjItem().reduce((acc, pilot) => acc + pilot.id, 0);
function handleDragStart(event) {
  let sg = 0;
  let sgo = 0;
  let color = event.target.attributes['data-id'].value;
  event.dataTransfer.effectAllowed = 'move';

  if (color == 'crane') {
    sg = itemAddCrane;
    sgo = itemAddCrane;
  } else {
    sg = itemAddBarge;
    sgo = itemAddBarge;
  }

  let item = {
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

var counterDropCrane = (function() {
  var offset = 1; // closure lets us to keep this value internally updated

  return function(option) {
    // option for our basic counter
    switch (option) {
      case 0:
        offset = 1;
        break;
      case 1:
        offset++;
        break;
      case 2:
        offset--;
        break;
    }
    return offset;
  };
})();

let groupData = [];
function handleDragEnd(event) {
  if (allObjItem(event.target.id) != null) {
    let newItem_dropped = allObjItem(event.target.id);
    console.log(addCranePopup(newItem_dropped));
    let selectedGroup = newItem_dropped.group; // tempat item tersebut diletakan

    let indexItem = findIndexItem(selectedGroup);
    let selectedParent = findThatParent(indexItem);

    // let countItemData = countItemInsideTheGroup(selectedParent);

    // let groupParent = selectedParent; //group parent item tersebut
    // let groupParentNow = groupParent;

    let whereItemPlaced = allObjItem(indexItem).subgroup;

    let groupSelect = allGroupItem(selectedGroup); //item berada di group mana

    let startDateItem = allObjItem(indexItem).start;
    let endDateItem = allObjItem(indexItem).end;

    let filterGroupCrane = filterGroup(selectedParent);
    let countCraneInGroup = filterGroupCrane.length + 1;

    // if (groupParentBefore != groupParentNow) {
    //   counterDropCrane(0);
    //   sumCrane = 0;
    //   sumBarge = 0;
    //   countItemCrane = 1;
    //   groupData = [];
    //   let detectItemCrane = countItemData.crane != undefined ? countItemData.crane : 0;
    //   countItemCrane = detectItemCrane + countItemCrane;
    //   generateIdSubGroupCrane = '';
    //   generateIdSubGroupBarge = '';
    // } else {
    //   counterDropCrane(1);
    //   groupData = groupData;
    //   countItemCrane = countItemCrane;
    // }

    console.log(counterDropCrane());
    console.log('increaseItem');
    if (whereItemPlaced == 0) {
      // group vessel

      if (newItem_dropped.className == 'crane') {
        let findActualItem = _.countBy(allObjItem(), function(num) {
          return num.groupParent == selectedParent ? num.className : '';
        });
        let isThereActualItem = findActualItem.actual;

        if (isThereActualItem == undefined) {
          // belum ada barge dan crane
          items.add({
            id: maxIdForNewItem,
            productNo: newItem_dropped.productNo,
            product: newItem_dropped.product,
            name: newItem_dropped.name,
            loadingRate: newItem_dropped.loadingRate,
            capacity: newItem_dropped.capacity,
            className: 'actual',
            group: selectedParent,
            groupChild: '',
            groupParent: selectedParent,
            start: startDateItem, //'2019-10-21 00:00:00'
            end: endDateItem,
            subgroup: 0,
            subgroupOrder: 0,
            content: 'Vessel New'
          });
          maxIdForNewItem++;
        }

        // if (countItemCrane > maxCraneItem) {
        //   singleDeletItem(newItem_dropped.id);
        // } else {
        if (!groupSelect.isSubGroup) {
          // klo dia taroh di parent
          let generateIdSubGroupCrane = selectedGroup + 'C' + countCraneInGroup;
          sumCrane = maxCrane - countCraneInGroup * 2;
          let qGroup = sumCrane;
          groupData = [
            {
              id: generateIdSubGroupCrane,
              content: 'crane',
              isSubGroup: true,
              orderGroup: qGroup
            }
          ];
          groupSelect.nestedGroups.push(generateIdSubGroupCrane);

          groups.add(groupData);
          selectedGroup = generateIdSubGroupCrane;
          // countItemCrane = countItemCrane + 1; // berkurang 2
        }
        items.update({
          id: newItem_dropped.id,
          group: selectedGroup,
          groupChild: '',
          groupParent: selectedParent,
          start: startDateItem,
          end: endDateItem,
          subgroup: 1,
          subgroupOrder: 1
        });
        // }
      } else {
        // klo taroh crane di child
        singleDeletItem(newItem_dropped.id);
      }
    }
    // else if (whereItemPlaced == 1) {
    //   // group crane

    //   console.log(allObjItem());
    //   console.log(selectedGroup);
    //   console.log('itemFilter');
    //   let itemFilter = allObjItem().filter(function(e) {
    //     return e.groupChild === selectedGroup && e.className === 'barge' ? e : '';
    //   });
    //   console.log(itemFilter);
    //   console.log('itemFilter');

    //   let countChildItem = _.countBy(allObjItem(), function(num) {
    //     return num.groupChild == selectedGroup ? num.className : '';
    //   });
    //   let countBargeItemInCraneGroup = countChildItem.barge;

    //   let getGroupSelected = selectedGroup.substr(selectedGroup.length - 1); // => "1"

    //   if (newItem_dropped.className == 'barge') {
    //     // klo masukin barge
    //     if (countBargeItemInCraneGroup == undefined) {
    //       // belum ada barge pada crane
    //       let parentGroup = groupSelect.nestedInGroup;
    //       let parentSelect = allGroupItem(parentGroup); //get parent group
    //       if (groupSelect.isSubGroup) {
    //         //harus taroh di child
    //         let generateIdSubGroupBarge = parentGroup + 'B' + countDataInGroup;
    //         sumBarge = maxbarge - countDataInGroup * 2;
    //         let qGroup = sumBarge;
    //         groupData = [
    //           {
    //             id: generateIdSubGroupBarge,
    //             content: 'barge',
    //             isSubGroup: true,
    //             orderGroup: qGroup
    //           }
    //         ];
    //         parentSelect.nestedGroups.push(generateIdSubGroupBarge);
    //         groups.add(groupData);
    //         selectedGroup = generateIdSubGroupBarge;
    //         // countItemBarge = countItemBarge + 1;
    //       }

    //       items.update({
    //         id: newItem_dropped.id,
    //         subgroup: 2,
    //         subgroupOrder: 2,
    //         groupChild: newItem_dropped.group,
    //         groupParent: groupParent,
    //         group: selectedGroup,
    //         start: startDateItem,
    //         end: endDateItem
    //       });
    //     } else {
    //       singleDeletItem(newItem_dropped.id);
    //     }
    //   } else {
    //     // klo masukin crane
    //     let convertStartToEnd = allObjItem(indexItem).end;
    //     let differentTime = diffDateTime(allObjItem(indexItem).start, allObjItem(indexItem).end);

    //     let endDateItem = increaseDate(convertStartToEnd, differentTime);

    //     items.update({
    //       id: newItem_dropped.id,
    //       subgroup: 2,
    //       subgroupOrder: 2,
    //       groupChild: '',
    //       groupParent: groupParent,
    //       group: selectedGroup,
    //       start: convertStartToEnd,
    //       end: endDateItem
    //     });

    //     updateActualVessel(groupParent);
    //   }
    // } else {
    //   // klo select placenya gk di group 1 atau 0

    //   if (newItem_dropped.className == 'crane') {
    //     singleDeletItem(newItem_dropped.id);
    //   } else {
    //     let convertStartToEnd = allObjItem(indexItem).end;
    //     let differentTime = diffDateTime(allObjItem(indexItem).start, allObjItem(indexItem).end);

    //     let endDateItem = increaseDate(convertStartToEnd, differentTime);

    //     timeline1.itemsData.update({
    //       id: newItem_dropped.id,
    //       subgroup: 2,
    //       subgroupOrder: 2,
    //       groupChild: newItem_dropped.group,
    //       groupParent: groupParent,
    //       group: selectedGroup,
    //       start: convertStartToEnd,
    //       end: endDateItem
    //     });
    //     updateActualVessel(groupParent);
    //   }
    // }

    // groupParentBefore = groupParent;
    // groupBefore = groupChild;

    infoDragged(newItem_dropped);

    timeline1.setSelection(-1);
    lookItemCrane(event.target.id);
  } else {
    maxIdForNewItem--;
  }
}

function lookItemCrane(idItem) {
  let newItem_dropped = allObjItem(idItem);
  let selectedGroup = newItem_dropped.group; // tempat item tersebut diletakan

  let indexItem = findIndexItem(selectedGroup);
  let selectedParent = findThatParent(indexItem);
}

function infoDragged(newItem_dropped) {
  // let html = "<b>id: </b>" + newItem_dropped.id + "<br>";
  // html += "<b>content: </b>" + newItem_dropped.content + "<br>";
  // html += "<b>Group: </b>" + newItem_dropped.group + "<br>";
  // html += "<b>start: </b>" + newItem_dropped.start + "<br>";
  // html += "<b>end: </b>" + newItem_dropped.end + "<br>";
  // document.getElementById("output").innerHTML = html;

  console.log(timeline1.itemsData.get());
  console.log('dataItem');
  console.log(allGroupItem());
  console.log('--------222');
}

function singleDeletItem(itemId) {
  items.remove({ id: itemId });
  maxIdForNewItem--;
}

function diffDateTime(startDate, endDate) {
  let date1 = new Date(startDate);
  let date2 = new Date(endDate);
  let res = Math.abs(date1 - date2) / 1000;

  // get total days between two dates
  let days = Math.floor(res / 86400);
  let hours = Math.floor(res / 3600) % 24;
  let minutes = Math.floor(res / 60) % 60;
  let seconds = res % 60;

  let differentTime = { d: days, h: hours, m: minutes, s: seconds };

  return differentTime;
}

function increaseDate(endDate, differentTime) {
  let today = moment(endDate);
  let tomorrow = moment(today)
    .add(differentTime.d, 'days')
    .add(differentTime.h, 'hours')
    .add(differentTime.m, 'minutes')
    .add(differentTime.s, 'seconds');
  // tomorrow.format('YYYY-MM-DD hh:mm:ss');
  return tomorrow;
}

function findIndexItem(selectedGroup) {
  return allObjItem().findIndex(x => x.group == selectedGroup);
}

function findThatParent(indexItem) {
  let selectedParent = allObjItem(indexItem).groupParent;
  return selectedParent;
}
function filterGroup(selectedParent) {
  let itemFilter = allGroupItem().filter(function(e) {
    return e.nestedInGroup === selectedParent && e.content === 'crane' ? e : '';
  });
  return itemFilter;
}

function countItemInsideTheGroup(selectedParent) {
  let itemInsideVessel = _.countBy(allObjItem(), function(num) {
    return num.groupParent == selectedParent ? num.className : '';
  });
  return itemInsideVessel;
}

let itemCrane = document.getElementById('dropCrane');
let itemBarge = document.getElementById('dropBarge');
itemCrane.addEventListener('dragstart', handleDragStart.bind(this), false);
itemBarge.addEventListener('dragstart', handleDragStart.bind(this), false);
itemCrane.addEventListener('dragend', handleDragEnd.bind(this), false);
itemBarge.addEventListener('dragend', handleDragEnd.bind(this), false);

console.log(allObjItem());
console.log('Load Awal');
// //----------------------------------Option Select----------------------
// // $("#dropDownCrane").on("click", function() {
// //   $("#divDropdownCrane").toggle("show");
// // });

// // $("#dropDownBarge").on("click", function() {
// //   $("#divDropdownBarge").toggle("show");
// // });
// // $("#divDropdownCrane").on("click", function(event) {
// //   event.stopPropagation();
// // });

// function showDropDownCrane() {
//   document.getElementById('divDropdownCrane').classList.toggle('show');
// }

// function showDropDownBarge() {
//   document.getElementById('divDropdownBarge').classList.toggle('show');
// }

// // Close the dropdown if the user clicks outside of it
// window.onclick = function(event) {
//   if (!event.target.matches('.dropbtn')) {
//     let dropdowns = document.getElementsByClassName('dropdown-content');
//     let i;
//     for (i = 0; i < dropdowns.length; i++) {
//       let openDropdown = dropdowns[i];
//       if (openDropdown.classList.contains('show')) {
//         openDropdown.classList.remove('show');
//       }
//     }
//   }
// };

// let dataDropDown = [
//   { id: 11, name: 'Crane A', typeClass: 'Crane' },
//   { id: 12, name: 'Crane Keala Marga Nasa', typeClass: 'Crane' },
//   { id: 13, name: 'Crane A2', typeClass: 'Crane' },
//   { id: 21, name: 'Barge B', typeClass: 'Barge' },
//   { id: 22, name: 'Barge B1', typeClass: 'Barge' },
//   { id: 23, name: 'Barge B2', typeClass: 'Barge' }
// ];
// $.each(dataDropDown, function(index, value) {
//   let newHTML =
//     '<a href="#" class="dropDown' +
//     value.typeClass +
//     '" data-id="' +
//     value.id +
//     '" data-item="' +
//     value.name +
//     '" data-classType="' +
//     value.typeClass +
//     '">' +
//     value.name +
//     '</a>';
//   $('#divDropdown' + value.typeClass).append(newHTML);
// });

// // $(".dropDownCrane").on("click", function() {
// $('.dropdown-content a').on('click', function() {
//   let dataId = $(this).attr('data-id');
//   let classType = $(this).attr('data-classType');
//   let dataName = $(this).attr('data-item');
//   $('#drop' + classType).text(dataName);
// });

// $("#cranec").data("dataObj", { id: 16, name: "craneC" });
// let dataCraneC = $("#cranec").data("dataObj");

// let filterByGroup = allObjItem.filter(function(element, i, array) {
//     let onlyDateInThisGroup = element.groupParent === lookTheirParent ? element : '';
//     return onlyDateInThisGroup;
// });
