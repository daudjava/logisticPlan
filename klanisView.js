let numberOfItems = dataItem.length;
numberOfGroups = 3;
const allObjItem = function(indexItem) {
  return timeline2.itemsData.get(indexItem);
};

const allGroupItem = function(indexGroup) {
  return groups.get(indexGroup);
};

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
    // subgroupStack: { 0: false, 1: true, 2: true },
    // nestedGroups: [],
    // showNested: true,
    orderGroup: 8,
    isSubGroup: false,
    content: 'Klanis &nbsp;' + i
  });
}

for (let indexItem = 0; indexItem < numberOfItems; indexItem++) {
  if (dataItem[indexItem].subgroup == 2) {
    let itemSelected = dataItem[indexItem];
    let idItem = itemSelected.product != 'D4000' ? 1 : 3;
    // klo dia parent
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
    //   } else {
    //     // add child Group
    //     createGroup(dataItem, indexItem); // buat dulu groupnya
  }
}

function createGroup(itemSelected, indexItem) {
  //   itemSelected = itemSelected[indexItem];
  //   let selectedGroup = itemSelected.groupContent;
  //   let groupNow = selectedGroup;
  //   let groupSub = '';

  //   if (groupBefore != groupNow) {
  //     idSubGroupCrane = 1;
  //     idSubGroupBarge = 1;
  //     sumCrane = 0;
  //     sumBarge = 0;
  //   } else {
  //     idSubGroupCrane = idSubGroupCrane;
  //     idSubGroupBarge = idSubGroupBarge;
  //     sumCrane = sumCrane;
  //     sumBarge = sumBarge;
  //   }

  //   groupBefore = selectedGroup;
  //   let countCrane = itemSelected.className === 'crane' ? idSubGroupCrane : 0;
  //   let countBarge = itemSelected.className === 'barge' ? idSubGroupBarge : 0;
  //   let idItem = '';
  //   let qGroup = 0;
  //   if (itemSelected.className == 'crane') {
  //     idItem = selectedGroup + 'C' + countCrane;
  //     idSubGroupCrane = idSubGroupCrane + 1;
  //     groupChild = idItem;
  //     sumCrane = sumCrane + 2;
  //     qGroup = maxCrane - sumCrane;
  //   } else {
  //     idItem = selectedGroup + 'B' + countBarge;
  //     idSubGroupBarge = idSubGroupBarge + 1;
  //     groupSub = groupChild;
  //     sumBarge = sumBarge + 2;
  //     qGroup = maxbarge - sumBarge;
  //   }

  //   let groupData = [
  //     {
  //       id: idItem,
  //       content: itemSelected.className,
  //       isSubGroup: true,
  //       orderGroup: qGroup
  //     }
  //   ];

  //   // let groupSelect = groups.get(selectedGroup); //get current group
  //   let groupSelect = allGroupItem(selectedGroup); //get current group
  //   groupSelect.nestedGroups.push(idItem);
  //   groups.add(groupData);
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
  // let newItem_dropped = timeline2.itemsData.get(item.id);
  let lookTheirParent = groupParent;
  // let allObjItem = timeline2.itemsData.get();
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
  // let allObjItem = timeline2.itemsData.get();

  // let selectedParent = timeline2.itemsData.get(item.id);
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
        timeline2.setSelection(-1);
      });
      $('.btn-danger').click(function() {
        firstItemClick.popover('hide');
        timeline2.setSelection(-1);
      });
      $('.btn-primary').click(function() {
        firstItemClick.popover('hide');
        timeline2.setSelection(-1);
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
    '200 T': '200 T',
    '300 T': '300 T',
    '500 T': '500 T'
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
      dataParsing.bargeVolume = getOnlyNumber(result.value)[0];
      callback(dataParsing);
    } else {
      singleDeletItem(dataParsing.newItem_dropped.id);
    }
  });
}

function addDataBarge(dataParsing) {
  console.log(dataParsing);
  console.log('dataParsingOnBarge');
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
    console.log('ififififififififififififififif');

    // differentTime.h = countDayBarge * 24;

    // dataParsing.durationBarge = countDayBarge * 24;
    // newDateEnd = increaseDate(newDateStart, differentTime);
    // countItemBarge = countItemBarge + 1;
  } else {
    dataParsing.newBarge = false;
    dataParsing.selectedGroup = dataOnThisLine[0].group;
    // dataParsing.parentId = dataParsing.newItem_dropped.indexItem;
    console.log('elseelseelseelseelseelseelseelseelseelse');

    let lastDataOnThisLine = dataOnThisLine[dataOnThisLine.length - 1];
    let convertStartToEnd = lastDataOnThisLine.end;

    newDateStart = dataParsing.dataParent.start;

    // newDateStart = convertStartToEnd;
    // if (countDayBarge != NaN) {
    // differentTime.h = countDayBarge * 24;
    // dataParsing.durationBarge = countDayBarge * 24;
    // newDateEnd = increaseDate(newDateStart, differentTime);
    // }
  }

  differentTime.h = countDayBarge * 24;
  dataParsing.durationBarge = countDayBarge * 24;
  newDateEnd = increaseDate(newDateStart, differentTime);

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
    groupChild: dataParsing.newItem_dropped.group,
    groupParent: dataParsing.selectedParent,
    parentId: parseInt(dataParsing.parentId),
    group: dataParsing.selectedGroup,
    start: newDateStart,
    end: newDateEnd,
    content: dataParsing.topParent.product + ' ' + dataParsing.bargeVolume + ' T'
  });

  infoDragged(dataParsing.newItem_dropped);
  updateCrane(dataParsing);
  timeline2.setSelection(-1);
  lookItemCrane(dataParsing.newItem_dropped.id);
}

