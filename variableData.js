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
    product: 'A4000',
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
    product: 'A4000',
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
    product: 'D4000',
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
    product: 'D4000',
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
    loadingRate: '200 T/Hr',
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
    capacity: '890 T',
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
  height: '99%',
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
let options2 = {
  min: new Date(2019, 9, 1), // lower limit of visible range
  max: new Date(2019, 12, 1), // upper limit of visible range
  // zoomMin: 1000 * 60 * 60 * 24,             // one day in milliseconds
  zoomMax: 1000 * 60 * 60 * 24 * 31 * 2, // about three months in milliseconds
  locale: 'en',
  showCurrentTime: true,
  stack: true,
  stackSubgroups: true,
  start: '2019-10-21 00:00', //'2019-10-21 00:00:00'
  end: '2019-10-31 12:00',
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
    //when resize item
    callback(item); // send back adjusted new item
    updateActualVessel(item.groupParent);
    showPopOverItem(item);

    console.log(timeline2.itemsData.get());
    console.log('Data Item All');
    console.log(allGroupItem());
    console.log('Group Item All');
  },
  onRemove: function(item, callback) {
    removeConfirm(item, callback);
  }
};
