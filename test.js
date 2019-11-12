const lang = navigator.language;
const locale = (lang && lang !== undefined) ? lang.match(/^\w{2}/)[0] : "en";
console.log(lang, locale);
moment.locale(locale);

// Just use for demonstration with data example
const headers_fr = ["Statut", "Ressources", "Evènement", "Catégorie", "Lieu", "Prévisionnel (heures)", "Réel (heures)", "Durée (jours)", "Durée (jours ouvrés)", "Progression", "Date début", "Date fin", "Personnel"];
const headers_en = ["Status", "Resources", "Task", "Category", "Location", "Estimated hours", "Worked hours", "Days", "Working days", "Progress", "Start", "End", "Employees"];
const headers = translate(locale, headers_fr, headers_en);
const htmlIntro_fr = `En utilisant <a href="https://github.com/visjs/vis-charts" target="_blank">timeline de vis.js</a>,
on teste ici un "outil léger" qui permet de créer un planning "grosse maille" en quelques clics ou même ce que vous pensez pouvoir en faire!
Notez que vous pouvez utiliser cette application telle quelle si besoin, les données ne quittant jamais votre navigateur. <a href="https://jgorene.github.io/vis-webpack-planner/index.html" target="_blank" title="test en ligne">Demo en ligne</a>`;
const htmlIntro_en = `Using timeline by <a href="https://github.com/almende/vis" target="_blank">vis.js</a>,
we are testing here a "light tool" to create a macro-planning or even what you think you can do with it!
Note that you can use this application as it is if needed, the data never leaving your browser. <a href="https://jgorene.github.io/vis-webpack-planner/index.html" target="_blank" title="demo en ligne">Demo online</a>`;
document.getElementById('example-btn').innerHTML = translate(locale, 'Voir exemple', 'See example');

fileInput.onchange = function (e) {
    var files = fileInput.files;
    var file = files[0];
    if (!file || file === undefined) return;
    if (file.type === "text/csv" || file.type === "text/tab-separated-values" || file.type === "application/vnd.ms-excel") {
        setTimeout(() => {
            upload(file);
        })
    } else {
        console.log(file.type);
        alert("Oups! Le fichier doit être au format CSV ou XLSX.\n\n Format du fichier déposé : " + file.type);
        $('#dropFiles').css('border', '3px dashed rgba(180,180,180,0.5)');
        return false
    }
}

function upload(file) {
    var reader = new FileReader();
    reader.onloadstart = function (event) {
        document.getElementById("imgLoad").style.display = "block";
        document.getElementById('textLoader').innerHTML = translate(locale, "Veuillez patienter, traitement des données en cours...", "Please wait, loading data...");
        document.getElementById("main-div").style.display = "none";
    };
    reader.onprogress = function (event) {
        if (event.lengthComputable) console.log(event);
    }
    reader.onloadend = function (event) {}
    reader.readAsText(file);
    reader.onload = function () {
        var delimiter = Papa.parse(reader.result).meta.delimiter;
        var dataFromCSV = d3.dsvFormat(delimiter).parseRows(reader.result, function (d, i) {
            return d;
        });
        flag = [];
        dataFromCSV.slice(1, dataFromCSV.length).forEach(obj => {
            if (isValidDate(obj[10]) && isValidDate(obj[11])) flag.push(true);
        });
        console.log([...new Set(flag)].join(""));
        if ([...new Set(flag)].join("")) {
            document.getElementById("imgLoad").style.display = "none";
            document.getElementById("main-div").style.display = "block";
            document.getElementById('example-btn').disabled = false;
            this.disabled = false;
            document.getElementById('intro-div').style.display = "none";
            document.getElementById('timelineInfo-div').innerHTML = translate(locale, "Jeu de données importé...", "Imported dataset");
            timelineVis(dataFromCSV);
        } else {
            var msg_fr = `A priori le fichier importé n'est pas conforme au jeu de données attendu. 
            Essayer en cliquant sur "Voir exemple" pour commencer.`,
                msg_en = `A priori the imported file does not conform to the expected dataset. 
                Try by clicking on "Voir example" to start. `
            prettyDefaultReload("Import info", translate(locale, msg_fr, msg_en), "warning");
        }
    }
}

document.getElementById('example-btn').onclick = function () {
    document.getElementById("main-div").style.display = "block";
    var dataExample = [
        ["Statut", "Ressources", "Evènement", "Catégorie", "Lieu", "Prévisionnel (heures)", "Réel (heures)", "Durée (jours)", "Durée (jours ouvrés)", "Progression", "Date début", "Date fin", "Personnel"],
        ["done", "John Doe, Mac Ro", "0402 - VILLAS", "#cat001", "Mulhouse, France", "1613", "1250", "781", "544", "1", "2016-05-22", "2018-07-11", "2"],
        ["done", "Pier, Paul, Jack", "0282 - ESPACE LOTS 10 A 15", "#cat001", "Paris, France", "5865", "5945", "182", "127", "1", "2016-06-05", "2016-12-03", "0"],
        ["in progress", "", "0227 - LA CIE", "#cat002", "Strasbourg, France", "10200", "7040", "691", "488", "0.9347786713036437", "2016-12-04", "2018-10-25", "5"],
        ["in progress", "", "0285 - CONSTRUCTION D'UN IMMEUBLE DE 56 LOGEMENTS", "#cat003", "Amiens, France", "2423", "1840", "383", "267", "0.9738219903219535", "2017-09-03", "2018-09-20", "1"],
        ["done", "", "0267 D - TRANCHE 4 / BAT 18", "#cat004", "Lyon, France", "1060", "824", "31", "19", "1", "2018-05-01", "2018-05-31", "6"],
        ["done", "", "0254 - CREATION D'UNE PISCINE COUVERTE", "#cat005", "Paris, France", "709", "1402", "159", "114", "1", "2018-03-11", "2018-08-16", "1"],
        ["in progress", "", "0300 - COPRO VILLE", "#cat005", "Metz, France", "2365", "2000", "222", "156", "0.384542916297889", "2018-06-17", "2019-01-24", "2"],
        ["in progress", "", "0200 - REAMENAGEMENT", "#cat006", "Mulhouse, France", "1500", "624", "201", "138", "0.7750000130208325", "2018-04-08", "2018-10-25", "2"],
        ["done", "", "4500 - MUR COUPE FEU", "#cat007", "Amiens, France", "295", "351", "40", "29", "1", "2018-05-27", "2018-07-05", "2"],
        ["done", "", "0400 - CAFETERIA", "#cat007", "Paris, France", "400", "0", "26", "18", "1", "2018-07-08", "2018-08-02", "23"],
        ["in progress", "", "0299 - MAGS", "#cat007", "Amiens, France", "800", "0", "131", "93", "0.06151882751977398", "2018-09-02", "2019-01-10", "1"],
        ["planned", "", "5210 - TRUC BIDULE", "#cat007", "Amiens, France", "500", "0", "40", "28", "0.33297778578863224", "2018-09-23", "2018-11-01", "2"],
        ["planned", "", "0265 - MJC", "#cat008", "Mulhouse, France", "663", "0", "89", "62", "0.8641098663576039", "2018-11-25", "2019-02-21", "1"],
        ["done", "", "0126 - PÔLE CULTUREL", "#cat009", "Paris, France", "1654", "1536", "77", "51", "1", "2018-04-03", "2018-06-18", "0"]
    ];
    timelineVis(dataExample);
    document.getElementById('timelineInfo-div').innerHTML = translate(locale, "Jeu de données exemple...", "Data example");
    document.getElementById('fileInput').disabled = false;
    this.disabled = false;
    document.getElementById('intro-div').style.display = "none";
}

$(function () {
    document.getElementsByTagName('html')[0].setAttribute('lang', locale);

    document.getElementById('mainIntro-p').innerHTML = translate(locale, htmlIntro_fr, htmlIntro_en);
    document.getElementById('textLoader').innerHTML = translate(locale, "Veuillez patienter, traitement des données en cours...", "Please wait, loading data...");

    document.getElementById('groupadd-btn').innerHTML = translate(locale, "Catégorie +", "Category +");
    document.getElementById('groupadd-input').placeholder = translate(locale, "Libellé...", "Label...");
    document.getElementById('moveToDate').firstChild.innerHTML = translate(locale, "aller à la date", "focus on week");
    document.getElementById('moveToDate').firstChild.title = translate(locale, "aller à la date", "focus on week");
    document.getElementById('globalView-i').innerHTML = translate(locale, "vue globale", "global view (fit)");
    document.getElementById('globalView-i').title = translate(locale, "vue globale", "global view (fit)");
    document.getElementById('guide-btn').title = translate(locale, "guide rapide", "Start guide");
    document.getElementById('removeAll-btn').title = translate(locale, "tout supprimer sur le planning", "remove all elements of timelinel");
    document.getElementById('clearStorage-btn').title = translate(locale, "supprimer le jeu de données du navigateur", "clear this dataset from the browser");
    document.getElementById('save-btn').title = translate(locale, "sauvegarder les données dans le navigateur", "save the data in the browser");
    document.getElementById('exportCSV-btn').title = translate(locale, "exporter en csv", "export in csv");

    // dataExample.unshift(headers);
    localforage.getItem('planning_vis')
        .then(function (value) {
            var jsonData = JSON.parse(value);
            document.getElementById('intro-div').style.display = "block";
            document.getElementById("imgLoad").style.display = "none";
            if (value && JSON.parse(value).length > 0) {
                document.getElementById('intro-div').style.display = "none";
                document.getElementById("main-div").style.display = "block";
                document.getElementById('timelineInfo-div').innerHTML = translate(locale, "Jeu de données dans le navigateur...", "Data stored in browser");
                document.getElementById('timelineInfo-div').style.color = "blue";
                timelineVis(JSON.parse(value));
            } else {
                document.getElementById('fileInput').disabled = false;
                document.getElementById('example-btn').disabled = false;
            }
        }).catch(function (err) {
            console.log('erreur get item: ', err);
            document.getElementById("imgLoad").style.display = "block";
            document.getElementById("main-div").style.display = "none";
        });

    // window.onbeforeunload = function() {
    //     return "Dude, are you sure you want to leave? Think of the kittens!";
    // }
});