function updateCrane(dataParsing) {
  let dataOnThisLine = getAllCraneOnSameGroup(dataParsing.dataParent.group, dataParsing.selectedParent);

  let currentIndex = dataOnThisLine.findIndex(x => x.id === dataParsing.parentId);

  let differentTime = {};
  differentTime.h = dataParsing.durationBarge;
  for (let i = 0; i < dataOnThisLine.length; i++) {
    console.log(i + ' : ' + currentIndex);
    console.log('currentIndex');
    if (i == currentIndex) {
      // update data crane yang sama dengan index
      if (dataParsing.newBarge) {
        //pertama kli masukin bargenya baru dibuat
        idCraneUpdate = dataOnThisLine[i].id;
        convertNewStart = dataOnThisLine[i].start;
        newDateEnd = increaseDate(convertNewStart, differentTime);
        console.log(dataOnThisLine[i].id);
        console.log('if1111111111');
      } else {
        //klo barge sudah ada
        idCraneUpdate = dataOnThisLine[i].id;
        convertNewStart = dataOnThisLine[i].start;
        newDateEnd = increaseDate(dataOnThisLine[i].end, differentTime);
        console.log(dataOnThisLine[i].id);
        console.log('else1111111111');

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
        console.log(dataOnThisLine[i].id);
        console.log('if2222222222222');
      } else {
        //klo barge sudah ada
        idCraneUpdate = dataOnThisLine[i].id;
        convertNewStart = increaseDate(dataOnThisLine[i].start, differentTime);
        newDateEnd = increaseDate(dataOnThisLine[i].end, differentTime);
        console.log(dataOnThisLine[i].id);
        console.log('else222222222222');
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
      let dataId = getOnlyNumber(result.value)[0];
      let dataLodaingRate = getOnlyNumber(result.value)[1];
      console.log(result.value);
      console.log('result');
      dataParsing.parentId = dataId;
      dataParsing.loadingRate = dataLodaingRate;
      callback(dataParsing);
    } else {
      singleDeletItem(dataParsing.newItem_dropped.id);
    }
  });
}

let getOnlyNumber = string => {
  return string.match(/\d+/g).map(Number);
};

function showDialogOption(dataParsing, callback) {
  let inputOption = {
    '100 T/Hr': 'Loading Rate : 100 T/Hr',
    '500 T/Hr': 'Loading Rate : 500 T/Hr',
    '750 T/Hr': 'Loading Rate : 750 T/Hr'
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
  let convertStartToEnd = lastDataOnThisLine.end;
  let differentTime = diffDateTime(lastDataOnThisLine.start, lastDataOnThisLine.end);
  let endDateItem = increaseDate(convertStartToEnd, differentTime);

  items.update({
    id: dataParsing.newItem_dropped.id,
    loadToVessel: dataParsing.newItem_dropped.loadToVessel,
    loadingRate: dataParsing.newItem_dropped.loadingRate,
    commanceLoading: convertStartToEnd,
    completeLoading: endDateItem,
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

  timeline2.setSelection(-1);
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

  items.update({
    id: dataParsing.newItem_dropped.id,
    loadToVessel: dataParsing.newItem_dropped.loadToVessel,
    loadingRate: dataParsing.loadingRate,
    commanceLoading: dataParsing.newItem_dropped.commanceLoading,
    completeLoading: dataParsing.newItem_dropped.completeLoading,
    group: dataParsing.selectedGroup,
    groupChild: '',
    parentId: dataParsing.parentId,
    groupParent: dataParsing.selectedParent,
    start: dataParsing.dataParent.start,
    end: dataParsing.dataParent.end,
    subgroup: 1,
    subgroupOrder: 1,
    content: dataParsing.newItem_dropped.content + ' ' + dataParsing.loadingRate
  });

  infoDragged(dataParsing.newItem_dropped);

  timeline2.setSelection(-1);
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
  //     timeline2.itemsData.update({
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

  console.log(timeline2.itemsData.get());
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
// itemCrane.addEventListener('dragstart', handleDragStart.bind(this), false);
// itemBarge.addEventListener('dragstart', handleDragStart.bind(this), false);
// itemCrane.addEventListener('dragend', handleDragEnd.bind(this), false);
// itemBarge.addEventListener('dragend', handleDragEnd.bind(this), false);

console.log(allObjItem());
console.log('Load Awal');

console.log(allGroupItem());
console.log('Group Item All');

localStorage.setItem('item_added_to_cart', 0);
function itemAddedToCart() {
  let userParsing = {};
  userParsing.id = window.localStorage.getItem('id');
  userParsing.start = window.localStorage.getItem('start');
  userParsing.end = window.localStorage.getItem('end');
  console.log(userParsing);
  console.log('userLoad');
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
