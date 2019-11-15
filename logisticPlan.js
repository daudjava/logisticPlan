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
    vesselSize: 'A',
    typeVessel: 'Gearless',
    lcStatus: 'Available',
    laycanStart: '2019-10-21 12:00:00',
    laycanEnd: '2019-10-24 00:00:00',
    duration: '96 hrs',
    productNo: 'A-01',
    product: 'A1000',
    tonnage: '17000 T',
    customer: 'xxx Corp.',
    demurageRate: 'B',
    arriveAtTaboneo: '2019-10-21 00:00:00',
    eta: '2019-00-00 00:00:00',
    name: 'Anastasia',
    groupContent: 1,
    startDate: '2019-10-21 12:00:00',
    endDate: '2019-10-24 00:00:00',
    className: 'expected',
    subgroup: 0,
    subgroupOrder: 0
  },
  {
    id: '1A',
    vesselSize: 'A',
    typeVessel: 'Gearless',
    lcStatus: 'Available',
    laycanStart: '2019-10-21 12:00:00',
    laycanEnd: '2019-10-24 00:00:00',
    duration: '96 hrs',
    productNo: 'A-01',
    product: 'A1000',
    tonnage: '17000 T',
    customer: 'xxx Corp.',
    demurageRate: 'B',
    arriveAtTaboneo: '2019-10-21 00:00:00',
    eta: '2019-00-00 00:00:00',
    name: 'Anastasia',
    groupContent: 1,
    startDate: '2019-10-21 12:00:00',
    endDate: '2019-10-24 00:00:00',
    className: 'actual',
    subgroup: 0,
    subgroupOrder: 0
  },
  {
    id: 2,
    vesselSize: 'B',
    typeVessel: 'Gearless',
    lcStatus: 'Available',
    laycanStart: '2019-10-23 00:00:00',
    laycanEnd: '2019-10-25 12:00:00',
    duration: '96 hrs',
    productNo: 'B-01',
    product: 'B1000',
    tonnage: '17000 T',
    customer: 'xxx Corp.',
    demurageRate: 'B',
    arriveAtTaboneo: '2019-10-23 00:00:00',
    eta: '2019-00-00 00:00:00',
    name: 'Antero',
    groupContent: 2,
    startDate: '2019-10-23 00:00:00',
    endDate: '2019-10-25 12:00:00',
    className: 'expected',
    subgroup: 0,
    subgroupOrder: 0
  },
  {
    id: 3,
    vesselSize: 'C',
    typeVessel: 'Gearless',
    lcStatus: 'Available',
    laycanStart: '2019-10-25 00:00:00',
    laycanEnd: '2019-10-28 00:00:00',
    duration: '96 hrs',
    productNo: 'C-01',
    product: 'C1000',
    tonnage: '17000 T',
    customer: 'xxx Corp.',
    demurageRate: 'B',
    arriveAtTaboneo: '2019-10-25 00:00:00',
    eta: '2019-00-00 00:00:00',
    name: 'Aurillia',
    groupContent: 3,
    startDate: '2019-10-25 00:00:00',
    endDate: '2019-10-28 00:00:00',
    className: 'expected',
    subgroup: 0,
    subgroupOrder: 0
  },
  {
    id: 4,
    vesselSize: 'D',
    typeVessel: 'Geared',
    lcStatus: 'Available',
    laycanStart: '2019-10-28 00:00:00',
    laycanEnd: '2019-10-29 12:00:00',
    duration: '96 hrs',
    productNo: 'D-01',
    product: 'D1000',
    tonnage: '17000 T',
    customer: 'xxx Corp.',
    demurageRate: 'B',
    arriveAtTaboneo: '2019-10-28 00:00:00',
    eta: '2019-00-00 00:00:00',
    name: 'Blumerau',
    groupContent: 4,
    startDate: '2019-10-28 00:00:00',
    endDate: '2019-10-29 12:00:00',
    className: 'expected',
    subgroup: 0,
    subgroupOrder: 0
  },
  {
    id: '4A',
    vesselSize: 'D',
    typeVessel: 'Geared',
    lcStatus: 'Available',
    laycanStart: '2019-10-28 00:00:00',
    laycanEnd: '2019-10-29 12:00:00',
    duration: '96 hrs',
    productNo: 'D-01',
    product: 'D1000',
    tonnage: '17000 T',
    customer: 'xxx Corp.',
    demurageRate: 'B',
    arriveAtTaboneo: '2019-10-28 00:00:00',
    eta: '2019-00-00 00:00:00',
    name: 'Blumerau',
    groupContent: 4,
    startDate: '2019-10-28 00:00:00',
    endDate: '2019-10-29 12:00:00',
    className: 'actual',
    subgroup: 0,
    subgroupOrder: 0
  },
  {
    id: 5,
    vesselSize: 'E',
    typeVessel: 'Geared',
    lcStatus: 'Available',
    laycanStart: '2019-10-30 00:00:00',
    laycanEnd: '2019-10-31 00:00:00',
    duration: '96 hrs',
    productNo: 'E-01',
    product: 'E1000',
    tonnage: '17000 T',
    customer: 'xxx Corp.',
    demurageRate: 'B',
    arriveAtTaboneo: '2019-10-28 00:00:00',
    eta: '2019-00-00 00:00:00',
    name: 'Cape Lonidies',
    groupContent: 5,
    startDate: '2019-10-30 00:00:00',
    endDate: '2019-10-31 00:00:00',
    className: 'expected',
    subgroup: 0,
    subgroupOrder: 0
  },
  {
    id: 6,
    loadToVessel: '8000 T',
    loadingRate: '750 T/Hr',
    commanceLoading: '2019-10-21 12:00:00',
    completeLoading: '2019-10-24 00:00:00',
    name: 'Crane',
    groupContent: 1,
    parentId: 1,
    startDate: '2019-10-21 12:00:00',
    endDate: '2019-10-24 00:00:00',
    className: 'crane',
    type: 'range',
    subgroup: 1,
    subgroupOrder: 1
  },
  {
    id: 7,
    barge: 'A',
    capacity: '8900 T',
    estimationReady: '',
    cycle: 1,
    position: 'Trisakti',
    product: 'A4000',
    availableAtKlanis: '2019-10-21 00:00:00',
    arriveAtTaboneo: '2019-10-22 00:00:00',
    loadToVessel: '8000 T',
    remainingCargo: '0 T',
    commanceLoading: '2019-10-21 12:00:00',
    completeLoading: '2019-10-24 00:00:00',
    name: 'Barge',
    groupContent: 1,
    parentId: 6,
    startDate: '2019-10-21 12:00:00',
    endDate: '2019-10-24 00:00:00',
    className: 'barge',
    type: 'range',
    subgroup: 2,
    subgroupOrder: 1
  },
  {
    id: 8,
    loadToVessel: '8000 T',
    loadingRate: '650 T/Hr',
    commanceLoading: '2019-10-28 00:00:00',
    completeLoading: '2019-10-29 12:00:00',
    name: 'Crane',
    groupContent: 4,
    parentId: 5,
    startDate: '2019-10-28 00:00:00',
    endDate: '2019-10-29 12:00:00',
    className: 'crane',
    type: 'range',
    subgroup: 1,
    subgroupOrder: 1
  },
  {
    id: 9,
    barge: 'D',
    capacity: '6800 T',
    estimationReady: '',
    cycle: 1,
    position: 'Trisakti',
    product: 'D4000',
    availableAtKlanis: '2019-10-28 00:00:00',
    arriveAtTaboneo: '2019-10-29 12:00:00',
    loadToVessel: '8000 T',
    remainingCargo: '0 T',
    commanceLoading: '2019-10-28 00:00:00',
    completeLoading: '2019-10-29 12:00:00',
    name: 'Barge',
    groupContent: 4,
    parentId: 8,
    startDate: '2019-10-28 00:00:00',
    endDate: '2019-10-29 12:00:00',
    className: 'barge',
    type: 'range',
    subgroup: 2,
    subgroupOrder: 1
  },
  {
    id: 10,
    loadToVessel: '8000 T',
    loadingRate: '950 T/Hr',
    commanceLoading: '2019-10-28 00:00:00',
    completeLoading: '2019-10-29 12:00:00',
    name: 'Crane',
    groupContent: 4,
    parentId: 5,
    startDate: '2019-10-28 00:00:00',
    endDate: '2019-10-29 12:00:00',
    className: 'crane',
    type: 'range',
    subgroup: 1,
    subgroupOrder: 1
  },
  {
    id: 11,
    barge: 'D',
    capacity: '5800 T',
    estimationReady: '',
    cycle: 1,
    position: 'Trisakti',
    product: 'D4000',
    availableAtKlanis: '2019-10-28 00:00:00',
    arriveAtTaboneo: '2019-10-29 12:00:00',
    loadToVessel: '8000 T',
    remainingCargo: '0 T',
    commanceLoading: '2019-10-28 00:00:00',
    completeLoading: '2019-10-29 12:00:00',
    name: 'Barge',
    groupContent: 4,
    parentId: 10,
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
      vesselSize: dataItem[indexItem].vesselSize,
      typeVessel: dataItem[indexItem].typeVessel,
      lcStatus: dataItem[indexItem].lcStatus,
      laycanStart: dataItem[indexItem].laycanStart,
      laycanEnd: dataItem[indexItem].laycanEnd,
      duration: dataItem[indexItem].duration,
      productNo: dataItem[indexItem].productNo,
      product: dataItem[indexItem].product,
      tonnage: dataItem[indexItem].tonnage,
      customer: dataItem[indexItem].customer,
      demurageRate: dataItem[indexItem].demurageRate,
      arriveAtTaboneo: dataItem[indexItem].arriveAtTaboneo,
      eta: dataItem[indexItem].eta,
      name: dataItem[indexItem].name,
      loadingRate: dataItem[indexItem].loadingRate,
      capacity: dataItem[indexItem].capacity,
      className: dataItem[indexItem].className,
      group: dataItem[indexItem].groupContent,
      groupChild: '',
      groupParent: dataItem[indexItem].groupContent,
      start: dataItem[indexItem].laycanStart, //'2019-10-21 00:00:00'
      end: dataItem[indexItem].laycanEnd,
      subgroup: dataItem[indexItem].subgroup,
      subgroupOrder: dataItem[indexItem].subgroupOrder,
      content: dataItem[indexItem].name + ' ' + dataItem[indexItem].tonnage
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
    loadingRate: itemSelected.loadingRate,
    capacity: itemSelected.capacity,
    barge: itemSelected.barge,
    estimationReady: itemSelected.estimationReady,
    cycle: itemSelected.cycle,
    position: itemSelected.position,
    availableAtKlanis: itemSelected.availableAtKlanis,
    arriveAtTaboneo: itemSelected.arriveAtTaboneo,
    loadToVessel: itemSelected.loadToVessel,
    remainingCargo: itemSelected.remainingCargo,
    commanceLoading: itemSelected.commanceLoading,
    completeLoading: itemSelected.completeLoading,
    name: itemSelected.name,
    className: itemSelected.className,
    parentId: itemSelected.parentId,
    group: idItem,
    groupChild: groupSub,
    groupParent: itemSelected.groupContent,
    start: itemSelected.commanceLoading, //'2019-10-21 00:00:00'
    end: itemSelected.completeLoading,
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

function alertInfo(item) {
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: 'Data crane lebih dari 3!'
    // footer: '<a href>Why do I have this issue?</a>'
  });
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
    let selectedGroup = newItem_dropped.group; // tempat item tersebut diletakan
    let classNameItem = newItem_dropped.className;
    let indexItem = findIndexItem(selectedGroup);
    let selectedParent = findThatParent(indexItem);
    let selectedId = parentId(selectedParent);
    let whereItemPlaced = allObjItem(indexItem).subgroup;
    let groupSelect = allGroupItem(selectedGroup); //item berada di group mana

    let startDateItem = allObjItem(indexItem).start;
    let endDateItem = allObjItem(indexItem).end;

    let filterGroupCrane = filterGroup(selectedParent);
    let countItemInGroup = filterGroupCrane.length + 1;
    console.log(selectedId);
    console.log('selectedId');
    let dataParsing = {
      newItem_dropped: newItem_dropped,
      parentId: selectedId,
      selectedGroup: selectedGroup,
      indexItem: indexItem,
      selectedParent: selectedParent,
      groupSelect: groupSelect,
      startDateItem: startDateItem,
      endDateItem: endDateItem,
      countItemInGroup: countItemInGroup
    };

    if (whereItemPlaced == 0 && classNameItem == 'crane') {
      if (countItemInGroup <= 3) {
        showDialogOption(dataParsing, addDataCrane);
      } else {
        alertInfo(newItem_dropped);
        singleDeletItem(newItem_dropped.id);
      }
    } else if (whereItemPlaced == 1) {
      if (classNameItem == 'crane') {
        showDialogOption(dataParsing, addSubCrane);
      }
      if (classNameItem == 'barge') {
        selectOptionBarge(dataParsing, addDataBarge);
      }
    } else {
      singleDeletItem(newItem_dropped.id);
    }
  } else {
    maxIdForNewItem--;
  }
}

