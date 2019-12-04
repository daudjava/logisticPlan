let groups = new vis.DataSet();

let items = new vis.DataSet();

let numberOfGroups = 3;

let kelanisViewOptions = {
  min: new Date(2019, 9, 1), // lower limit of visible range
  max: new Date(2019, 12, 1), // upper limit of visible range
  zoomMax: 1000 * 60 * 60 * 24 * 31 * 2, // about three months in milliseconds
  locale: 'en',
  showCurrentTime: true,
  stack: true,
  stackSubgroups: true,
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
  onMove: function(item, callback) {
    callback(item); // send back adjusted new item
    showPopOverItem(item);

    console.log(timeline2.itemsData.get());
    console.log('Data Item All');
    console.log(allGroupItem());
    console.log('Group Item All');
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
  }
};

const container2 = document.getElementById('mytimeline2');
var timeline2 = new vis.Timeline(container2, items, groups, kelanisViewOptions);

// let numberOfItems = dataItem.length;
const allObjItem = function(indexItem) {
  return timeline2.itemsData.get(indexItem);
};

const allGroupItem = function(indexGroup) {
  return groups.get(indexGroup);
};

let userParsing = JSON.parse(localStorage.getItem('dataParsing'));
let countBarge = userParsing != null ? userParsing.length : false;
if (countBarge) {
  createObjBarge(countBarge);
} else {
  // close();
}

//ketika ada perubahan data
window.addEventListener('storage', getDataBarge);

console.log(getDataBarge());
console.log('getDataBarge');

localStorage.setItem('item_added_to_cart', 0);
function getDataBarge() {
  if (JSON.parse(localStorage.getItem('dataParsing')) != null) {
    let userParsing = JSON.parse(localStorage.getItem('dataParsing'));
    let countBarge = userParsing.length;
    console.log(userParsing.length);
    console.log('getDataBarge');
    createObjBarge(countBarge);
    return userParsing;
  } else {
    return;
  }
}

function createObjBarge(countBarge) {
  $('#bargeList').empty();
  for (let i = 0; i < countBarge; i++) {
    let indexNo = i;
    let htmlBarge =
      '<li class="list-group-item bargeQueue" id="barge' + indexNo + '" draggable="true" data-no="' + indexNo + '">Barge' + (indexNo + 1) + '</li>';
    $('#bargeList').append(htmlBarge);
    let itemBarge = document.getElementById('barge' + indexNo);
    itemBarge.addEventListener('dragstart', handleDragStartBarge.bind(this), false);
    itemBarge.addEventListener('dragend', handleDragEndBarge.bind(this), false);
  }
}

// let itemBarge0 = document.getElementById('barge0');
// itemBarge0.addEventListener('dragstart', handleDragStartBarge.bind(this), false);

function handleDragStartBarge(event) {
  // let allArrData = getDataBarge();
  // let bargeId = event.target.id;
  // let indexNo = $('#' + bargeId).data('no');
  // let userParsing = allArrData[indexNo];
  // let dataParsing = userParsing.dataParsing;

  // console.log(dataParsing);
  // console.log('userParsingDataStart');
  // let item = {
  //   id: dataParsing.newItem_dropped.id,
  //   domObj: event.target,
  //   content: event.target.innerHTML.trim(),
  //   start: dataParsing.newItem_dropped.start,
  //   end: dataParsing.newItem_dropped.end
  // };

  // console.log(item);
  // console.log('itemitemitemitemitem');
  // event.dataTransfer.setData('text', JSON.stringify(item));
  console.log('handleDragStartBarge');
  // event.dataTransfer.effectAllowed = 'move';
  // var dragSrcEl = event.target;

  var itemType = event.target.innerHTML.trim();
  var item = {
    id: new Date(),
    type: 'range',
    content: event.target.innerHTML.trim()
  };

  event.dataTransfer.setData('text', JSON.stringify(item));
}

function handleDragEndBarge(event) {
  let allArrData = getDataBarge();
  let bargeId = event.target.id;
  let indexNo = $('#' + bargeId).data('no');
  let userParsing = allArrData[indexNo];
  userParsing.groupSelected = 1;

  console.log(event);
  console.log('allArrData');
  // let selectedGroup = userParsing.dataParsing.newItem_dropped.group; // tempat item tersebut diletakan;
  // let indexItem = findIndexItem(selectedGroup);
  // let whereItemPlaced = allObjItem(indexItem).subgroup;

  if (event.dataTransfer.dropEffect !== 'none') {
    $('#' + bargeId)
      .draggable()
      .remove();

    updateTimline(userParsing);
  }
}

function updateTimline(stringParsing) {
  let dataParsing = stringParsing.dataParsing;
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
    group: dataParsing.groupSelected,
    groupChild: dataParsing.newItem_dropped.group,
    groupParent: dataParsing.selectedParent,
    parentId: parseInt(dataParsing.parentId),
    start: stringParsing.newDateStart,
    end: stringParsing.newDateEnd,
    content: dataParsing.topParent.product + ' ' + dataParsing.bargeVolume + ' T'
  });

  console.log(allObjItem());
  console.log('Load Awal');

  console.log(allGroupItem());
  console.log('Group Item All');
}

timeline2.on('doubleClick', function(properties) {
  let item = items.get(properties.items);
  let getLastItemDrop = item.length - 1;
  let itemSelected = item[getLastItemDrop];
  items.remove({ id: itemSelected.id });
});

timeline2.on('select', function(properties) {
  let target = properties.event.target;
  let item = items.get(properties.items);
  if (item[0] !== undefined) {
    let itemSelected = item[0];
    showPopOverItem(itemSelected);
  }
});

for (let i = 1; i <= numberOfGroups; i += 2) {
  groups.add({
    id: 'Kelanis' + i,
    orderGroup: 8,
    isSubGroup: false,
    content: 'Klanis &nbsp;' + i
  });
}

// for (let indexItem = 0; indexItem < numberOfItems; indexItem++) {
//   if (dataItem[indexItem].subgroup == 2) {
//     let itemSelected = dataItem[indexItem];
//     let idItem = itemSelected.product != 'D4000' ? 1 : 3;
//     items.add({
//       id: indexItem,
//       productNo: itemSelected.productNo,
//       product: itemSelected.product,
//       loadingRate: itemSelected.loadingRate,
//       capacity: itemSelected.capacity,
//       barge: itemSelected.barge,
//       estimationReady: itemSelected.estimationReady,
//       cycle: itemSelected.cycle,
//       position: itemSelected.position,
//       availableAtKlanis: itemSelected.availableAtKlanis,
//       arriveAtTaboneo: itemSelected.arriveAtTaboneo,
//       loadToVessel: itemSelected.loadToVessel,
//       remainingCargo: itemSelected.remainingCargo,
//       commanceLoading: itemSelected.commanceLoading,
//       completeLoading: itemSelected.completeLoading,
//       name: itemSelected.name,
//       className: itemSelected.className,
//       parentId: itemSelected.parentId,
//       group: idItem,
//       groupChild: '',
//       groupParent: itemSelected.groupContent,
//       start: itemSelected.startDate, //'2019-10-21 00:00:00'
//       end: itemSelected.endDate,
//       subgroup: itemSelected.subgroup,
//       subgroupOrder: itemSelected.subgroupOrder,
//       content: itemSelected.product,
//       editable: { updateTime: true, updateGroup: false, remove: true }
//     });
//   }
// }
