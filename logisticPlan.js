//global variable
const maxCrane = 8;
const maxbarge = 7;
const maxCraneItem = 3;
let numberOfGroups = 8;

let groups = new vis.DataSet();
let groupParentBefore = -1;
let groupBefore = -1;
let groupChild = '';

let items = new vis.DataSet();
let sumCrane = 0;
let sumBarge = 0;
let idSubGroupCrane = 1;
let idSubGroupBarge = 1;

let taboneoViewOptions = {
  height: '99%',
  min: new Date(2019, 9, 1), // lower limit of visible range
  max: new Date(2019, 12, 1), // upper limit of visible range
  // zoomMin: 1000 * 60 * 60 * 24,             // one day in milliseconds
  zoomMax: 1000 * 60 * 60 * 24 * 31 * 2, // about three months in milliseconds
  locale: 'en',
  showCurrentTime: true,
  stack: true,
  stackSubgroups: true,
  // start: '2019-11-23 00:00', //'2019-10-21 00:00:00' 2019-11-23 00:00
  // end: '2019-12-12 12:00', //2019-12-17 00:00
  start: today,
  end: nextWeek,
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

    localStorage.setItem('item_added_to_cart', 1);
    localStorage.setItem('id', item.id);
    localStorage.setItem('start', item.start);
    localStorage.setItem('end', item.end);
  },
  onRemove: function(item, callback) {
    localStorage.setItem('item_added_to_cart', 1);
    localStorage.setItem('id', item.id);
    localStorage.setItem('start', item.start);
    localStorage.setItem('end', item.end);
    removeConfirm(item, callback);
    // prettyConfirm('Remove item', 'Do you really want to remove item ' + item.content + '?', function(ok) {
    //   if (ok) {

    //   } else {
    //     callback(null); // cancel deletion
    //   }
    // });
  }
};

const container = document.getElementById('mytimeline');

var timeline1 = new vis.Timeline(container, items, groups, taboneoViewOptions);

let numberOfItems = dataItem.length;
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
  if ((dataItem[indexItem].CLASS_NAME = 'EXPECTED')) {
    dataItem[indexItem].SUB_GROUP = 0;
    dataItem[indexItem].SUB_ORDER_GROUP = 0;
    // klo dia parent
    let contentText =
      dataItem[indexItem].CLASS_NAME == 'ACTUAL' ? ' ' : dataItem[indexItem].VESSEL_NAME + ' ' + dataItem[indexItem].FORECAST_DRAFT_TONNAGE;
    items.add({
      id: indexItem,
      vesselSize: dataItem[indexItem].VESSEL_SIZE,
      typeVessel: dataItem[indexItem].VESSEL_TYPE,
      lcStatus: dataItem[indexItem].LC_STATUS,
      laycanStart: dataItem[indexItem].LAYSTART,
      laycanEnd: dataItem[indexItem].LAYSTOP,
      duration: dataItem[indexItem].DURATION,
      productNo: dataItem[indexItem].PRODUCT_ID,
      product: dataItem[indexItem].PRODUCT_NAME,
      tonnage: dataItem[indexItem].FORECAST_DRAFT_TONNAGE,
      customer: dataItem[indexItem].CUSTOMER_NAME,
      demurageRate: dataItem[indexItem].DEMURAGE_RATE,
      arriveAtTaboneo: dataItem[indexItem].ARRIVE_TABONEO,
      eta: dataItem[indexItem].ETA,
      name: dataItem[indexItem].VESSEL_NAME,
      className: dataItem[indexItem].CLASS_NAME,
      group: dataItem[indexItem].VESSELID,
      groupChild: '',
      groupParent: dataItem[indexItem].VESSELID,
      start: dataItem[indexItem].LAYSTART, //'2019-10-21 00:00:00'
      end: dataItem[indexItem].LAYSTOP,
      subgroup: dataItem[indexItem].SUB_GROUP,
      subgroupOrder: dataItem[indexItem].SUB_ORDER_GROUP,
      content: contentText
    });
  } else if ((dataItem[indexItem].CLASS_NAME = 'BARGE')) {
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

function runscript(object) {
  object.querySelector('.insider').style.color = 'red';
}

function updateActualVessel(groupParent) {
  // let newItem_dropped = timeline1.itemsData.get(item.id);
  let lookTheirParent = groupParent;
  // let allObjItem = timeline1.itemsData.get();
  let index = allObjItem().findIndex(x => x.group === lookTheirParent && x.className === 'ACTUAL');
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
          (e.group == selectedParent.groupParent && e.className == 'ACTUAL');
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
      if (element.className !== 'ACTUAL') {
        groups.remove({ id: element.group });
      }
    });
  }
}