function addDataBarge(dataParsing) {
  // belum ada barge pada crane
  let parentGroup = dataParsing.groupSelect.nestedInGroup;

  let parentSelect = allGroupItem(parentGroup); //get parent group

  let dataOnThisLine = getAllCrane(dataParsing.selectedGroup, dataParsing.selectedParent);

  if (!dataOnThisLine.length) {
    //harus taroh di child
    let generateIdSubGroupBarge = parentGroup + 'B' + dataParsing.countItemInGroup;
    sumBarge = maxbarge - dataParsing.countItemInGroup * 2;
    let qGroup = sumBarge;
    groupData = [
      {
        id: generateIdSubGroupBarge,
        content: 'barge',
        isSubGroup: true,
        orderGroup: qGroup
      }
    ];
    parentSelect.nestedGroups.push(generateIdSubGroupBarge);
    groups.add(groupData);
    dataParsing.selectedGroup = generateIdSubGroupBarge;
    // countItemBarge = countItemBarge + 1;
  } else {
    dataParsing.selectedGroup = dataOnThisLine[0].group;
    // dataParsing.parentId = dataParsing.newItem_dropped.indexItem;
  }

  let dateTimeParent = allObjItem(parseInt(dataParsing.parentId));
  let newDateStart = dateTimeParent.commanceLoading;
  let newDateEnd = dateTimeParent.completeLoading;
  console.log(dateTimeParent);
  console.log('dateTimeParent');

  items.update({
    id: dataParsing.newItem_dropped.id,
    barge: dataParsing.newItem_dropped.barge,
    capacity: dataParsing.newItem_dropped.capacity,
    estimationReady: dataParsing.newItem_dropped.estimationReady,
    cycle: dataParsing.newItem_dropped.cycle,
    position: dataParsing.newItem_dropped.position,
    product: dataParsing.newItem_dropped.product,
    availableAtKlanis: dataParsing.newItem_dropped.availableAtKlanis,
    arriveAtTaboneo: dataParsing.newItem_dropped.arriveAtTaboneo,
    loadToVessel: dataParsing.newItem_dropped.loadToVessel,
    remainingCargo: dataParsing.newItem_dropped.remainingCargo,
    commanceLoading: dataParsing.newItem_dropped.commanceLoading,
    completeLoading: dataParsing.newItem_dropped.completeLoading,
    subgroup: 2,
    subgroupOrder: 2,
    groupChild: dataParsing.newItem_dropped.group,
    groupParent: dataParsing.selectedParent,
    parentId: parseInt(dataParsing.parentId),
    group: dataParsing.selectedGroup,
    start: newDateStart,
    end: newDateEnd
  });

  infoDragged(dataParsing.newItem_dropped);

  timeline1.setSelection(-1);
  lookItemCrane(dataParsing.newItem_dropped.id);
}