/**
 * Calcul des jours fériés
 // https://codes-sources.commentcamarche.net/source/16245-calcul-des-jours-feries
 */

function getJoursFeries(debut, fin) {
    // console.log(debut, fin);
    // debut = "2017-01-01";
    // fin = "2019-12-31";
    var an = new Date(debut).getFullYear();
    var anfin = new Date(fin).getFullYear();
    var diff = anfin - an;
    var JourAn = new Date(parseInt(an, 10), "00", "01").getTime();
    var FeteTravail = new Date(an, "04", "01").getTime();
    var Victoire1945 = new Date(an, "04", "08").getTime();
    var FeteNationale = new Date(an, "06", "14").getTime();
    var Assomption = new Date(an, "07", "15").getTime();
    var Toussaint = new Date(an, "10", "01").getTime();
    var Armistice = new Date(an, "10", "11").getTime();
    var Noel = new Date(an, "11", "25").getTime();
    // var SaintEtienne = new Date(an, "11", "26").getTime() // Alsace

    var G = an % 19;
    var C = Math.floor(an / 100);
    var H = (C - Math.floor(C / 4) - Math.floor((8 * C + 13) / 25) + 19 * G + 15) % 30;
    var I = H - Math.floor(H / 28) * (1 - Math.floor(H / 28) * Math.floor(29 / (H + 1)) * Math.floor((21 - G) / 11));
    var J = (an * 1 + Math.floor(an / 4) + I + 2 - C + Math.floor(C / 4)) % 7;
    var L = I - J;
    var MoisPaques = 3 + Math.floor((L + 40) / 44);
    var JourPaques = L + 28 - 31 * Math.floor(MoisPaques / 4);
    // var VendrediSaint = new Date(an, MoisPaques - 1, JourPaques - 2).getTime() // Alsace
    var LundiPaques = new Date(an, MoisPaques - 1, JourPaques + 1).getTime();
    var Ascension = new Date(an, MoisPaques - 1, JourPaques + 39).getTime();
    var LundiPentecote = new Date(an, MoisPaques - 1, JourPaques + 50).getTime();
    var jourFeriesAn = [
        new Date(JourAn),
        new Date(LundiPaques),
        // new Date(VendrediSaint), // Alsace
        new Date(FeteTravail),
        new Date(Victoire1945),
        new Date(Ascension),
        new Date(LundiPentecote),
        new Date(FeteNationale),
        new Date(Assomption),
        new Date(Toussaint),
        new Date(Armistice),
        // new Date(SaintEtienne), // Alsace
        new Date(Noel)
    ];
    var feriesPlus = jourFeriesAn;
    var ferie;
    for (var i = 0; i < diff; i++) {
        an += 1;
        for (var date in joursFeriesPlus(an)) {
            feriesPlus.push(joursFeriesPlus(an)[date]);
        }
    }
    // console.log(feriesPlus.length);
    return feriesPlus;
}

function joursFeriesPlus(an) {
    var JourAn = new Date(parseInt(an, 10), "00", "01").getTime()
    var FeteTravail = new Date(an, "04", "01").getTime()
    var Victoire1945 = new Date(an, "04", "08").getTime()
    var FeteNationale = new Date(an, "06", "14").getTime()
    var Assomption = new Date(an, "07", "15").getTime()
    var Toussaint = new Date(an, "10", "01").getTime()
    var Armistice = new Date(an, "10", "11").getTime()
    var Noel = new Date(an, "11", "25").getTime()
    // var SaintEtienne = new Date(an, "11", "26").getTime() // Alsace

    var G = an % 19
    var C = Math.floor(an / 100)
    var H = (C - Math.floor(C / 4) - Math.floor((8 * C + 13) / 25) + 19 * G + 15) % 30
    var I = H - Math.floor(H / 28) * (1 - Math.floor(H / 28) * Math.floor(29 / (H + 1)) * Math.floor((21 - G) / 11))
    var J = (an * 1 + Math.floor(an / 4) + I + 2 - C + Math.floor(C / 4)) % 7
    var L = I - J
    var MoisPaques = 3 + Math.floor((L + 40) / 44)
    var JourPaques = L + 28 - 31 * Math.floor(MoisPaques / 4)
    //var Paques = new Date(an, MoisPaques-1, JourPaques).getTime()
    // var VendrediSaint = new Date(an, MoisPaques - 1, JourPaques - 2).getTime() // Alsace
    var LundiPaques = new Date(an, MoisPaques - 1, JourPaques + 1).getTime()
    var Ascension = new Date(an, MoisPaques - 1, JourPaques + 39).getTime()
    //var Pentecote = new Date(an, MoisPaques-1, JourPaques+49).getTime()
    var LundiPentecote = new Date(an, MoisPaques - 1, JourPaques + 50).getTime()
    var jourFeries = [
        new Date(JourAn),
        new Date(LundiPaques),
        // new Date(VendrediSaint), // Alsace
        new Date(FeteTravail),
        new Date(Victoire1945),
        new Date(Ascension),
        new Date(LundiPentecote),
        new Date(FeteNationale),
        new Date(Assomption),
        new Date(Toussaint),
        new Date(Armistice),
        // new Date(SaintEtienne), // Alsace
        new Date(Noel)
    ];
    // console.log([jourFeries, jourFeries.length])
    return jourFeries;
}

function getWorkingDays(start, end) {
    var publicHolidays = getJoursFeries(start, end).map(date => moment(date, "YYYY-MM-DD").valueOf());
    start = moment(start, "YYYY-MM-DD");
    end = moment(end, "YYYY-MM-DD").endOf("day");
    var weekend = 0,
        feries = 0,
        date_value = start.valueOf(),
        diff = Math.abs(end.diff(start, 'day') + 1), // +1 for end date inclusive
        notWorkingDays = [],
        workingDaysCount;
    for (var i = 0; i <= diff; i++) {
        if (publicHolidays.indexOf(date_value) !== -1) {
            feries++;
            notWorkingDays.push(date_value);
        }
        if (moment(date_value).isoWeekday() === 6 || moment(date_value).isoWeekday() === 7) {
            ++weekend;
            notWorkingDays.push(date_value);
        }
        date_value += 86400000;
    }
    workingDaysCount = diff - (weekend + feries);
    // console.log(weekend, feries, workingDays);
    return {
        days: diff,
        workingDaysCount: workingDaysCount,
        notWorkingDays: notWorkingDays,
        publicHolidays: publicHolidays
    };
}

/* SweetAlert */

function prettyPromptDefault(title, html) {
    swal({
        title: title,
        content: html,
        icon: "success"
    }).then(value => {
        console.log(value);
    });
}

function prettyDefaultReload(title, text, icon) {
    swal({ title: title, text: text, icon: icon }).then(value => {
        setTimeout(() => window.location.href = window.location.href, 10);
    });
}

