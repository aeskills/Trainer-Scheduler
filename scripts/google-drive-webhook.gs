/**
 * TrainerPlan – Google Drive Auto-Organizing Uploader & Activity Links Sheet Submissions
 * 
 * Strict Hierarchy created automatically in Google Drive:
 *   {State Folder}  (e.g. Delhi-CM Shree, UP, UK)
 *     └── {Trainer Name}  (e.g. Ashish, Sachin, Khushi, Vishal - reuses existing folder)
 *           └── {Date}  (e.g. 2026-11-05)
 *                 └── {SchoolName}_{Number}.jpg  (e.g. DPS_1.jpg, DPS_2.jpg, VIS_1.jpg)
 * 
 * Google Sheets Activity Links Submission:
 *   Appends Adobe Express student links to state Google Sheet under trainer's tab name:
 *   Columns: DATE | SCHOOL | LINK
 *   - Row 1: DATE (e.g. "6 November"), SCHOOL (e.g. "cm Shri school vikas puri"), LINK 1
 *   - Row 2..N: empty DATE, empty SCHOOL, LINK 2..N
 *   - If trainer tab doesn't exist, auto-creates it with light pink header (#fce8e6).
 */

var SHEET_IDS = {
  Delhi: "1DLLKjvoUoo0DO45w3EZJGMBQfJfUztDY4W8tfNnr2uw",
  UP: "1Em3sqjwpjDO-dLffBrdNL5GDB3GxU3UBPMW5Qs3w3a8",
  UK: "1lSU9ZybieHdrja7jgcHETfouwvraljRQJm50lBI4EJU"
};

var FOLDER_IDS = {
  Delhi: "1tLXE5QQ-OMbW0GovbGnFDQf7iNswNiz3", // Delhi-CM Shree
  UP: "1XISxYlTtcbOOtL3zMM27BsVZFv0zZ9Zt",    // UP
  UK: "1Ef6U5bfCbJw5Vw7uZB4Vu8VxopOpR_ks"     // UK
};

function authorizeDrive() {
  var root = DriveApp.getRootFolder();
  Logger.log("✅ Drive authorized successfully! Root folder: " + root.getName());
  return "Authorized: " + root.getName();
}

/**
 * Finds an existing folder by name inside parentFolder (case-insensitive),
 * or creates a new one if it doesn't exist yet.
 */
function getOrCreateFolder(parentFolder, folderName) {
  var nameToFind = (folderName || "General").toString().trim();
  var folders = parentFolder.getFolders();
  while (folders.hasNext()) {
    var f = folders.next();
    if (f.getName().trim().toLowerCase() === nameToFind.toLowerCase()) {
      return f;
    }
  }
  return parentFolder.createFolder(nameToFind);
}

/**
 * Submits Adobe Express activity links to the state Google Sheet.
 * Appends links under the Trainer's tab name.
 */
function submitSheetLinks(data) {
  var state = (data.state || "Delhi").toString().trim();
  var sheetId = SHEET_IDS[state] || SHEET_IDS.Delhi;
  var ss = SpreadsheetApp.openById(sheetId);
  var trainerName = (data.trainerName || data.trainer || "Trainer").toString().trim();
  
  // 1. Locate trainer sheet tab (case-insensitive)
  var sheets = ss.getSheets();
  var targetSheet = null;
  for (var i = 0; i < sheets.length; i++) {
    if (sheets[i].getName().trim().toLowerCase() === trainerName.toLowerCase()) {
      targetSheet = sheets[i];
      break;
    }
  }
  
  // 2. If tab does not exist, create it with header matching Image 3
  if (!targetSheet) {
    targetSheet = ss.insertSheet(trainerName);
    var header = targetSheet.getRange(1, 1, 1, 3);
    header.setValues([["DATE", "SCHOOL", "LINK"]]);
    header.setFontWeight("bold")
          .setBackground("#fce8e6")
          .setHorizontalAlignment("center")
          .setVerticalAlignment("middle");
    targetSheet.setRowHeight(1, 32);
    targetSheet.setColumnWidth(1, 140);
    targetSheet.setColumnWidth(2, 280);
    targetSheet.setColumnWidth(3, 650);
  }
  
  // 3. Parse and clean links
  var rawLinks = data.links;
  var linkList = [];
  if (Array.isArray(rawLinks)) {
    linkList = rawLinks;
  } else if (typeof rawLinks === "string") {
    linkList = rawLinks.split(/[\r\n]+/).map(function(s) { return s.trim(); }).filter(Boolean);
  }
  linkList = linkList.map(function(l) { return l.trim(); }).filter(function(l) { return l.length > 5; });
  
  if (linkList.length === 0) {
    return { ok: false, error: "No valid links provided." };
  }
  
  var dateStr = (data.displayDate || data.date || Utilities.formatDate(new Date(), "Asia/Kolkata", "d MMMM")).toString().trim();
  var schoolName = (data.schoolName || "").toString().trim();
  
  var lastRow = targetSheet.getLastRow();
  var startRow = Math.max(2, lastRow + 1);
  
  // Format rows:
  // Row 1: DATE, SCHOOL, LINK_1
  // Row 2..N: "", "", LINK_N
  var rows = linkList.map(function(link, idx) {
    return [
      idx === 0 ? dateStr : "",
      idx === 0 ? schoolName : "",
      link
    ];
  });
  
  var range = targetSheet.getRange(startRow, 1, rows.length, 3);
  range.setValues(rows);
  range.setVerticalAlignment("middle");
  
  return {
    ok: true,
    tabName: targetSheet.getName(),
    rowsAdded: rows.length,
    sheetUrl: ss.getUrl() + "#gid=" + targetSheet.getSheetId()
  };
}