function selectOptionBarge(dataParsing, callback) {
  let dataOnThisLine = getThisGroup(dataParsing.selectedGroup, dataParsing.selectedParent);

  let inputOption = {};
  $.each(dataOnThisLine, function(index, value) {
    inputOption[value.id] = value.content;
  });

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
      // Swal.fire({
      //   html: 'You selected: ' + result.value
      // });
      dataParsing.parentId = result.value;
      callback(dataParsing);
    } else {
      singleDeletItem(dataParsing.newItem_dropped.id);
    }
  });
}

function showDialogOption(dataParsing, callback) {
  let inputOption = {
    '700': 'Loading Rate : 700 T/Hr',
    '890': 'Loading Rate : 890 T/Hr',
    '990': 'Loading Rate : 990 T/Hr'
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
      // Swal.fire({
      //   html: 'You selected: ' + result.value
      // });
      dataParsing.loadingRate = result.value;
      callback(dataParsing);
    } else {
      singleDeletItem(dataParsing.newItem_dropped.id);
    }
  });
}

function addSubCrane(dataParsing) {
  // klo masukin crane
  let dataOnThisLine = getThisGroup(dataParsing.selectedGroup, dataParsing.selectedParent);
  let lastDataOnThisLine = dataOnThisLine[dataOnThisLine.length - 1];
  let convertStartToEnd = lastDataOnThisLine.completeLoading;
  let differentTime = diffDateTime(lastDataOnThisLine.commanceLoading, lastDataOnThisLine.completeLoading);
  let endDateItem = increaseDate(convertStartToEnd, differentTime);

  items.update({
    id: dataParsing.newItem_dropped.id,
    loadToVessel: dataParsing.newItem_dropped.loadToVessel,
    loadingRate: dataParsing.newItem_dropped.loadingRate,
    commanceLoading: dataParsing.newItem_dropped.commanceLoading,
    completeLoading: dataParsing.newItem_dropped.completeLoading,
    loadingRate: dataParsing.loadingRate,
    subgroup: 2,
    subgroupOrder: 2,
    groupChild: '',
    parentId: dataParsing.parentId,
    groupParent: dataParsing.selectedParent,
    group: dataParsing.selectedGroup,
    start: convertStartToEnd,
    end: endDateItem,
    content: dataParsing.newItem_dropped.content + ' ' + dataParsing.loadingRate
  });

  updateActualVessel(dataParsing.selectedParent);

  infoDragged(dataParsing.newItem_dropped);

  timeline1.setSelection(-1);
  lookItemCrane(dataParsing.newItem_dropped.id);
}