let getMaxId = numberOfItems;
let itemAddCrane = 1;
let itemAddBarge = 1;
let maxIdForNewItem = allObjItem().reduce((max, item) => (item.id > max ? item.id : max), allObjItem()[0].id) + 1;
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

    // let startDateItem = allObjItem(indexItem).start;
    // let endDateItem = allObjItem(indexItem).end;
    let dataParent = allObjItem(indexItem);
    let topParent = allObjItem(selectedParent);

    let filterGroupCrane = filterGroup(selectedParent);
    let countItemInGroup = filterGroupCrane.length + 1;
    let dataParsing = {
      newItem_dropped: newItem_dropped,
      parentId: selectedId,
      selectedGroup: selectedGroup,
      indexItem: indexItem,
      selectedParent: selectedParent,
      groupSelect: groupSelect,
      dataParent: dataParent,
      topParent: topParent,
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
        showCurrentCrane(dataParsing, showDialogOptionBarge);
      }
    } else {
      singleDeletItem(newItem_dropped.id);
    }
  } else {
    maxIdForNewItem--;
  }
}

function showDialogOptionBarge(dataParsing) {
  selectOptionBarge(dataParsing, addDataBarge);
}

function selectOptionBarge(dataParsing, callback) {
  let inputOption = {
    '100000 T': '100000 T',
    '300000 T': '300000 T',
    '500000 T': '500000 T'
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
      dataParsing.bargeVolume = getOnlyNumber(result.value)[0];
      callback(dataParsing);
    } else {
      singleDeletItem(dataParsing.newItem_dropped.id);
    }
  });
}
let arrayObjBarge = [];
function addDataBarge(dataParsing) {
  // belum ada barge pada crane
  let parentGroup = dataParsing.groupSelect.nestedInGroup;

  let parentSelect = allGroupItem(parentGroup); //get parent group

  let dataOnThisLine = getAllCrane(dataParsing.selectedGroup, dataParsing.selectedParent);
  let dateTimeParent = allObjItem(parseInt(dataParsing.parentId));
  let newDateStart = dateTimeParent.start;
  let newDateEnd = dateTimeParent.end;

  let countDayBarge = dataParsing.bargeVolume / dataParsing.loadingRate;
  let differentTime = {};
  if (!dataOnThisLine.length) {
    //harus taroh di child
    // let generateIdSubGroupBarge = parentGroup + 'B' + dataParsing.countItemInGroup;
    let getLastChar = dataParsing.groupSelect.id[dataParsing.groupSelect.id.length - 1];
    sumBarge = maxbarge - getLastChar * 2;
    let generateIdSubGroupBarge = dataParsing.groupSelect.id.replace('C', 'B');
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
    dataParsing.newBarge = true;
  } else {
    dataParsing.newBarge = false;

    let dataBargeOnThisGroup = dataOnThisLine[dataOnThisLine.length - 1];
    dataParsing.selectedGroup = dataOnThisLine[0].group;

    newDateStart = dataBargeOnThisGroup.end;
  }

  differentTime.h = countDayBarge * 24;
  dataParsing.durationBarge = countDayBarge * 24;

  newDateEnd = increaseDate(newDateStart, differentTime);

  items.update({
    id: dataParsing.newItem_dropped.id,
    barge: dataParsing.newItem_dropped.barge,
    capacity: dataParsing.bargeVolume + ' T',
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
    end: newDateEnd,
    content: dataParsing.topParent.product + ' ' + dataParsing.bargeVolume + ' T'
  });
  let objCraneParse = {};
  objCraneParse.dataParsing = dataParsing;
  objCraneParse.newDateStart = newDateStart;
  objCraneParse.newDateEnd = newDateEnd;
  arrayObjBarge.push(objCraneParse);
  parseBargeObj(arrayObjBarge);

  infoDragged(dataParsing.newItem_dropped);
  updateCrane(dataParsing);
  timeline1.setSelection(-1);
  lookItemCrane(dataParsing.newItem_dropped.id);
}