function prettyPromptAddItem(title, text, item, groups, items, timeline, index, categories_maxSize, callback) {
    // console.log(item);
    var html = htmlForSweetAlert(item);
    swal({
        title: title,
        text: text,
        content: html,
        // icon: "success"
    }).then(value => {
        if (value) {
            var group = groups.get(item.group);
            console.log(document.getElementById('inputResources').value);
            var nestedGroups = group.nestedGroups,
                delta = 0,
                classDelta;
            nestedGroups.push(index + 1);
            // Values for New item
            item["end"] = moment(item.start).add(1, 'months');
            item["task"] = document.getElementById('inputTitle').value ? document.getElementById('inputTitle').value : "New item";
            item["estimated"] = document.getElementById('inputPrevisionnel').value ? document.getElementById('inputPrevisionnel').value : 0;
            item["worked"] = document.getElementById('inputReel').value ? document.getElementById('inputReel').value : 0;
            item["delta"] = getDelta(item["estimated"], item["worked"]);
            item["delta"] >= 0 ? classDelta = "spanDeltaGreen" : classDelta = "spanDeltaRed";
            item["statut"] = getStatut(moment(item.start), moment(item.end), 0).statut;
            item["progressValue"] = (item["statut"] !== "planned") ? document.getElementById('inputProgress').value : 0;
            item["break"] = "";
            item["resources"] = document.getElementById('inputResources').value ? document.getElementById('inputResources').value : "";
            item["progression"] = document.getElementById('inputProgress').value ? parseFloat(document.getElementById('inputProgress').value * 100).toFixed(0) + "%" : "0%";
            item["type"] = "range";
            item["statutContent"] = getStatut(moment(item.start), moment(item.end), 0).statutContent;
            item["id"] = index + 1;
            item["group"] = index + 1;
            item["category"] = group.category;
            item["location"] = "";
            item["employees"] = document.getElementById('inputSalaries').value ? document.getElementById('inputSalaries').value : 0;
            item["resources"] = document.getElementById('inputResources').value ? document.getElementById('inputResources').value : [];
            item["className"] = getStatut(moment(item.start), moment(item.end), 0).className;
            item["title"] = getTooltip(getStatut(moment(item.start), moment(item.end), item.value).statut, item.delta, classDelta,
                item["task"], moment(item.start).format("DD/MM/YYYY"), moment(item.end).format("DD/MM/YYYY"), item["estimated"], item["worked"]);
            item["content"] = item["employees"] + ' employees' + ' (' + getStatut(moment(item.start), moment(item.end), 0).statutContent + ')';
            item["visibleFrameTemplate"] = '<div id="' + item.id +
                '" class="progress-wrapper"><div class="progress"><label class="progress-label">' + item["progression"] + '<label></div></div>';
            item["days"] = item.days;
            item["workingDays"] = item.workingDays;
            callback(item);
            // add item group
            groups.add({
                id: index + 1,
                groupDates: getGroupDates(item.start, item.end),
                nestedInGroup: group.id,
                showNested: true,
                order: index + 1,
                content: item["task"] + ' <span class="' + classDelta + '">&Delta; ' + item["delta"] + "</span>",
                delta: item["delta"]
            });
            // update group category
            groups.forEach(function (group) {
                if (nestedGroups.indexOf(group.id) !== -1) delta += group.delta;
            });
            delta >= 0 ? classDelta = "spanDeltaGreen" : classDelta = "spanDeltaRed";
            groups.update({
                id: group.id,
                category: group.category,
                title: getCategory(group.category, nestedGroups.length, delta),
                content: getContentCategorie(group.category, nestedGroups.length, delta),
                nestedGroups: nestedGroups,
                showNested: true,
                order: parseInt(group.id, 10)
            });
            var currentCategories = new vis.DataView(groups, {
                filter: function (item) {
                    return (item.id < categories_maxSize);
                }
            });
            var currentItems = new vis.DataView(groups, {
                filter: function (item) {
                    return (item.id > categories_maxSize);
                }
            });
            getGlobalDelta(groups);
            document.getElementById('spanSumCat').innerHTML = currentCategories.length;
            document.getElementById("spanSumEvents").innerHTML = currentItems.length;
            timeline.redraw();
            // console.log(groups, items);
        } else {
            callback(null); // cancel updating the item
        }
    });
}

function prettyPromptItemUpdate(title, text, item, groups, timeline, callback) {
    var html = htmlForSweetAlert(item);
    swal({
        title: title,
        text: text,
        content: html,
        // icon: "success"
    }).then(value => {
        if (value) {
            console.log(typeof document.getElementById('inputProgress').value, );
            var delta = 0,
                start = moment(item.start, "YYYY-MM-DD"),
                end = moment(item.end, "YYYY-MM-DD"),
                classDelta,
                category;
            // console.log(document.getElementById('selectPause').value);
            item["task"] = document.getElementById('inputTitle').value;
            item["estimated"] = document.getElementById('inputPrevisionnel').value;
            item["worked"] = document.getElementById('inputReel').value;
            item["delta"] = getDelta(item["estimated"], item["worked"]);
            item["delta"] >= 0 ? classDelta = "spanDeltaGreen" : classDelta = "spanDeltaRed";
            item["break"] = "";
            item["resources"] = document.getElementById('inputResources').value ? document.getElementById('inputResources').value : "";
            item["statut"] = getStatut(start, end, document.getElementById('inputProgress').value).statut;
            item["progressValue"] = (item["statut"] !== "planned") ? parseFloat(document.getElementById('inputProgress').value) : 0;
            item["employees"] = document.getElementById('inputSalaries').value;
            item["statutContent"] = getStatut(moment(item.start), moment(item.end), 0).statutContent;
            item["content"] = changeContent(item);
            console.log(item["progression"]);
            item["title"] = changeTooltip(item);
            item["className"] = getStatut(moment(item.start), moment(item.end), item["progressValue"]).className;
            item["progression"] = (item["statut"] !== "planned") ? parseFloat(item["progressValue"] * 100).toFixed(0) + "%" : "0%";
            item.visibleFrameTemplate = '<div id="' + item.id +
                '" class="progress-wrapper"><div class="progress"><label class="progress-label">' + item["progression"] +
                '<label></div></div>';
            callback(item); // send back item as confirmation (can be changed)
            groups.update({
                id: item.id,
                content: item["task"] + ' <span class="' + classDelta + '">&Delta; ' + parseInt(item["delta"], 10) + "</span>",
                groupDates: getGroupDates(item.start, item.end),
                delta: item["delta"],
                order: item.id
            });
            // // update group category
            var category = groups.get(groups.get(item.id).nestedInGroup);
            var nestedGroups = category.nestedGroups;
            // console.log(nestedGroups);
            groups.forEach(function (group) {
                if (nestedGroups.indexOf(group.id) !== -1) delta += group.delta;
            });
            delta >= 0 ? classDelta = "spanDeltaGreen" : classDelta = "spanDeltaRed";
            // console.log(delta, classDelta);
            groups.update({
                id: category.id,
                category: category.category,
                title: getCategory(category.category, nestedGroups.length, delta),
                content: getContentCategorie(category.category, nestedGroups.length, delta),
                nestedGroups: nestedGroups,
                showNested: true,
                order: parseInt(category.id, 10)
            });
            getGlobalDelta(groups);
            timeline.redraw();
            // https://github.com/almende/vis/issues/577
        } else {
            callback(null); // cancel editing item
        }
    });
}

function prettyPromptCat(title, text, target, group, groups, timeline, categories_maxSize, items) {
    // console.log(group, groups);
    swal(title, text, {
            buttons: {
                cancel: translate(locale, "Annuler", "Cancel"),
                catch: {
                    text: translate(locale, "Changer le titre", "Change title"),
                    value: "title",
                },
                defeat: {
                    text: translate(locale, "Supprimer la catégorie", "Remove category"),
                    value: "remove",
                },
            },
            className: 'sweetalert-lg'
        })
        .then((value) => {
            var msg_fr = `Voulez-vous vraiment supprimer cette catégorie: ` + group.category +
                `\n\nNotez que la catégorie sera supprimée avec tous les items qu'elle contient.`,
                msg_en = `Do you really want to delete this category: ` + group.category +
                `\n\nNote this category will be deleted with all items it contains.`;
            switch (value) {
                case "remove":
                    swal(translate(locale, "Supprimer la catégorie", "Remove category"),
                        translate(locale, msg_fr, msg_en), {
                            buttons: [translate(locale, "Annuler", "Cancel"), translate(locale, "Valider", "Confirm")]
                        }).then(value => {
                        var nestedGroups = group.nestedGroups;
                        if (value) {
                            if (nestedGroups && nestedGroups !== undefined) {
                                console.log(nestedGroups);
                                nestedGroups.forEach(function (groupId) {
                                    groups.remove(groupId);
                                });
                                groups.remove(group);
                                var currentCategories = new vis.DataView(groups, {
                                    filter: function (item) {
                                        return (item.id < categories_maxSize);
                                    }
                                });
                                var currentItems = new vis.DataView(groups, {
                                    filter: function (item) {
                                        return (item.id > categories_maxSize);
                                    }
                                });
                                getGlobalDelta(groups);
                                document.getElementById('spanSumCat').innerHTML = currentCategories.length;
                                document.getElementById("spanSumEvents").innerHTML = currentItems.length;
                                timeline.redraw();
                            }
                        }
                    });
                    break;
                case "title":
                    swal({
                        title: "Change title",
                        text: '',
                        content: {
                            element: "input",
                            attributes: {
                                placeholder: "Enter new title...",
                                type: "text",
                            },
                        },
                        // icon: "success"
                    }).then(value => {
                        var nestedGroups = group.nestedGroups;
                        console.log(nestedGroups);
                        var delta = 0,
                            classDelta;
                        if (value) {
                            groups.forEach(function (group) {
                                if (nestedGroups.indexOf(group.id) !== -1) {
                                    console.log(group);
                                    delta += group.delta;
                                }
                            });
                            delta >= 0 ? classDelta = "spanDeltaGreen" : classDelta = "spanDeltaRed";
                            groups.update({
                                id: group.id,
                                category: value,
                                title: getCategory(value, group.nestedGroups.length, delta),
                                content: getContentCategorie(value, group.nestedGroups.length, delta),
                                nestedGroups: group.nestedGroups,
                                showNested: true,
                                order: parseInt(group.id, 10)
                            });
                            // update items of group change title
                            items.get()
                                .filter(obj => (nestedGroups.indexOf(obj.id) !== -1))
                                .forEach((obj) => {
                                    items.update({
                                        id: obj.id,
                                        category: value
                                    });
                                });
                            console.log(group.id, items);
                        }
                    });
                    break;
                default:
                    ;
            }
        });
}