function addDataCrane(dataParsing) {
  let findActualItem = _.countBy(allObjItem(), function(num) {
    return num.groupParent == dataParsing.selectedParent ? num.className : '';
  });
  let isThereActualItem = findActualItem.actual;

  if (isThereActualItem == undefined) {
    // belum ada barge dan crane
    items.add({
      id: maxIdForNewItem,
      vesselSize: dataParsing.newItem_dropped.vesselSize,
      typeVessel: dataParsing.newItem_dropped.typeVessel,
      lcStatus: dataParsing.newItem_dropped.lcStatus,
      laycanStart: dataParsing.newItem_dropped.laycanStart,
      laycanEnd: dataParsing.newItem_dropped.laycanEnd,
      duration: dataParsing.newItem_dropped.duration,
      tonnage: dataParsing.newItem_dropped.tonnage,
      customer: dataParsing.newItem_dropped.customer,
      demurageRate: dataParsing.newItem_dropped.demurageRate,
      arriveAtTaboneo: dataParsing.newItem_dropped.arriveAtTaboneo,
      eta: dataParsing.newItem_dropped.eta,
      productNo: dataParsing.newItem_dropped.productNo,
      product: dataParsing.newItem_dropped.product,
      name: dataParsing.newItem_dropped.name,
      loadingRate: dataParsing.newItem_dropped.loadingRate,
      capacity: dataParsing.newItem_dropped.capacity,
      className: 'actual',
      group: dataParsing.selectedParent,
      groupChild: '',
      groupParent: dataParsing.selectedParent,
      start: dataParsing.laycanStart, //'2019-10-21 00:00:00'
      end: dataParsing.laycanEnd,
      subgroup: 0,
      subgroupOrder: 0,
      content: 'Vessel New'
    });
    dataParsing.parentId = maxIdForNewItem;
    maxIdForNewItem++;
  }

  if (!dataParsing.groupSelect.isSubGroup) {
    // klo dia taroh di parent
    let generateIdSubGroupCrane = dataParsing.selectedGroup + 'C' + dataParsing.countItemInGroup;
    sumCrane = maxCrane - dataParsing.countItemInGroup * 2;
    let qGroup = sumCrane;
    groupData = [
      {
        id: generateIdSubGroupCrane,
        content: 'crane',
        isSubGroup: true,
        orderGroup: qGroup
      }
    ];
    dataParsing.groupSelect.nestedGroups.push(generateIdSubGroupCrane);

    groups.add(groupData);
    dataParsing.selectedGroup = generateIdSubGroupCrane;
    // countItemCrane = countItemCrane + 1; // berkurang 2
  }

  items.update({
    id: dataParsing.newItem_dropped.id,
    loadToVessel: dataParsing.newItem_dropped.loadToVessel,
    loadingRate: dataParsing.newItem_dropped.loadingRate,
    commanceLoading: dataParsing.newItem_dropped.commanceLoading,
    completeLoading: dataParsing.newItem_dropped.completeLoading,
    group: dataParsing.selectedGroup,
    groupChild: '',
    parentId: dataParsing.parentId,
    groupParent: dataParsing.selectedParent,
    start: dataParsing.commanceLoading,
    end: dataParsing.completeLoading,
    subgroup: 1,
    subgroupOrder: 1,
    content: dataParsing.newItem_dropped.content + ' ' + dataParsing.loadingRate
  });

  infoDragged(dataParsing.newItem_dropped);

  timeline1.setSelection(-1);
  lookItemCrane(dataParsing.newItem_dropped.id);
}

function dropItem(event) {
  // let countItemData = countItemInsideTheGroup(selectedParent);

  // let groupParent = selectedParent; //group parent item tersebut
  // let groupParentNow = groupParent;

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

  //     } else {
  //       singleDeletItem(newItem_dropped.id);
  //     }
  //   } else {

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
  console.log('Data Item All');
  console.log(allGroupItem());
  console.log('Group Item All');
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

function parentId(selectedParent) {
  let indexParent = allObjItem().findIndex(x => x.groupParent == selectedParent);
  let paretId = allObjItem(indexParent).id;
  return paretId;
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

function getAllCrane(selectedGroup, selectedParent) {
  let itemFilter = allObjItem().filter(function(e) {
    return e.groupChild === selectedGroup && e.groupParent === selectedParent ? e : '';
  });
  return itemFilter;
}

function getThisGroup(selectedGroup, selectedParent) {
  let itemFilter = allObjItem().filter(function(e) {
    return e.group === selectedGroup && e.groupParent === selectedParent ? e : '';
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
