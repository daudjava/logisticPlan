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

let groupVessel = [
  {
    VESSELID: '1A',
    VESSEL_SIZE: 'A',
    VESSEL_TYPE: 'Gearless',
    LC_STATUS: 'Available',
    LAYSTART: '2019-10-21 12:00:00',
    LAYSTOP: '2019-10-24 00:00:00',
    DURATION: '96 hrs',
    PRODUCT_ID: 'A-01',
    PRODUCT_NAME: 'A4000',
    FORECAST_DRAFT_TONNAGE: '17000 T',
    CUSTOMER_NAME: 'xxx Corp.',
    DEMURAGE_RATE: 'B',
    ARRIVE_TABONEO: '2019-10-21 00:00:00',
    ETA: '2019-00-00 00:00:00',
    VESSEL_NAME: 'Anastasia',
    GROUP_CONTENT: 1,
    startDate: '2019-10-21 12:00:00',
    endDate: '2019-10-24 00:00:00',
    CLASS_NAME: 'ACTUAL',
    SUB_GROUP: 0,
    SUB_ORDER_GROUP: 0
  },
  {
    VESSELID: '4A',
    VESSEL_SIZE: 'D',
    VESSEL_TYPE: 'Geared',
    LC_STATUS: 'Available',
    LAYSTART: '2019-10-28 00:00:00',
    LAYSTOP: '2019-10-29 12:00:00',
    DURATION: '96 hrs',
    PRODUCT_ID: 'D-01',
    PRODUCT_NAME: 'D4000',
    FORECAST_DRAFT_TONNAGE: '17000 T',
    CUSTOMER_NAME: 'xxx Corp.',
    DEMURAGE_RATE: 'B',
    ARRIVE_TABONEO: '2019-10-28 00:00:00',
    ETA: '2019-00-00 00:00:00',
    VESSEL_NAME: 'Blumerau',
    GROUP_CONTENT: 4,
    startDate: '2019-10-28 00:00:00',
    endDate: '2019-10-29 12:00:00',
    CLASS_NAME: 'ACTUAL',
    SUB_GROUP: 0,
    SUB_ORDER_GROUP: 0
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

let dataItem = [
  {
    VESSELID: '1',
    VESSEL_NAME: 'Antero',
    LOADRATE_CONTRACT: '12000',
    VESSEL_SIZE: '',
    VESSEL_TYPE: 'Geared',
    LC_STATUS: '0',
    LAYSTART: '2019-11-23 00:00',
    LAYSTOP: '2019-12-02 00:00',
    DURATION: '',
    PRODUCT_ID: '6',
    PRODUCT_NAME: 'E4700',
    FORECAST_DRAFT_TONNAGE: '60000',
    CUSTOMER_ID: '30',
    CUSTOMER_NAME: '',
    DEMURAGE_RATE: '0',
    ARRIVE_TABONEO: '2019-11-27 00:00',
    ETA: '2019-11-27 00:00',
    CLASS_NAME: 'EXPECTED'
  },
  {
    VESSELID: '2',
    VESSEL_NAME: 'Aurilia',
    LOADRATE_CONTRACT: '15000',
    VESSEL_SIZE: '',
    VESSEL_TYPE: 'Gearless',
    LC_STATUS: '0',
    LAYSTART: '2019-11-24 00:00',
    LAYSTOP: '2019-12-03 00:00',
    DURATION: '',
    PRODUCT_ID: '2',
    PRODUCT_NAME: 'E4900',
    FORECAST_DRAFT_TONNAGE: '77000',
    CUSTOMER_ID: '30',
    CUSTOMER_NAME: '',
    DEMURAGE_RATE: '0',
    ARRIVE_TABONEO: '2019-11-24 00:00',
    ETA: '2019-11-24 00:00',
    CLASS_NAME: 'EXPECTED'
  },
  {
    VESSELID: '3',
    VESSEL_NAME: 'Blumenau',
    LOADRATE_CONTRACT: '15000',
    VESSEL_SIZE: '',
    VESSEL_TYPE: 'Gearless',
    LC_STATUS: '0',
    LAYSTART: '2019-11-12 00:00',
    LAYSTOP: '2019-11-21 00:00',
    DURATION: '',
    PRODUCT_ID: '2',
    PRODUCT_NAME: 'E4900',
    FORECAST_DRAFT_TONNAGE: '77000',
    CUSTOMER_ID: '30',
    CUSTOMER_NAME: '',
    DEMURAGE_RATE: '0',
    ARRIVE_TABONEO: '2019-11-18 02:30',
    ETA: '2019-11-18 02:30',
    CLASS_NAME: 'EXPECTED'
  },
  {
    VESSELID: '4',
    VESSEL_NAME: 'Cape Leonidas',
    LOADRATE_CONTRACT: '25000',
    VESSEL_SIZE: '',
    VESSEL_TYPE: 'Gearless',
    LC_STATUS: '0',
    LAYSTART: '2019-11-11 00:00',
    LAYSTOP: '2019-11-20 00:00',
    DURATION: '',
    PRODUCT_ID: '8',
    PRODUCT_NAME: 'BW',
    FORECAST_DRAFT_TONNAGE: '162300',
    CUSTOMER_ID: '30',
    CUSTOMER_NAME: '',
    DEMURAGE_RATE: '0',
    ARRIVE_TABONEO: '2019-11-11 10:24',
    ETA: '2019-11-11 10:24',
    CLASS_NAME: 'EXPECTED'
  },
  {
    VESSELID: '5',
    VESSEL_NAME: 'Corona Triton',
    LOADRATE_CONTRACT: '15000',
    VESSEL_SIZE: '',
    VESSEL_TYPE: 'Gearless',
    LC_STATUS: '0',
    LAYSTART: '2019-12-08 00:00',
    LAYSTOP: '2019-12-17 00:00',
    DURATION: '',
    PRODUCT_ID: '9',
    PRODUCT_NAME: 'tutupan',
    FORECAST_DRAFT_TONNAGE: '65000',
    CUSTOMER_ID: '30',
    CUSTOMER_NAME: '',
    DEMURAGE_RATE: '0',
    ARRIVE_TABONEO: '2019-12-08 00:00',
    ETA: '2019-12-08 00:00',
    CLASS_NAME: 'EXPECTED'
  }
];

let today = moment()
  .day(-1)
  .format('YYYY-MM-DD hh:mm:ss');
let nextWeek = moment()
  .day(9) // set 8 klo mau 1 minggu
  .format('YYYY-MM-DD hh:mm:ss');

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
let options2 = {
  min: new Date(2019, 9, 1), // lower limit of visible range
  max: new Date(2019, 12, 1), // upper limit of visible range
  // zoomMin: 1000 * 60 * 60 * 24,             // one day in milliseconds
  zoomMax: 1000 * 60 * 60 * 24 * 31 * 2, // about three months in milliseconds
  locale: 'en',
  showCurrentTime: true,
  stack: true,
  stackSubgroups: true,
  // start: '2019-10-21 00:00', //'2019-10-21 00:00:00'
  // end: '2019-10-31 12:00',
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
    //when resize item
    callback(item); // send back adjusted new item
    updateActualVessel(item.groupParent);
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

const container = document.getElementById('mytimeline');
const container2 = document.getElementById('mytimeline2');
if (container != null) {
  var timeline1 = new vis.Timeline(container, items, groups, options);
} else {
  var timeline2 = new vis.Timeline(container2, items, groups, options2);
}