function updateCrane(dataParsing) {
  let dataOnThisLine = getAllCraneOnSameGroup(dataParsing.dataParent.group, dataParsing.selectedParent);

  let currentIndex = dataOnThisLine.findIndex(x => x.id === dataParsing.parentId);
  let selectedCrane = currentIndex;
  let differentTime = {};
  differentTime.h = dataParsing.durationBarge;
  for (let i = 0; i < dataOnThisLine.length; i++) {
    if (i == currentIndex) {
      // update data crane yang sama dengan index
      if (dataParsing.newBarge) {
        //pertama kli masukin bargenya baru dibuat
        idCraneUpdate = dataOnThisLine[i].id;
        convertNewStart = dataOnThisLine[i].start;
        newDateEnd = increaseDate(convertNewStart, differentTime);
      } else {
        //klo barge sudah ada
        idCraneUpdate = dataOnThisLine[i].id;
        convertNewStart = dataOnThisLine[i].start;
        newDateEnd = increaseDate(dataOnThisLine[i].end, differentTime);

        items.update({
          id: dataParsing.newItem_dropped.id,
          start: dataOnThisLine[i].end,
          end: newDateEnd
        });
      }

      items.update({
        id: idCraneUpdate,
        start: convertNewStart,
        end: newDateEnd
      });
    } else if (i > currentIndex) {
      // update data crane setelah index
      if (dataParsing.newBarge) {
        //pertama kli masukin bargenya baru dibuat
        idCraneUpdate = dataOnThisLine[i].id;
        convertNewStart = dataOnThisLine[i].start;
        newDateEnd = increaseDate(convertNewStart, differentTime);
      } else {
        //klo barge sudah ada
        idCraneUpdate = dataOnThisLine[i].id;
        convertNewStart = increaseDate(dataOnThisLine[i].start, differentTime);
        newDateEnd = increaseDate(dataOnThisLine[i].end, differentTime);
      }

      items.update({
        id: idCraneUpdate,
        start: convertNewStart,
        end: newDateEnd
      });
    }
  }

  updateActualVessel(dataParsing.selectedParent);
}

function showCurrentCrane(dataParsing, callback) {
  let dataOnThisLine = getThisGroup(dataParsing.selectedGroup, dataParsing.selectedParent);

  let inputOption = {};
  $.each(dataOnThisLine, function(index, value) {
    inputOption[value.id + '/' + value.loadingRate] = value.content;
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
      let getArrRate = getOnlyNumber(result.value);
      let dataId = getArrRate[0];
      let dataLodaingRate = getArrRate[1];
      if (dataLodaingRate[2]) {
        dataLodaingRate = dataLodaingRate + '.' + getArrRate[2];
      }
      dataParsing.parentId = dataId;
      dataParsing.loadingRate = dataLodaingRate;
      callback(dataParsing);
    } else {
      singleDeletItem(dataParsing.newItem_dropped.id);
    }
  });
}

let getOnlyNumber = string => {
  // return string.match(/\d+/g).map(Number);
  return string.match(/\d+/g);
};