function prettyConfirmRemoveAll(title, text, groups, items, timeline, categories_maxSize) {
    swal(title, text, {
        buttons: {
            cancel: translate(locale, "Annuler", "Cancel"),
            catch: {
                text: translate(locale, "Tout supprimer", "Remove all"),
                value: "remove",
            }
        }
    }).then(value => {
        var msg_fr = `Toutes les données ont été effacées du planning.\n
            Notez que le jeu de données (si) sauvegardé dans le navigateur n'a pas été supprimé.
            Si nécessaire, pensez à sauvegarder l'état actuel du planning avant de quitter votre navigateur ou avant de fermer cette page.`,
            msg_en = `All data has been deleted on timeline.\n
            Note the dataset saved in browser have not been deleted.
            If needed, remember to save the current timeline before leaving your browser or close this page.`;
        switch (value) {
            case "remove":
                swal(translate(locale, "Tout supprimer", "Remove all"), translate(locale, msg_fr, msg_en), "success")
                    .then(value => {
                        var currentCategories = new vis.DataView(groups, {
                            filter: function (item) {
                                return (item.id < categories_maxSize);
                            }
                        });
                        var currentItems = new vis.DataView(groups, {
                            filter: function (item) {
                                return (item.id > categories_maxSize);
                            }
                        }).getIds();
                        // console.log(currentCategories, currentItems);
                        // update group item
                        groups.remove(groups.getIds());
                        items.remove(items.getIds());
                        timeline.redraw();

                        document.getElementById('spanSumCat').innerHTML = 0;
                        document.getElementById("spanSumEvents").innerHTML = 0;
                        var spanGlobalDelta = document.getElementById("spanGlobalDelta");
                        spanGlobalDelta.innerHTML = "&Delta; " + 0;
                        spanGlobalDelta.className = "spanDeltaGreen";
                    });
                break;
            default:
                ;
        }
    });
}

function prettyConfirmRemove(title, text, item, items, groups, timeline, categories_maxSize, callback) {
    swal(title, text + item.task + " ?", {
        buttons: {
            cancel: translate(locale, "Annuler", "Cancel"),
            catch: {
                text: translate(locale, "Supprimer", "Remove"),
                value: "remove",
            }
        }
    }).then(value => {
        console.log(value);
        switch (value) {
            case "remove":
                if (value && item.content != null) {
                    var group = groups.get(item.group),
                        groupParent
                    delta = 0,
                        globalDelta = 0;
                    if (group.nestedInGroup !== undefined) groupParent = groups.get(group.nestedInGroup);
                    if (groupParent !== undefined) {
                        var nestedGroups = groupParent.nestedGroups;
                        nestedGroups.splice(nestedGroups.indexOf(group.id), 1);
                        groups.remove(group.id);
                        groups.forEach(function (group) {
                            if (nestedGroups.indexOf(group.id) !== -1) delta += group.delta;
                        });
                        delta >= 0 ? classDelta = "spanDeltaGreen" : classDelta = "spanDeltaRed";
                        groups.update({
                            id: groupParent.id,
                            category: groupParent.category,
                            title: getCategory(groupParent.category, nestedGroups.length, delta),
                            content: getContentCategorie(groupParent.category, nestedGroups.length, delta),
                            nestedGroups: nestedGroups,
                            showNested: true,
                            order: parseInt(groupParent.id, 10)
                        });
                        // console.log(groups);
                    } else {
                        groups.remove(group.id);
                    }
                    callback(item); // send back adjusted item
                    getGlobalDelta(groups);
                    var currentItems = new vis.DataView(groups, {
                        filter: function (item) {
                            return (item.id > categories_maxSize);
                        }
                    }).getIds();
                    document.getElementById("spanSumEvents").innerHTML = currentItems.length;
                    timeline.redraw();
                } else {
                    callback(null); // cancel updating the item
                    swal(translate(locale, "supprimer", "Remove"), translate(locale, "l'item n'a pas été supprimé", "item has not been deleted"), "success");
                }
                break;
            default:
                ;
        }
    });
}

function htmlForSweetAlert(item) {
    var form = document.createElement('FORM');
    form.setAttribute("role", "form");
    form.setAttribute("class", "form-horizontal");

    var divForm_row01 = document.createElement('DIV');
    divForm_row01.setAttribute("class", "form-group");
    var divTitle = document.createElement('DIV');
    divTitle.setAttribute("class", "col-sm-8");
    var labelTitle = document.createElement('LABEL');
    labelTitle.innerHTML = translate(locale, "titre", "title");
    labelTitle.setAttribute("for", "inputTitle");
    labelTitle.setAttribute("class", "col-form-label")
    var inputTitle = document.createElement('INPUT');
    inputTitle.id = "inputTitle";
    inputTitle.setAttribute("class", "form-control");
    inputTitle.setAttribute("type", "text");
    inputTitle.setAttribute("value", item["task"])

    var divResources = document.createElement('DIV');
    divResources.setAttribute("class", "col-sm-4");
    var labelResources = document.createElement('LABEL');
    labelResources.innerHTML = translate(locale, "ressources", "resources");
    labelResources.setAttribute("for", "inputResources");
    labelResources.setAttribute("class", "col-form-label")
    var inputResources = document.createElement('INPUT');
    inputResources.id = "inputResources";
    inputResources.setAttribute("class", "form-control");
    inputResources.setAttribute("type", "text");
    inputResources.setAttribute("value", item["resources"])

    // var divPause = document.createElement('DIV');
    // divPause.setAttribute("class", "col-sm-4");
    // var labelPause = document.createElement('LABEL');
    // labelPause.innerHTML = "break";
    // labelPause.setAttribute("for", "selectPause");
    // labelPause.setAttribute("class", "col-form-label")
    // var selectPause = document.createElement('SELECT');
    // selectPause.id = "selectPause";
    // selectPause.setAttribute("class", "form-control");
    // var array = ["", "BREAK"];
    // for (var i = 0; i < array.length; i++) {
    //     var option = document.createElement("option");
    //     option.value = array[i];
    //     option.text = array[i];
    //     selectPause.appendChild(option);
    // };
    // selectPause.value = item["break"];

    /* row 2 */
    var divForm_row02 = document.createElement('DIV');
    divForm_row02.setAttribute("class", "form-group");

    var divProgress = document.createElement('DIV');
    divProgress.setAttribute("class", "col-sm-3");
    var labelProgress = document.createElement('LABEL');
    labelProgress.innerHTML = translate(locale, "progression", "progress");
    labelProgress.setAttribute("for", "inputProgress");
    labelProgress.setAttribute("class", "col-form-label")
    var inputProgress = document.createElement('INPUT');
    inputProgress.id = "inputProgress";
    inputProgress.setAttribute("class", "form-control");
    inputProgress.setAttribute("type", "number");
    inputProgress.setAttribute("max", 1);
    inputProgress.setAttribute("min", 0);
    inputProgress.setAttribute("step", 0.05);
    inputProgress.setAttribute("value", item["progressValue"]);

    var divSalaries = document.createElement('DIV');
    divSalaries.setAttribute("class", "col-sm-3");
    var labelSalaries = document.createElement('LABEL');
    labelSalaries.innerHTML = translate(locale, "salarié(s)", "employees");
    labelSalaries.setAttribute("for", "inputSalaries");
    labelSalaries.setAttribute("class", "col-form-label")
    var inputSalaries = document.createElement('INPUT');
    inputSalaries.id = "inputSalaries";
    inputSalaries.setAttribute("class", "form-control");
    inputSalaries.setAttribute("type", "number");
    inputSalaries.setAttribute("min", 0);
    inputSalaries.setAttribute("step", 1);
    inputSalaries.setAttribute("value", item["employees"]);

    var divPrevisionnel = document.createElement('DIV');
    divPrevisionnel.setAttribute("class", "col-sm-3");
    var labelPrevisionnel = document.createElement('LABEL');
    labelPrevisionnel.innerHTML = translate(locale, "prévisionnel", "estimated");
    labelPrevisionnel.setAttribute("for", "inputPrevisionnel");
    labelPrevisionnel.setAttribute("class", "col-form-label")
    var inputPrevisionnel = document.createElement('INPUT');
    inputPrevisionnel.id = "inputPrevisionnel";
    inputPrevisionnel.setAttribute("class", "form-control");
    inputPrevisionnel.setAttribute("type", "number");
    inputPrevisionnel.setAttribute("min", 0);
    inputPrevisionnel.setAttribute("step", 1);
    inputPrevisionnel.setAttribute("value", item["estimated"]);

    var divReel = document.createElement('DIV');
    divReel.setAttribute("class", "col-sm-3");
    var labelReel = document.createElement('LABEL');
    labelReel.innerHTML = translate(locale, "réel (hrs)", "worked");
    labelReel.setAttribute("for", "inputReel");
    labelReel.setAttribute("class", "col-form-label")
    var inputReel = document.createElement('INPUT');
    inputReel.id = "inputReel";
    inputReel.setAttribute("class", "form-control");
    inputReel.setAttribute("type", "number");
    inputReel.setAttribute("min", 0);
    inputReel.setAttribute("step", 1);
    inputReel.setAttribute("value", item["worked"]);

    /* BUILD FORM */
    /* ROW 01*/
    divTitle.appendChild(inputTitle);
    inputTitle.parentNode.insertBefore(labelTitle, inputTitle);

    divResources.appendChild(inputResources);
    inputResources.parentNode.insertBefore(labelResources, inputResources);

    // divPause.appendChild(selectPause);
    // selectPause.parentNode.insertBefore(labelPause, selectPause);

    divForm_row01.appendChild(divTitle);
    divForm_row01.appendChild(divResources);
    // divForm_row01.appendChild(divPause);

    /* ROW 02 */
    divProgress.appendChild(inputProgress);
    inputProgress.parentNode.insertBefore(labelProgress, inputProgress);

    divSalaries.appendChild(inputSalaries);
    inputSalaries.parentNode.insertBefore(labelSalaries, inputSalaries);

    divPrevisionnel.appendChild(inputPrevisionnel);
    inputPrevisionnel.parentNode.insertBefore(labelPrevisionnel, inputPrevisionnel);

    divReel.appendChild(inputReel);
    inputReel.parentNode.insertBefore(labelReel, inputReel);

    divForm_row02.appendChild(divProgress);
    divForm_row02.appendChild(divSalaries);
    divForm_row02.appendChild(divPrevisionnel);
    divForm_row02.appendChild(divReel);

    form.appendChild(divForm_row01);
    form.appendChild(divForm_row02);
    return form;
}
/* HELPERS */
function isValidDate(d) {
    // https://stackoverflow.com/questions/7445328/check-if-a-string-is-a-date-value
    var formats = [
        moment.ISO_8601,
        "YYYY-MM-DD"
    ];
    return moment(d, formats, true).isValid();
}