/**
 * GET health check
 */
function doGet(e) {
  try {
    var root = DriveApp.getRootFolder();
    var effectiveUser = Session.getEffectiveUser().getEmail();
    return ContentService.createTextOutput(JSON.stringify({
      ok: true,
      status: "ONLINE",
      message: "TrainerPlan Webhook is ACTIVE and connected to Google Drive and Sheets!",
      executingUser: effectiveUser,
      rootFolderName: root.getName()
    })).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({
      ok: false,
      status: "ERROR",
      error: err.toString(),
      hint: "Make sure the Web App is deployed with 'Execute as: Me' and 'Who has access: Anyone'."
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * POST handler: Dispatches to either submitSheetLinks or Drive file upload
 */
function doPost(e) {
  try {
    var raw = e.postData ? e.postData.contents : "{}";
    var data = JSON.parse(raw);
    
    // Check if this is a Google Sheets links submission
    if (data.action === "submitSheetLinks" || data.links) {
      var sheetResult = submitSheetLinks(data);
      return ContentService.createTextOutput(JSON.stringify(sheetResult))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    // 1. Get State Folder
    var folderId = data.folderId || FOLDER_IDS[data.state] || FOLDER_IDS.UP;
    var stateFolder = DriveApp.getFolderById(folderId);
    
    // 2. Step 1: Trainer Folder by Name (e.g. "Ashish", "Sachin", "Khushi", "Vishal")
    var trainerName = (data.trainerName || data.trainer || "").toString().trim();
    if (!trainerName || trainerName.toLowerCase() === "trainer") {
      trainerName = "Field_Trainer";
    }
    var trainerFolder = getOrCreateFolder(stateFolder, trainerName);
    
    // 3. Step 2: Date Folder inside Trainer Folder (e.g. "2026-11-05")
    var dateStr = (data.date || Utilities.formatDate(new Date(), "Asia/Kolkata", "yyyy-MM-dd")).toString().trim();
    var dateFolder = getOrCreateFolder(trainerFolder, dateStr);
    
    // 4. Step 3: Clean File Name with sequential numbering and .jpg extension
    var rawName = (data.fileName || "School_1.jpg").toString().trim();
    var dotIdx = rawName.lastIndexOf(".");
    var baseName = dotIdx !== -1 ? rawName.substring(0, dotIdx) : rawName;
    
    var numMatch = baseName.match(/^(.*)_(\d+)$/);
    var prefix = numMatch ? numMatch[1] : baseName;
    var num = numMatch ? parseInt(numMatch[2], 10) : 1;
    
    var finalFileName = prefix + "_" + num + ".jpg";
    while (dateFolder.getFilesByName(finalFileName).hasNext()) {
      num++;
      finalFileName = prefix + "_" + num + ".jpg";
    }
    
    var decoded = Utilities.base64Decode(data.base64);
    var blob = Utilities.newBlob(decoded, "image/jpeg", finalFileName);
    
    var file = dateFolder.createFile(blob);
    
    try {
      file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
    } catch (shareErr) {
      Logger.log("Sharing permission note: " + shareErr);
    }
    
    var result = {
      ok: true,
      fileId: file.getId(),
      link: file.getUrl(),
      folderLink: dateFolder.getUrl(),
      trainerFolderLink: trainerFolder.getUrl(),
      stateFolderLink: stateFolder.getUrl(),
      thumbUrl: "https://drive.google.com/thumbnail?id=" + file.getId() + "&sz=w480",
      fileName: file.getName(),
      hierarchy: stateFolder.getName() + " > " + trainerFolder.getName() + " > " + dateFolder.getName() + " > " + file.getName()
    };
    
    return ContentService.createTextOutput(JSON.stringify(result))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({
      ok: false,
      error: err.toString(),
      stack: err.stack || ""
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