function showDialogOption(dataParsing, callback) {
  // let inputOption = {
  //   '100 T/Hr': 'Loading Rate : 100 T/Hr',
  //   '500 T/Hr': 'Loading Rate : 500 T/Hr',
  //   '750 T/Hr': 'Loading Rate : 750 T/Hr'
  // };
  let arrayDataCrane = [
    {
      FLEET_ID: '234',
      FLEET_TYPE: 'crane',
      FLEET_NAME: 'AL9',
      LOAD_RATE: '19440,34',
      COMPANY_ID: '7',
      PRIORITY: '2'
    },
    {
      FLEET_ID: '235',
      FLEET_TYPE: 'crane',
      FLEET_NAME: 'FTU',
      LOAD_RATE: '48800,00',
      COMPANY_ID: '4',
      PRIORITY: '1'
    },
    {
      FLEET_ID: '236',
      FLEET_TYPE: 'crane',
      FLEET_NAME: 'IA',
      LOAD_RATE: '17340,00',
      COMPANY_ID: '4',
      PRIORITY: '1'
    },
    {
      FLEET_ID: '238',
      FLEET_TYPE: 'crane',
      FLEET_NAME: 'IC',
      LOAD_RATE: '23817,07',
      COMPANY_ID: '4',
      PRIORITY: '1'
    },
    {
      FLEET_ID: '237',
      FLEET_TYPE: 'crane',
      FLEET_NAME: 'RD',
      LOAD_RATE: '23817,07',
      COMPANY_ID: '2',
      PRIORITY: '1'
    }
  ];

  let inputOption = {};
  $.each(arrayDataCrane, function(index, value) {
    inputOption[value.FLEET_ID + '/' + value.LOAD_RATE] = 'Loading Rate : ' + value.LOAD_RATE + ' T/Hr';
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
  let convertStartToEnd = lastDataOnThisLine.end;
  let differentTime = diffDateTime(lastDataOnThisLine.start, lastDataOnThisLine.end);
  let endDateItem = increaseDate(convertStartToEnd, differentTime);

  let arrLoadingRate = getOnlyNumber(dataParsing.loadingRate);
  // let idSelectedCrane = getOnlyNumber(dataParsing.parentId)[0];
  let craneId = arrLoadingRate[0];
  let idLoadingRate = arrLoadingRate[1];
  if (arrLoadingRate[2]) {
    let comaRate = arrLoadingRate[2];
    idLoadingRate = idLoadingRate + '.' + comaRate;
  }

  items.update({
    id: dataParsing.newItem_dropped.id,
    loadToVessel: dataParsing.newItem_dropped.loadToVessel,
    loadingRate: dataParsing.newItem_dropped.loadingRate,
    commanceLoading: convertStartToEnd,
    completeLoading: endDateItem,
    loadingRate: idLoadingRate,
    subgroup: 2,
    subgroupOrder: 2,
    groupChild: '',
    parentId: dataParsing.parentId,
    groupParent: dataParsing.selectedParent,
    group: dataParsing.selectedGroup,
    craneId: craneId,
    start: convertStartToEnd,
    end: endDateItem,
    content: dataParsing.newItem_dropped.content + ' ' + idLoadingRate
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
      className: 'ACTUAL',
      group: dataParsing.selectedParent,
      groupChild: '',
      groupParent: dataParsing.selectedParent,
      start: dataParsing.dataParent.start, //'2019-10-21 00:00:00'
      end: dataParsing.dataParent.end,
      subgroup: 0,
      subgroupOrder: 0,
      // content: dataParsing.dataParent.content
      content: ''
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
  let arrLoadingRate = getOnlyNumber(dataParsing.loadingRate);
  let craneId = arrLoadingRate[0];
  let loadingRate = arrLoadingRate[1];
  if (arrLoadingRate[2]) {
    let comaRate = arrLoadingRate[2];
    loadingRate = loadingRate + '.' + comaRate;
  }

  items.update({
    id: dataParsing.newItem_dropped.id,
    loadToVessel: dataParsing.newItem_dropped.loadToVessel,
    loadingRate: loadingRate,
    commanceLoading: dataParsing.newItem_dropped.commanceLoading,
    completeLoading: dataParsing.newItem_dropped.completeLoading,
    group: dataParsing.selectedGroup,
    groupChild: '',
    parentId: dataParsing.parentId,
    groupParent: dataParsing.selectedParent,
    craneId: craneId,
    start: dataParsing.dataParent.start,
    end: dataParsing.dataParent.end,
    subgroup: 1,
    subgroupOrder: 1,
    content: dataParsing.newItem_dropped.content + ' ' + loadingRate
  });

  infoDragged(dataParsing.newItem_dropped);

  timeline1.setSelection(-1);
  lookItemCrane(dataParsing.newItem_dropped.id);
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
    return e.nestedInGroup == selectedParent && e.content == 'crane' ? e : '';
  });
  return itemFilter;
}

function getAllCraneOnSameGroup(selectedGroup, selectedParent) {
  let itemFilter = allObjItem().filter(function(e) {
    return e.group === selectedGroup && e.groupParent === selectedParent ? e : '';
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

$('.saveBtv').click(function() {
  console.log(allObjItem());
});

console.log(allObjItem());
console.log('Load Awal');

localStorage.setItem('item_added_to_cart', 0);
function itemAddedToCart() {
  let userParsing = {};
  userParsing.id = window.localStorage.getItem('id');
  userParsing.start = window.localStorage.getItem('start');
  userParsing.end = window.localStorage.getItem('end');
  updateTimline(userParsing);
}

function updateTimline(userParsing) {
  items.update({
    id: userParsing.id,
    start: userParsing.start,
    end: userParsing.end
  });
}
window.addEventListener('storage', itemAddedToCart);

function getDataCrane() {
  var result = null;
  var scriptUrl = '../getCrane';
  $.ajax({
    url: scriptUrl,
    type: 'get',
    dataType: 'json',
    async: false,
    success: function(data) {
      result = data;
    },
    error: function(xhr, status, error) {
      alert(status);
      return;
    }
  });
  return result;
}

function viewTriggerLaycan(json) {
  $.ajax({
    type: 'POST',
    url: '../runLaycanUploader',
    contentType: 'application/json; charset=utf-8',
    dataType: 'json',
    data: JSON.stringify(json),
    success: function(result, status, xhr) {
      if (result == 'Success') {
        alert('Success Upload Laycan');
      }
    },
    error: function(xhr, status, error) {
      alert(status);
      return;
    }
  });
}

window.onbeforeunload = closingCode;
function closingCode() {
  return window.localStorage.clear();
}
