let numberOfItems = dataItem.length;
numberOfGroups = 3;
const allObjItem = function(indexItem) {
  return timeline2.itemsData.get(indexItem);
};

const allGroupItem = function(indexGroup) {
  return groups.get(indexGroup);
};

console.log(allObjItem());
console.log('Load Awal');

console.log(allGroupItem());
console.log('Group Item All');

let userParsing = JSON.parse(localStorage.getItem('dataParsing'));
let countBarge = userParsing.length;
if (countBarge) {
  createObjBarge(countBarge);
}

//ketika ada perubahan data
window.addEventListener('storage', getDataBarge);
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

function handleDragStartBarge(event) {
  console.log(event.dataTransfer.dropEffect);
  console.log('dragStart');
}

function handleDragEndBarge(event, index) {
  let allArrData = getDataBarge();
  let bargeId = event.target.id;
  let indexNo = $('#' + bargeId).data('no');
  let userParsing = allArrData[indexNo];

  let selectedGroup = userParsing.dataParsing.newItem_dropped.group; // tempat item tersebut diletakan;
  let indexItem = findIndexItem(selectedGroup);

  // let whereItemPlaced = allObjItem(indexItem).subgroup;
  console.log(allArrData);
  console.log('allArrData');
  console.log(selectedGroup);
  console.log('selectedGroup');
  console.log(indexItem);
  console.log('indexItem');

  if (event.dataTransfer.dropEffect !== 'none') {
    $('#' + bargeId)
      .draggable()
      .remove();

    updateTimline(userParsing);
  }
}

function updateTimline(stringParsing) {
  let dataParsing = stringParsing.dataParsing;
  console.log(dataParsing);
  console.log('dataParsing');
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
    group: 1,
    groupChild: dataParsing.newItem_dropped.group,
    groupParent: dataParsing.selectedParent,
    parentId: parseInt(dataParsing.parentId),
    start: stringParsing.newDateStart,
    end: stringParsing.newDateEnd,
    content: dataParsing.topParent.product + ' ' + dataParsing.bargeVolume + ' T'
  });
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
    id: i,
    orderGroup: 8,
    isSubGroup: false,
    content: 'Klanis &nbsp;' + i
  });
}

for (let indexItem = 0; indexItem < numberOfItems; indexItem++) {
  if (dataItem[indexItem].subgroup == 2) {
    let itemSelected = dataItem[indexItem];
    let idItem = itemSelected.product != 'D4000' ? 1 : 3;
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
      groupChild: '',
      groupParent: itemSelected.groupContent,
      start: itemSelected.startDate, //'2019-10-21 00:00:00'
      end: itemSelected.endDate,
      subgroup: itemSelected.subgroup,
      subgroupOrder: itemSelected.subgroupOrder,
      content: itemSelected.product,
      editable: { updateTime: true, updateGroup: false, remove: true }
    });
  }
}