function translate(locale, fr, en) {
    return locale === "fr" ? fr : en;
}

/**
 * Custom date picker jQuery
 */
$(function () {
    $("#inputDateToMove").datepicker();
    $("#inputDateToMove").datepicker("setDate", moment().format("YYYY-MM-DD"));
});

$.datepicker.setDefaults({
    dateFormat: "yy-mm-dd",
    changeYear: true,
    showWeek: true,
    weekHeader: weekHeader(),
    monthNames: monthNames(),
    dayNamesMin: dayNamesMin(),
    firstDay: 1
});

function dayNamesMin() {
    if (locale === "fr") {
        return ["Di", "Lu", "Ma", "Me", "Je", "Ve", "Sa"];
    } else {
        return ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
    }
}

function monthNames() {
    if (locale === "fr") {
        return [
            "Janvier",
            "Février",
            "Mars",
            "Avril",
            "Mai",
            "Juin",
            "Juillet",
            "Août",
            "Septembre",
            "Octobre",
            "Novembre",
            "Decembre"
        ];
    } else {
        return [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December"
        ];
    }
}

function weekHeader() {
    if (locale === "fr") {
        return ["Sem"];
    } else {
        return ["Wk"];
    }
}

// Create timeline with array
function timelineVis(dataArray) {
    // console.log(dataArray);

    var array = dataArray.slice(1, dataArray.length);
    $("#puce-showHideAllGroups").removeClass("puce-triangle-right").addClass("puce-triangle-down");

    var values = array.filter(function (el) {
        return el[2] !== null
    });

    values = values.map(row => commaToPoint(row));

    var container = document.getElementById("timeline-vis");
    var types = ["box", "point", "range", "background"]; // not used
    var categories = values.map(function (el) {
        return el[3]
    }).filter(function (elem, i, array) {
        return array.indexOf(elem) === i
    });
    // console.log(categories.length);
    var groups = new vis.DataSet,
        items = new vis.DataSet,
        categories_maxSize = categories.length <= 1000 ? 1000 : 10000;
    var groupId = categories_maxSize + 1, // 1000
        globalDelta = 0;
    for (var g = 0, lg = categories.length; g < lg; g++) {
        var nested = [],
            count = 0,
            groupDelta = 0,
            start, end, statut, itemContent, tooltip, reel,
            className, visibleFrameTemplate, delta, classDelta,
            progressBar,
            progressValue;
        for (var k in values) {
            progressValue = parseFloat(values[k][9]);
            // console.log(values[k][2], progressValue);
            start = moment(values[k][10], "YYYY-MM-DD").toDate();
            end = moment(values[k][11], "YYYY-MM-DD").endOf("day").toDate();
            (values[k][6]) ? reel = parseInt(values[k][6], 10): reel = 0;
            statut = getStatut(start, end, getProgressValue(start, end)).statut;
            progressBar = progressValue; //getStatut(moment(values[k][10]), moment(values[k][11]), getProgressValue(start, end)).progressValue;
            className = getStatut(moment(values[k][10]), moment(values[k][11]), getProgressValue(start, end)).className;
            delta = getDelta(values[k][5], values[k][6]);
            tooltip = getTooltip(getStatut(start, end, getProgressValue(start, end)).statut,
                delta, classDelta, values[k][2], start, end, values[k][5], reel, values[k][1])
            if (progressBar) {
                // console.log(progressValue);
                progressBar = Math.round(progressBar * 100).toFixed(0) + "%";
                visibleFrameTemplate = '<div id="' + groupId + '" class="progress-wrapper">';
                visibleFrameTemplate += '<div class="progress"><label class="progress-label">' + progressBar + '<label>';
                // visibleFrameTemplate += ' <span class=>&#9687;</span>';
                visibleFrameTemplate += '</div></div>';
            } else {
                visibleFrameTemplate = 0;
                // progress = "0%";
            }

            (values[k][12] && values[k][12] !== undefined) ? values[k][12] = values[k][12]: values[k][12] = 0;

            itemContent = parseInt(values[k][12], 10) + translate(locale, ' salarié(s)', ' employees') +
                ' (' + getStatut(moment(values[k][10]), moment(values[k][11]), getProgressValue(start, end)).statutContent + ')';
            // itemContent += ' <button>edit</button>';
            // console.log(categories[g]);
            if (categories[g] == values[k][3]) {
                delta >= 0 ? classDelta = "spanDeltaGreen" : classDelta = "spanDeltaRed";
                items.add({
                    id: groupId,
                    group: groupId,
                    content: itemContent,
                    statutContent: getStatut(moment(values[k][10]), moment(values[k][11]), getProgressValue(start, end)).statutContent,
                    progressValue: progressValue, // getStatut(moment(values[k][10]), moment(values[k][11]), getProgressValue(start, end)).progressValue, // getProgressValue(start, end),
                    progression: progressBar,
                    start: start,
                    end: end,
                    className: className,
                    title: tooltip,
                    classDelta: classDelta,
                    delta: delta,
                    visibleFrameTemplate: visibleFrameTemplate,
                    statut: statut,
                    task: values[k][2],
                    resources: values[k][1],
                    category: values[k][3],
                    location: values[k][4],
                    estimated: values[k][5],
                    worked: (values[k][6]) ? parseInt(values[k][6], 10) : 0,
                    days: getWorkingDays(values[k][10], values[k][11]).days,
                    workingDays: getWorkingDays(values[k][10], values[k][11]).workingDaysCount,
                    employees: values[k][12],
                    break: "",
                });

                groups.add({
                    id: groupId,
                    content: values[k][2] + getClassDelta(parseInt(delta, 10)),
                    groupDates: getGroupDates(values[k][10], values[k][11]),
                    delta: delta,
                    order: groupId
                });
                nested.push(groupId);
                count++;
                groupDelta += parseInt(delta, 10);
                groupId += 1;
            }
        } // (var k in values)
        groupDelta > 0 ? classDelta = "spanDeltaGreen" : classDelta = "spanDeltaRed";
        groups.add({
            id: g + 1,
            category: categories[g],
            title: getCategory(categories[g], count, groupDelta),
            content: getContentCategorie(categories[g], count, groupDelta),
            nestedGroups: nested,
            showNested: true,
            order: g + 1
        });
        globalDelta += groupDelta
    } // (var g = 0, lg = categories.length; g < lg; g++)
    globalDelta > 0 ? classDelta = "spanDeltaGreen" : classDelta = "spanDeltaRed";
    var spanGlobalDelta = document.getElementById("spanGlobalDelta");
    spanGlobalDelta.innerHTML = globalDelta > 0 ? "&Delta; " + Math.round(globalDelta) : "&nabla; " + Math.round(globalDelta);
    spanGlobalDelta.className += classDelta;
    var timelineHeight = Math.round($(window).height() * .85) + "px";
    var itemsOnUpdate = [];
    var options = {
        editable: true,
        groupEditable: true,
        // itemsAlwaysDraggable: true,
        verticalScroll: true,
        orientation: {
            axis: "both",
            item: "top"
        },
        groupOrder: "id",
        width: "100%",
        height: timelineHeight,
        stack: false,
        multiselect: true,
        // multiselectPerGroup: true,
        // showMajorLabels: false,
        // showMinorLabels: false,
        // to block the element vertical dragging so as not to change the group.
        onMoving: function (item, callback) {
            var group = groups.get(item.group);
            // console.log(item, item.id === group.id);
            if (item.content != null && item.id === group.id) {
                callback(item); // send back adjusted item
            } else {
                callback(null); // cancel updating the item
            }
        },
        onMove: function (item, callback) {
            // console.log(item);
            promiseUpdateItem(item).then(value => {
                if (value) {
                    // console.log(document.getElementById('inputProgress').value);
                    item["statut"] = getStatut(moment(item.start), moment(item.end), item["Progression"]).statut;
                    // console.log(item["statut"], item["break"]);
                    (item["statut"] === "planned" && item["break"] === "BREAK") ? item["break"] = "": item["break"] = item["break"];
                    item["title"] = changeTooltip(item);
                    item["content"] = changeContent(item);
                    item["className"] = getStatut(moment(item.start), moment(item.end), item["Progression"]).className;
                    item["progressValue"] = getProgressValue(moment(item.start), moment(item.end));
                    item["progression"] = (item["statut"] !== "planned") ? parseFloat(item["progressValue"] * 100).toFixed(0) + "%" : "0%";
                    item.visibleFrameTemplate = '<div id="' + item.id +
                        '" class="progress-wrapper"><div class="progress"><label class="progress-label">' + item["progression"] +
                        '<label></div></div>';
                    item["delta"] >= 0 ? classDelta = "spanDeltaGreen" : classDelta = "spanDeltaRed";
                    groups.update({
                        id: item.id,
                        content: item["task"] + ' <span class="' + classDelta + '">&Delta; ' + parseInt(item["delta"], 10) + "</span>",
                        groupDates: getGroupDates(item.start, item.end),
                        delta: item["delta"],
                        order: item.id
                    });
                    callback(item); // send back item as confirmation (can be changed)
                    timeline.redraw();
                    // https://github.com/almende/vis/issues/577
                } else {
                    callback(null); // cancel editing item
                }
            }, function (err) {
                console.error('Erreur !');
                alert(err);
            });
        },
        onUpdate: function (item, callback) {
            prettyPromptItemUpdate('Modify item on update', 'SweatAlert!', item, groups, timeline, callback);
        },
        onRemove: function (item, callback) {
            prettyConfirmRemove('Remove item',
                translate(locale, "Voulez-vous vraiment supprimer l'item:\n", 'Do you really want to remove item:\n'),
                item, items, groups, timeline, categories_maxSize, callback)
        },
        onAdd: function (item, callback) {
            var group = groups.get(item.group);
            if (item.content != null && getCategoriesIds().indexOf(group.id) !== -1) {
                var index = getItemsIds().length > 0 ? getItemsIds()[getItemsIds().length - 1] : categories_maxSize;
                prettyPromptAddItem("Add item", "sweatAlert!", item, groups, items, timeline, index, categories_maxSize, callback);
            }
        },
        visibleFrameTemplate: function (item) {
            // console.log(item["statut"], item["progressValue"]);
            if (item.visibleFrameTemplate) {
                $($("#" + item.id).children()).css("width", item.progression);
                if (item["statut"] === "done") {
                    $($("#" + item.id).children()).css({
                        color: "white",
                        background: "#B40404"
                    });
                } else if (item["statut"] === "in progress") {
                    $($("#" + item.id).children()).css({
                        color: "#333",
                        background: "#63ed63"
                    });
                } else if (item["statut"] === "planned") {
                    // console.log(item["statut"]);
                    $($("#" + item.id).children()).css({
                        color: "#333",
                        background: "#FE9A2E"
                    });
                }
                return item.visibleFrameTemplate;
            }
        },
        tooltip: {
            overflowMethod: "cap"
        }
    };

    showHideAllGroups = function (button) {
        var currentCategories = new vis.DataView(groups, {
            filter: function (item) {
                return (item.id < categories_maxSize);
            }
        });
        if (button.dataset.value == "allGroups-hidden") {
            groups.forEach(function (group) {
                groups.update({
                    id: group.id,
                    visible: true,
                    showNested: true
                })
            });
            button.dataset.value = "allGroups-visible";
            $("#puce-showHideAllGroups").removeClass("puce-triangle-right").addClass("puce-triangle-down");
            changeTitleAttr($("#puce-showHideAllGroups").hasClass("puce-triangle-down"));
        } else {
            groups.forEach(function (group) {
                if (group["id"] <= currentCategories.length) groups.update({
                    id: group.id,
                    // visible: true,
                    showNested: false
                });
                else groups.update({
                    id: group.id,
                    visible: false
                });
            });
            button.dataset.value = "allGroups-hidden";
            $("#puce-showHideAllGroups").removeClass("puce-triangle-down").addClass("puce-triangle-right");
            changeTitleAttr($("#puce-showHideAllGroups").hasClass("puce-triangle-down"));
        }
    };

    document.getElementById('allGroups-div').onclick = function (e) {
        showHideAllGroups(this);
    };

    var timeline = new vis.Timeline(container);
    timeline.setOptions(options);
    timeline.setGroups(groups);
    timeline.setItems(items);

    var labelCurrentTime = document.createElement("label");
    labelCurrentTime.setAttribute("id", "labelCurrentTime");
    labelCurrentTime.innerHTML = new Date(timeline.getCurrentTime()).toLocaleDateString(lang, {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    // labelCurrentTime.innerHTML += ' <span class=>' + new Date(timeline.getCurrentTime()).toLocaleTimeString(lang) "</span>";
    timeline.currentTime.bar.appendChild(labelCurrentTime);

    document.getElementById('spanSumCat-title').innerHTML = translate(locale, " catégories ", " categories ");
    document.getElementById('spanSumCat').innerHTML = categories.length;
    document.getElementById("spanSumEvents").innerHTML = items.length;

    items.on('*', function (event, properties) {
        // console.log(event, properties);
    });

    timeline.on('rangechanged', function (e) {
        // var start = moment(timeline.getWindow().start).format("YYYY-MM-DD"),
        //     end = moment(timeline.getWindow().end).format("YYYY-MM-DD");
        // var publicHolidays = getJoursFeries(start, end)
        // .map(date => "vis-day" + moment(date, "YYYY-MM-DD").format("D") + " vis-" + moment(date, "YYYY-MM-DD").locale('en').format("MMMM").toLowerCase());
        // publicHolidays = [...new Set(publicHolidays)];
        // for (var i = 0, lg = publicHolidays.length; i < lg; i++) {
        // var specialDayClass = publicHolidays[i];
        var list = document.getElementsByClassName("vis-saturday")[0];
        var select = $('.vis-item.vis-background.publicDayClass');
        (list !== undefined && e.event !== undefined) ? select.addClass("specialDayClass"): $(".specialDayClass").removeClass("specialDayClass");
        // }
    });

    // to set tooltip position if necessary
    timeline.on('mouseOver', function (prop, timeZone) {
        if (prop.what == "item") {
            // console.log(prop.what, prop, $('.vis-tooltip'));
            $('.vis-tooltip').offset({
                left: prop.pageX + 50, // to adapt to its needs
                // top : prop.pageY
            });
        }
    });

    timeline.on("click", function (properties) {
        var target = properties.event.target;
        var event = properties.event;
        var group = groups.get(properties.group);
        var itemDates = group.groupDates;
        // console.log(properties.what, items, groups)
        if (properties.what === "group-label" && itemDates) {
            timeline.fit();
            if (itemDates && itemDates.length) {
                var itemDateStart = itemDates[0],
                    itemDateEnd = itemDates[1];
                if (itemDateStart && itemDateEnd) timeline.setWindow({
                    start: itemDateStart.valueOf() - 864E4,
                    end: itemDateEnd.valueOf() + 864E4
                })
            }
            event.stopPropagation();
        } else if (properties.what === "group-label" && !itemDates && target.tagName === "I") {
            var title = translate(locale, "Editer la catégorie", "Edit category");
            var text = translate(locale, "Choisissez une action...", "Choose an action...");
            prettyPromptCat(title, text, target, group, groups, timeline, categories_maxSize, items)
            event.stopPropagation();
        } else if (properties.what === "item") {
            // var item = items.get(properties.item);
            if (target.classList[0] === "progress-label")
                console.log(item, group, target);
            // event.stopPropagation();
        }
    });

    var getCategoriesIds = function () {
        var targetGroupsIds = [];
        groups.forEach(function (group) {
            if (group.id <= categories_maxSize) targetGroupsIds.push(group.id);
        });
        return targetGroupsIds;
    }

    var getItemsIds = function () {
        var itemIds = [];
        items.forEach(function (item) {
            if (item.id > categories_maxSize) itemIds.push(item.id);
        });
        return itemIds;
    }

    document.getElementById('switch-btn').onclick = function (e) {
        // var switchOptions = jQuery.extend(timeline.options, {itemsAlwaysDraggable: true});
        if (this.firstChild.classList[1] === "fa-toggle-on") {
            timeline.setOptions({
                itemsAlwaysDraggable: true
            });
            this.firstChild.classList.replace("fa-toggle-on", "fa-toggle-off")
        } else {
            timeline.setOptions({
                itemsAlwaysDraggable: false
            });
            this.firstChild.classList.replace("fa-toggle-off", "fa-toggle-on")
        }
    }

    document.getElementById("moveToDate").onclick = function (e) {
        var dateToMove = document.getElementById("inputDateToMove").value,
            itemCustomTime, endDateToMove;
        endDateToMove = moment(moment(dateToMove).valueOf() + 5184E5).format("YYYY-MM-DD");
        if (items.get(dateToMove)) itemCustomTime = items.get(dateToMove).id;
        if (dateToMove && !items.get(dateToMove)) {
            timeline.addCustomTime(moment(dateToMove).toISOString(), {
                id: dateToMove
            });
            items.add({
                id: dateToMove,
                content: moment(dateToMove).format("DD MMM"),
                start: moment(dateToMove).toISOString(),
                end: moment(moment(endDateToMove).endOf("day")).toISOString(),
                type: "background"
            });
            timeline.setWindow(moment(dateToMove).toISOString(), moment(moment(endDateToMove).endOf("day")).toISOString(), {
                animation: {
                    duration: 1000,
                    easingFunction: "linear"
                }
            });
            showAllGroupsWeek(dateToMove, endDateToMove);
        } else if (dateToMove && dateToMove === itemCustomTime) {
            timeline.setWindow(moment(dateToMove).toISOString(), moment(moment(endDateToMove).endOf("day")).toISOString(), {
                animation: {
                    duration: 1000,
                    easingFunction: "linear"
                }
            });
            showAllGroupsWeek(dateToMove, endDateToMove);
        }
    };

    document.getElementById("globalView").onclick = function (e) {
        timeline.fit(timeline.getVisibleItems())
    };

    function showAllGroups(dateToMove, endDateToMove) {
        console.log(groups);
        groups.forEach(function (group) {
            if (group.id >= categories.length && group.groupDates && group.groupDates.length) {
                var startDateGroup = group.groupDates[0],
                    endDateGroup = group.groupDates[1];
                if (!(endDateGroup <=
                        moment(dateToMove) || startDateGroup >= moment(endDateToMove))) groups.update({
                    id: group.id,
                    visible: true,
                    showNested: true
                });
                else groups.update({
                    id: group.id,
                    visible: false
                })
            }
        })
    }

    function showAllGroupsWeek(dateToMove, endDateToMove) {
        groups.forEach(function (group) {
            //console.log(group.groupDates);
            if (group.id >= categories.length && group.groupDates && (group.groupDates).length) {
                var startDateGroup = group.groupDates[0],
                    endDateGroup = group.groupDates[1];
                //console.log(startDateGroup, endDateGroup, moment(dateToMove));
                if (!(endDateGroup <= moment(dateToMove) || startDateGroup >= moment(endDateToMove))) {
                    groups.update({
                        id: group.nestedInGroup,
                        visible: true,
                        showNested: true
                    });
                    groups.update({
                        id: group.id,
                        visible: true
                    });
                } else {
                    groups.update({
                        id: group.id,
                        visible: false
                    });
                }
            }
        });
    }

    function move(percentage) {
        var range = timeline.getWindow();
        var interval = range.end - range.start;
        timeline.setWindow({
            start: range.start.valueOf() - interval * percentage,
            end: range.end.valueOf() - interval * percentage
        })
    }
    document.getElementById("zoomIn").onclick = function () {
        timeline.zoomIn(.5);
    };
    document.getElementById("zoomOut").onclick = function () {
        timeline.zoomOut(.5);
    };
    document.getElementById("moveLeft").onclick = function () {
        move(.5);
    };
    document.getElementById("moveRight").onclick = function () {
        move(-.5);
    }

    document.getElementById('exportCSV-btn').onclick = function (e) {
        // Get data updated
        var dataExport = d3.csvParseRows(Papa.unparse(getDatavis(items, this.id)), (d) => d);
        // console.log(dataExport);
        exportCSV(dataExport, "planning-export");
    };

    document.getElementById('save-btn').onclick = function (e) {
        var datavis = d3.csvParseRows(Papa.unparse(getDatavis(items, this.id)), (d) => d);
        saveData(datavis);
        // console.log(datavis);
    };

    function getDatavis(items, id) {
        console.log(id);
        // var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        // var localeString = navigator.lang;
        var currentGroups = new vis.DataView(groups, {
            filter: function (group) {
                return (group.id > categories_maxSize);
            }
        }).getIds();
        var currentItems = items.get().filter(obj => currentGroups.indexOf(obj.id) !== -1);
        // console.log(currentItems);
        // voir avec dataview => https://github.com/almende/vis/issues/339
        return currentItems.map((obj) => {
            var newObj = {};
            // console.log(obj["task"], obj["progressValue"]);
            var progressValue = Math.round(obj["progressValue"] * 100) / 100;
            newObj[headers[0]] = obj["statut"];
            newObj[headers[1]] = obj["resources"];
            newObj[headers[2]] = obj["task"];
            newObj[headers[3]] = obj["category"];
            newObj[headers[4]] = obj["location"];
            newObj[headers[5]] = obj["estimated"];
            newObj[headers[6]] = obj["worked"];
            newObj[headers[7]] = obj["days"]; // obj["estimatedDays"];
            newObj[headers[8]] = obj["workingDays"]; // obj["remaining days"];
            newObj[headers[9]] = (id === "save-btn") ? progressValue : progressValue.toLocaleString(lang, {
                minimumFractionDigits: 2
            });
            newObj[headers[10]] = moment(new Date(obj["start"])).format("YYYY-MM-DD");
            newObj[headers[11]] = moment(new Date(obj["end"])).format("YYYY-MM-DD");
            newObj[headers[12]] = (isNaN(obj["employees"])) ? obj["employees"] : Math.round(parseFloat(obj["employees"]) * 100) / 100;
            return newObj;
        });
    }

    document.getElementById('groupadd-btn').onclick = function (e) {
        var title = (document.getElementById('groupadd-input').value) ? (document.getElementById('groupadd-input').value) : "New category";
        // console.log(title);
        var currentCategories = new vis.DataView(groups, {
            filter: function (item) {
                return (item.id < categories_maxSize);
            }
        });
        // console.log(currentCategories.getIds());
        var index = currentCategories.getIds().length > 0 ? d3.max(currentCategories.getIds()) : 0;
        // update group item
        groups.add({
            id: index + 1,
            category: title,
            title: getCategory(title, 0, 0),
            content: getContentCategorie(title, 0, 0),
            nestedGroups: [],
            showNested: true,
            order: index + 1
        });
        console.log(groups);
        timeline.setGroups(groups);
        document.getElementById('spanSumCat').innerHTML = currentCategories.length;
        timeline.redraw();
    };

    document.getElementById('groupadd-input').onkeydown = function (e) {
        if (e.keyCode === 13) {
            var title = (document.getElementById('groupadd-input').value) ? (document.getElementById('groupadd-input').value) : "New category";
            // console.log(title);
            var currentCategories = new vis.DataView(groups, {
                filter: function (item) {
                    return (item.id < categories_maxSize);
                }
            });
            // console.log(currentCategories.getIds());
            var index = currentCategories.getIds().length > 0 ? d3.max(currentCategories.getIds()) : 0;
            // update group item
            groups.add({
                id: index + 1,
                category: title,
                title: getCategory(title, 0, 0),
                content: getContentCategorie(title, 0, 0),
                nestedGroups: [],
                showNested: true,
                order: index + 1
            });
            console.log(groups);
            timeline.setGroups(groups);
            document.getElementById('spanSumCat').innerHTML = currentCategories.length;
            timeline.redraw();
        }
    };

    document.getElementById('removeAll-btn').onclick = function (e) {
        prettyConfirmRemoveAll(
            translate(locale, 'Tout supprimer', 'Remove all'),
            translate(locale,
                'Voulez-vous vraiment effacer toutes les données sur le planning actuel ?',
                'Do you really want to delete all the data on timeline?'),
            groups, items, timeline, categories_maxSize);
    };

    document.getElementById('clearStorage-btn').onclick = function (e) {
        var dataExport = d3.csvParseRows(Papa.unparse(getDatavis(items)), (d) => d);
        // console.log(dataExport);
        exportCSV(dataExport, "planning-export");
        localforage.removeItem('planning_vis');
        var msg_fr = `Le jeu de données a bien été supprimé de votre navigateur`,
            msg_en = `The dataset has been deleted from your browser's cache`
        prettyDefaultReload("Cache info", translate(locale, msg_fr, msg_en), "success");
    };

    // addSpecialDays(timeline, items);
    $(function () {
        // add items for public holydays
        var start = moment(timeline.getWindow().start).format("YYYY-MM-DD"),
            end = moment(timeline.getWindow().end).format("YYYY-MM-DD");
        var publicHolidays = getJoursFeries(start, end).map(date => moment(date, "YYYY-MM-DD").format("YYYY-MM-DD"));
        // console.log(publicHolidays);
        for (var i = 0, lg = publicHolidays.length; i < lg; i++) {
            var specialDay = publicHolidays[i];
            // console.log(specialDay);
            items.add({
                id: specialDay,
                content: "férié", // moment("2018-05-01", "YYYY-MM-DD").format("DD MMM"),
                start: moment(specialDay).toISOString(),
                end: moment(moment(specialDay).endOf("day")).toISOString(),
                className: "publicDayClass",
                type: "background"
            });
        }
        // redraw to consider the visibleFrameTemplate option after load to update the timeline  but this needs to be reviewed.
        timeline.redraw();
        changeTitleAttr($("#puce-showHideAllGroups").hasClass("puce-triangle-down"));
    });
} // fin de timeline


/* HELPERS dataset */

// this promise to skip duplicate event with move see https://github.com/almende/vis/issues/577
function promiseUpdateItem(item) {
    return new Promise((resolve, reject) => {
        if (item) {
            resolve("ok");
        } else {
            reject("error");
        }
    });
}

function getCategory(category, count, delta) {
    return category + ", " + count + " items" + ", delta: " + Math.round(delta);
}

function getContentCategorie(category, count, delta) {
    var title = translate(locale, "long clic pour éditer", "long click to edit");
    return delta >= 0 ?
        '<i class="glyphicon glyphicon-pencil" title="' + title + '"></i> ' + category +
        ' <span class="spanGroup" title="items">' + count + "</span>" + ' <span class="spanDeltaGreen" title="delta">&Delta; ' + Math.round(delta) + "</span>" :
        '<i class="glyphicon glyphicon-pencil" title="' + title + '"></i> ' + category +
        ' <span class="spanGroup" title="items">' + count + "</span>" + ' <span class="spanDeltaRed" title="delta">&nabla; ' + Math.round(delta) + "</span>";
}

function getProgressValue(start, end) {
    var diffStart = Math.abs(moment(start).diff(moment().startOf("days"), 'second')) + 1,
        diffEnd = moment(end).diff(moment().startOf("days"), 'second') + 1,
        diff = Math.abs(moment(start).startOf("days").diff(moment(end).startOf("day"), 'second')) + 1,
        progress = 0;

    if (diffEnd < 0) {
        progress = 1;
    } else {
        progress = (diffStart / diff);
    }
    // console.log(progress);
    return progress;
}

function getStatut(start, end, progressValue) {
    progressValue = (progressValue && progressValue !== undefined) ? parseFloat(progressValue) : 0;
    var currentDate = moment(),
        statut,
        className,
        statutContent;
    // console.log(progress, pause);
    if (start <= currentDate && end >= currentDate) {
        statut = "in progress";
        className = "default";
        statutContent = translate(locale, "en cours", statut);
    } else if (start <= currentDate && end <= currentDate) {
        statut = "done";
        className = "done";
        statutContent = (progressValue !== 1) ? '<span class="glyphicon glyphicon-exclamation-sign" ></span> ' + translate(locale, "terminé", statut) :
            translate(locale, "terminé", statut);
    } else if (start >= currentDate && end > currentDate) {
        statut = "planned";
        progressValue = 0;
        className = "planned";
        statutContent = translate(locale, "prévu", statut);
    }
    // console.log(statut, progress);
    return {
        'statut': statut,
        'progressValue': progressValue,
        "className": className,
        "statutContent": statutContent
    };
}

function getDelta(previsionnel, reel) {
    var delta = 0;
    if (previsionnel && reel) {
        delta = parseInt(previsionnel, 10) - parseInt(reel, 10);
    } else {
        delta = parseInt(previsionnel, 10);
        reel = 0
    }
    return delta
}

function getClassDelta(delta) {
    return delta >= 0 ?
        ' <span class="spanDeltaGreen">&Delta; ' + delta + "</span>" :
        ' <span class="spanDeltaRed">&nabla; ' + delta + "</span>";
}

function getGlobalDelta(groups) {
    var globalDelta = 0,
        classDelta;
    groups.forEach(function (group) {
        if (group.delta) globalDelta += group.delta;
    });
    console.log(globalDelta);
    globalDelta >= 0 ? classDelta = "spanDeltaGreen" : classDelta = "spanDeltaRed";
    var spanGlobalDelta = document.getElementById("spanGlobalDelta");
    spanGlobalDelta.innerHTML = globalDelta > 0 ? "&Delta; " + Math.round(globalDelta) : "&nabla; " + Math.round(globalDelta);
    spanGlobalDelta.className = classDelta;
}

function getTooltip(statut, delta, classDelta, title, start, end, previsionnel, reel, resources) {
    var tooltip,
        wkDays = getWorkingDays(moment(start, "YYYY-MM-DD").format('YYYY-MM-DD'), moment(end, "YYYY-MM-DD").format('YYYY-MM-DD'));
    delta >= 0 ? classDelta = "spanDeltaGreen" : classDelta = "spanDeltaRed";
    tooltip = title + translate(locale, "<br>ressources: ", "<br>resources: ") + resources;
    tooltip += translate(locale, "<hr>du ", "<hr>from ") + new Date(start).toLocaleDateString(lang);
    tooltip += translate(locale, " au ", " to ") + new Date(end).toLocaleDateString(lang);
    tooltip += translate(locale, "<br>prévisionnel: ", "<br>projected: ") + previsionnel;
    tooltip += translate(locale, "<br>réel: ", "<br>realized: ") + reel;
    tooltip += "<br>delta: " + getClassDelta(delta);
    tooltip += translate(locale, "<br><br>durée (jours): ", "<br><br>duration (days): ") + wkDays.days;
    tooltip += translate(locale, "<br>jours ouvrés: ", "<br>working days (french): ") + wkDays.workingDaysCount;
    return tooltip
}

function getGroupDates(start, end) {
    if (isValidDate(moment(start).toDate()) && isValidDate(moment(end).endOf("day").toDate())) {
        groupDates = [moment(start).toDate(), moment(end).endOf("day").toDate()]
    } else {
        groupDates = [null, null];
    }
    return groupDates;
}

/* Change with modal */

function changeTooltip(item) {
    // console.log(item);
    var wkDays = getWorkingDays(moment(item.start, "YYYY-MM-DD").format('YYYY-MM-DD'), moment(item.end, "YYYY-MM-DD").format('YYYY-MM-DD')),
        tooltip;
    tooltip = item.task + translate(locale, "<br>ressources: ", "<br>resources: ") + item.resources;
    tooltip += translate(locale, "<hr>du ", "<hr>from ") + new Date(item.start).toLocaleDateString(lang);
    tooltip += translate(locale, " au ", " to ") + new Date(item.end).toLocaleDateString(lang);
    tooltip += translate(locale, "<br>prévisionnel: ", "<br>projected: ") + item.estimated;
    tooltip += translate(locale, "<br>réel: ", "<br>realized: ") + item.worked;
    tooltip += "<br>delta: " + getClassDelta(item.delta);
    tooltip += translate(locale, "<br><br>durée (jours): ", "<br><br>duration (days): ") + wkDays.days;
    tooltip += translate(locale, "<br>jours ouvrés: ", "<br>working days (french): ") + wkDays.workingDaysCount;
    return tooltip
}

function changeContent(item) {
    // console.log(getStatut(moment(item.start), moment(item.end), item["progressValue"]).statut);
    var content = parseInt(item["employees"], 10) + translate(locale, ' salarié(s)', ' employees') + ' (' +
        getStatut(moment(item.start), moment(item.end), item["progressValue"]).statutContent + ')';
    return content;
}

function changeVisibleFrameTemplate(item) {
    console.log(item);
    if (item["progressValue"]) {
        progress = parseInt(item["progressValue"] * 100, 10) + "%";
        visibleFrameTemplate = '<div id="' + item.id +
            '" class="progress-wrapper"><div class="progress"><label class="progress-label">' + progress + '<label></div></div>';
    } else {
        visibleFrameTemplate = 0;
    }
    return visibleFrameTemplate;
}

// To hide show all groups
function changeTitleAttr(flag) {
    //console.log($("#puce-showHideAllGroups").hasClass("puce-triangle-down"));
    if (flag) {
        document.getElementById('allGroups-div').title = 'collapse all';
    } else {
        document.getElementById('allGroups-div').title = 'expand all';
    }
}

/* Export data using with FileSaver.js and PapaParse libraries*/
function exportCSV(data, filename) {
    //console.log(data);
    dataToCSV = Papa.unparse(data);
    // console.log(JSON.stringify(data));
    var blob = new Blob([dataToCSV], {
        type: "text/csv"
    });
    saveAs(blob, filename + ".csv");
}

function saveData(jsonData) {
    var dataStorage = JSON.stringify(jsonData);
    localforage.setItem('planning_vis', dataStorage)
        .then(function (value) {
            var msg_fr = `Sauvegarde des données dans la mémoire du navigateur, c'est fait !
                \nVous pouvez les supprimer à tout moment (si besoin) à partir du bouton "supprimer le jeu de données du navigateur".`,
                msg_en = `Data backup in browser storage, done!\nYou can delete them at any time if you wish from the 'clear storage and export data' button. `
            swal({
                title: "Backup info",
                text: translate(locale, msg_fr, msg_en),
                icon: "success"
            })
        })
        .catch(function (err) {
            alert(translate(locale, "erreur sauvegarde: " + err, "save data error: " + err));
        });
}

document.getElementById('guide-btn').onclick = function (e) {
    var html = document.createElement("div");
    var p = document.createElement("p");
    var htmlGuide_fr = `<ul>
    <li>Zoomer et dézoomer - l'échelle de temps - avec la molette de la souris en survolant la partie droite du planning (barres).</li>
    <li>Idem pour scroller sur les catégories en les survolant sur la partie gauche (tableau).</li>
    <li>Double-cliquez sur un item (barre de planification) pour le modifier.</li>
    <li>Pour changer les dates d'un item, cliquez dessus puis utilisez les poignées qui s'affichent aux 2 extrémités,
    tirez ensuite soit vers la droite soit ou vers la gauche.</li>
    <li>Pour déplacer un item sur la "ligne de temps", cliquez et glissez la barre vers la droite ou vers la gauche.</li>
    <li>Idem pour déplacer plusieurs éléments à la fois, maintenez la touche Ctrl enfoncée + <b>1 clic</b> sur chaque item pour une sélection multiple.</li>
    </ul>
    <br>Vous découvrirez vite les quelques fonctionnalités restantes à l'usage.`;
    var htmlGuide_en = `<ul>
    <li>Zoom in and out the time scale with the mouse wheel by hovering over the right side of the schedule (bars).</li>
    <li>Same for scrolling over the categories on the left side (table).<li>
    <li>Double-click on an item (planning bar) to modify it.</li>
    <li>To change the dates of an item, click on it and use the handles that appear at both ends, then pull either to the right or to the left.</li>
    <li>Same for moving several items at once, hold down the Ctrl key + <b>one click</b> on each item for multiple selection.</li>
    </ul>
    <br>You will quickly discover the few features that are still in use.`
    p.innerHTML = translate(locale, htmlGuide_fr, htmlGuide_en);
    html.appendChild(p);
    prettyPromptDefault(translate(locale, "Guide (très) rapide", "Very quick guide"), html)
};

function commaToPoint(row) {
    var regexTags = /(<([^>]+)>)/ig;
    var patternComma = /^[0-9]+([,][0-9]+)?%?$/;
    var patternPoint = /^[0-9]+([.][0-9]+)?%?$/;
    var newRow = [];
    for (var j = 0, lgj = row.length; j < lgj; j++) {
        if (isNaN(Number(row[j])) && patternComma.test(row[j]) && !patternPoint.test(row[j])) {
            row[j] = parseFloat(row[j].replace(/\,/, ".")).toLocaleString('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            });
        } else if (row[j] === "0" || row[j] === "0.0" || row[j] === "0.00" || row[j] === " ") {
            row[j] = "";
        } else {
            row[j] = row[j].replace(regexTags, "");
        }
        newRow.push(row[j]);
    }
    return newRow;
}